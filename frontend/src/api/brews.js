import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/brews`;

export const getBrews = (method) =>
  axios.get(BASE_URL, { params: method ? { method } : {} }).then((r) => r.data);

export const createBrew = (data) => axios.post(BASE_URL, data).then((r) => r.data);

export const updateBrew = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data).then((r) => r.data);

export const deleteBrew = (id) => axios.delete(`${BASE_URL}/${id}`);

export const BREW_METHODS = [
  "Aeropress",
  "French Press",
  "V60",
  "Drip coffee",
  "Espresso",
  "Moka Pot",
  "Cold Brew",
];