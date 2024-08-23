<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="pr-content" v-bind="$attrs">
        <HeaderComponent :title="'Purchase Request List'" />
        <ion-content class="ion-padding">

            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-searchbar v-model="search" placeholder="Search PR Number"
                            @ionInput="handleSearch"></ion-searchbar>
                    </ion-col>
                    <ion-col size="12">
                        <div v-for="(item, index) in dataESS" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                                <ion-card-header color="secondary">
                                    <ion-text class="ion-card-title">{{ item.nrp }}</ion-text>
                                </ion-card-header>
                                <ion-card-content>
                                    <ion-row class="ion-padding-top">
                                        <ion-col size="12">
                                            <ion-label class="ion-card-label">{{ item.nama }}</ion-label>
                                        </ion-col>
                                        <ion-col size="12">
                                            <ion-label class="ion-card-label">{{ item.pangkat }} </ion-label>
                                        </ion-col>
                                        <ion-col size="12">
                                            <ion-label class="ion-card-label">{{ item.tgl_masuk }}</ion-label>
                                        </ion-col>
                                        <ion-col size="12">
                                            <ion-label class="ion-card-label ion-card-title">PT.
                                                {{ item.entitas }}</ion-label>
                                        </ion-col>
                                        <ion-col size="6" class="center-col">
                                            <ion-button size="default" color="warning" class="action-button"
                                                @click="openActionSheet(item.nrp)">
                                                <ion-icon aria-hidden="true" slot="start"
                                                    :icon="icons.openOutline"></ion-icon>
                                                Action
                                            </ion-button>
                                        </ion-col>
                                        <ion-col size="6" class="center-col">
                                            <ion-button size="default" color="dark" class="detail-button">
                                                <ion-icon aria-hidden="true" slot="start"
                                                    :icon="icons.readerOutline"></ion-icon>
                                                Detail
                                            </ion-button>
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
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive, computed } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
// data
const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const prStore = purchaseRequestStore();
const router = useRouter();
const user = ref({});
const vdata = ref({});
const page = ref(1);
const perPage = ref(5);
const search = ref('');
const mainContentId = 'pr-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const selectedItemNrp = ref('');
const actionSheetButtons = ref([]);
// Method to open Action Sheet with specific item
const openActionSheet = (nrp) => {
    console.log(nrp)
    selectedItemNrp.value = nrp;
    actionSheetButtons.value = [
        {
            text: 'Approve',
            handler: () => handleAction('Approve'),
            cssClass: 'approve-button',
            icon: icons.value.checkmarkOutline,
        },
        {
            text: 'Reject',
            role: 'destructive',
            handler: () => handleAction('Reject'),
            cssClass: 'reject-button',
            icon: icons.value.closeOutline,
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
const handleAction = (action) => {
    console.log(`Action ${action} for NRp: ${selectedItemNrp.value}`);
    // Handle your action here (e.g., send to backend, update state, etc.)
    // Reset values
    setOpen(false);
};

// Method to set the open state of the Action Sheet
const setOpen = (state) => {
    isOpen.value = state;
};
// api 
const handleRefresh = (event) => {
    setTimeout(() => {
        event.target.complete();
    }, 2000);
};
const initialize = async () => {
};
const fetchListPr = async () => {
    try {
        isLoading.value = true;
        // await prStore.fetchListPr(vdata.value.username);
        await prStore.fetchUserEss(page.value, perPage.value, search.value);
        page.value++;
    } catch (error) {
        console.error('Error fetching list PR:', error);
    }
    finally {
        isLoading.value = false;
    }
};
// computed 
const dataPR = computed(() => prStore.daftarPr);
const dataESS = computed(() => prStore.daftarEss);
// function 
const loadMore = async (event) => {
    if (dataESS.value.length >= dataESS.totalData) {
        event.target.disabled = true;
        event.target.complete();
        return;
    }
    await fetchListPr();
    event.target.complete();
};
const handleSearch = debounce(() => {
    page.value = 1;
    prStore.daftarEss = [];
    fetchListPr();
}, 600); // Set the debounce delay to 300ms or adjust as needed
// mount 
onMounted(async () => {
    await fetchListPr();
});
</script>

<style scoped>
.approve-button {
    --color: green;
    --color-activated: darkgreen;
}

.ion-card-title {
    font-size: 18px;
    font-weight: 600;
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

/* ion-action-sheet.my-custom-class {
    --background: #EBF4F6;
    --backdrop-opacity: 0.6;
    --button-background-selected: #EBF4F6;
    --button-color: #000000;
    --button-color-activated: green;
    --color: gray;
    --ion-color-danger: #ff0000;
} */
</style>