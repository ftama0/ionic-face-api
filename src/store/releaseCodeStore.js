import { defineStore } from "pinia";
import { releaseCodeService } from "@/services/apiService"; // Import releaseCodeService dari services
import { jwtDecode } from "jwt-decode";
import { formatDatetime } from "@/utils/datetimeUtils";
// import { useLoginStore } from './loginStore';

export const releaseCodeStore = defineStore({
  id: "releaseCode", // ID store

  state: () => ({
    userList: [],
    releaseCodeList: [],
    userDetails: [],
  }),
  persist: {
    enabled: true,
  },
  // getters: {
  //   formattedCreatedAt: (state) => formatDatetime(state.userDetails.created_at),
  //   formattedUpdateAt: (state) => formatDatetime(state.userDetails.updated_at),
  //   formattedLastLogin: (state) => formatDatetime(state.userDetails.last_login),
  // },
  actions: {
    async allUserReleaseCode(type, page = 1, limit = 5, search = "", refresh) {
      try {
        const res = await releaseCodeService.allUserReleaseCode(
          type,
          page,
          limit,
          search
        );
        this.userList = refresh ? res.data : [...this.userList, ...res.data];
        this.userList.total = res.total;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async readReleaseCode(type) {
      try {
        const res = await releaseCodeService.readReleaseCode(type);
        this.releaseCodeList = res.data;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async readUserReleaseCode(uuid) {
      try {
        const res = await releaseCodeService.readUserReleaseCode(uuid);
        this.userDetails = res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async createUserReleaseCode(data) {
      try {
        console.log("1", data.value);
        const res = await releaseCodeService.createUserReleaseCode(data.value);
        return res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async updateUserReleaseCode(data) {
      try {
        console.log("2", data.value);
        const res = await releaseCodeService.updateUserReleaseCode(data.value);
        return res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
    async deleteUserReleaseCode(uuid) {
      try {
        const res = await releaseCodeService.deleteUserReleaseCode(uuid);
        return res;
      } catch (error) {
        console.error("Store error:", error);
        throw error;
      }
    },
  },
});
