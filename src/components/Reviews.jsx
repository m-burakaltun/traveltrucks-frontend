import React, { useState, useEffect } from 'react';

const REV_KEY = (id) => `reviews_${id}`;

export default function Reviews({ camperId }){
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, text: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(REV_KEY(camperId)) || '[]');
    setReviews(saved);
  }, [camperId]);

  const submit = (e) => {
    e.preventDefault();
    const newRev = { ...form, date: new Date().toISOString() };
    const next = [newRev, ...reviews];
    setReviews(next);
    localStorage.setItem(REV_KEY(camperId), JSON.stringify(next));
    setForm({ name: '', rating: 5, text: '' });
  };

  return (
    <section style={{marginTop:12}}>
      <h3>Reviews</h3>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <div style={{marginTop:6}}>
          <label>Rating: </label>
          <select value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})}>
            {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} ⭐</option>)}
          </select>
        </div>
        <textarea placeholder="Write your review" value={form.text} onChange={e=>setForm({...form,text:e.target.value})} required style={{width:'100%',minHeight:80,marginTop:6}} />
        <button type="submit" className="btn" style={{marginTop:6}}>Submit Review</button>
      </form>

      <div className="reviews-list" style={{marginTop:12}}>
        {reviews.map((r,i)=> (
          <div key={i} className="review">
            <div><strong>{r.name}</strong> — {r.rating}⭐</div>
            <div>{r.text}</div>
            <small>{new Date(r.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
