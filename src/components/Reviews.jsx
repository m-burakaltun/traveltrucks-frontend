// src/components/Reviews.jsx
import React from "react";

export default function Reviews({ reviews = [] }) {
  if (!reviews.length) return null;

  return (
    <section>
      <h3>Reviews</h3>
      {reviews.map((r, idx) => (
        <article key={idx}>
          <strong>{r.reviewer_name || "User"}</strong> – ⭐ {r.reviewer_rating ?? r.rating ?? 0}
          <p>{r.comment || r.review}</p>
        </article>
      ))}
    </section>
  );
}
