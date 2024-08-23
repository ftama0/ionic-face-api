// store/loginStore.js

import { defineStore } from "pinia";
import { loginService, tokenService } from "@/services/apiService"; // Import  dari services
import { getDeviceInfo, isMobilePlatform } from "@/plugins/devicePlugin";
import { storage } from "@/store/storage";
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
        this.token = res;
        const decode = jwtDecode(res.access_token);
        this.user = decode;
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
      await storage.clear();
      this.$reset();
    },
    async loadUser() {
      const user = await storage.get("user-login");
      if (user) {
        let data = JSON.parse(user);
        this.user = data.profilku;
        return true;
      } else {
        return false;
      }
    },
    // async session(data) {
    //     try {
    //         const isMobile = await isMobilePlatform();
    //         // Proceed only if the platform is not web
    //         if (isMobile) {
    //             data = JSON.parse(data);
    //             const idMobile = data.profilku.id_mobile;

    //             // Memeriksa ID mobile dengan loginService
    //             const resCheckMobile = await loginService.checkIdMobile(data.username);
    //             const mobileId = resCheckMobile.id_mobile;

    //             const formData = new FormData();
    //             formData.append('username', data.username);
    //             formData.append('password', data.password);
    //             formData.append('id_mobile', idMobile);

    //             if (mobileId === idMobile) {
    //               // Melakukan login jika ID mobile sesuai
    //             const res = await loginService.login(formData);
    //             await storage.set('user-login', JSON.stringify(res));
    //             this.commit('setUser', res);
    //             return true;
    //             } else {
    //                 await storage.clear();
    //                 throw new Error('Mobile ID mismatch. Please Login Again');
    //             }
    //         } else {
    //             console.log('Running on web, skipping mobile ID check.');
    //           // Optionally, handle the web scenario here
    //         }
    //     } catch (error) {
    //         console.error('Auto login error:', error);
    //         throw error;
    //     }
    // },
  },
  // note : persist pinia
  persist: {
    enabled: true,
  },
});
