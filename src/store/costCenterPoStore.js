import { defineStore } from 'pinia';
import { costCenterPoService } from '@/services/apiService';



export const costCenterPoStore = defineStore({
    id: 'costCenterPo',

    state: () => ({
        totalCostCenterPo: null,
        listDataCostCenterPo: [],
        detailCostCenterPo: [],
    }),
    actions: {
        async fetchTotalCostCenterPo(prop) {
            try {
                const res = await costCenterPoService.fetchTotalCostCenterPo(prop);
                this.totalCostCenterPo = res;
            } catch (error) {
                console.error('error fetching data:', error);
                throw error;
            }
        },
        async fetchListCostCenterPo(prop) {
            try {
                const res = await costCenterPoService.fetchListCostCenterPo(prop);
                this.listDataCostCenterPo = res;
            } catch (error) {
                console.error('error fetching data:', error);
                throw error;
            }
        },
        async fetchDetailCostCenterPo(prop) {
            try {
                const res = await costCenterPoService.fetchDetailCostCenterPo(prop);
                this.detailCostCenterPo = res;
            } catch (error) {
                console.error('error fetching data:', error);
                throw error;
            }
        },
    }

})