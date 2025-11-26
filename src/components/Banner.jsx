import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Banner() {
  const navigate = useNavigate();
  return (
    <section className="banner">
      <div className="container banner-inner">
        <div style={{maxWidth:700}}>
          <h1>TravelTrucks ile özgürlüğe çıkın</h1>
          <p>En iyi karavanlar, anında rezervasyon.</p>
          <button className="cta" onClick={() => navigate('/catalog')}>View Now</button>
        </div>
      </div>
    </section>
  );
}
