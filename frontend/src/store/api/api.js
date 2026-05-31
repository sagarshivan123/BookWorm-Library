import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,   // 🔥 VERY IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// https://library-system-j2ah.onrender.com/api/v1
// http://localhost:4000/api/v1/