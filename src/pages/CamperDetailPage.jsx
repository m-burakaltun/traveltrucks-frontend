// src/pages/CamperDetailPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../store/campersSlice";

export default function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCamper, loading, error } = useSelector(
    (state) => state.campers
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCamperById(id));
    }
  }, [dispatch, id]);

  if (loading && !selectedCamper) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: 40, color: "red" }}>
        Error: {String(error)}
      </p>
    );
  }

  if (!selectedCamper) {
    return <p style={{ padding: 40 }}>Camper not found.</p>;
  }

  const camper = selectedCamper;

  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{camper.name}</h1>
      <p style={{ color: "#555" }}>{camper.location}</p>
      <p style={{ fontWeight: 600 }}>
        €{" "}
        {typeof camper.price === "number"
          ? camper.price.toFixed(2)
          : camper.price}
      </p>

      <p style={{ marginTop: 16 }}>{camper.description}</p>

      <section style={{ marginTop: 24 }}>
        <h3>Details</h3>
        <ul>
          <li>Form: {camper.form}</li>
          <li>Length: {camper.length}</li>
          <li>Width: {camper.width}</li>
          <li>Height: {camper.height}</li>
          <li>Tank: {camper.tank}</li>
          <li>Consumption: {camper.consumption}</li>
          <li>Transmission: {camper.transmission}</li>
          <li>Engine: {camper.engine}</li>
        </ul>
      </section>
    </main>
  );
}
