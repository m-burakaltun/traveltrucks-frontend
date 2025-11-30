// src/components/ReservationForm.jsx
import React, { useState } from "react";
import styles from "./ReservationForm.module.css";

export default function ReservationForm({ camperName }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // burada normalde backend isteği atılır
    window.alert("Reservation sent successfully!");
    setForm({ name: "", email: "", date: "", comment: "" });
  };

  return (
    <section className={styles.section}>
      <h3>Reservation</h3>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
          required
        />
        <textarea
          name="comment"
          value={form.comment}
          onChange={onChange}
          placeholder={`Message about booking ${camperName || "camper"}`}
          rows={3}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
