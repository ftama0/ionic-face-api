<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="userAccount-content" v-bind="$attrs">
        <HeaderComponent :title="'User Account'" />
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-searchbar v-model="search" placeholder="Search User"
                            @ionInput="handleSearch"></ion-searchbar>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12" class="ion-padding">
                        <ion-select aria-label="status" label="Status select" label-placement="floating"
                            placeholder="Status" fill="outline" v-model="selectedStatus">
                            <ion-icon slot="start" :icon="icons.filterOutline" aria-hidden="true"></ion-icon>
                            <ion-select-option value="true">Active</ion-select-option>
                            <ion-select-option value="false">Non Active</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <div v-for="(item, index) in filteredData" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3" style="border-radius: 15px;">
                                <ion-card-header>
                                    <ion-row class="ion-align-items-center">
                                        <ion-col size="6" class="ion-text-left">
                                            <ion-text class="ion-card-title">{{ item.username }}</ion-text>
                                        </ion-col>
                                        <ion-col size="6" class="ion-text-right">
                                            <ChipComponent :color="item.status === 'Active' ? 'success' : 'danger'">
                                                {{ item.status }}
                                            </ChipComponent>
                                        </ion-col>
                                    </ion-row>
                                </ion-card-header>
                                <ion-card-content>
                                    <ion-row>
                                        <ion-col size="6" class="ion-text-left">
                                            <ButtonActionComponent :icon="icons.openOutline" :item="item"
                                                :class="actionButton" @action-click="openActionSheet">
                                                Action
                                            </ButtonActionComponent>
                                        </ion-col>
                                        <ion-col size="6" class="ion-text-right">
                                            <ButtonActionComponent :icon="icons.readerOutline" :item="item"
                                                :class="detailButton" @action-click="fetchDetailUserAccount">
                                                Detail
                                            </ButtonActionComponent>
                                        </ion-col>
                                    </ion-row>
                                </ion-card-content>
                            </ion-card>
                        </div>
                        <ion-infinite-scroll threshold="10px" @ionInfinite="loadMore">
                            <ion-infinite-scroll-content loading-text="Please wait..." loading-spinner="bubbles">
                            </ion-infinite-scroll-content>
                        </ion-infinite-scroll>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button @click="handleAction('Add')">
                    <ion-icon :icon="icons.personAddOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
        <!-- <ion-button id="open-loading">Show Loading</ion-button>
        <ion-loading trigger="open-loading" :duration="3000" message="Dismissing after 3 seconds..." spinner="circles">
        </ion-loading>
        <ion-loading v-if="isLoading" message="Loading ..." spinner="circles"></ion-loading> -->
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { userAccountStore } from '@/store/userAccountStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import Modal from './VUserAccountModal.vue'
import { modalController } from '@ionic/vue';
import { A11y } from 'swiper/modules';
import ButtonActionComponent from '@/components/ButtonActionComponent.vue';
import ChipComponent from '@/components/ChipComponent.vue';

// data
const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const userAccount = userAccountStore();
const router = useRouter();
const page = ref(1);
const perPage = ref(5);
const search = ref('');
const mainContentId = 'userAccount-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const selectedId = ref('');
const actionSheetButtons = ref([]);
const actionButton = ref('action-button');
const detailButton = ref('detail-button');
const primary = ref('primary');
const danger = ref('danger');
const selectedStatus = ref('');


const fetchDetailUserAccount = async (item) => {
    try {
        isLoading.value = true;
        // await userAccountStore.fetchDetailUserAccount(item.BANFN);
        // await userAccountStore.saveParentPr(item);
        router.push({ name: 'UserAccountDetail' });
    } catch (error) {
        console.error('Login failed:', error);
        proxy.$toast('Username or password is wrong', 'danger');
    }
    finally {
        isLoading.value = false;
    }
};

