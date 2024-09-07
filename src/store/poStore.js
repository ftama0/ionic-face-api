// store/loginStore.js

import { defineStore } from "pinia";
import { poService } from "@/services/apiService";

const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
};

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const purchaseOrderStore = defineStore({
    id: "purchaseOrder", // ID store

    state: () => ({
        poList: [],
        poHeader: [],
        poItems: [],
        poStepApprovers: [],
    }),
    persist: {
        enabled: true,
    },
    getters: {
        poListFormatted: (state) => {
            const formattedList = state.poList.map(item => ({
                ...item,
                total_amount: formatRupiah(item.total_amount),
                release_date: formatDate(item.release_date),
                header: item.header.split(' ').length > 10 ? item.header.split(' ').slice(0, 5).join(' ') + '...' : item.header
            }));
            formattedList.total = state.poList.total;
            return formattedList;
        },
        poHeaderFormatted: (state) => {
            const formattedHeader = {
                ...state.poHeader,
                total_amount: formatRupiah(state.poHeader.total_amount),
            };
            return formattedHeader;
        },
        poItemsFormatted: (state) => {
            const formattedHeader = state.poItems.map(item => ({
                ...item,
                item_amount: formatRupiah(item.netwr),
                peinh: formatRupiah(item.peinh)
            }));
            return formattedHeader;
        },
    },
    actions: {
        async allPo(refresh, type = "", page = 1, limit = 5, search = "") {
            try {
                const serviceMethod = type === "user" ? poService.allPoList : poService.allPoApproval;
                let res = await serviceMethod(page, limit, search);
                this.poList = refresh ? res.data : [...this.poList, ...res.data];
                this.poList.total = res.total;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async readPo(id) {
            try {
                const res = await poService.readPo(id);
                this.poHeader = res.header;
                this.poItems = res.items;
                this.poStepApprovers = res.step_approvers;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async saveHeaderPo(item) {
            try {
                this.poHeader = item;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async approvePo(id, status_type) {
            try {
                const res = await poService.approvePo(id, status_type);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
});
