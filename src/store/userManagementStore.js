// store/loginStore.js

import { defineStore } from 'pinia';
import { prService } from '@/services/apiService'; // Import loginService dari services
import { getDeviceInfo, isMobilePlatform } from '@/plugins/device';
// import { useLoginStore } from './loginStore';

export const userManagementStore = defineStore({
id: 'userManagement', // ID store

state: () => ({
        totalPr:  null,
        daftarPr:  [],
        user:  [],
    }),
actions: {
    async fetchTotalPr(username) {
        try {
            const res = await prService.fetchTotalPr(username);
            this.totalPr = res;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    async saveUserAccount(data) {
        try {
            this.user = data;
            console.log('data user Account', this.user)
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },  
},
});
