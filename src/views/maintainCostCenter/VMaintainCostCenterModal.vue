<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>{{ typeModal }} Cost Center</ion-title>
            <ion-buttons slot="end" @click="triggerSubmit">
                <ion-button type="submit" :strong="true">Save</ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loading" type="indeterminate" color="primary"></ion-progress-bar>
        </ion-toolbar>
    </ion-header>
    <ion-content color="light" style="background-color: white;">
        <form ref="myForm" @submit.prevent="submitForm" style="background-color: white;">
            <ion-row class="ion-padding">
                <ion-col size="12">
                    <p>User Account</p>
                </ion-col>
                <ion-col size="12" class="ion-padding-top">
                    <ion-select aria-label="status" label="Select User" label-placement="floating"
                        placeholder="Select User" fill="outline">
                        <ion-select-option v-for="user in listUser" :key="user.uuid" :value="user.uuid">
                            {{ user.fullname }}
                        </ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col size="12">
                    <p>Client</p>
                </ion-col>
                <ion-col size="12">
                    <ion-select aria-label="status" label="Choose Client" label-placement="floating"
                        placeholder="Client" fill="outline">
                        <ion-select-option value="Client 1">Client 1</ion-select-option>
                        <ion-select-option value="Client 2">Client 2</ion-select-option>
                        <ion-select-option value="Client 3">Client 3</ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col size="12">
                    <p>Company Code</p>
                </ion-col>
                <ion-col size="12">
                    <ion-select aria-label="status" label="Choose Company Code" label-placement="floating"
                        placeholder="Company Code" fill="outline">
                        <ion-select-option value="Company Code 1">Company Code 1</ion-select-option>
                        <ion-select-option value="Company Code 2">Company Code 2</ion-select-option>
                        <ion-select-option value="Company Code 3">Company Code 3</ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col size="12">
                    <p>Cost Center</p>
                </ion-col>
                <ion-col size="12">
                    <ion-select aria-label="status" label="Choose Cost Center" label-placement="floating"
                        placeholder="Cost Center" fill="outline">
                        <ion-select-option value="Cost Center 1">Cost Center 1</ion-select-option>
                        <ion-select-option value="Cost Center 2">Cost Center 2</ion-select-option>
                        <ion-select-option value="Cost Center 3">Cost Center 3</ion-select-option>
                    </ion-select>
                </ion-col>

                <div class="pt-3">
                    <ion-button size="default">
                        Add Cost Center
                    </ion-button>
                </div>
            </ion-row>
        </form>
    </ion-content>
</template>

<script setup>
import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue';
import { modalController } from '@ionic/vue';
import { userAccountStore } from '@/store/userAccountStore';
import { useRouter } from 'vue-router';
import { Keyboard } from '@capacitor/keyboard';


const userAccount = userAccountStore();
const listUser = computed(() => userAccount.userList);
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const vdata = ref({
    status: true
});
const myForm = ref(null);
const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = (data) => modalController.dismiss(data, 'confirm');
const props = defineProps({
    typeModal: String,
    anotherParam: Number,
});
const loading = ref(false);
const isLoading = ref(false);


const toggleStatus = (event) => {
};

const triggerSubmit = () => {
};

const submitForm = async () => {
};
</script>

<style scoped>
.status-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

ion-checkbox {
    --size: 32px;
    --checkbox-background-checked: #6815ec;
}

ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #6815ec;
}
</style>