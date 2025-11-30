// src/components/CamperCard.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { useNavigate } from "react-router-dom";
import styles from "./CamperCard.module.css";

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((s) => s.favorites.items);

  const {
    id,
    name,
    price,
    location,
    rating,
    description,
    gallery,
    images,
  } = camper;

  const isFav = favorites.includes(id);
  const displayPrice =
    typeof price === "number" ? price.toFixed(2) : `${price ?? ""}`;

  const img = gallery?.[0] || images?.[0];

  const onFavorite = () => dispatch(toggleFavorite(id));

  const onShowMore = () => {
    window.open(`/catalog/${id}`, "_blank", "noopener,noreferrer");
  };

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        {img ? <img src={img} alt={name} /> : <div className={styles.placeholder} />}
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <span className={styles.price}>€ {displayPrice}</span>
        </div>

        <div className={styles.meta}>
          <span>⭐ {rating ?? 0}</span>
          <span>📍 {location}</span>
        </div>

        <p className={styles.desc}>
          {description?.slice(0, 100) ?? ""}...
        </p>

        <div className={styles.footer}>
          <button className={styles.moreBtn} onClick={onShowMore}>
            Show more
          </button>
          <button
            className={`${styles.favBtn} ${isFav ? styles.favActive : ""}`}
            onClick={onFavorite}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}

