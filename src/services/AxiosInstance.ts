import axios, { type AxiosInstance } from "axios";

// Base URL de tu API
const BASE_URL = import.meta.env.VITE_API_URL || "https://sistemainventario-shy2.onrender.com";

// Obtener el token (puedes personalizarlo según tu auth)
const getToken = () => {
  return localStorage.getItem("jwt_token"); // o desde un context/store
};

export const setToken = (token: string) => {
  localStorage.setItem("jwt_token", token);
};

// Instancia pública (sin token)
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// Instancia privada (con token JWT)
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

// Instancia Vercel Function
export function axiosApiInternal(): AxiosInstance {
  const isLocal = window.location.hostname === "localhost";
  const httpUrl = "https://si-psi-seven.vercel.app";

  const instance = axios.create({
    baseURL: isLocal ? httpUrl : BASE_URL, // BASE_URL es tu URL en producción
  });

  // Interceptor para intentar HTTP si HTTPS falla
  instance.interceptors.response.use(
    response => response,
    async error => {
      if (isLocal && error.code === "ERR_BAD_REQUEST") {
        console.warn("HTTPS falló, intentando HTTP...");
        const fallbackInstance = axios.create({ baseURL: httpUrl });
        return fallbackInstance.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// Interceptor para agregar el token en cada request privada
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
