<template>
    <ion-page id="detail-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>
                        <h6>PR Number</h6>
                        <p>{{ parent.banfn }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>Header Note</h6>
                        <p>{{ parent.header }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PR Type</h6>
                        <p>{{ parent.bsart }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h6>PR Creator</h6>
                        <p>{{ parent.afnam }}</p>
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
                        <p>{{ item.txz01 }}</p>
                        <ion-row>
                            <ion-col size="2">
                                <p>Qty</p>
                            </ion-col>
                            <ion-col size="1">
                                <p>:</p>
                            </ion-col>
                            <ion-col size="8">
                                <p>{{ item.menge }}</p>
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
                                <p>{{ item.preis }}</p>
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
                                <p>{{ item.preis }}</p>
                            </ion-col>
                        </ion-row>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button @click="openActionSheet(parent.banfn)">
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
const loading = ref(false);
const icons = ref(proxy.$icons);
const loginStore = useLoginStore();
const prStore = purchaseRequestStore();
const router = useRouter();
const isOpen = ref(false);
const selectedId = ref('');
const actionSheetButtons = ref([]);
// api 
const logout = () => {

    router.replace({ name: 'Login' });
};
// computed 
const vdata = computed(() => userAccount.userDetails.data);
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
    loading.value = true;
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
        loading.value = false;
    } else {
        console.error(`Failed to ${action.toLowerCase()} PR for Id: ${selectedId.value}`);
    }
};
const setOpen = (state) => {
    isOpen.value = state;
};

onMounted(async () => {
    console.log(child.value)

});
</script>