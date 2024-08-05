<template>
    <ion-page id="home-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label>
                        <h6>PR Number</h6>
                        <p>{{ parent.BANFN }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Header Note</h6>
                        <p>{{ parent.HEADER }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PR Type</h6>
                        <p>{{ parent.BSART }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PR Creator</h6>
                        <p>{{ parent.AFNAM }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Release Strategy</h6>
                        <p>Paragraph</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Plant</h6>
                        <p>Paragraph</p>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-list v-if="child && child.length">
                <ion-item v-for="(item, index) in child" :key="index">
                    <ion-label>
                        <p>Item No.{{ index + 1 }}</p>
                        <p>{{ item.TXZ01 }}</p>
                        <ion-row>
                            <ion-col size="2">
                                <p>Qty</p>
                            </ion-col>
                            <ion-col size="1">
                                <p>:</p>
                            </ion-col>
                            <ion-col size="8">
                                <p>{{ item.MENGE }}</p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="2">
                                <p>Price</p>
                            </ion-col>
                            <ion-col size="1">
                                <p>:</p>
                            </ion-col>
                            <ion-col size="8">
                                <p>{{ item.PREIS }}</p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="2">
                                <p>Total</p>
                            </ion-col>
                            <ion-col size="1">
                                <p>:</p>
                            </ion-col>
                            <ion-col size="8">
                                <p>{{ item.PREIS }}</p>
                            </ion-col>
                        </ion-row>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button @click="openActionSheet(parent.BANFN)">
                    <ion-icon :icon="icons.openOutline"></ion-icon>
                </ion-fab-button>
                <!-- <ion-fab-list side="top">
                    <ion-fab-button>
                        <ion-icon :icon="icons.peopleOutline"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button>
                        <ion-icon :icon="icons.peopleOutline"></ion-icon>
                    </ion-fab-button>
                    <ion-fab-button>
                        <ion-icon :icon="icons.peopleOutline"></ion-icon>
                    </ion-fab-button>
                </ion-fab-list> -->
            </ion-fab>
        </ion-content>
        <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
            class="my-custom-class">
        </ion-action-sheet>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { purchaseRequestStore } from '@/store/prStore';
import { useRouter } from 'vue-router';
// data
const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const prStore = purchaseRequestStore();
const router = useRouter();
const mainContentId = 'home-content';
const isOpen = ref(false);
const selectedId = ref('');
const actionSheetButtons = ref([]);
// api 
const logout = () => {

    router.replace({ name: 'Login' });
};
const initialize = async () => {
    const res = await loginStore.loadUser()
    if (!res) {
        router.replace({ name: 'Login' });
    }
};
// computed 
const user = computed(() => loginStore.user); 
const child = computed(() => prStore.detailPr);
const parent = computed(() => prStore.parentPr);
// Another Method 
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
const handleAction = async (action) => {
    isLoading.value = true;
    console.log(`Action ${action} for Id: ${selectedId.value}`);

    let response;

    switch (action) {
        case 'Approve':
            response = await prStore.ApprovePr(user.value.username, selectedId.value);
            if (response) {
                console.log(response)
                proxy.$toast(response.message, response.status);
                // proxy.$toast('Approve Done', 'success');
            }
            break;
        case 'Reject':
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
const setOpen = (state) => {
    isOpen.value = state;
};

onMounted(async () => {
    await initialize();
    console.log(child.value)

});
</script>