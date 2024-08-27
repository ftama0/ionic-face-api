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
                        <div v-for="(item, index) in items" :key="index">
                            <ion-card>
                                <ion-card-header router-link="/costCenterPoDetail">
                                    <ion-card-title>{{ item.name }}</ion-card-title>
                                </ion-card-header>
                                <ion-card-content router-link="/costCenterPoDetail">
                                    {{ item.description }}
                                    <br>
                                    {{ item.description }}
                                </ion-card-content>
                                <div class="button-container">
                                    <ion-button size="default" @click="handleAction('Edit')">
                                        <ion-icon aria-hidden="true" slot="start" :icon="icons.openOutline"></ion-icon>
                                        Edit
                                    </ion-button>
                                </div>
                            </ion-card>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                <ion-fab-button @click="handleAction('Add')">
                    <ion-icon :icon="icons.addOutline"></ion-icon>
                </ion-fab-button>
            </ion-fab>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import Modal from './VMaintainCostCenterPoModal.vue';
import { modalController } from '@ionic/vue';
import { star } from 'ionicons/icons';

const { proxy } = getCurrentInstance()
const isLoading = ref(false);
const icons = ref(proxy.$icons);
const mainContentId = 'cost-center-po-content';
const search = ref('');

const isOpen = ref(false);
const selectedId = ref('');


const items = ref([
    {
        id: 1,
        name: 'Item 1',
        description: 'Description of Item 1',
    },
    {
        id: 2,
        name: 'Item 2',
        description: 'Description of Item 2',
    },
    {
        id: 3,
        name: 'Item 3',
        description: 'Description of Item 3',
    },
    {
        id: 4,
        name: 'Item 4',
        description: 'Description of Item 4',
    },
    {
        id: 5,
        name: 'Item 5',
        description: 'Description of Item 5',
    },
]);


const handleSearch = () => { }


// Method to handle action button click in Action Sheet
const handleAction = async (action) => {
    isLoading.value = true;

    let response;
    switch (action) {
        case 'Add':
            await openModal(action);
            break;
        case 'Edit':
            await openModal(action);
            break;
        default:
            console.warn(`Unknown action: ${action}`);
            proxy.$toast('Failed, contact admin', 'danger');

    }
};

const openModal = async (action) => {
    console.log('open modal');
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