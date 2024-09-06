<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="home-content" v-bind="$attrs">
        <HeaderComponent :title="'Home'" />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-card ref="userCard" class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                            <ion-card-content class="ion-text-center">
                                <ion-row class="center-content ">
                                    <ion-col size="6" class="ion-no-padding">
                                        <img src="@/assets/images/logo_Hasnur.png" alt="App Icon" width="80"
                                            height="auto" />
                                    </ion-col>
                                    <ion-col size="6" class="ion-no-padding">
                                        <h6>Welcome</h6>
                                        <h2 v-if="user" style="font-weight: bold;">{{ user.fullname }}</h2>
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
                    <ion-col size="6" class="ion-col ion-no-padding" v-if="user.role_id == 1 || user.role_id == 3">
                        <ion-card class="ion-card">
                            <ion-card-content
                                @click="$router.push({ name: 'PurchaseRequestList', params: { type: 'user' } })">
                                <ion-icon class="custom__icon1" :icon="icons.bagHandleOutline"></ion-icon>
                                <span class="button-text">Purchase Request List</span>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding" v-if="user.role_id == 1 || user.role_id == 3">
                        <ion-card class="ion-card">
                            <ion-card-content
                                @click="$router.push({ name: 'PurchaseOrderList', params: { type: 'user' } })">
                                <ion-icon class="custom__icon1" :icon="icons.bagCheckOutline"></ion-icon>
                                <span class="button-text">Purchase Order List</span>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding" v-if="user.role_id == 1 || user.role_id == 2">
                        <ion-card class="ion-card">
                            <ion-card-content
                                @click="$router.push({ name: 'PurchaseRequestList', params: { type: 'approval' } })">
                                <ion-icon class="custom__icon1" :icon="icons.cartOutline"></ion-icon>
                                <span class="button-text">Approval Purchase Request</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding" v-if="user.role_id == 1 || user.role_id == 2">
                        <ion-card class=" ion-card">
                            <ion-card-content
                                @click="$router.push({ name: 'PurchaseOrderList', params: { type: 'approval' } })">
                                <ion-icon class="custom__icon1" :icon="icons.basketOutline"></ion-icon>
                                <span class="button-text">Approval Purchase Order</span>
                                <ion-badge color="danger" class="badge-top-right">{{ totalPR }}</ion-badge>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                    <ion-col size="6" class="ion-col ion-no-padding" v-if="user.role_id == 1">
                        <ion-card class="ion-card">
                            <ion-card-content router-link="/userManagement">
                                <ion-icon class="custom__icon1" :icon="icons.peopleOutline"></ion-icon>
                                <span class="button-text">User Management</span>
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
import { ref, onMounted, getCurrentInstance, computed, onBeforeUnmount } from 'vue';
import { createGesture } from '@ionic/vue';
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
const userCard = ref(null);
// api 
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
// computed 
const totalPR = computed(() => prStore.totalPr);
const user = computed(() => loginStore.user);
console.log(user);
// Another Methods
const onMove = (detail) => {
    const { deltaX } = detail;
    if (deltaX > 0) {
        userCard.value.$el.style.transform = `translateX(${deltaX}px)`;
    }
};

const onEnd = (detail) => {
    const { deltaX } = detail;
    if (deltaX > 100) {
        userCard.value.$el.style.transition = 'transform 0.3s ease-out';
        userCard.value.$el.style.transform = 'translateX(100%)';
        setTimeout(() => {
            userCard.value.$el.style.display = 'none';
        }, 300);
    } else {
        userCard.value.$el.style.transition = 'transform 0.3s ease-out';
        userCard.value.$el.style.transform = 'translateX(0)';
    }
};
// const handleHardwareBackButton = (event) => {
//     event.detail.register(10, () => {
//         // Prevent default action (which would be navigating back)
//         // You can optionally show a confirmation dialog here
//     });
// };
onMounted(async () => {
    // await initialize();
    await fetchTotalPr();
    // proxy.$toast('Hello dare', 'danger');
    if (userCard.value) {
        // console.log('userCard', userCard.value)
        const gesture = createGesture({
            el: userCard.value.$el,
            gestureName: 'swipe-to-dismiss',
            onMove: (detail) => onMove(detail),
            onEnd: (detail) => onEnd(detail),
        });

        gesture.enable();

        // document.addEventListener('ionBackButton', handleHardwareBackButton);
    }
});
// onBeforeUnmount(() => {
//     // Remove the event listener when the component is unmounted
//     document.removeEventListener('ionBackButton', handleHardwareBackButton);
// });
</script>

<style scoped>
ion-card {
    position: relative;
    transition: transform 0.3s ease-out;
}

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

.button-text {
    display: block;
    font-weight: 500;
    margin-top: 5px;
    font-size: 14px;
}

.card-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.badge-top-right {
    position: absolute;
    top: 5px;
    right: 5px;
    /* transform: translate(50%, -50%); */
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