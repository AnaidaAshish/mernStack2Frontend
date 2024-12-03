import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanager-backend-hsso.onrender.com/api/v1",
});

export default api;
