// src/services/configService.js
import axios from "axios";
import { checkTokenExpiration } from "@/middleware/checkTokenExpiration";
import router from "@/router";

const setupAxiosInstance = ({ checkToken = true } = {}) => {
  const apiService = axios.create({
    baseURL: "https://dev-mobileapproval.hasnurgroup.com",
    timeout: 10000, // Atur timeout request jika diperlukan
  });

  if (checkToken) {
    apiService.interceptors.request.use(
      async (config) => {
        const accessToken = await checkTokenExpiration();
        // console.log("accessToken", accessToken);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          // Token tidak valid, arahkan pengguna ke halaman login
          router.replace({ name: "Login" });
          return Promise.reject(new Error("Unauthorized"));
        }
        // console.log('Request Headers:', config.headers);
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
