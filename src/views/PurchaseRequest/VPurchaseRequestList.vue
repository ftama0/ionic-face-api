<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="pr-content" v-bind="$attrs">
        <HeaderComponent :title="'Purchase Request List'" />
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-searchbar placeholder="Search PR Number"></ion-searchbar>
                    </ion-col>
                    <ion-col size="12">
                        <ion-card class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                            <ion-card-header>
                                <ion-card-title>12345678</ion-card-title>
                            </ion-card-header>
                            <ion-card-content class="ion-text-left">
                                <div>
                                    <ion-text>Purchase Request List</ion-text>
                                </div>
                                <div>
                                    <ion-text>13 Item</ion-text>
                                </div>
                                <div>
                                    <ion-text>17 Juli 2024</ion-text>
                                </div>
                                <div>
                                    <ion-text>Rp. 9000.0000</ion-text>
                                </div>
                            </ion-card-content>
                            <ion-button fill="clear">Approve</ion-button>
                            <ion-button fill="clear">Reject</ion-button>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';

// data
const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const prStore = purchaseRequestStore();
const router = useRouter();
const vdata = ref({});
const totalPO = ref(null);
const mainContentId = 'pr-content';
// api 
const initialize = async () => {
    if (loginStore.loadUser()) {
        vdata.value = loginStore.user;
    } else {
        router.push({ name: 'Login' });
    }
};
onMounted(async () => {

});

</script>

<style scoped></style>