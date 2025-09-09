// src/config.js
// If you use Vite, you can instead set VITE_API_URL in .env and use import.meta.env.VITE_API_URL
export const API = (import.meta?.env?.VITE_API_URL) || "http://localhost:5000";
