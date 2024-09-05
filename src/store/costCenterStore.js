import { defineStore } from 'pinia';
import { costCenterService } from '@/services/apiService';
import { jwtDecode } from "jwt-decode";
import { formatDatetime } from "@/utils/datetimeUtils";


export const costCenterStore = defineStore({
    id: 'costCenter',

    state: () => ({
        dataList: [],
        dataDetails: [],
        dataClient: [],
        dataCompany: [],
        dataCostCenters: [],
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
        async costCenterDetail(uuid) {
            try {
                const res = await costCenterService.costCenterDetail(uuid);
                this.dataDetails = res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async createCostCenter(data) {
            try {
                const res = await costCenterService.createCostCenter(data.value);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async updateCostCenter(data) {
            try {
                const res = await costCenterService.updateCostCenter(data.value);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async deleteCostCenter(uuid) {
            try {
                const res = await costCenterService.deleteCostCenter(uuid);
                return res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async getClient() {
            try {
                const res = await costCenterService.getClient();
                this.dataClient = res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async getCompany(client_id) {
            try {
                const res = await costCenterService.getCompany(client_id);
                this.dataCompany = res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
        async getCostCenters(company_code, client_id) {
            try {
                const res = await costCenterService.getCostCenters(company_code, client_id);
                this.dataCostCenters = res;
            } catch (error) {
                console.error("Store error:", error);
                throw error;
            }
        },
    },
})