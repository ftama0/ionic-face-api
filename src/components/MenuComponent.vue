<template>
    <div v-if="showMenu">
        <ion-menu :content-id="contentId">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Menu Content</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-list>
                    <ion-menu-toggle>
                        <ion-item router-link="/home">
                            <ion-icon aria-hidden="true" slot="start" :icon="icons.homeOutline"></ion-icon>
                            <ion-label class="ion-padding">Home</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseRequestList">
                            <ion-icon aria-hidden="true" slot="start" :icon="icons.bagHandleOutline"></ion-icon>
                            <ion-label class="ion-padding">Purchase Request List</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseRequestList">
                            <ion-icon aria-hidden="true" slot="start" :icon="icons.bagCheckOutline"></ion-icon>
                            <ion-label class="ion-padding">Purchase Order List</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseRequestList">
                            <ion-icon aria-hidden="true" slot="start" :icon="icons.cartOutline"></ion-icon>
                            <ion-label class="ion-padding">Approval Purchase Request</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseRequestList">
                            <ion-icon aria-hidden="true" slot="start" :icon="icons.basketOutline"></ion-icon>
                            <ion-label class="ion-padding">Approval Purchase Order</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                </ion-list>
            </ion-content>
            <ion-footer class="ion-no-border" scroll-y="false">
                <ion-toolbar>
                    <ion-grid class="ion-text-center">
                        <ion-row>
                            <ion-col>
                                <ion-button color="danger" size="medium" @click="logout">
                                    Logout
                                    <ion-icon slot="end" :icon="icons.logOutOutline"></ion-icon>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="12">
                                <ion-label>Version 1.0</ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-toolbar>
            </ion-footer>
        </ion-menu>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, defineProps, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useLoginStore } from '@/store/loginStore';


const { proxy } = getCurrentInstance()
const router = useRouter();
const route = useRoute();
const loginStore = useLoginStore();
const icons = ref(proxy.$icons);
const props = defineProps({
    contentId: String,
});
const showMenu = computed(() => route.name !== 'Login');
const logout = () => {
    loginStore.logout();
    router.replace({ name: 'Login' });
};
</script>

<style scoped>
ion-menu::part(backdrop) {
    background-color: rgba(0, 187, 255, 0.5);
}

ion-menu::part(container) {
    border-radius: 0 20px 20px 0;
    box-shadow: 4px 0px 16px rgba(0, 225, 255, 0.18);
}

ion-icon {
    --ionicon-stroke-width: 36px;
}
</style>