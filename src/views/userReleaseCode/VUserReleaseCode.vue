<template>
    <MenuComponent :contentId="mainContentId" />
    <ion-page id="userReleaseCode-content" v-bind="$attrs">
        <HeaderComponent :title="`User Release Code ${title}`" />
        <ion-content>
            <ion-grid>
                <div class="sticky-top">
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
                </div>
                <ion-row>
                    <ion-col size="12">
                        <div v-for="(item, index) in filteredData" :key="index">
                            <ion-card class="ion-margin-top ion-elevation-3" style="border-radius: 15px;">
                                <ion-card-content>
                                    <ion-row class="ion-align-items-center">
                                        <ion-col size="12" class="ion-text-start">
                                            <ion-text class="text__header">{{ item.username }}</ion-text>
                                        </ion-col>
                                        <ion-col size="12" class="ion-text-start">
                                            <ion-text class="text__sub">{{ item.fullname }}</ion-text>
                                        </ion-col>
                                        <ion-col size="12" class="ion-text-center ion-text-justify">
                                            <div class="chip__container">
                                                <div v-for="(strategy, sIndex) in item.user_prpo.slice(0, 4)"
                                                    :key="sIndex">
                                                    <ChipComponent :id="'hover-trigger-' + index + '-' + sIndex"
                                                        :width="widthButton">
                                                        {{ strategy.frgco }}
                                                    </ChipComponent>
                                                    <ion-popover :trigger="'hover-trigger-' + index + '-' + sIndex"
                                                        side="top" trigger-action="click" size="auto">
                                                        <ion-content class="ion-padding">
                                                            {{ strategy.frgct }}
                                                        </ion-content>
                                                    </ion-popover>
                                                </div>
                                                <ChipComponent v-if="item.user_prpo.length > 4"
                                                    :id="`click-trigger-${index}-${item.uuid}`" :width="widthButton">
                                                    ....
                                                </ChipComponent>
                                            </div>
                                            <ion-popover :trigger="`click-trigger-${index}-${item.uuid}`" side="left"
                                                trigger-action="click" size="auto">
                                                <ion-content>
                                                    <div class="chip__container">
                                                        <div v-for="(strategy, sIndex) in item.user_prpo" :key="sIndex">
                                                            <div class="ion-no-padding">
                                                                <ChipComponent
                                                                    :id="'hover-trigger-' + index + '-' + sIndex + '-full'"
                                                                    :width="widthButton">
                                                                    {{ strategy.frgco }}
                                                                </ChipComponent>
                                                                <ion-popover
                                                                    :trigger="'hover-trigger-' + index + '-' + sIndex + '-full'"
                                                                    side="top" trigger-action="click" size="auto">
                                                                    <ion-content class="ion-padding">
                                                                        {{ strategy.frgct }}
                                                                    </ion-content>
                                                                </ion-popover>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ion-content>
                                            </ion-popover>
                                        </ion-col>
                                        <ion-col size="12" class="ion-text-end">
                                            <ButtonComponent :size="sizeButton" :icon="icons.openOutline" :item="item"
                                                :class="actionButton" @action-click="openActionSheet">
                                                Action
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
        <LoadingComponent :isOpen="loading" :message="'Loading data...'" />
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { releaseCodeStore } from '@/store/releaseCodeStore';
import { userAccountStore } from '@/store/userAccountStore';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import Modal from './VUserReleaseCodeModal.vue';
import { modalController } from '@ionic/vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ChipComponent from '@/components/ChipComponent.vue';
import LoadingComponent from '../../components/LoadingComponent.vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    }
});
// data
const { proxy } = getCurrentInstance()
const rcStore = releaseCodeStore();
const userAccount = userAccountStore();

const loading = ref(false);
const icons = ref(proxy.$icons);
const router = useRouter();
const page = ref(1);
const limit = ref(5);
const search = ref('');
const isOpen = ref(false);
const selectedItem = ref(null);
const actionSheetButtons = ref([]);
const selectedStatus = ref('');
const actionButton = ref('action-button');
const mainContentId = 'userReleaseCode-content';
const sizeButton = ref('small');
const widthButton = ref('50px');
const type = ref(props.type);
const title = computed(() => props.type === 'RH' ? 'PR' : 'PO');
const vdata = computed(() => rcStore.userList);
const route = useRoute();
// Gunakan watch untuk memantau perubahan pada route.params.type
watch(() => route.params.type, (newType) => {
    // console.log('type.value', type.value)
    // console.log('newType', newType)
    if (newType && newType !== undefined) {
        type.value = newType;
        router.go(0);
        // fetchAllUser(true);
    }
});



const fetchAllUser = async (refresh = true) => {
    loading.value = refresh;
    try {
        refresh ? page.value = 1 : page.value++;
        await rcStore.allUserReleaseCode(type.value, page.value, limit.value, search.value, refresh);
        console.log(vdata.value)
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        loading.value = false;
    }
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
        const data = { uuid: item.uuid, type: type.value };
        await rcStore.deleteUserReleaseCode(data);
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
    await fetchAllUser(true);
    selectedStatus.value = null;
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
    console.log(item)
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
            await openModal(action, type.value);
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
    await rcStore.readReleaseCode(type.value);
    await userAccount.allUser(true, 1, 100);
    const modal = await modalController.create({
        component: Modal,
        componentProps: { action, type: type.value },
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


// mount 
onMounted(async () => {
    await fetchAllUser(true);
});

// Gunakan props.type di sini
console.log(props.type); // Akan mencetak 'RH'
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