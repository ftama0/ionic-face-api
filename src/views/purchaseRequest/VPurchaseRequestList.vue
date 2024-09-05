<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="pr-content" v-bind="$attrs">
        <HeaderComponent :title="'Purchase Request List'" />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-searchbar v-model="search" placeholder="Search PR Number"
                            @ionInput="handleSearch"></ion-searchbar>
                    </ion-col>
                    <ion-col size="8" class="ion-padding ion-align-self-center">
                        <ion-label>{{ vdata.total }} purchase request found</ion-label>
                    </ion-col>
                    <ion-col size="4" class="ion-padding ion-align-self-center">
                        <div class="filter-container">
                            <ion-text>Filter</ion-text>
                            <ion-button color="primary" fill="solid">
                                <ion-icon slot="icon-only" :icon="icons.filterOutline"></ion-icon>
                            </ion-button>
                        </div>
                    </ion-col>
                    <ion-col size="12">
                        <cardUser v-if="typeMenu === 'user'" v-for="(item, index) in vdata" :key="index" :item="item"
                            :icons="icons" @readPr="fetchReadPr" />
                        <cardApproval v-if="typeMenu === 'approval'" v-for="(item, index) in vdata" :key="index"
                            :item="item" :icons="icons" @readPr="fetchReadPr" />
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-infinite-scroll threshold=" 10px" @ionInfinite="loadMore">
                <ion-infinite-scroll-content loading-text="Please wait..." loading-spinner="bubbles">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
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
import { ref, onMounted, getCurrentInstance, computed, watch } from 'vue';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import cardUser from '@/components/CardPrListUserComponent.vue';
import cardApproval from '@/components/CardPrListApprovalComponent.vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    type: {
        type: String,
        required: true
    }
});
// data
const typeMenu = ref(props.type);
const { proxy } = getCurrentInstance()
const router = useRouter();
const prStore = purchaseRequestStore();

const loading = ref(false);
const icons = ref(proxy.$icons);
const page = ref(1);
const limit = ref(5);
const search = ref('');
const isOpen = ref(false);
const selectedItem = ref(null);
const actionSheetButtons = ref([]);
const selectedStatus = ref('');
const mainContentId = 'pr-content';
const route = useRoute();

watch(() => route.params.type, async (newType) => {
    if (newType != typeMenu.value && newType !== undefined) {
        router.go(0);
    }
});

const vdata = computed(() => prStore.prListFormatted);

const fetchAllPr = async (refresh = true) => {
    loading.value = refresh;
    try {
        refresh ? page.value = 1 : page.value++;
        await prStore.allPr(refresh, typeMenu.value, page.value, limit.value, search.value);
    } catch (error) {
        console.error('Error fetching Purchase Request:', error);
    } finally {
        loading.value = false;
    }
};

const fetchReadPr = async (item, action = null) => {
    loading.value = true;
    try {
        await prStore.readPr(item.banfn);
        if (!action) {
            await router.push({
                name: 'PurchaseRequestDetail',
                params: { typeMenu: typeMenu.value }
            });
        }
    } catch (error) {
        console.error('Error reading Purchase Request:', error);
        proxy.$toast('Error Reading Purchase Request', 'danger');
    } finally {
        loading.value = false;
    }
};

const refreshData = async () => {
    await fetchAllPr(true);
    selectedStatus.value = null;
};

const loadMore = async (event) => {
    console.log('vdata', vdata.value)
    if (vdata.value.length >= vdata.value.total) {
        event.target.complete();
        return;
    }
    await fetchAllPr(false);
    event.target.complete();
};

const handleSearch = debounce(() => fetchAllPr(true), 300);

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

const filteredData = computed(() =>
    selectedStatus.value
        ? vdata.value.filter(item => item.status.toString() === selectedStatus.value)
        : vdata.value
);

onMounted(fetchAllPr);
</script>

<style scoped>
.ion-card-title {
    font-size: 20px;
    line-height: 18px;
    font-weight: 600;
    color: #0070F2;
}

.ion-card-amount {
    font-size: 17px;
    line-height: 18px;
    font-weight: 700;
    color: #626060;
}

.ion-card-label {
    font-size: 17px;
    line-height: 18px;
    font-weight: 400;
    color: #626060;
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

.center-col-1 {
    display: flex;
    align-items: center;
}

ion-fab-button {
    --background: #b7f399;
    --background-activated: #87d361;
    --background-hover: #a3e681;
    --border-radius: 15px;
    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    --color: black;
}

.custom-icon-cart {
    color: #0070F2;
    font-size: 24px;
    background-color: #CFE5FF;
    border-radius: 50%;
    padding: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.custom-icon {
    color: #0070F2;
    font-size: 24px;
}

.filter-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.filter-container ion-text {
    margin-right: 8px;
    font-size: 14px;
    color: #626060;
}

.filter-container ion-button {
    --padding-start: 8px;
    --padding-end: 8px;
    --padding-top: 4px;
    --padding-bottom: 4px;
    height: 32px;
}

.filter-container ion-icon {
    font-size: 18px;
}
</style>