// store/loginStore.js

import { defineStore } from "pinia";
import { masterData } from "@/services/apiService";

export const masterDataStore = defineStore({
    id: "masterData", // ID store

    state: () => ({
        mdCompany: [],
        mdPlant: [],
    }),
    persist: {
        enabled: true,
    },
    getters: {
    },
    actions: {
        async readCompany() {
            try {
                const res = await masterData.readCompany();
                this.mdCompany = res.data;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async readPlant() {
            try {
                const res = await masterData.readPlant();
                this.mdPlant = res.data;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
});
