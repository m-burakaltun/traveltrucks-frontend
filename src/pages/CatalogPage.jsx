// src/pages/CatalogPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers, clearCampers } from "../store/campersSlice";
import {
  setLocation,
  setForm,
  toggleEquipment,
  resetFilters,
} from "../store/filtersSlice";
import { toggleFavorite } from "../store/favoritesSlice";

export default function CatalogPage() {
  const dispatch = useDispatch();

  const { items, total, page, loading, error } = useSelector(
    (state) => state.campers
  );
  const filters = useSelector((state) => state.filters);
  const favorites = useSelector((state) => state.favorites.items);

  // İlk açılış + filtre değişimi
  useEffect(() => {
    dispatch(clearCampers());
    dispatch(
      fetchCampers({
        page: 1,
        location: filters.location,
        form: filters.form,
        equipment: filters.equipment,
      })
    );
  }, [
    dispatch,
    filters.location,
    filters.form,
    JSON.stringify(filters.equipment),
  ]);

  const loadMore = () => {
    dispatch(
      fetchCampers({
        page: page + 1,
        location: filters.location,
        form: filters.form,
        equipment: filters.equipment,
      })
    );
  };

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleFormChange = (e) => {
    dispatch(setForm(e.target.value));
  };

  const handleEquipmentChange = (e) => {
    dispatch(toggleEquipment(e.target.value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handleShowMore = (id) => {
    // Detay sayfası yeni sekmede
    window.open(`/catalog/${id}`, "_blank");
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <main style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>Catalog</h1>

      {/* FILTERS */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1.5fr",
          gap: "16px",
          marginBottom: "32px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        {/* Location */}
        <div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={handleLocationChange}
            placeholder="Ukraine, Kyiv"
            style={{
              width: "100%",
              padding: "8px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Vehicle type */}
        <div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
            Vehicle type
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label>
              <input
                type="radio"
                name="form"
                value=""
                checked={filters.form === ""}
                onChange={handleFormChange}
              />{" "}
              All
            </label>
            <label>
              <input
                type="radio"
                name="form"
                value="alcove"
                checked={filters.form === "alcove"}
                onChange={handleFormChange}
              />{" "}
              Alcove
            </label>
            <label>
              <input
                type="radio"
                name="form"
                value="panelTruck"
                checked={filters.form === "panelTruck"}
                onChange={handleFormChange}
              />{" "}
              Panel Truck
            </label>
            <label>
              <input
                type="radio"
                name="form"
                value="fullyIntegrated"
                checked={filters.form === "fullyIntegrated"}
                onChange={handleFormChange}
              />{" "}
              Fully Integrated
            </label>
          </div>
        </div>

        {/* Equipment */}
        <div>
          <label style={{ fontWeight: 600, display: "block", marginBottom: 8 }}>
            Equipment
          </label>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}
          >
            {[
              "AC",
              "bathroom",
              "kitchen",
              "TV",
              "radio",
              "refrigerator",
              "microwave",
              "gas",
              "water",
            ].map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  value={key}
                  checked={filters.equipment.includes(key)}
                  onChange={handleEquipmentChange}
                />{" "}
                {key}
              </label>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: "1 / -1", textAlign: "right", marginTop: 8 }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "#f5f5f5",
              cursor: "pointer",
            }}
          >
            Reset filters
          </button>
        </div>
      </section>

      {/* ERROR / LOADING */}
      {error && (
        <p style={{ color: "red", marginBottom: "16px" }}>
          Error: {String(error)}
        </p>
      )}
      {loading && <p>Loading campers...</p>}

      {!loading && items.length === 0 && !error && <p>No campers found.</p>}

      {/* LIST */}
      <div>
        {items.map((camper) => {
          if (!camper) return null;
          const isFav = favorites.includes(camper.id);

          return (
            <article
              key={camper.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div>
                <h3 style={{ marginBottom: 8 }}>{camper.name}</h3>
                <p style={{ margin: 0, color: "#555" }}>{camper.location}</p>
                <p style={{ margin: "6px 0", fontWeight: 600 }}>
                  €{" "}
                  {typeof camper.price === "number"
                    ? camper.price.toFixed(2)
                    : camper.price}
                </p>
                {camper.description && (
                  <p style={{ marginTop: 8, color: "#666" }}>
                    {camper.description.slice(0, 120)}...
                  </p>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(camper.id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #e44848",
                    background: isFav ? "#e44848" : "#fff",
                    color: isFav ? "#fff" : "#e44848",
                    cursor: "pointer",
                  }}
                >
                  {isFav ? "Remove from favorites" : "Add to favorites"}
                </button>

                <button
                  type="button"
                  onClick={() => handleShowMore(camper.id)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#e44848",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Show more
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* LOAD MORE */}
      {items.length > 0 && items.length < total && !loading && (
        <button
          type="button"
          onClick={loadMore}
          style={{
            padding: "12px 24px",
            marginTop: "20px",
            background: "#e44848",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Load more
        </button>
      )}
    </main>
  );
}
