<template>
    <ion-page id="detail-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-row class="ion-padding">
                <ion-col size="2"> <ion-icon class="custom-icon-cart" :icon="icons.cartOutline"></ion-icon></ion-col>
                <ion-col size="6">
                    <div class="row">
                        <ion-col size="12">
                            <ion-label class="ion-card-title">{{ header.pr_no }}</ion-label>
                        </ion-col>
                    </div>
                    <ion-row>
                        <ion-col size="6">
                            <ion-label class="ion-card-label">{{ header.total_item }} Item</ion-label>
                        </ion-col>
                    </ion-row>
                </ion-col>
                <ion-col size="4" class="ion-text-center ion-align-self-center">
                    <ChipComponent :color="header.full_release_status == 'To Approve' ? 'warning'
                        : header.full_release_status == 'Approved' ? 'success' : 'danger'" :width="'100px'">
                        {{ header.full_release_status == 'To Approve' ? 'To Approve'
                            : header.full_release_status == 'Approved' ? 'Approved' : 'Reject' }}
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
                            <ion-label class="ion-card-amount">{{ header.total_price }}</ion-label>
                        </ion-col>
                    </ion-row>
                </ion-col>
            </ion-row>
            <hr style="border-top: 1px solid #ccc; margin: 10px 0; width: 90%; margin-left: auto; margin-right: auto;">
            <ion-list>
                <ion-list-header>
                    <ion-label class="ion-list-header">Details</ion-label>
                </ion-list-header>
                <ion-item>
                    <ion-label>
                        <h6>Header Note</h6>
                        <p>{{ header.header ?? '-' }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PR Type</h6>
                        <p>{{ header.pr_type ?? '-' }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Purchasing Group</h6>
                        <p>{{ header.pr_group ?? '-' }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PR Creator</h6>
                        <p>{{ header.pr_creator ?? '-' }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Created Date</h6>
                        <p>{{ header.pr_date ?? '-' }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Created In</h6>
                        <p>SAP Client {{ header.client ?? '-' }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Plant</h6>
                        <p>{{ header.pr_plant ?? '-' }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-list-header>
                    <ion-label class="ion-list-header">Approval Process</ion-label>
                </ion-list-header>
                <ion-item v-for="(item, index) in stepApprovers" :key="index">
                    <ion-label>
                        <div class="progress-step">
                            <div class="circle">{{ index + 1 }}</div>
                            <div class="label">{{ item.name }}</div>
                            <div class="status" style="margin-left: auto;">
                                <ChipComponent :color="item.status === 'To Approve' ? 'warning' :
                                    item.status === 'Approved' ? 'success' : 'danger'" :width="'100px'">
                                    {{ item.status === 'To Approve' ? 'To Approve' :
                                        item.status === 'Approved' ? 'Approved' : 'Reject' }}
                                </ChipComponent>
                            </div>
                        </div>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list>
                <ion-list-header>
                    <ion-label class="ion-list-header-item">Purchase Request Item</ion-label>
                </ion-list-header>
                <ion-grid class="ion-padding">
                    <template v-for="(item, index) in items" :key="index">
                        <ion-row>
                            <ion-col size="6">
                                <h6 class="ion-title-item">{{ item.txz01 }}</h6>
                            </ion-col>
                            <ion-col size="6" class="ion-text-end">
                                <h6><ion-text class="ion-amount-item">{{ item.rlwrt }}</ion-text>
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
                                {{ item.rlwrt }}
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
                            <h6><ion-text class="ion-amount-item" slot="end">{{ header.total_price }}</ion-text></h6>
                        </ion-col>
                    </ion-row>
                    <ion-row v-if="props.typeMenu == 'approval'">
                        <ion-col size="12">
                            <ButtonComponent expand="block" shape="round" :class="approveButton"
                                @action-click="showAlert('approve')">
                                Approve
                            </ButtonComponent>
                        </ion-col>
                        <ion-col size="12">
                            <ButtonComponent expand="block" shape="round" :class="rejectButton"
                                @action-click="showAlert('reject')">
                                Reject
                            </ButtonComponent>
                        </ion-col>
                        <AlertComponent :is-open="isAlertOpen" :header="alertHeader" :current-action="currentAction"
                            @dismiss="handleAlertDismiss" />
                    </ion-row>
                </ion-grid>
            </ion-list>
        </ion-content>
        <LoadingComponent :isOpen="loading" :message="'Loading...'" />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';
import ChipComponent from '@/components/ChipComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import ModalReject from '@/components/ModalRejectComponent.vue';
import { modalController } from '@ionic/vue';

const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const prStore = purchaseRequestStore();

const header = computed(() => prStore.poHeaderFormatted);
const items = computed(() => prStore.prItemsFormatted);
const stepApprovers = computed(() => prStore.prStepApprovers);
const loading = ref(false);
const approveButton = ref('approve-buttons');
const rejectButton = ref('reject-buttons');
const router = useRouter();

const props = defineProps({
    typeMenu: {
        type: String,
        required: true
    }
});

const isAlertOpen = ref(false);
const alertHeader = ref('');
const currentAction = ref('');

const showAlert = async (action) => {
    alertHeader.value = action === 'approve'
        ? 'Are you Sure Want to Approve this document ?'
        : 'Are you Sure Want to Reject this document ?';
    isAlertOpen.value = true;
    currentAction.value = action;
};

const handleAlertDismiss = (detail) => {
    isAlertOpen.value = false;
    if (detail.role === 'confirm') {
        submitButton(detail.action);
    }
};

const openModal = async (action) => {
    const modal = await modalController.create({
        component: ModalReject,
        componentProps: { action },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log('data', data);
    console.log('role', role);
    if (role === 'confirm' && data) {
        submitData(currentAction.value, data);
        proxy.$toast('Purchase Request Rejected', 'success');
    }
};

const submitButton = async (action) => {
    loading.value = true;
    try {
        if (action === 'approve') {
            submitData(action);
        } else if (action === 'reject') {
            // openModal(action)
            submitData(action);
        }
    } catch (error) {
        console.error(`Error ${action}:`, error);
    } finally {
        loading.value = false;
    }
};
const submitData = async (action, data = null) => {
    loading.value = true;
    try {
        const res = await prStore.approvePr(header.value.pr_no, action);
        if (action === 'approve') {
            proxy.$toast(res.message, 'success');
        } else if (action === 'reject') {
            proxy.$toast(res.message, 'danger');
        }
        await prStore.allPr(true, props.typeMenu);
        router.replace({ name: 'PurchaseRequestList', params: { type: props.typeMenu } });
    } catch (error) {
        console.error(`Error ${action}:`, error);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    console.log(header.value)
    console.log(stepApprovers.value)
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
    font-size: 20px;
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