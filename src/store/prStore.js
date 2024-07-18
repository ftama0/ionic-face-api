// store/loginStore.js

import { defineStore } from 'pinia';
import { prService } from '@/services/apiService'; // Import loginService dari services
import { getDeviceInfo, isMobilePlatform } from '@/plugins/device';

export const purchaseRequestStore = defineStore({
id: 'purchaseRequest', // ID store

state: () => ({
        totalPr:  null,
        daftarPr:  [],
        daftarEss: [],
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
    async fetchListPr(username) {
        try {
            const res = await prService.fetchListPr(username);
            this.daftarPr = res;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },  
    async fetchUserEss(page, perPage, search = '') {
        try {
            const res = await prService.fetchUserEss(page, perPage, search);
            this.daftarEss = [...this.daftarEss, ...res.dataku];
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
},
});
