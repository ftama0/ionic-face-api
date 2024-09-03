<template>
    <ion-page id="detail-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Approval Process</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-col size="12">
                <ion-row class="ion-padding">
                    <ion-col size="2"> <ion-icon class="custom-icon-cart"
                            :icon="icons.cartOutline"></ion-icon></ion-col>
                    <ion-col size="5">
                        <div class="row">
                            <ion-col size="12">
                                <ion-label class="ion-card-title">{{ header.po_no }}</ion-label>
                            </ion-col>
                        </div>
                        <ion-row>
                            <ion-col size="6">
                                <ion-label class="ion-card-label">{{ header.total_item }} Item</ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                    <ion-col size="5">
                        <ChipComponent :color="header.full_release_status == true ? 'success' : 'danger'"
                            :width="'100px'">
                            {{ header.full_release_status == true ? 'Active' : 'To Approve' }}
                        </ChipComponent>
                    </ion-col>
                    <ion-col size="12">
                        <ion-row>
                            <ion-col size="2">
                            </ion-col>
                            <ion-col size="10">
                                <ion-label class="ion-card-label">Total Amount</ion-label>
                            </ion-col>
                            <ion-col size="2">
                            </ion-col>
                            <ion-col size="6">
                                <ion-label class="ion-card-amount">{{ header.total_amount }}</ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>
            </ion-col>
            <ion-list>
                <ion-list-header>
                    <ion-label class="ion-list-header">Details</ion-label>
                </ion-list-header>
                <ion-item>
                    <ion-label>
                        <h6>Header Note</h6>
                        <p>{{ header.header }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PO Type</h6>
                        <p>{{ header.po_type }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Vendor</h6>
                        <p>{{ header.vendor }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Purchasing Group</h6>
                        <p>Belum Ada</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PO Creator</h6>
                        <p>Belum Ada</p>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-item>
                    <ion-label>
                        <h6>Approval Process</h6>
                    </ion-label>
                </ion-item>
                <ion-item v-for="(step, index) in approvalSteps" :key="index">
                    <ion-label>
                        <div class="progress-step">
                            <div class="circle">{{ index + 1 }}</div>
                            <div class="label">{{ step.name }}</div>
                            <div class="status">{{ step.status }}</div>
                        </div>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-list-header>
                    <ion-label class="ion-list-header-item">Purchase Request Item</ion-label>
                </ion-list-header>
                <ion-grid class="ion-padding">
                    <template v-for="(item, index) in details" :key="index">
                        <ion-row>
                            <ion-col size="6">
                                <h6 class="ion-title-item">{{ item.txz01 }}</h6>
                            </ion-col>
                            <ion-col size="6" class="ion-text-end">
                                <h6><ion-text class="ion-amount-item">{{ item.peinh }} x {{ item.menge }}</ion-text>
                                </h6>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4">
                                Quantity
                            </ion-col>
                            <ion-col size="8">
                                {{ item.menge }} {{ item.meins }}
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4">
                                Price
                            </ion-col>
                            <ion-col size="8">
                                {{ item.peinh }}
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col>
                                <hr style="border-top: 1px solid #ccc; margin: 10px 0;">
                            </ion-col>
                        </ion-row>
                    </template>
                    <ion-row>
                        <ion-col size="6">
                            <h6 class="ion-title-item">Grand Total</h6>
                        </ion-col>
                        <ion-col size="6" class="ion-text-end">
                            <h6><ion-text class="ion-amount-item" slot="end">{{ header.total_amount }}</ion-text></h6>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-list>


        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { purchaseOrderStore } from '@/store/poStore';
import ChipComponent from '@/components/ChipComponent.vue';

// data
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const poStore = purchaseOrderStore();

const header = computed(() => poStore.poHeader);
const details = computed(() => poStore.poDetails);

const approvalSteps = ref([
    { name: header.value.apv1_name || null, status: header.value.apv1_status || null },
    { name: header.value.apv2_name || null, status: header.value.apv2_status || null },
    { name: header.value.apv3_name || null, status: header.value.apv3_status || null },
    { name: header.value.apv4_name || null, status: header.value.apv4_status || null },
    { name: header.value.apv5_name || null, status: header.value.apv5_status || null },
    { name: header.value.apv6_name || null, status: header.value.apv6_status || null },
    { name: header.value.apv7_name || null, status: header.value.apv7_status || null },
    { name: header.value.apv8_name || null, status: header.value.apv8_status || null }
]);

onMounted(async () => {
    console.log(header.value)
});
</script>

<style scoped>
.progress-step {
    display: flex;
    align-items: center;
}

.circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #3880ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}

.label {
    font-size: 14px;
}

.custom-icon-cart {
    color: #0070F2;
    font-size: 32px;
    background-color: #CFE5FF;
    border-radius: 50%;
    padding: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.custom-icon {
    color: #0070F2;
    font-size: 24px;
}

.ion-card-amount {
    font-size: 17px;
    line-height: 18px;
    font-weight: bold;
    color: #626060;
}

.ion-card-label {
    font-size: 17px;
    line-height: 18px;
    font-weight: 400;
    color: #626060;
}

.ion-card-title {
    font-size: 20px;
    line-height: 18px;
    font-weight: 600;
    color: #0070F2;
}

.ion-list-header {
    font-size: 20px;
    line-height: 18px;
    font-weight: 600;
    color: #626060;
}

.ion-list-header-item {
    font-size: 20px;
    line-height: 18px;
    font-weight: 600;
    color: #0070F2;
}

.ion-amount-item {
    color: #0070F2;
    font-weight: bold;
}

.ion-title-item {
    line-height: 18px;
    font-weight: 600;
    color: #626060;
}
</style>