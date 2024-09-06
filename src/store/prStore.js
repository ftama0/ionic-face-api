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
        prList: [],
        prHeader: [],
        prItems: [],
        prStepApprovers: [],
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
        poHeaderFormatted: (state) => {
            const formattedHeader = {
                ...state.prHeader,
                total_price: formatRupiah(state.prHeader.total_price),
            };
            return formattedHeader;
        },
        prItemsFormatted: (state) => {
            const formattedHeader = state.prItems.map(item => ({
                ...item,
                rlwrt: formatRupiah(item.rlwrt),
                badat: formatDate(item.badat),
            }));
            return formattedHeader;
        },
    },
    actions: {
        async allPr(refresh, type = "", page = 1, limit = 5, search = "") {
            try {
                const serviceMethod = type === "user" ? prService.allPrList : prService.allPrApproval;
                let res = await serviceMethod(page, limit, search);
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
                this.prHeader = res.header;
                this.prItems = res.items;
                this.prStepApprovers = res.step_approver;
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
        async approvePr(id, status_type) {
            try {
                const res = await prService.approvePr(id, status_type);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
});
