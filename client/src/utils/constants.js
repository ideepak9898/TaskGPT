export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://taskgpt-jqur.onrender.com"
    : "http://localhost:5050";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://taskgpt-jqur.onrender.com/api"
    : "http://localhost:5050/api";