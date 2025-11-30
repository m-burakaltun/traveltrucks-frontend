// src/api/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
  timeout: 10000,
});

// Sayfada kaç kart gösterilecek
export const PAGE_LIMIT = 4;

/**
 * Karavan listesini getirir (backend filtreli + sayfalı)
 */
export async function fetchCampersApi({
  page = 1,
  location = "",
  form = "",
  equipment = [],
} = {}) {
  const params = { page, limit: PAGE_LIMIT };

  if (location.trim()) {
    params.location = location.trim();
  }
  if (form) {
    params.form = form;
  }

  // equipment -> API'deki boolean key'lerle aynı olacak (AC, bathroom, kitchen vs.)
  equipment.forEach((key) => {
    params[key] = true;
  });

  const res = await api.get("campers", { params });

  // API 2 şekilde dönebilir:
  // 1) Düz array   -> [ {...}, {...} ]
  // 2) Nesne       -> { total, items: [ {...}, ... ] }
  const raw = res.data;
  let items;
  let total;

  if (Array.isArray(raw)) {
    items = raw;
    total = Number(res.headers["x-total-count"] ?? raw.length);
  } else {
    items = Array.isArray(raw.items) ? raw.items : [];
    total = typeof raw.total === "number" ? raw.total : items.length;
  }

  return {
    items,
    total,
    page,
  };
}

/**
 * Tek karavan detayı
 */
export async function fetchCamperByIdApi(id) {
  const res = await api.get(`campers/${id}`);
  return res.data;
}
