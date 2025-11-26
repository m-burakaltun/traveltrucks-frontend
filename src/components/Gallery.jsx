import React from 'react';

export default function Gallery({ images }){
  if (!images || images.length === 0) return <div>No images</div>;
  return (
    <div className="gallery" style={{marginBottom:12}}>
      {images.map((src, i) => (
        <img key={i} src={src} alt={`img-${i}`} />
      ))}
    </div>
  );
}
