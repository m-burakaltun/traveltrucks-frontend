// src/components/Gallery.jsx
import React from "react";
import styles from "./Gallery.module.css";

export default function Gallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <div className={styles.gallery}>
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`camper-${idx}`} />
      ))}
    </div>
  );
}
