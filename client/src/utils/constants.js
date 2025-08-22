export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://task-gpt-backend.vercel.app"
    : "http://localhost:5050";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://task-gpt-backend.vercel.app/api"
    : "http://localhost:5050/api";