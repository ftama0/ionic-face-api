<template>
    <form-modal-component :config="modalConfig" :submitForm="customSubmitForm" @closeModal="handleCloseModal">
        <template #content>
            <ion-row class="ion-padding">
                <ion-col size="12" class="ion-padding-top">
                    <ion-input label-placement="stacked" placeholder="Enter Username" type="text" fill="outline"
                        label="Username" :clear-input="true" v-model="vdata.username" required></ion-input>
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
        </template>
    </form-modal-component>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, defineProps } from 'vue';
import FormModalComponent from '@/components/FormModalComponent.vue';
import { userManagementStore } from '@/store/userManagementStore';
import { modalController } from '@ionic/vue';

const props = defineProps({
    action: String,
});
const modalConfig = ref({
    actionModal: props.action,
    modalTitle: 'User Account',
    cancelButtonText: 'Close',
    cancelButtonColor: 'danger',
    saveButtonText: 'Save',
    anotherParam: 1
});
const vdata = ref({
    status: true
});
const userStore = userManagementStore();
const { proxy } = getCurrentInstance()
const toggleStatus = (event) => {
    vdata.value.status = event.detail.checked;
    console.log(vdata.value)
};
// api
const customSubmitForm = async () => {
    try {
        console.log('ini parent', vdata.value)
        // loading.value = true;
        await userStore.saveUserAccount(vdata);
        await $modal.close(vdata.value, 'confirm');
    } catch (error) {
        console.error('Save Data:', error);
        proxy.$toast('Failed to save data', 'danger');
    } finally {
        // loading.value = false;
    }
};
const handleCloseModal = (action, data) => {
    console.log(action, data)
    modalController.dismiss(data, action);
};
// mount 
onMounted(async () => { });
</script>

<style scoped>
.status-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

</style>