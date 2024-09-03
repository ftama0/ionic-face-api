import { defineStore } from 'pinia';
import { costCenterService } from '@/services/apiService';
import { jwtDecode } from "jwt-decode";
import { formatDatetime } from "@/utils/datetimeUtils";


export const costCenterStore = defineStore({
    id: 'costCenter',

    state: () => ({
        dataList: [],
        costCenterList: [],
        dataDetails: [],
    }),
    persist: {
        enabled: true,
    },
    actions: {
        async allDataCostCenter(page = 1, limit = 5, search = "", refresh) {
            try {
                const res = await costCenterService.allDataCostCenter(
                    page,
                    limit,
                    search
                );
                this.dataList = refresh ? res.data : [...this.dataList, ...res.data];
                this.dataList.total = res.total;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
})