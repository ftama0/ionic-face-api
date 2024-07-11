// store/loginStore.js

import { defineStore } from 'pinia';
import { prService } from '@/services/apiService'; // Import loginService dari services
import { getDeviceInfo, isMobilePlatform } from '@/plugins/device';

export const purchaseRequestStore = defineStore({
id: 'purchaseRequest', // ID store

state: () => ({
        jumlahPR:  null,
    }),
actions: {
    async jumlahPR(username) {
        try {
            const res = await prService.totalPR(username);
            this.jumlahPR = res;
            return this.jumlahPR;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
},
});
