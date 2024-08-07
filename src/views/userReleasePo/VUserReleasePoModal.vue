<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">Cancel</ion-button>
            </ion-buttons>
            <ion-title>{{ typeModal }} Release Code PO</ion-title>
            <ion-buttons slot="end" @click="triggerSubmit">
                <ion-button type="submit" :strong="true">Save</ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loading" type="indeterminate" color="primary"></ion-progress-bar>
        </ion-toolbar>
    </ion-header>
    <ion-content color="light" style="background-color: white;">
        <form ref="myForm" @submit.prevent="submitForm" style="background-color: white;">
            <ion-row class="ion-padding">
                <ion-col size="12" class="ion-padding-top">
                    <ion-select aria-label="status" label="User select" label-placement="floating" placeholder="Status"
                        fill="outline">
                        <ion-icon slot="start" :icon="icons.personOutline" aria-hidden="true"></ion-icon>
                        <ion-select-option value="active">Ferry</ion-select-option>
                        <ion-select-option value="nonActive">Malik</ion-select-option>
                        <ion-select-option value="nonActive">Rifki</ion-select-option>
                        <ion-select-option value="nonActive">Aldo</ion-select-option>
                        <ion-select-option value="nonActive">Angga</ion-select-option>
                        <ion-select-option value="nonActive">Angga</ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col size="12">
                    <p>Release Code</p>
                </ion-col>
                <ion-col size="12" v-for="(item, index) in listRc" :key="index">
                    <ion-checkbox :value="item.FRGCO" label-placement="end">{{ item.FRGCT }}</ion-checkbox>
                    <br />
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
import { purchaseOrderStore } from '@/store/poStore';
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
const userStore = userManagementStore();
const poStore = purchaseOrderStore();
const props = defineProps({
    typeModal: String,
    anotherParam: Number,
});
const loading = ref(false);
const isLoading = ref(false);


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
const fetchReleaseCode = async () => {
    try {
        isLoading.value = true;
        await poStore.fetchReleaseCode();
    } catch (error) {
        console.error('Error fetching list PR:', error);
    }
    finally {
        isLoading.value = false;
    }
};
const listRc = computed(() => poStore.listRc);
// mount 
onMounted(async () => {
    console.log(props.typeModal)
    await fetchReleaseCode();
});
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