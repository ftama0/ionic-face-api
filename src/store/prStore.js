// store/loginStore.js

import { defineStore } from "pinia";
import { prService } from "@/services/apiService";

const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
};

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const purchaseRequestStore = defineStore({
    id: "purchaseRequest", // ID store

    state: () => ({
        prTotal: null,
        prList: [],
        prDetails: [],
        prHeader: [],
    }),
    persist: {
        enabled: true,
    },
    getters: {
        prListFormatted: (state) => {
            const formattedList = state.prList.map(item => {
                return {
                    ...item,
                    total_price: formatRupiah(item.total_price),
                    release_date: formatDate(item.release_date),
                    header: item.header.split(' ').length > 10 ? item.header.split(' ').slice(0, 5).join(' ') + '...' : item.header
                };
            });
            formattedList.total = state.prList.total;
            return formattedList;
        },
    },
    actions: {
        async allPr(refresh, page = 1, limit = 5, search = "") {
            try {
                const res = await prService.allPr(page, limit, search);
                this.prList = refresh ? res.data : [...this.prList, ...res.data];
                this.prList.total = res.total;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async readPr(id) {
            try {
                const res = await prService.readPr(id);
                this.prDetails = res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async saveHeaderPr(item) {
            try {
                this.prHeader = item;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async approvePr(username, id) {
            try {
                const res = await prService.approvePr(username, id);
                await this.fetchListPr(username);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async rejectPr(username, id) {
            try {
                const res = await prService.rejectPr(username, id);
                await this.fetchListPr(username);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
});
