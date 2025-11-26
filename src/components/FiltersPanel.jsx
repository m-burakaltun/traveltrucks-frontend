import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, setVehicleType, toggleFeature, clearFilters } from '../store/filtersSlice';

const FEATURES = ['airCondition', 'kitchen', 'shower', 'tv', 'fridge', 'microwave'];
const TYPES = ['van', 'motorhome', 'campervan'];

export default function FiltersPanel(){
  const dispatch = useDispatch();
  const filters = useSelector(s => s.filters);

  return (
    <div className="filters-panel">
      <h3>Filters</h3>
      <label>
        Location
        <input value={filters.location} onChange={e => dispatch(setLocation(e.target.value))} />
      </label>

      <div>
        <p>Vehicle Type</p>
        {TYPES.map(t => (
          <label key={t} style={{display:'block'}}>
            <input type="radio" name="type" checked={filters.vehicleType === t} onChange={() => dispatch(setVehicleType(t))} /> {t}
          </label>
        ))}
      </div>

      <div>
        <p>Extra features</p>
        {FEATURES.map(f => (
          <label key={f} style={{display:'block'}}>
            <input type="checkbox" checked={filters.features.includes(f)} onChange={() => dispatch(toggleFeature(f))} /> {f}
          </label>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={() => dispatch(clearFilters())}>Clear</button>
      </div>
    </div>
  );
}
