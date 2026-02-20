import axios from "axios";
import qs from "qs";

export const axiosInstance = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api",
  paramsSerializer: (params) => {
    return qs.stringify(params, { encodeValuesOnly: true });
  },
});

// Интерцептор для автоматического добавления токена (если он есть в localStorage)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
