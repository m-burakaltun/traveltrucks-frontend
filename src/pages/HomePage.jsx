// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const navigate = useNavigate();
  const goCatalog = () => navigate("/catalog");

  return (
    <main className={styles.main}>
      <Banner />

      <section className={styles.section}>
        <h2 className={styles.title}>Why TravelTrucks?</h2>
        <p className={styles.text}>
          Bizimle seyahat etmek, rahatlık, esneklik ve macera dolu bir deneyim
          demektir. Modern karavanlarımız ve sunduğumuz hizmetlerle
          yolculuğunuz unutulmaz olacak.
        </p>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h4>Comfortable Vans</h4>
            <p>
              Her türlü konforla donatılmış karavanlarımız ile yolculuğun tadını
              çıkarın.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h4>Flexible Routes</h4>
            <p>Kendi rotanızı belirleyin, özgürce keşfedin ve maceraya atılın.</p>
          </div>
          <div className={styles.featureCard}>
            <h4>24/7 Support</h4>
            <p>
              Yolda her zaman yanınızda olacak destek ekibimizle güvenle seyahat
              edin.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