// api 
const handleRefresh = (event) => {
    setTimeout(() => {
        event.target.complete();
    }, 2000);
};
const initialize = async () => {
    const res = await loginStore.loadUser()
    // console.log(res);
    if (!res) {
        router.replace({ name: 'Login' });
    }
};
const fetchAllUser = async () => {
    try {
        isLoading.value = true;
        await userAccount.fetchAllUser();
        page.value++;
    } catch (error) {
        console.error('Error fetching list PR:', error);
    }
    finally {
        isLoading.value = false;
    }
};
// computed 
// const fakeData = [
//     { username: 'User1', status: 'Active', array: ['A1', 'A2', 'A3'] },
//     { username: 'User2', status: 'Non Active', array: ['A1', 'A2', 'A3'] },
//     { username: 'User3', status: 'Active', array: ['A1', 'A2', 'A3'] },
//     { username: 'User4', status: 'Active', array: ['A1', 'A2', 'A3'] },
//     { username: 'User5', status: 'Active', array: ['A1', 'A2', 'A3'] }
// ];

// const vdata = ref(fakeData);
const vdata = computed(() => userAccount.allUser);
const user = computed(() => loginStore.user);
// another merthod 
const loadMore = async (event) => {
    await fetchAllUser();
    event.target.complete();
};
const handleSearch = debounce(() => {
    page.value = 1;
    userAccount.daftarPr = [];
    fetchAllUser();
}, 1000); // Set the debounce delay to 300ms or adjust as needed
const formatCurrency = (price) => {
    return parseFloat(price).toLocaleString('id-ID', { maximumFractionDigits: 2 });
};
// Method to open Action Sheet with specific item
const openActionSheet = (item) => {
    console.log(item);
    console.log('item');
    const id = item.id;
    selectedId.value = id;
    actionSheetButtons.value = [
        {
            text: 'Edit',
            handler: () => handleAction('Edit'),
            cssClass: 'approve-button',
            icon: icons.value.createOutline,
        },
        {
            text: 'Delete',
            role: 'destructive',
            handler: () => handleAction('Reject'),
            cssClass: 'reject-button',
            icon: icons.value.trashOutline,
        },
        {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'cancel-button',
            icon: icons.value.logOutOutline,
        },
    ];
    setOpen(true);
};
// Method to handle action button click in Action Sheet
const handleAction = async (action) => {
    isLoading.value = true;
    console.log(`Action ${action} for Id: ${selectedId.value}`);

    let response;
    switch (action) {
        case 'Add':
            await openModal(action);
            break;
        case 'Edit':
            await openModal(action);
            break;
        case 'Delete':
            const response = await userAccount.rejectPr(user.value.username, selectedId.value);
            if (response) {
                proxy.$toast('Reject Done', 'success');
                setOpen(false);
                isLoading.value = false;
            } else {
                console.error(`Failed to ${action.toLowerCase()} for Id: ${selectedId.value}`);
                proxy.$toast('Failed, contact admin', 'danger');
            }
            break;
        default:
            console.warn(`Unknown action: ${action}`);
            proxy.$toast('Failed, contact admin', 'danger');
    }
};
// Method to set the open state of the Action Sheet
const setOpen = (state) => {
    isOpen.value = state;
};
const openModal = async (action) => {
    const modal = await modalController.create({
        component: Modal,
        componentProps: {
            // Kirim parameter ke modal
            action: action,
        },
    });


    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
        // message.value = `Hello, ${data}!`;
        console.log(data);
        proxy.$toast('Add User Account Successfully', 'success');
    }
};
const filteredData = computed(() => {
    if (!selectedStatus.value) {
        return vdata.value; // Return all data if no status is selected
    }
    return vdata.value.filter(item => item.status == selectedStatus.value);
});
// mount 
onMounted(async () => {
    isLoading.value = true;
    await fetchAllUser();
});
</script>

<style scoped>
.ion-card-title {
    font-size: 20px;
    font-weight: 600;
    line-height: 18px;
}

.custom-item {
    --padding-start: 2px;
    --padding-end: 2px;
    --padding-top: 0;
    --padding-bottom: 0;
}

.center-col {
    display: flex;
    justify-content: center;
    align-items: center;
}

ion-fab-button {
    --background: #FFB22C;
    --background-activated: #FFDE4D;
    --background-hover: #FFDE4D;
    --border-radius: 15px;
    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    --color: black;
}
</style>