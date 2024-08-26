import { defineStore } from 'pinia';
import { costCenterPrService } from '@/services/apiService';



export const costCenterPrStore = defineStore({
    id: 'costCenterPr',

    state: () => ({
        totalCostCenterPr: null,
        listDataCostCenterPr: [],
        detailCostCenterPr: [],
    }),
    actions: {
        async fetchTotalCostCenterPr(prop) {
            try {
                const res = await costCenterPrService.fetchTotalCostCenterPr(prop);
                this.totalCostCenterPr = res;
            } catch (error) {
                console.error('error fetching data:', error);
                throw error;
            }
        },
        async fetchListCostCenterPr(prop) {
            try {
                const res = await costCenterPrService.fetchListCostCenterPr(prop);
                this.listDataCostCenterPr = res;
            } catch (error) {
                console.error('error fetching data:', error);
                throw error;
            }
        },
        async fetchDetailCostCenterPr(prop) {
            try {
                const res = await costCenterPrService.fetchDetailCostCenterPr(prop);
                this.detailCostCenterPr = res;
            } catch (error) {
                console.error('error fetching data:', error);
                throw error;
            }
        },
    }

})