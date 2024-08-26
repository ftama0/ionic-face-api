<template>
    <form-modal-component :config="modalConfig" :submitForm="SubmitForm" @closeModal="handleCloseModal">
        <template #content class="content-modal">
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
                    <ion-select aria-label="status" label="Select Role" label-placement="floating" placeholder="Status"
                        fill="outline" v-model="vdata.role">
                        <ion-select-option :value="1">Admin</ion-select-option>
                        <ion-select-option :value="2">Approver</ion-select-option>
                        <ion-select-option :value="3">User</ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col size="12" class="ion-padding status-container">
                    <ion-label>Status</ion-label>
                    <ion-toggle :checked="vdata.status" @ionChange="toggleStatus"></ion-toggle>
                </ion-col>
            </ion-row>
            <LoadingComponent :isOpen="loading" :message="'Loading data...'" />
        </template>
    </form-modal-component>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, defineProps, watch } from 'vue';
import { userAccountStore } from '@/store/userAccountStore';
import { modalController } from '@ionic/vue';

const loading = ref(false);
const props = defineProps({
    action: String,
});
const modalConfig = ref({
    actionModal: props.action,
    modalTitle: 'New Account',
    cancelButtonText: 'Close',
    cancelButtonColor: 'danger',
    saveButtonText: 'Save',
    anotherParam: 1
});
let vdata = ref({ status: true });
const userAccount = userAccountStore();
const { proxy } = getCurrentInstance()
const toggleStatus = (event) => {
    vdata.value.status = event.detail.checked;
    console.log(vdata.value)
};
// api
const SubmitForm = async () => {
    loading.value = true;
    try {
        console.log('ini form data', vdata.value)
        console.log(vdata.value);
        let res = ';'
        if (props.action == 'Edit') {
            res = await userAccount.updateUser(vdata);
        } else {
            res = await userAccount.createUser(vdata);
        }
        await userAccount.allUser(true);
        await handleCloseModal(res, 'confirm');
    } catch (error) {
        console.error('Save Data:', error);
        proxy.$toast('Faile d to save data', 'danger');
    } finally {
        loading.value = false;
    }
};
const handleCloseModal = async (res, action) => {
    await modalController.dismiss(res, action);
};
const initialize = async () => {
};
// mount 
onMounted(async () => {
    if (props.action == 'Edit') {
        vdata.value = Object.assign({}, vdata.value, userAccount.userDetails);
        vdata.value.role = vdata.value.role_id;
    }
});

</script>

<style scoped>
.status-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.content-modal {
    --ion-color-base: #ffffff;
}
</style>