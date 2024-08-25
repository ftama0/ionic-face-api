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
    testing: "hello testing",
  }),
  actions: {
    async login(username, password) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await loginService.login(formData);
        console.log("res login", res);
        this.token = res;
        const decode = jwtDecode(res.access_token);
        // Convert exp (UTC) to WITA (UTC+8)
        const expUtc = new Date(decode.exp * 1000); // exp is in seconds, convert to milliseconds
        const expWita = new Date(expUtc.getTime() + 8 * 60 * 60 * 1000); // Add 8 hours

        this.user = {
          ...decode,
          exp_wita: expWita,
        };
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async session(data) {
      try {
        data = JSON.parse(data);
        const idMobile = data.profilku.id_mobile;
        const resCheckMobile = await loginService.checkIdMobile(data.username);
        return true;
      } catch (error) {
        console.error("Auto login error:", error);
        throw error;
      }
    },
    async logout() {
      // await storage.clear();
      localStorage.clear();
      this.$reset();
    },
  },
  // note : persist pinia
  persist: {
    enabled: true,
  },
});
