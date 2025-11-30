// src/components/FiltersPanel.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleEquipment,
  resetFilters,
} from "../store/filtersSlice";
import styles from "./FiltersPanel.module.css";

export default function FiltersPanel() {
  const dispatch = useDispatch();
  const { location, form, equipment } = useSelector((s) => s.filters);

  const onLocationChange = (e) => dispatch(setLocation(e.target.value));
  const onFormChange = (e) => dispatch(setForm(e.target.value));
  const onEquipmentChange = (val) => dispatch(toggleEquipment(val));
  const onReset = () => dispatch(resetFilters());

  const isChecked = (val) => equipment.includes(val);

  return (
    <aside className={styles.panel}>
      <h3 className={styles.title}>Filters</h3>

      <div className={styles.group}>
        <label className={styles.label}>Location</label>
        <input
          value={location}
          onChange={onLocationChange}
          placeholder="Enter location"
          className={styles.input}
        />
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Vehicle type</label>
        <select value={form} onChange={onFormChange} className={styles.select}>
          <option value="">All</option>
          <option value="panelTruck">Panel Truck</option>
          <option value="fullyIntegrated">Fully Integrated</option>
          <option value="alcove">Alcove</option>
        </select>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>Equipment</label>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={isChecked("ac")}
            onChange={() => onEquipmentChange("ac")}
          />
          <span>AC</span>
        </label>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={isChecked("kitchen")}
            onChange={() => onEquipmentChange("kitchen")}
          />
          <span>Kitchen</span>
        </label>

        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={isChecked("tv")}
            onChange={() => onEquipmentChange("tv")}
          />
          <span>TV</span>
        </label>
      </div>

      <button className={styles.resetBtn} onClick={onReset}>
        Reset filters
      </button>
    </aside>
  );
}
