<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="userReleasePr-content" v-bind="$attrs">
        <HeaderComponent :title="'User Release Code PR'" />
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
                            placeholder="Status" fill="outline">
                            <ion-icon slot="start" :icon="icons.filterOutline" aria-hidden="true"></ion-icon>
                            <ion-select-option value="active">Active</ion-select-option>
                            <ion-select-option value="nonActive">Non Active</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <div v-for="(item, index) in vdata" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3 " style="border-radius: 15px;">
                                <ion-card-content>
                                    <ion-row class="ion-align-items-center">
                                        <ion-col size="6" class="ion-text-center">
                                            <div class="text-container">
                                                <ion-text class="ion-card-title">{{ item.BANFN }}</ion-text>
                                                <ion-text class="ion-card-title">Approver</ion-text>
                                            </div>
                                            <div class="text-container ion-padding-top">
                                                <ion-button size="default" color="warning" class="action-button"
                                                    @click="openActionSheet(item.BANFN)">
                                                    <ion-icon aria-hidden="true" slot="start"
                                                        :icon="icons.openOutline"></ion-icon>
                                                    Action
                                                </ion-button>
                                            </div>
                                        </ion-col>
                                        <ion-col size="6" class="center-col">
                                            <div class="text-container-3">
                                                <ion-chip id="hover-trigger-A2">A2</ion-chip>
                                                <ion-chip id="hover-trigger-B1">B1</ion-chip>
                                                <ion-chip id="hover-trigger-B2">B2</ion-chip>
                                                <ion-chip id="hover-trigger-B2">B2</ion-chip>
                                                <ion-chip id="hover-trigger-B2">B2</ion-chip>
                                                <ion-chip :id="'click-trigger-' + index">....</ion-chip>
                                            </div>
                                        </ion-col>
                                        <ion-popover :trigger="'click-trigger-' + index" side="left"
                                            trigger-action="click" size="auto">
                                            <ion-content class="ion-padding">
                                                <div class="text-container-3">
                                                    <ion-chip>A2</ion-chip>
                                                    <ion-chip>B1</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                    <ion-chip>B2</ion-chip>
                                                </div>
                                            </ion-content>
                                        </ion-popover>
                                        <ion-popover trigger="hover-trigger-A2" trigger-action="hover">
                                            <ion-content class="ion-padding">Hello World!</ion-content>
                                        </ion-popover>
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
import { userManagementStore } from '@/store/userManagementStore';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import Modal from './VUserReleasePrModal.vue'
import { modalController } from '@ionic/vue';

// data
const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const prStore = purchaseRequestStore();
const userStore = userManagementStore();
const router = useRouter();
const page = ref(1);
const perPage = ref(5);
const search = ref('');
const mainContentId = 'userReleasePr-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const selectedId = ref('');
const actionSheetButtons = ref([]);

const fetchDetailUserAccount = async (item) => {
    try {
        isLoading.value = true;
        // await userStore.fetchDetailUserAccount(item.BANFN);
        // await userStore.saveParentPr(item);
        router.push({ name: 'VUserReleasePrDetail' });
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
            response = await prStore.ApprovePr(user.value.username, selectedId.value);
            break;
        case 'Delete':
            response = await prStore.RejectPr(user.value.username, selectedId.value);
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
const openModal = async (action) => {
    const modal = await modalController.create({
        component: Modal,
        componentProps: {
            // Kirim parameter ke modal
            typeModal: action,
            anotherParam: 123,
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
// mount 
onMounted(async () => {
    isLoading.value = true;
    await initialize();
    await fetchListPr();
});
</script>

<style scoped>
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

ion-chip {
    --background: #0054e9;
    --color: white;
}

ion-fab-button {
    --background: #FFB22C;
    --background-activated: #FFDE4D;
    --background-hover: #FFDE4D;
    --border-radius: 15px;
    --box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    --color: black;
}

.text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text-container-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Maksimal 3 elemen ke samping */
    gap: 8px;
    /* Jarak antar elemen */
    justify-items: center;
    /* Pusatkan elemen secara horizontal */
}
</style>