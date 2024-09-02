// store/loginStore.js

import { defineStore } from "pinia";
import { prService } from "@/services/apiService";

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
                    total_price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.total_price)
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
