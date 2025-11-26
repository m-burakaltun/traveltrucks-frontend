import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

export default function CamperCard({ camper }){
  const dispatch = useDispatch();
  const favorites = useSelector(s => s.favorites.items);
  const isFav = !!favorites.find(x => x.id === camper.id);

  const toggleFav = () => {
    if (isFav) dispatch(removeFavorite(camper.id));
    else dispatch(addFavorite(camper));
  };

  const priceFormatted = Number(camper.price || 0).toFixed(2);

  return (
    <article className="card">
      <img src={(camper.images && camper.images[0]) || 'https://via.placeholder.com/600x400?text=No+Image'} alt={camper.title || 'Camper'} />
      <div className="card-body">
        <div>
          <h4>{camper.title}</h4>
          <p style={{margin:4}}>{camper.location}</p>
          <p style={{margin:4}}><strong>{priceFormatted} ₺ / day</strong></p>
        </div>
        <div className="card-actions">
          <a href={`/catalog/${camper.id}`} target="_blank" rel="noopener noreferrer" className="btn-link">Show More</a>
          <button onClick={toggleFav} className="icon-btn" aria-label="favorite">{isFav ? '★' : '☆'}</button>
        </div>
      </div>
    </article>
  );
}
