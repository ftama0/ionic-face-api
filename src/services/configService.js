// src/services/configService.js
import axios from "axios";
import { checkTokenExpiration } from "@/middleware/checkTokenExpiration";
import router from "@/router";

const setupAxiosInstance = ({ checkToken = true } = {}) => {
  const apiService = axios.create({
    // baseURL: "https://192.168.89.28",
    baseURL: "https://dev-mobileapproval.hasnurgroup.com",
    timeout: 10000, // Atur timeout request jika diperlukan
  });

  if (checkToken) {
    apiService.interceptors.request.use(
      async (config) => {
        const accessToken = await checkTokenExpiration();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          // Token tidak valid, arahkan pengguna ke halaman login
          router.replace({ name: "Login" });
          return Promise.reject(new Error("Unauthorized"));
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return apiService;
};

export default setupAxiosInstance;
