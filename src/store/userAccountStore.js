// store/loginStore.js

import { defineStore } from "pinia";
import { userAccountService } from "@/services/apiService"; // Import userAccountService dari services
import { getDeviceInfo, isMobilePlatform } from "@/plugins/devicePlugin";
import { jwtDecode } from "jwt-decode";
import { formatDatetime } from "@/utils/datetimeUtils";
// import { useLoginStore } from './loginStore';

export const userAccountStore = defineStore({
  id: "userAccount", // ID store

  state: () => ({
    userList: [],
    userDetails: [],
  }),
  persist: {
    enabled: true,
  },
  getters: {
    formattedCreatedAt: (state) => formatDatetime(state.userDetails.created_at),
    formattedUpdateAt: (state) => formatDatetime(state.userDetails.updated_at),
    formattedLastLogin: (state) => formatDatetime(state.userDetails.last_login),
  },
  actions: {
    async fetchAllUser() {
      try {
        const res = await userAccountService.fetchAllUser();
        this.userList = res;
        console.log("data all user", this.userList);
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async readUser(uuid) {
      try {
        const res = await userAccountService.readUser(uuid);
        this.userDetails = res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async createUser(data) {
      try {
        const res = await userAccountService.createUser(data.value);
        return res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async updateUser(data) {
      try {
        const res = await userAccountService.updateUser(data.value);
        return res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async deleteUser(uuid) {
      try {
        const res = await userAccountService.deleteUser(uuid);
        return res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
  },
});
