import axios from "axios";

const api = axios.create({
  baseURL: "https://mernstack2-b4o1.onrender.com/api/v1",
  withCredentials: true,
});

export default api;
