// src/components/Banner.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Banner.module.css";

export default function Banner() {
  const navigate = useNavigate();
  const goCatalog = () => navigate("/catalog");

  return (
    <section className={styles.banner}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Freedom on Wheels</h1>
        <p className={styles.subtitle}>
          Konforlu karavanlarımızla Avrupa&apos;nın dört bir yanını keşfet.
        </p>
        <button className={styles.cta} onClick={goCatalog}>
          View Now
        </button>
      </div>
    </section>
  );
}
