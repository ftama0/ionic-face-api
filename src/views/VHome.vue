<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="home-content" v-bind="$attrs">
        <HeaderComponent :title="'Home'" />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-card class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                            <ion-card-content class="ion-text-center">
                                <ion-row class="center-content ">
                                    <ion-col size="6" class="ion-no-padding">
                                        <img src="@/assets/images/logo_Hasnur.png" alt="App Icon" width="80"
                                            height="auto" />
                                    </ion-col>
                                    <ion-col size="6" class="ion-no-padding">
                                        <h6>Welcome</h6>
                                        <h2 style="font-weight: bold;">{{ user.fullname }}</h2>
                                    </ion-col>
                                </ion-row>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" class="ion-no-padding">
                        <ion-text class="main-menu-title">Main Menu</ion-text>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding">
                        <ion-card class="ion-card">
                            <ion-card-content router-link="/purchaseRequestList">
                                <ion-icon class="custom-icon" :icon="icons.bagHandleOutline"></ion-icon>
                                <span class="button-text">Purchase Request List</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding">
                        <ion-card class="ion-card">
                            <ion-card-content>
                                <ion-icon class="custom-icon" :icon="icons.bagCheckOutline"></ion-icon>
                                <span class="button-text">Purchase Order List</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding">
                        <ion-card class="ion-card">
                            <ion-card-content>
                                <ion-icon class="custom-icon" :icon="icons.cartOutline"></ion-icon>
                                <span class="button-text">Approval Purchase Request</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding">
                        <ion-card class="ion-card">
                            <ion-card-content>
                                <ion-icon class="custom-icon" :icon="icons.basketOutline"></ion-icon>
                                <span class="button-text">Approval Purchase Order</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding">
                        <ion-card class="ion-card">
                            <ion-card-content router-link="/userManagement">
                                <ion-icon class="custom-icon" :icon="icons.peopleOutline"></ion-icon>
                                <span class="button-text">User Management</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>

            </ion-grid>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
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
const mainContentId = 'home-content';
// api 
const submitForm = async () => {
};
const handlePurchaseRequest = async () => {
    try {
    } catch (error) {
    }
    finally {
        isLoading.value = false;
    }
};
const handlePurchaseOrder = async () => {
    try {
    } catch (error) {
    }
    finally {
        isLoading.value = false;
    }
};
const fetchTotalPr = async () => {
    try {
        isLoading.value = true;
        await prStore.fetchTotalPr(user.value.username);
    } catch (error) {
    }
    finally {
        isLoading.value = false;
    }
};
const logout = () => {
    loginStore.logout();
    router.push({ name: 'Login' });
};
const initialize = async () => {
    const res = await loginStore.loadUser()
    // console.log(res);
    if (!res) {
        router.push({ name: 'Login' });
    }
};
// computed 
const totalPR = computed(() => prStore.totalPr);
const user = computed(() => loginStore.user);
onMounted(async () => {
    await initialize();
    // await fetchTotalPr();
    // proxy.$toast('Hello dare', 'danger');

});
</script>

<style scoped>
.custom-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    border-radius: 25px;
    background-color: transparent;
    color: #ffffff;
    position: relative;
    height: auto;
}

.custom-card-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.custom-icon {
    font-size: 32px;
    color: blue;
}

.button-text {
    display: block;
    font-weight: 500;
    margin-top: 5px;
    font-size: 14px;
}

.badge-top-right {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
}

.ion-center {
    text-align: center;
}

.ion-col {
    display: flex;
    flex: 1 1 auto;
    padding: 0;
    margin-top: 0;
}

.ion-card {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100px;
    max-height: 200px;
    width: 100%;
    border-radius: 15px;
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* Ensure the column takes up the full height of the row */
}

.main-menu-title {
    font-weight: 600;
    padding-left: 15px;
}
</style>