import React, { useState } from 'react';

export default function ReservationForm({ camper }){
  const [form, setForm] = useState({ name: '', email: '', from: '', to: '', guests: 1 });
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      alert('Reservation successful!');
      setForm({ name: '', email: '', from: '', to: '', guests: 1 });
      setStatus(null);
    }, 800);
  };

  return (
    <div className="reservation">
      <h3>Reserve {camper.title}</h3>
      <p>Price per day: {Number(camper.price || 0).toFixed(2)} ₺</p>
      <form onSubmit={submit}>
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{marginTop:6}}/>
        <label style={{display:'block',marginTop:6}}>From <input required type="date" value={form.from} onChange={e=>setForm({...form,from:e.target.value})} /></label>
        <label style={{display:'block',marginTop:6}}>To <input required type="date" value={form.to} onChange={e=>setForm({...form,to:e.target.value})} /></label>
        <input type="number" min={1} value={form.guests} onChange={e=>setForm({...form,guests:Number(e.target.value)})} style={{marginTop:6}}/>
        <button className="btn" type="submit" style={{marginTop:8}}>Book Now</button>
      </form>
      {status === 'loading' && <p>Processing...</p>}
    </div>
  );
}
