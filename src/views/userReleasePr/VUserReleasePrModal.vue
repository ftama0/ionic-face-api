<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>{{ typeModal }} Release Code PR</ion-title>
            <ion-buttons slot="end" @click="triggerSubmit">
                <ion-button type="submit" :strong="true">Save</ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loading" type="indeterminate" color="primary"></ion-progress-bar>
        </ion-toolbar>
    </ion-header>
    <ion-content color="light">
        <form ref="myForm" @submit.prevent="submitForm">
            <ion-row class="ion-padding">
                <ion-col size="12" class="ion-padding-top">
                    <ion-select aria-label="status" label="User select" label-placement="floating"
                        placeholder="Status" fill="outline" >
                        <ion-icon slot="start" :icon="icons.personOutline" aria-hidden="true"></ion-icon>
                        <ion-select-option value="active">Active</ion-select-option>
                        <ion-select-option value="nonActive">Non Active</ion-select-option>
                        <ion-select-option value="nonActive">Non Active</ion-select-option>
                        <ion-select-option value="nonActive">Non Active</ion-select-option>
                        <ion-select-option value="nonActive">Non Active</ion-select-option>
                        <ion-select-option value="nonActive">Non Active</ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col size="12" class="ion-padding-top">
                    <ion-input label-placement="stacked" placeholder="Enter Fullname" type="text" fill="outline"
                        label="Full Name" :clear-input="true" v-model="vdata.fullname" required></ion-input>
                </ion-col>
                <ion-col size="12" class="ion-padding-top">
                    <ion-input label-placement="stacked" placeholder="Enter Email" type="email" fill="outline"
                        label="Email" :clear-input="true" v-model="vdata.email" required></ion-input>
                </ion-col>
                <ion-col size="12" class="ion-padding-top">
                    <ion-input label-placement="stacked" placeholder="Enter Role" type="text" fill="outline"
                        label="Role" :clear-input="true" v-model="vdata.role" required></ion-input>
                </ion-col>

                <ion-col size="12" class="ion-padding status-container">
                    <ion-label>Status</ion-label>
                    <ion-toggle :checked="vdata.status" @ionChange="toggleStatus"></ion-toggle>
                </ion-col>
            </ion-row>
        </form>
    </ion-content>
</template>

<script setup>
import { ref, onMounted, computed, watch, getCurrentInstance, defineProps } from 'vue';
import { modalController } from '@ionic/vue';
import { useLoginStore } from '@/store/loginStore';
import { userManagementStore } from '@/store/userManagementStore';
import { useRouter } from 'vue-router';
import { Keyboard } from '@capacitor/keyboard';
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const vdata = ref({
    status: true
});
const myForm = ref(null);
const cancel = () => modalController.dismiss(null, 'cancel');
const confirm = (data) => modalController.dismiss(data, 'confirm');
const userStore = userManagementStore(); // Menggunakan useLoginStore untuk mendapatkan store
const props = defineProps({
    typeModal: String,
    anotherParam: Number,
});
const loading = ref(false);


const toggleStatus = (event) => {
    vdata.value.status = event.detail.checked;
    console.log(vdata.value)
};

const triggerSubmit = () => {
    if (myForm.value && myForm.value.reportValidity()) {
        myForm.value.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
};
// api
const submitForm = async () => {
    try {
        loading.value = true;
        console.log('masuk', vdata.value)
        await userStore.saveUserAccount(vdata);
        confirm(vdata.value);
    } catch (error) {
        console.error('Save Data:', error);
        proxy.$toast('Failed to save data', 'danger');
    }
    finally {
        loading.value = false;
    }
};
// mount 
onMounted(async () => {
    console.log(props.typeModal)
});
</script>

<style scoped>
.status-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>