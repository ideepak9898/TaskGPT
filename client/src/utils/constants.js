// export const API_URL = ["https://taskgpt-jqur.onrender.com/"];

// 'http://localhost:5050'

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://taskgpt-jqur.onrender.com"
    : "http://localhost:5050";