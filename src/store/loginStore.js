// store/loginStore.js
import { defineStore } from "pinia";
import { loginService, tokenService } from "@/services/apiService"; // Import  dari services
import { getDeviceInfo, isMobilePlatform } from "@/plugins/devicePlugin";
import { storage } from "@/store/configStorage";
import { jwtDecode } from "jwt-decode";
// note : access token : 24 jam , refresh token : 30 hari

export const useLoginStore = defineStore({
  id: "login", // ID store

  state: () => ({
    user: {},
    token: {},
    homeData: {},
  }),
  persist: {
    enabled: true,
  },
  actions: {
    async login(username, password) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await loginService.login(formData);
        const decode_at = jwtDecode(res.access_token);
        const decode_rt = jwtDecode(res.refresh_token);
        const expired_at = decode_at.exp * 1000;
        const expired_rt = decode_rt.exp * 1000;
        this.token = {
          ...res,
          expired_at,
          expired_rt,
        };
        this.user = decode_at;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async logout() {
      // await storage.clear();
      localStorage.clear();
      this.$reset();
    },
    async readHome() {
      try {
        const res = await loginService.readHome();
        this.homeData = res.data;
      } catch (error) {
        console.error("Error get data:", error);
        throw error;
      }
    },
    async postOneSignal(id) {
      try {
        const data = {
          onesignal_id: id
        };
        const res = await loginService.oneSignal(data);
        return res;
      } catch (error) {
        console.error("Post OneSignal Id error:", error);
        throw error;
      }
    },
  },
});
