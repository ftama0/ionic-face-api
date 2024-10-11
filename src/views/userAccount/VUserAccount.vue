<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="userAccount-content" v-bind="$attrs">
        <HeaderComponent :title="'User Account'" />
        <ion-content>
            <ion-grid>
                <ion-row class="sticky-top">
                    <ion-col size="12">
                        <ion-searchbar animated="true" v-model="search" placeholder="Search User"
                            @ionInput="handleSearch"></ion-searchbar>
                    </ion-col>
                    <ion-col size="12" class="ion-padding">
                        <ion-item>
                            <ion-select aria-label="status" label="Status select" label-placement="floating"
                                placeholder="Status" fill="outline" v-model="selectedStatus"
                                @ionChange="handleStatusChange">
                                <ion-icon slot="start" :icon="icons.filterOutline" aria-hidden="true"></ion-icon>
                                <ion-select-option value="active">Aktif</ion-select-option>
                                <ion-select-option value="inactive">Non Aktif</ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-card v-for="(item, index) in vdata" :key="index" class="ion-padding ion-elevation-3">
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
                            <ion-row>
                                <ion-col size="6" class="ion-text-left">
                                    <ButtonComponent :icon="icons.openOutline" :item="item" :class="actionButton"
                                        @action-click="openActionSheet">
                                        Action
                                    </ButtonComponent>
                                </ion-col>
                                <ion-col size="6" class="ion-text-right">
                                    <ButtonComponent :icon="icons.readerOutline" :item="item" :class="detailButton"
                                        @action-click="fetchReadUser">
                                        Detail
                                    </ButtonComponent>
                                </ion-col>
                            </ion-row>
                        </ion-card>
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
            <RefresherComponent @refresh="refreshData()" />
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
        <LoadingComponent :isOpen="loading" :message="'Loading...'" />
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { userAccountStore } from '@/store/userAccountStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import Modal from './VUserAccountModal.vue'
import { modalController } from '@ionic/vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ChipComponent from '@/components/ChipComponent.vue';
import LoadingComponent from '../../components/LoadingComponent.vue';

const { proxy } = getCurrentInstance();
const router = useRouter();
const userAccount = userAccountStore();

const loading = ref(false);
const icons = ref(proxy.$icons);
const page = ref(1);
const limit = ref(5);
const search = ref('');
const isOpen = ref(false);
const selectedItem = ref(null);
const actionSheetButtons = ref([]);
const selectedStatus = ref('');
const actionButton = ref('action-button');
const detailButton = ref('detail-button');
const mainContentId = 'userAccount-content';

const vdata = computed(() => userAccount.userList);

const fetchAllUser = async (refresh = true) => {
    loading.value = refresh;
    try {
        refresh ? page.value = 1 : page.value++;
        await userAccount.allUser(refresh, page.value, limit.value, search.value, selectedStatus.value);
    } catch (error) {
        console.error('Error mengambil data pengguna:', error);
    } finally {
        loading.value = false;
    }
};

const handleStatusChange = () => {
    fetchAllUser(true);
};

const fetchReadUser = async (item, action = null) => {
    loading.value = true;
    try {
        await userAccount.readUser(item.uuid);
        if (!action) {
            await router.push({ name: 'UserAccountDetail' });
        }
    } catch (error) {
        console.error('Error reading user:', error);
        proxy.$toast('Error Reading User', 'danger');
    } finally {
        loading.value = false;
    }
};

const deleteUser = async (item) => {
    loading.value = true;
    try {
        await userAccount.deleteUser(item.uuid);
        await fetchAllUser(true);
        proxy.$toast('Deleted Successfully', 'success');
        setOpen(false);
    } catch (error) {
        console.error('Error deleting user:', error);
        proxy.$toast('Error Deleting User', 'danger');
    } finally {
        loading.value = false;
    }
};

const refreshData = async () => {
    selectedStatus.value = '';
    await fetchAllUser(true);
};

const loadMore = async (event) => {
    if (vdata.value.length >= vdata.value.total) {
        event.target.complete();
        return;
    }
    await fetchAllUser(false);
    event.target.complete();
};

const handleSearch = debounce(() => fetchAllUser(true), 300);

const openActionSheet = (item) => {
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

const handleAction = async (action) => {
    switch (action) {
        case 'Add':
        case 'Edit':
            await (action === 'Edit' && fetchReadUser(selectedItem.value, action));
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

const setOpen = (state) => {
    isOpen.value = state;
};

const openModal = async (action) => {
    const modal = await modalController.create({
        component: Modal,
        componentProps: { action },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
        proxy.$toast(data.message, 'success');
    }
};

onMounted(fetchAllUser);
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