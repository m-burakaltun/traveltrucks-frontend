import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FiltersPanel from '../components/FiltersPanel';
import CamperCard from '../components/CamperCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchCampers, clearCampers } from '../store/campersSlice';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const { items, status, page, hasMore } = useSelector(s => s.campers);
  const filters = useSelector(s => s.filters);

  useEffect(() => {
    dispatch(clearCampers());
    dispatch(fetchCampers({ page: 1, limit: 6, filters }));
  }, [dispatch, filters.location, filters.vehicleType, JSON.stringify(filters.features)]);

  const loadMore = () => {
    dispatch(fetchCampers({ page: page + 1, limit: 6, filters }));
  };

  return (
    <main style={{ padding: '1rem 0' }} className="container">
      <h2>Catalog</h2>
      <div style={{ display: 'flex', gap: '1rem', marginTop:16 }}>
        <aside style={{ minWidth: 260 }}>
          <FiltersPanel />
        </aside>
        <section style={{ flex: 1 }}>
          {status === 'loading' && items.length === 0 ? <LoadingSpinner /> : (
            <div className="cards-grid">
              {items.map(c => <CamperCard key={c.id} camper={c} />)}
            </div>
          )}

          {status === 'loading' && items.length > 0 && <LoadingSpinner />}

          {hasMore && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button className="btn" onClick={loadMore}>Load More</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
