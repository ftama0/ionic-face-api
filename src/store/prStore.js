// store/loginStore.js

import { defineStore } from 'pinia';
import { prService } from '@/services/apiService'; // Import loginService dari services
import { getDeviceInfo, isMobilePlatform } from '@/plugins/devicePlugin';
// import { useLoginStore } from './loginStore';

export const purchaseRequestStore = defineStore({
id: 'purchaseRequest', // ID store

state: () => ({
        totalPr:  null,
        daftarPr:  [],
        detailPr:  [],
        parentPr:  [],
        daftarEss: [],
        listRc: [],
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
    async fetchDetailPr(id) {
        try {
            const res = await prService.fetchDetailPr(id);
            this.detailPr = res;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },  
    async saveParentPr(item) {
        try {
            this.parentPr = item;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },  
    async approvePr(username, id) {
        try {
            const res = await prService.approvePr(username, id);
            await this.fetchListPr(username);
            return res;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },  
    async rejectPr(username, id) {
        try {
            const res = await prService.rejectPr(username, id);
            await this.fetchListPr(username);
            return res;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
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
    async fetchUserEss(page, perPage, search = '') {
        try {
            const res = await prService.fetchUserEss(page, perPage, search);
            this.daftarEss = [...this.daftarEss, ...res.dataku];
            this.daftarEss.totalData = res.totalPage.total_records;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
},

});
