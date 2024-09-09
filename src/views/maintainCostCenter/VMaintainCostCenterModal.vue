<template>
    <form-modal-component :config="modalConfig" :submitForm="submitForm" @closeModal="handleCloseModal">
        <template #content class="content-modal">
            <ion-list>
                <ion-item>
                    <ion-label position="stacked">User Account</ion-label>
                    <ion-select aria-label="user_account" label="select user" placeholder="User"
                        v-model="dataForm.user_account" :disabled="props.typeModal == 'Edit'">
                        <ion-select-option v-for="user in listUser" :key="user.uuid" :value="user.uuid">
                            {{ user.fullname }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Client</ion-label>
                    <ion-select aria-label="client" label="select client" placeholder="Client"
                        v-model="dataForm.client_id" @ionChange="handleClientChange">
                        <ion-select-option v-for="client in dataClient" :key="client.client_code"
                            :value="client.client_code">
                            {{ client.client_code }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Company Code</ion-label>
                    <ion-select aria-label="company" label="select company" placeholder="Company"
                        v-model="dataForm.company_code" @ionChange="handleCompanyChange" fill="outline">
                        <ion-select-option v-for="company in dataCompany" :key="company.company_name"
                            :value="company.company_code">
                            {{ company.company_name }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Cost Center</ion-label>
                    <ion-select aria-label="cost center" label="select cost center" placeholder="Cost Center"
                        v-model="dataForm.cost_center">
                        <ion-select-option v-for="costCenter in dataCostCenters" :key="costCenter.kostl"
                            :value="costCenter.id">
                            {{ costCenter.kostl }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-button size="default" @click="handleAddCostCenter">
                        Add Cost Center
                    </ion-button>
                </ion-item>

            </ion-list>
            <div v-if="addedCostCenters.length > 0">
                <ion-list :inset="true">
                    <ion-item v-for="(costCenter, index) in addedCostCenters" :key="index">
                        <ion-label>{{ costCenter.kostl }} - {{ costCenter.bukrs }}
                            ({{ costCenter.mandt }})</ion-label>
                        <ion-button color="danger" size="small" slot="end" @click="handleDeleteCostCenter(index)">
                            X
                        </ion-button>
                    </ion-item>
                </ion-list>
            </div>
            <LoadingComponent :isOpen="isLoading" :message="'Loading...'" />
        </template>
    </form-modal-component>
</template>


<script setup>
import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue';
import { modalController } from '@ionic/vue';
import { userAccountStore } from '@/store/userAccountStore';
import { costCenterStore } from '@/store/costCenterStore';

const { proxy } = getCurrentInstance();
const csStore = costCenterStore();
const userAccount = userAccountStore();
const props = defineProps({
    typeModal: String,
    anotherParam: Number,
});


const modalConfig = ref({
    actionModal: props.typeModal,
    modalTitle: 'Cost Center',
    cancelButtonText: 'Close',
    cancelButtonColor: 'danger',
    saveButtonText: 'Save',
    anotherParam: 1
});
const dataForm = ref({});
const dataFormForSubmit = ref({});
const isLoading = ref(false);

const listUser = computed(() => userAccount.userList);
const dataClient = computed(() => csStore.dataClient);
// const dataCompany = computed(() => csStore.dataCompany);
// const dataCostCenters = computed(() => csStore.dataCostCenters);
const dataCompany = ref([]);
const dataCostCenters = ref([]);
const addedCostCenters = ref([]);
const idCostCenters = ref([]);


const fetchDataCompany = async (client_id) => {
    isLoading.value = true;
    try {
        await csStore.getCompany(client_id);
        dataCompany.value = csStore.dataCompany;
        proxy.$toast('Success fetching data company', 'success');

    } catch (error) {
        console.error('Error fetching data company:', error);
        proxy.$toast('Error fetching data company', 'danger');
    } finally {
        isLoading.value = false;
    }
};

const fetchDataCostCenter = async (company_code, client_id) => {
    isLoading.value = true;
    try {
        await csStore.getCostCenters(company_code, client_id);
        dataCostCenters.value = csStore.dataCostCenters;
        proxy.$toast('Success fetching data cost centers', 'success');
    } catch (error) {
        console.error('Error fetching data cost centers:', error);
        proxy.$toast('Error fetching data cost centers', 'danger');

    } finally {
        isLoading.value = false;
    }
};

const handleClientChange = async (event) => {
    const selectedClient = event.target.value;
    dataCompany.value = [];
    dataCostCenters.value = [];
    await fetchDataCompany(selectedClient);
};

const handleCompanyChange = async (event) => {
    const client_id = dataForm.value.client_id;
    const selectedCompany = event.target.value;
    console.log(selectedCompany);
    dataCostCenters.value = [];
    await fetchDataCostCenter(selectedCompany, client_id)
};

const handleAddCostCenter = async () => {
    const selectedCostCenter = dataCostCenters.value.find(center => center.id === dataForm.value.cost_center);
    console.log(selectedCostCenter);
    if (selectedCostCenter) {
        if (idCostCenters.value.includes(selectedCostCenter.id)) {
            proxy.$toast('Cost Center is already added.', 'danger');
            return;
        }
        addedCostCenters.value.push(selectedCostCenter);
        idCostCenters.value.push(selectedCostCenter.id);
    }
};

const handleDeleteCostCenter = async (index) => {
    addedCostCenters.value.splice(index, 1);
    idCostCenters.value.splice(index, 1);
};

const submitForm = async () => {

    isLoading.value = true;
    try {
        let res = '';
        if (props.typeModal == 'Edit') {
            dataFormForSubmit.value.csks_id = idCostCenters.value
            dataFormForSubmit.value.uuid = dataForm.value.user_account

            console.log(dataFormForSubmit.value.csks_id);
            console.log(dataFormForSubmit.value.uuid);
            if (dataFormForSubmit.value.csks_id.length > 0 && dataFormForSubmit.value.uuid !== undefined) {
                res = await csStore.updateCostCenter(dataFormForSubmit);
                await handleCloseModal(res, 'confirm');
            } else {
                proxy.$toast('Pastikan sudah mengisi data user account dan cost center', 'danger');
            }
        } else {
            dataFormForSubmit.value.csks_id = idCostCenters.value
            dataFormForSubmit.value.uuid = dataForm.value.user_account
            if (dataFormForSubmit.value.csks_id.length > 0 && dataFormForSubmit.value.uuid !== undefined) {
                res = await csStore.createCostCenter(dataFormForSubmit);
                await handleCloseModal(res, 'confirm');
            } else {
                proxy.$toast('Pastikan sudah mengisi data user account dan cost center', 'danger');
            }
        }
    } catch (error) {
        console.error('Save Data:', error);
        proxy.$toast('Failed to save data', 'danger');
    } finally {
        isLoading.value = false;
    }
};

const handleCloseModal = async (res, action) => {
    await modalController.dismiss(res, action);
};

onMounted(async () => {
    await userAccount.allUser(true, 1, 100);
    await csStore.getClient();
    if (props.typeModal == 'Edit') {
        const userCsks = csStore.dataDetails.data.user_csks;
        dataForm.value.user_account = csStore.dataDetails.data.uuid;
        if (userCsks && Array.isArray(userCsks)) {
            addedCostCenters.value = [...userCsks];
            dataCostCenters.value = [...userCsks];
            idCostCenters.value = userCsks.map(costCenter => costCenter.id);
        }
    }
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