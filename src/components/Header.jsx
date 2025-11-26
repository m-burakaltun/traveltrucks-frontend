import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="header">
      <div className="container">
        <Link to="/" style={{fontWeight:700,fontSize:18}}>TravelTrucks</Link>
        <nav>
          <Link to="/catalog">Catalog</Link>
        </nav>
      </div>
    </header>
  );
}
