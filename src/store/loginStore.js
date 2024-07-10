// store/loginStore.js

import { defineStore } from 'pinia';
import { loginService } from '@/services/apiService'; // Import loginService dari services
import { getDeviceInfo, isMobilePlatform } from '@/plugins/device';

export const useLoginStore = defineStore({
  id: 'login', // ID store
    state: () => ({
    user: null,
    }),
mutations: {
    setUser(state, user) {
        state.user = user;
    },
},
actions: {
    async login(username, password) {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            // Panggil loginService untuk melakukan login
            const resSignIn = await loginService.signInMobile(formData);
            localStorage.setItem('user-login', JSON.stringify(resSignIn));

            return resSignIn; // Mengembalikan data dari respons jika perlu
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async autoLogin(data) {
        try {
            const isMobile = await isMobilePlatform();
            // Proceed only if the platform is not web
            if (isMobile) {
                data = JSON.parse(data);
                const idMobile = data.profilku.id_mobile;

                // Memeriksa ID mobile dengan loginService
                const resCheckMobile = await loginService.checkIdMobile(data.username);
                const mobileId = resCheckMobile.id_mobile;

                const formData = new FormData();
                formData.append('username', data.username);
                formData.append('password', data.password);
                formData.append('id_mobile', idMobile);

                if (mobileId === idMobile) {
                  // Melakukan login jika ID mobile sesuai
                const resSignIn = await loginService.signInMobile(formData);
                localStorage.setItem('user-login', JSON.stringify(resSignIn));
                this.commit('setUser', resSignIn);
                return true;
                } else {
                    localStorage.clear();
                    throw new Error('Mobile ID mismatch. Please Login Again');
                }
            } else {
                console.log('Running on web, skipping mobile ID check.');
              // Optionally, handle the web scenario here
            }
        } catch (error) {
            console.error('Auto login error:', error);
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('user-login');
        localStorage.removeItem('user');
        this.user = null; // Menghapus data pengguna dari state saat logout
    },
},
});
