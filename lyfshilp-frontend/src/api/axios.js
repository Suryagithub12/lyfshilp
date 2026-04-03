import axios from "axios";

// Base URL for local development vs production
// Uses VITE_API_URL if set, otherwise switches based on environment mode
const isProd = import.meta.env.PROD;

const api = axios.create({
  baseURL: "https://lyfshilp-backend.onrender.com/api",
  // baseURL: "https://lyfshilp-backend-210425516679.asia-south1.run.app/api", // Production backend URL from Google Cloud Run
  withCredentials: true,
});


// Add JWT token to all requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api", // ✅ must include /api
// });

// export default api;
