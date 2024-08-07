// store/loginStore.js

import { defineStore } from 'pinia';
import { loginService } from '@/services/apiService'; 
import { prService } from '@/services/apiService'; 
import { getDeviceInfo, isMobilePlatform } from '@/plugins/devicePlugin';

export const purchaseOrderStore = defineStore({
id: 'purchaseOrder', // ID store

state: () => ({
        user:  null,
        testing : 'hello testing',
        listRc: [],
    }),
actions: {
    async fetchReleaseCode() {
        try {
            const res = await prService.fetchReleaseCode();
            this.listRc = res.filter(code => code.FRGGR === 'OH');
            console.log(this.listRc);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },  
},
});
