<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="cost-center-po-content" v-bind="$attrs">
        <HeaderComponent :title="'Cost Center Purchase Order'" />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-searchbar v-model="search" placeholder="Search" @ionInput="handleSearch"></ion-searchbar>
                    </ion-col>
                    <ion-col size="12" class="ion-padding">
                        <ion-select aria-label="User Account" placeholder="User Account" fill="outline">
                            <ion-icon slot="start" :icon="icons.filterOutline" aria-hidden="true"></ion-icon>
                            <ion-select-option value="User Account 1">User Account 1</ion-select-option>
                            <ion-select-option value="User Account 2">User Account 2</ion-select-option>
                        </ion-select>
                    </ion-col>
                    <ion-col size="12">
                        <div v-for="(item, index) in data" :key="index">
                            <ion-card>
                                <ion-card-header>
                                    <ion-card-title>{{ item.fullname }}</ion-card-title>
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
                                                :class="detailButton" @action-click="fetchDataDetail">
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
                    <ion-icon :icon="icons.addOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            <RefresherComponent @refresh="refreshData()" />
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
        <LoadingComponent :isOpen="isLoading" :message="'Loading data...'" />
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import Modal from './VMaintainCostCenterModal.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { costCenterStore } from '@/store/costCenterStore';
import { modalController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import LoadingComponent from '../../components/LoadingComponent.vue';
const mainContentId = 'cost-center-po-content';

const { proxy } = getCurrentInstance();
const router = useRouter();
const csStore = costCenterStore();

const isLoading = ref(false);
const icons = ref(proxy.$icons);
const page = ref(1);
const limit = ref(80);
const search = ref('');
const actionButton = ref('action-button');
const detailButton = ref('detail-button');
const isOpen = ref(false);
const selectedItem = ref(null);
const actionSheetButtons = ref([]);
const selectedStatus = ref('');
const selectedId = ref('');

const data = computed(() => csStore.dataList);

const fetchAllData = async (refresh = true) => {
    isLoading.value = refresh;
    try {
        refresh ? page.value = 1 : page.value++;
        await csStore.allDataCostCenter(page.value, limit.value, search.value, refresh); 
        console.log(data.value);       
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        isLoading.value = false;
    }
};

const fetchDataDetail = async (item, action = null) => {
    isLoading.value = true;
    try {
        await csStore.costCenterDetail(item.uuid);
        if (!action) {
            await router.push({ name: 'costCenterDetail' });
        }
    } catch (error) {
        console.error('Error fetching data detail:', error);
        proxy.$toast('Error fetching data detail', 'danger');
    } finally {
        isLoading.value = false;
    }
};

const deleteData = async (item) => {
    isLoading.value = true;
    try {
        await csStore.deleteCostCenter(item.uuid);
        await fetchAllData(true);
        proxy.$toast('Deleted Successfully', 'success');
        setOpen(false);
    } catch (error) {
        console.error('Error deleting data:', error);
        proxy.$toast('Error Deleting Data', 'danger');
    } finally {
        isLoading.value = false;
    }
};


const handleSearch = () => { }

const refreshData = async () => {
    await fetchAllData(true);
    selectedStatus.value = null;
};

const loadMore = async (event) => {
    if (data.value.length >= data.value.total) {
        event.target.complete();
        return;
    }
    await fetchAllData(false);
    event.target.complete();
};

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
    isLoading.value = true;
    
    let response;
    switch (action) {
        case 'Add':
            await openModal(action);
            break;
        case 'Edit':
            await fetchDataDetail(selectedItem.value, action);
            await openModal(action);
            break;
        case 'Delete':
            await deleteData(selectedItem.value);
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
        componentProps: {
            typeModal: action,
            anotherParam: 123,
        },
    });


    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
        console.log(data);
        proxy.$toast('Add User Account Successfully', 'success');
    }
};

// mount 
onMounted(async () => {
    await fetchAllData();
});

</script>

<style scoped>
button-container {
    position: relative;
}

ion-button {
    padding: 0 10px 10px 10px;
    /* position: absolute;
    bottom: 0;
    right: 10px; */
}
</style>