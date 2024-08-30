import { defineStore } from 'pinia';
import { costCenterService } from '@/services/apiService';
import { jwtDecode } from "jwt-decode";
import { formatDatetime } from "@/utils/datetimeUtils";


export const costCenterStore = defineStore({
    id: 'costCenter',

    state: () => ({
        userList: [],
        costCenterList: [],
        userDetails: [],
    }),
    persist: {
        enabled: true,
    },
    actions: {
        async allUserCostCenter(page = 1, limit = 5, search = "", refresh) {
            try {
                const res = await costCenterService.allUserCostCenter(
                    page,
                    limit,
                    search
                );
                this.userList = refresh ? res.data : [...this.userList, ...res.data];
                this.userList.total = res.total;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
})