<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="pr-content" v-bind="$attrs">
        <HeaderComponent :title="props.type === 'user' ? 'Purchase Request List' : 'Purchase Request Approval'" />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-searchbar animated="true" v-model="search" placeholder="Search PR Number"
                            @ionInput="handleSearch"></ion-searchbar>
                    </ion-col>
                    <ion-col size="8" class="ion-padding ion-align-self-center">
                        <ion-label>{{ vdata.total }} purchase request found</ion-label>
                    </ion-col>
                    <ion-col size="4" class="ion-padding ion-align-self-center">
                        <div class="filter-container">
                            <ion-text>Filter</ion-text>
                            <ion-button color="primary" fill="solid" @click="openModal(typeMenu)">
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
import { masterDataStore } from '@/store/masterDataStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import cardUser from '@/components/purchaseRequest/CardPrListComponent.vue';
import cardApproval from '@/components/purchaseRequest/CardPrApprovalComponent.vue';
import { useRoute } from 'vue-router';
import ModalFilter from '@/components/FilterPrPoComponent.vue';
import { modalController } from '@ionic/vue';

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
const mdStore = masterDataStore();

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

const fetchAllPr = async (refresh = true, filter = {}) => {
    loading.value = refresh;
    try {
        refresh ? page.value = 1 : page.value++;
        await prStore.allPr(refresh, typeMenu.value, page.value, limit.value, search.value, filter);
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
    // console.log('vdata', vdata.value)
    if (vdata.value.length >= vdata.value.total) {
        event.target.complete();
        return;
    }
    await fetchAllPr(false);
    event.target.complete();
};

const handleSearch = debounce(() => fetchAllPr(true), 300);



const setOpen = (state) => {
    isOpen.value = state;
};

const openModal = async (action) => {
    await mdStore.readCompany();
    await mdStore.readPlant();
    const modal = await modalController.create({
        component: ModalFilter,
        componentProps: { action },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
        await fetchAllPr(true, data);
        // proxy.$toast(data.message, 'success');
        proxy.$toast('Apply Filter Successfully', 'success');
    }
};

onMounted(async () => {
    await fetchAllPr();
});
</script>

<style scoped>
.ion-card-title {
    font-size: clamp(16px, 4vw, 20px);
    line-height: 1.2;
    font-weight: 600;
    color: #0070F2;
}

.ion-card-amount,
.ion-card-label {
    font-size: clamp(14px, 3.5vw, 17px);
    line-height: 1.2;
    color: #626060;
}

.ion-card-amount {
    font-weight: 700;
}

.ion-card-label {
    font-weight: 400;
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
    font-size: clamp(12px, 3vw, 14px);
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

@media screen and (min-width: 768px) {
    .ion-card-title {
        font-size: clamp(18px, 2.5vw, 24px);
    }

    .ion-card-amount,
    .ion-card-label {
        font-size: clamp(16px, 2vw, 20px);
    }

    .filter-container ion-text {
        font-size: clamp(14px, 1.8vw, 16px);
    }
}
</style>