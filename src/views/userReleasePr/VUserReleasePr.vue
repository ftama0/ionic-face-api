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
                        <ion-select aria-label="status" placeholder="Status" fill="outline">
                            <ion-icon slot="start" :icon="icons.filterOutline" aria-hidden="true"></ion-icon>
                            <ion-select-option value="active">Active</ion-select-option>
                            <ion-select-option value="nonActive">Non Active</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <div v-for="(item, index) in vdata" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3" style="border-radius: 15px;">
                                <ion-card-content>
                                    <ion-row class="ion-align-items-center">
                                        <ion-col size="12" class="ion-text-start">
                                            <ion-text class="text__header">{{ item.username
                                                }}</ion-text>
                                        </ion-col>
                                        <ion-col size="12" class="ion-text-start">
                                            <ion-text class="text__sub">{{ item.level }}</ion-text>
                                        </ion-col>
                                        <ion-col size="12" class="ion-text-center ion-text-justify">
                                            <div class="chip__container">
                                                <div v-for="(strategy, sIndex) in item.release_strategy.slice(0, 4)"
                                                    :key="sIndex">
                                                    <ChipComponent :id="'hover-trigger-' + sIndex" :width="widthButton">
                                                        {{ strategy }}
                                                    </ChipComponent>
                                                </div>
                                                <ChipComponent v-if="item.release_strategy.length >= 4"
                                                    :id="'hover-trigger-' + index" :width="widthButton">
                                                    ....
                                                </ChipComponent>
                                            </div>
                                            <ion-popover :trigger="'click-trigger-' + index" side="left"
                                                trigger-action="click" size="auto">
                                                <ion-content class="ion-padding">
                                                    <div class="chip__container">
                                                        <div v-for="(strategy, sIndex) in item.release_strategy"
                                                            :key="sIndex">
                                                            <ion-chip>{{ strategy }}</ion-chip>
                                                            <ChipComponent :width="widthButton">
                                                                {{ strategy }}
                                                            </ChipComponent>
                                                        </div>
                                                    </div>
                                                </ion-content>
                                            </ion-popover>
                                        </ion-col>
                                        <ion-col size="12" class="ion-text-end">
                                            <ButtonActionComponent :size="sizeButton" :icon="icons.openOutline"
                                                :item="item" :class="actionButton" @action-click="openActionSheet">
                                                Action
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
                    <ion-icon :icon="icons.addOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { userAccountStore } from '@/store/userAccountStore';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import Modal from './VUserReleasePrModal.vue';
import { modalController } from '@ionic/vue';
import ButtonActionComponent from '@/components/ButtonActionComponent.vue';
import ChipComponent from '@/components/ChipComponent.vue';
// data
const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const prStore = purchaseRequestStore();
const userStore = userAccountStore();
const router = useRouter();
const page = ref(1);
const perPage = ref(5);
const search = ref('');
const mainContentId = 'userReleasePr-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const selectedId = ref('');
const actionSheetButtons = ref([]);
const actionButton = ref('action-button');
const sizeButton = ref('small');
const widthButton = ref('50px');


const fetchDetailUserAccount = async (item) => {
    try {
        isLoading.value = true;
        // await userStore.fetchDetailUserAccount(item.BANFN);
        // await userStore.saveParentPr(item);
        router.push({ name: 'VUserReleasePrDetail' });
    } catch (error) {
        console.error('API failed:', error);
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
// const vdata = computed(() => prStore.daftarPr);
const fakeData = [
    { id: '1', username: 'User1', status: 'Active', level: 'Approver', release_strategy: ['A1', 'A2', 'A3', 'A1', 'A2', 'A3'] },
    { id: '2', username: 'User2', status: 'Inactive', level: 'Reviewer', release_strategy: ['A1', 'A2', 'A3'] },
    { id: '3', username: 'User3', status: 'Active', level: 'Editor', release_strategy: ['A1', 'A2', 'A3', 'A1', 'A2', 'A3'] },
    { id: '4', username: 'User4', status: 'Pending', level: 'Viewer', release_strategy: ['A1', 'A2', 'A3', 'A1', 'A2', 'A3'] },
    { id: '5', username: 'User5', status: 'Suspended', level: 'Admin', release_strategy: ['A1', 'A2', 'A3', 'A1', 'A2', 'A3'] }
];

const vdata = ref(fakeData);
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
            response = await prStore.approvePr(user.value.username, selectedId.value);
            break;
        case 'Delete':
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
const openPopover = (index) => {
    this.popoverId = `click-trigger-${index}`;
}
// mount 
onMounted(async () => {
    isLoading.value = true;
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

.chip__container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    /* Maksimal 5 elemen ke samping */
    gap: 2px;
    /* Jarak antar elemen */
    justify-items: center;
    /* Pusatkan elemen secara horizontal */
}

.text__header {
    font-weight: 600;
    font-size: 20px;
    line-height: 18px;
    color: #626060;
}

.text__sub {
    font-weight: 400;
    font-size: 17px;
    line-height: 18px;
    color: #626060;
}
</style>