// store/loginStore.js

import { defineStore } from 'pinia';
import { loginService, prService } from '@/services/apiService'; // Import  dari services
import { getDeviceInfo, isMobilePlatform } from '@/plugins/device';
import { storage, initStorage } from '@/store/storage';

export const useLoginStore = defineStore({
id: 'login', // ID store

state: () => ({
        user:  null,
        testing : 'hello testing'
    }),
actions: {
    async login(username, password) {
        await initStorage(); 
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            // Panggil services untuk melakukan login
            const res = await loginService.signInMobile(formData);
            await storage.set('user-login', JSON.stringify(res));
            this.user = res ;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    async autoLogin(data) {
        await initStorage(); 
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
                const res = await loginService.signInMobile(formData);
                await storage.set('user-login', JSON.stringify(res));
                this.commit('setUser', res);
                return true;
                } else {
                    await storage.clear();
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
    async logout() {
        await initStorage(); 
        await storage.remove('user-login');
        await storage.remove('user');
        this.$reset();
    }, 
    async loadUser() {
        await initStorage(); 
        const user = await storage.get('user-login');
        if (user) {
            let data = JSON.parse(user);
            this.user = data.profilku;
            return true;
        }else{
            return false
        }
    },
},
});
