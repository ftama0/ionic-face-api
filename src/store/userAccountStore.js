// store/loginStore.js

import { defineStore } from "pinia";
import { userAccountService } from "@/services/apiService"; // Import loginService dari services
import { getDeviceInfo, isMobilePlatform } from "@/plugins/devicePlugin";
import { jwtDecode } from "jwt-decode";
// import { useLoginStore } from './loginStore';

export const userAccountStore = defineStore({
  id: "userAccount", // ID store

  state: () => ({
    totalPr: null,
    daftarPr: [],
    user: [],
    allUser: [],
  }),
  persist: {
    enabled: true,
  },
  actions: {
    async fetchAllUser() {
      try {
        const res = await userAccountService.fetchAllUser();
        this.allUser = res;
        console.log("data all user", this.allUser);
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async readUser(data) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await loginService.login(formData);
        this.token = res;
        const decode = jwtDecode(res.access_token);
        this.user = decode;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async createUser(data) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await loginService.login(formData);
        this.token = res;
        const decode = jwtDecode(res.access_token);
        this.user = decode;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async updateUser(data) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await loginService.login(formData);
        this.token = res;
        const decode = jwtDecode(res.access_token);
        this.user = decode;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    async deleteUser(data) {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        const res = await loginService.login(formData);
        this.token = res;
        const decode = jwtDecode(res.access_token);
        this.user = decode;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
  },
});
