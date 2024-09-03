import { defineStore } from "pinia";
import { userAccountService } from "@/services/apiService"; // Import userAccountService dari services
import { formatDatetime } from "@/utils/datetimeUtils";

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
    async allUser(refresh, page = 1, limit = 5, search = "") {
      try {
        const res = await userAccountService.allUser(page, limit, search);
        this.userList = refresh ? res.data : [...this.userList, ...res.data];
        this.userList.total = res.total;
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
