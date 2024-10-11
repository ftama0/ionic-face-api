// store/loginStore.js

import { defineStore } from "pinia";
import { notificationService } from "@/services/apiService";
const formatDateTime = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export const notificationStore = defineStore({
    id: "notification", // ID store

    state: () => ({
        notificationList: [],
    }),
    persist: {
        enabled: true,
    },
    getters: {
        notificationListFormatted: (state) => {
            const formattedList = state.notificationList.map(item => ({
                ...item,
                created_at: formatDateTime(item.created_at),
            }));
            formattedList.total = state.notificationList.total;
            return formattedList;
        },
    },
    actions: {
        async allNotification(refresh, page = 1, limit = 5) {
            try {
                const res = await notificationService.allNotification(page, limit);
                this.notificationList = refresh ? res.data : [...this.notificationList, ...res.data];
                this.notificationList.total = res.total;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async readNotification(id) {
            try {
                const res = await notificationService.readNotification(id);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
});
