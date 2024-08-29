<template>
    <div v-if="showMenu">
        <ion-menu :content-id="contentId">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Content Menu</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list>
                    <ion-menu-toggle>
                        <ion-item router-link="/home" @click="isDropdownOpen = false">
                            <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                :icon="icons.homeOutline"></ion-icon>
                            <ion-label class="ion-padding">Home</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseRequestList" @click="isDropdownOpen = false">
                            <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                :icon="icons.bagHandleOutline"></ion-icon>
                            <ion-label class="ion-padding">Purchase Request List</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseOrderList" @click="isDropdownOpen = false">
                            <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                :icon="icons.bagCheckOutline"></ion-icon>
                            <ion-label class="ion-padding">Purchase Order List</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseRequestApproval" @click="isDropdownOpen = false">
                            <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                :icon="icons.cartOutline"></ion-icon>
                            <ion-label class="ion-padding">Approval Purchase Request</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-menu-toggle>
                        <ion-item router-link="/purchaseOrderApproval" @click="isDropdownOpen = false">
                            <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                :icon="icons.basketOutline"></ion-icon>
                            <ion-label class="ion-padding">Approval Purchase Order</ion-label>
                        </ion-item>
                    </ion-menu-toggle>
                    <ion-item lines="none" button @click="toggleDropdown">
                        <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                            :icon="icons.peopleOutline"></ion-icon>
                        <ion-label class="ion-padding">User Management</ion-label>
                        <ion-icon slot="end" :icon="dropdownIcon"></ion-icon>
                    </ion-item>
                    <ion-list v-if="isDropdownOpen" class="ion-padding-start">
                        <ion-menu-toggle>
                            <ion-item router-link="/userAccount" @click="isDropdownOpen = false">
                                <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                    :icon="icons.peopleOutline"></ion-icon>
                                <ion-label class="ion-padding">User Account</ion-label>
                            </ion-item>
                        </ion-menu-toggle>
                        <ion-menu-toggle>
                            <ion-item router-link="/userReleasePR" @click="isDropdownOpen = false">
                                <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                    :icon="icons.idCardOutline"></ion-icon>
                                <ion-label class="ion-padding">User Release PR</ion-label>
                            </ion-item>
                        </ion-menu-toggle>
                        <ion-menu-toggle>
                            <ion-item router-link="/userReleasePo" @click="isDropdownOpen = false">
                                <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                    :icon="icons.idCardOutline"></ion-icon>
                                <ion-label class="ion-padding">User Release PO</ion-label>
                            </ion-item>
                        </ion-menu-toggle>
                        <ion-menu-toggle>
                            <ion-item router-link="/costCenterPr" @click="isDropdownOpen = false">
                                <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                    :icon="icons.idCardOutline"></ion-icon>
                                <ion-label class="ion-padding">Maintain Cost Center PR</ion-label>
                            </ion-item>
                        </ion-menu-toggle>
                        <ion-menu-toggle>
                            <ion-item router-link="/costCenterPo" @click="isDropdownOpen = false">
                                <ion-icon aria-hidden="true" class="custom-icon" slot="start"
                                    :icon="icons.idCardOutline"></ion-icon>
                                <ion-label class="ion-padding">Maintain Cost Center PO</ion-label>
                            </ion-item>
                        </ion-menu-toggle>
                    </ion-list>
                </ion-list>
            </ion-content>
            <ion-footer scroll-y="false">
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
                                <ion-label>
                                    <p>Version: {{ appVersion }}</p>
                                </ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-toolbar>
            </ion-footer>
        </ion-menu>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed, onMounted } from 'vue';
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
const appVersion = ref('');
const isDropdownOpen = ref(false);

const getCurrentVersion = async () => {
    appVersion.value = await proxy.$appUpdate.getCurrentAppVersion();
};
// methods 
const dropdownIcon = computed(() => {
    return isDropdownOpen.value ? icons.chevronUp : icons.chevronDown;
});

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};
onMounted(() => {
    getCurrentVersion();
});
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

.custom-icon {
    color: #0070F2;
}
</style>