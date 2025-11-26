import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../store/campersSlice';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import ReservationForm from '../components/ReservationForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CamperDetailPage(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentDetail, status } = useSelector(s => s.campers);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (status === 'loading' || !currentDetail) return <LoadingSpinner />;

  const c = currentDetail;

  return (
    <main style={{ padding: 16 }} className="container">
      <h2>{c.title}</h2>
      <p>{c.location}</p>
      <div style={{ display: 'flex', gap: 16, marginTop:12 }}>
        <div style={{ flex: 2 }}>
          <Gallery images={c.images || []} />
          <section>
            <h3>Features</h3>
            <ul>
              {c.features && c.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </section>

          <section>
            <h3>Details</h3>
            <dl>
              <dt>Body</dt><dd>{c.bodyType}</dd>
              <dt>Length</dt><dd>{c.length}</dd>
              <dt>Width</dt><dd>{c.width}</dd>
              <dt>Height</dt><dd>{c.height}</dd>
            </dl>
          </section>

          <Reviews camperId={id} />
        </div>

        <aside style={{ flex: 1 }}>
          <ReservationForm camper={c} />
        </aside>
      </div>
    </main>
  );
}
