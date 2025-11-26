import React from 'react';
import Banner from '../components/Banner';

export default function HomePage() {
  return (
    <main>
      <Banner />
      <section className="container" style={{ padding: '2rem 0' }}>
        <h2>Why TravelTrucks?</h2>
        <p>Konforlu karavanlarla özgürlüğün tadını çıkarın. Hemen keşfetmek için kataloga göz atın.</p>
      </section>
    </main>
  );
}
