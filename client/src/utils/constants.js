export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://taskgpt-jqur.onrender.com"
    : "http://localhost:5050";

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050/api";