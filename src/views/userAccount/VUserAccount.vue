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
                            <ion-select-option :value="true">Active</ion-select-option>
                            <ion-select-option :value="false">Non Active</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <div v-for="(item, index) in filteredData" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3">
                                <ion-card-header>
                                    <ion-row class="ion-align-items-center">
                                        <ion-col size="6" class="ion-text-left">
                                            <ion-text class="ion-card-title">{{ item.username }}</ion-text>
                                        </ion-col>
                                        <ion-col size="6" class="ion-text-right">
                                            <ChipComponent :color="item.status == true ? 'success' : 'danger'">
                                                {{ item.status == true ? 'Active' : 'Non Active' }}
                                            </ChipComponent>
                                        </ion-col>
                                    </ion-row>
                                </ion-card-header>
                                <ion-card-content>
                                    <ion-row>
                                        <ion-col size="6" class="ion-text-left">
                                            <ButtonComponent :icon="icons.openOutline" :item="item"
                                                :class="actionButton" @action-click="openActionSheet">
                                                Action
                                            </ButtonComponent>
                                        </ion-col>
                                        <ion-col size="6" class="ion-text-right">
                                            <ButtonComponent :icon="icons.readerOutline" :item="item"
                                                :class="detailButton" @action-click="fetchReadUser">
                                                Detail
                                            </ButtonComponent>
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
            <RefresherComponent @refresh="fetchAllUser(true)" />
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
        <LoadingComponent :isOpen="loading" :message="'Loading data...'" />
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
import ButtonComponent from '@/components/ButtonComponent.vue';
import ChipComponent from '@/components/ChipComponent.vue';
import LoadingComponent from '../../components/LoadingComponent.vue';

// data
const { proxy } = getCurrentInstance()
const loading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const userAccount = userAccountStore();
const router = useRouter();
const page = ref(1);
const limit = ref(5);
const search = ref('');
const mainContentId = 'userAccount-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const selectedItem = ref('');
const actionSheetButtons = ref([]);
const actionButton = ref('action-button');
const detailButton = ref('detail-button');
const selectedStatus = ref('');
// computed 
const vdata = computed(() => userAccount.userList);
// api 
const fetchAllUser = async (refresh = true) => {
    loading.value = refresh;
    try {
        refresh == true ? '' : page.value++;
        await userAccount.allUser(refresh, page.value, limit.value);
        console.log(page.value)
    } catch (error) {
        console.error('Error fetching : ', error);
    }
    finally {
        loading.value = false;
    }
};

const fetchReadUser = async (item, action = null) => {
    loading.value = true;
    try {
        console.log(item.uuid);
        console.log('Apakah fungsi readUser tersedia?', typeof userAccount.readUser);
        await userAccount.readUser(item.uuid);;
        if (!action) {
            await router.push({ name: 'UserAccountDetail' });
        }
    } catch (error) {
        console.error('API failed:', error);
        proxy.$toast('Error Read User', 'danger');
    }
    finally {
        loading.value = false;
    }
};

const deleteUser = async (item) => {
    loading.value = true;
    try {
        console.log(item.uuid);
        console.log('Apakah fungsi readUser tersedia?', typeof userAccount.readUser);
        await userAccount.deleteUser(item.uuid);
        await fetchAllUser(true);
        proxy.$toast('Deleted Successfully', 'success');
        setOpen(false);
    } catch (error) {
        console.error('API failed:', error);
        proxy.$toast('Error Read User', 'danger');
    }
    finally {
        loading.value = false;
    }
};
// another merthod 
const loadMore = async (event) => {
    console.log(vdata.value.length)
    console.log(vdata.value.total)
    if (vdata.value.length >= vdata.value.total) {
        event.target.disabled = true;
        event.target.complete();
        return;
    }
    await fetchAllUser(false);
    event.target.complete();
};
const handleSearch = debounce(() => {
    page.value = 1;
    userAccount.daftarPr = [];
    fetchAllUser(true);
}, 1000); // Set the debounce delay to 300ms or adjust as needed

const openActionSheet = (item) => {// Method to open Action Sheet with specific item
    console.log(item);
    selectedItem.value = item;
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
            handler: () => handleAction('Delete'),
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
const handleAction = async (action) => {// Method to handle action button click in Action Sheet
    loading.value = true;
    console.log(`Action ${action} for item:`);
    console.log(selectedItem.value);
    switch (action) {
        case 'Add':
            await openModal(action);
            break;
        case 'Edit':
            await fetchReadUser(selectedItem.value, action);
            await openModal(action);
            break;
        case 'Delete':
            await deleteUser(selectedItem.value);
            break;
        default:
            console.warn(`Unknown action: ${action}`);
            proxy.$toast('Failed, contact admin', 'danger');
    }
};
const setOpen = (state) => { // Method to set the open state of the Action Sheet
    isOpen.value = state;
};
const openModal = async (action) => { // Method to open Modal
    const modal = await modalController.create({
        component: Modal,
        componentProps: {
            // Kirim parameter ke modal 
            action: action,
        },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(data.message);
    console.log(role);
    if (role === 'confirm') {
        // message.value = `Hello, ${res}!`;
        console.log(data.message);
        await fetchAllUser(true);
        proxy.$toast(data.message, 'success');
    }
};
const filteredData = computed(() => {
    if (!selectedStatus.value) {
        return vdata.value;
    }
    console.log(selectedStatus.value);
    return vdata.value.filter(item => item.status == selectedStatus.value);
});
// mount 
onMounted(async () => {
    loading.value = true;
    await fetchAllUser(true);
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