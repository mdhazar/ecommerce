import axios, { type AxiosInstance } from "axios";
import { getToken } from "@/lib/auth-token";

const api: AxiosInstance = axios.create({
	baseURL:
		import.meta.env.VITE_API_URL ??
		"https://workintech-fe-ecommerce.onrender.com",
});

// Attach the auth token (if any) to every request. Replaces the previous
// imperative `api.defaults.headers.common.Authorization = ...` juggling.
api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = token;
	}
	return config;
});

export default api;
