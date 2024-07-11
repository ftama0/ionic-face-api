<template>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu Content</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">This is the menu content.</ion-content>
    </ion-menu>
    <ion-page id="main-content">
        <ion-header :translucent="true" class="ion-no-border ion-margin-bottom">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Approval System</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                <ion-card-content class="ion-text-center">
                    <ion-grid>
                        <ion-row>
                            <ion-col size="12">
                                <img src="@/assets/images/logo_Hasnur.png" class="ion-margin-top" alt="App Icon"
                                    width="140" height="120" />
                            </ion-col>
                            <ion-col size="12">
                                <h3>Selamat Datang</h3>
                                <h6>{{ vdata.fullname }}</h6>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="12">
                                <ion-button expand="block" color="primary" @click="handlePurchaseRequest"
                                    class="custom-button">
                                    <ion-icon class="custom-icon" :icon="icons.cartOutline"></ion-icon>
                                    <span class="button-text">Purchase Request</span>
                                    <ion-badge color="danger" class="badge-top-right">{{ totalPO }}</ion-badge>
                                </ion-button>
                            </ion-col>
                            <ion-col size="12">
                                <ion-button expand="block" color="secondary" @click="handlePurchaseOrder"
                                    class="custom-button">
                                    <ion-icon class="custom-icon" :icon="icons.basketOutline"></ion-icon>
                                    <span class="button-text">Purchase Order</span>
                                </ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </ion-content>
        <ion-footer class="ion-no-border ion-padding-bottom">
            <ion-toolbar>
                <ion-title class="ion-text-center">
                    <h6>Version 1.0.0</h6>
                </ion-title>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue';
import { cartOutline, basketOutline } from 'ionicons/icons';
import { useLoginStore } from '@/store/loginStore';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';

export default {
    name: 'Home',
    components: {},
    setup() {
        // data
        const icons = { cartOutline, basketOutline };
        const isLoading = ref(false);
        const loginStore = useLoginStore();
        const prStore = purchaseRequestStore();
        const { proxy } = getCurrentInstance()
        const router = useRouter();
        const vdata = ref({});
        const totalPO = ref(null);
        // api 
        const submitForm = async () => {
            try {
            } catch (error) {
                console.error('Login failed:', error);
                proxy.$toast('Username or password is wrong');
            }
            finally {
                isLoading.value = false;
            }
        }; const handlePurchaseRequest = async () => {
            try {
            } catch (error) {
            }
            finally {
                isLoading.value = false;
            }
        }; const handlePurchaseOrder = async () => {
            try {
            } catch (error) {
            }
            finally {
                isLoading.value = false;
            }
        }; const getPR = async () => {
            try {
                isLoading.value = true;
                const res = await prStore.jumlahPR(vdata.value.username);
                totalPO.value = res;
                console.log(res);
            } catch (error) {
            }
            finally {
                isLoading.value = false;
            }
        }; const logout = () => {
            loginStore.logout();
            router.push({ name: 'Login' });
        }; const initialize = async () => {
            if (loginStore.loadUser()) {
                vdata.value = loginStore.user;
            } else {
                router.push({ name: 'Login' });
            }
        };
        onMounted(async () => {
            await initialize();
            await getPR();
        });

        return {
            vdata,
            totalPO,
            icons,
            submitForm,
            isLoading,
            handlePurchaseRequest,
            handlePurchaseOrder,
            logout,
        };
    },
};
</script>

<style scoped>
/* ion-content {
--ion-background-color: #3FA2F6;
}

ion-footer {
--ion-background-color: #3FA2F6;
} */
.custom-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width: 150px;
    height: 100px; */
    border: 2px solid #ffffff;
    border-radius: 25px;
    background-color: transparent;
    color: #ffffff;
}

.custom-icon {
    font-size: 48px;
}

.button-text {
    margin-top: 10px;
    font-weight: bold;
}

.badge-top-right {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
}
</style>