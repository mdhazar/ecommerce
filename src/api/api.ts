import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export default api;
