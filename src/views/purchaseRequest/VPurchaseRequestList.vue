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
                        <div v-for="(item, index) in vdata" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                                <ion-card-content>
                                    <ion-row class="ion-margin-top">
                                        <ion-col size="12">
                                            <ion-label class="ion-card-title">{{ item.BANFN }}</ion-label>
                                        </ion-col>
                                        <ion-col size="12" class="ion-no-padding-top ion-no-padding-bottom">
                                            <ion-label class="ion-card-label">{{ item.HEADER }}</ion-label>
                                        </ion-col>
                                        <ion-col size="12" class="ion-no-padding-top ion-no-padding-bottom">
                                            <ion-label class="ion-card-label">{{ item.total_item }} Item</ion-label>
                                        </ion-col>
                                        <ion-col size="12" class="ion-no-padding-top ion-no-padding-bottom">
                                            <ion-label class="ion-card-label">{{ item.BADAT }}</ion-label>
                                        </ion-col>
                                        <ion-col size="6" class="center-col-1">
                                            <ion-label class="ion-card-amount center-col">Rp.
                                                {{ formatCurrency(item.SUM_Total_Price) }}</ion-label>
                                        </ion-col>
                                        <ion-col size="6" class="center-col">
                                            <ion-button size="default" shape="default" color="white"
                                                class="detail-button" @click="fetchDetailPr(item)">
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
const page = ref(1);
const perPage = ref(5);
const search = ref('');
const mainContentId = 'pr-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const selectedId = ref('');
const actionSheetButtons = ref([]);

const fetchDetailPr = async (item) => {
    try {
        isLoading.value = true;
        await prStore.fetchDetailPr(item.BANFN);
        await prStore.saveParentPr(item);
        router.push({ name: 'PurchaseRequestListDetail' });
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
const fetchListPr = async () => {
    try {
        isLoading.value = true;
        await prStore.fetchListPr(user.value.username);
        page.value++;
    } catch (error) {
        console.error('Error fetching list PR:', error);
    }
    finally {
        isLoading.value = false;
    }
};
// computed 
const vdata = computed(() => prStore.daftarPr);
const user = computed(() => loginStore.user);
// another merthod 
const loadMore = async (event) => {
    await fetchListPr();
    event.target.complete();
};
const handleSearch = debounce(() => {
    page.value = 1;
    prStore.daftarPr = [];
    fetchListPr();
}, 1000); // Set the debounce delay to 300ms or adjust as needed
const formatCurrency = (price) => {
    return parseFloat(price).toLocaleString('id-ID', { maximumFractionDigits: 2 });
};
// Method to open Action Sheet with specific item
const openActionSheet = (id) => {
    console.log(id)
    selectedId.value = id;
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
const handleAction = async (action) => {
    isLoading.value = true;
    console.log(`Action ${action} for Id: ${selectedId.value}`);

    let response;

    switch (action) {
        case 'Approve':
            response = await prStore.approvePr(user.value.username, selectedId.value);
            if (response) {
                console.log(response)
                proxy.$toast(response.message, response.status);
                // proxy.$toast('Approve Done', 'success');
            }
            break;
        case 'Reject':
            response = await prStore.rejectPr(user.value.username, selectedId.value);
            if (response) {
                proxy.$toast('Reject Done', 'success');
            }
            break;
        default:
            console.warn(`Unknown action: ${action}`);
            proxy.$toast('Failed, contact admin', 'danger');

    }

    if (response) {
        setOpen(false);
        isLoading.value = false;
    } else {
        console.error(`Failed to ${action.toLowerCase()} PR for Id: ${selectedId.value}`);
    }
};
// Method to set the open state of the Action Sheet
const setOpen = (state) => {
    isOpen.value = state;
};
// mount 
onMounted(async () => {
    isLoading.value = true;
    await initialize();
    await fetchListPr();
});
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

.detail-button {
    /* --background: #93e9be;
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be; */

    --color: #0070F2;

    --border-radius: 10px;
    --border-color: #BCC3CA;
    --border-style: solid;
    --border-width: 1px;

    /* --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.2); */

    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;
    font-size: 17px;
    line-height: 18px;
    font-weight: 600;
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