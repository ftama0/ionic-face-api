<template>
    <form-modal-component :config="modalConfig" :submitForm="SubmitForm" @closeModal="handleCloseModal">
        <template #content class="content-modal">
            <ion-list :inset="true">
                <ion-list-header>
                    <ion-label class="ion-list-header">Approval Status</ion-label>
                </ion-list-header>
                <ion-radio-group v-model="selectedStatus">
                    <ion-item button @click="selectedStatus = 'To Approve'">
                        <ion-label>To Approve</ion-label>
                        <ion-radio slot="start" value="To Approve"></ion-radio>
                    </ion-item>
                    <ion-item button @click="selectedStatus = 'Approved'">
                        <ion-label>Approved</ion-label>
                        <ion-radio slot="start" value="Approved"></ion-radio>
                    </ion-item>
                    <ion-item button @click="selectedStatus = 'Rejected'">
                        <ion-label>Rejected</ion-label>
                        <ion-radio slot="start" value="Rejected"></ion-radio>
                    </ion-item>
                </ion-radio-group>

                <ion-list-header>
                    <ion-label class="ion-list-header">Periode</ion-label>
                </ion-list-header>
                <ion-radio-group v-model="selectedPeriod">
                    <ion-item button @click="selectedPeriod = 'yearly'">
                        <ion-label>Year</ion-label>
                        <ion-radio slot="start" value="yearly"></ion-radio>
                    </ion-item>
                    <ion-item button @click="selectedPeriod = 'monthly'">
                        <ion-label>Month</ion-label>
                        <ion-radio slot="start" value="monthly"></ion-radio>
                    </ion-item>
                    <ion-item button @click="selectedPeriod = 'daily'">
                        <ion-label>Daily</ion-label>
                        <ion-radio slot="start" value="daily"></ion-radio>
                    </ion-item>
                </ion-radio-group>

                <ion-item v-if="selectedPeriod !== ''">
                    <ion-datetime :presentation="dateTimePresentation" v-model="selectedDate"></ion-datetime>
                </ion-item>

                <ion-list-header>
                    <ion-label class="ion-list-header">Amount Request</ion-label>
                </ion-list-header>
                <ion-radio-group v-model="selectedAmount">
                    <ion-item v-for="amount in amountList" :key="amount.value" button
                        @click="selectedAmount = amount.value">
                        <ion-label>{{ amount.label }}</ion-label>
                        <ion-radio slot="start" :value="amount.value"></ion-radio>
                    </ion-item>
                </ion-radio-group>

                <ion-list-header>
                    <ion-label class="ion-list-header">Company</ion-label>
                </ion-list-header>
                <ion-radio-group v-model="selectedCompany">
                    <ion-item v-for="company in companyList" :key="company.value" button
                        @click="selectedCompany = company.value">
                        <ion-label>{{ company.label }}</ion-label>
                        <ion-radio slot="start" :value="company.value"></ion-radio>
                    </ion-item>
                </ion-radio-group>

                <ion-list-header>
                    <ion-label class="ion-list-header">Plant</ion-label>
                </ion-list-header>
                <ion-radio-group v-model="selectedPlant">
                    <ion-item v-for="plant in plantList" :key="plant.value" button @click="selectedPlant = plant.value">
                        <ion-label>{{ plant.label }}</ion-label>
                        <ion-radio slot="start" :value="plant.value"></ion-radio>
                    </ion-item>
                </ion-radio-group>
            </ion-list>
            <LoadingComponent :isOpen="loading" :message="'Memuat...'" />
        </template>
    </form-modal-component>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, watch, computed } from 'vue';
import { userAccountStore } from '@/store/userAccountStore';
import { modalController } from '@ionic/vue';

const loading = ref(false);
const props = defineProps({
    action: String,
});
const modalConfig = ref({
    actionModal: 'Filter',
    modalTitle: 'Purhcase Order',
    cancelButtonText: 'Close',
    cancelButtonColor: 'danger',
    saveButtonText: 'Apply',
    anotherParam: 1
});
let comment = ref('');

// Data dummy untuk filter
const selectedStatus = ref('To Approve');
const selectedPeriod = ref('monthly');
const selectedAmount = ref('');
const selectedCompany = ref('');
const selectedPlant = ref('');

const amountList = ref([
    { label: '< 1 Juta', value: 'less_than_1m' },
    { label: '1 - 5 Juta', value: '1m_to_5m' },
    { label: '5 - 10 Juta', value: '5m_to_10m' },
    { label: '> 10 Juta', value: 'more_than_10m' }
]);

const companyList = ref([
    { label: 'PT Maju Bersama', value: 'pt_maju_bersama' },
    { label: 'CV Sukses Selalu', value: 'cv_sukses_selalu' },
    { label: 'PT Jaya Abadi', value: 'pt_jaya_abadi' }
]);

const plantList = ref([
    { label: 'Pabrik Jakarta', value: 'jakarta_plant' },
    { label: 'Pabrik Surabaya', value: 'surabaya_plant' },
    { label: 'Pabrik Bandung', value: 'bandung_plant' }
]);

const selectedYear = ref('');
const selectedMonthYear = ref('');
const selectedDate = ref('');

// Computed property untuk menentukan presentasi datetime
const dateTimePresentation = computed(() => {
    switch (selectedPeriod.value) {
        case 'yearly': return 'year';
        case 'monthly': return 'month-year';
        case 'daily': return 'date';
        default: return '';
    }
});

// Fungsi untuk memformat tanggal
const formatDate = (date, period) => {
    if (!date) return '';
    const d = new Date(date);
    switch (period) {
        case 'yearly': return d.getFullYear().toString();
        case 'monthly': return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
        case 'daily': return d.toISOString().split('T')[0];
        default: return '';
    }
};

// Fungsi untuk mengirim data filter
const SubmitForm = async () => {
    // if (!validateForm()) {
    //     // Tampilkan pesan error
    //     return;
    // }

    const filterData = {
        approve_status: selectedStatus.value,
        ...(selectedPeriod.value === 'yearly' ? {
            year: formatDate(selectedDate.value, selectedPeriod.value)
        } : selectedPeriod.value === 'monthly' ? {
            month: formatDate(selectedDate.value, selectedPeriod.value)
        } : {
            daily: formatDate(selectedDate.value, selectedPeriod.value)
        }),
        amount_request: selectedAmount.value,
        company: selectedCompany.value,
        plant: selectedPlant.value
    };
    console.log('Data filter:', filterData);
    handleCloseModal(filterData, 'confirm');
};

// Fungsi validasi form
const validateForm = () => {
    if (!selectedStatus.value || !selectedPeriod.value || !selectedDate.value ||
        !selectedAmount.value || !selectedCompany.value || !selectedPlant.value) {
        return false;
    }
    return true;
};

const handleCloseModal = async (res, action) => {
    await modalController.dismiss(res, action);
};
// mount 
onMounted(async () => {
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

.ion-list-header {
    font-size: 20px;
    line-height: 18px;
    font-weight: 600;
    color: #626060;
}

ion-datetime {
    --background: #CFE5FF;
    --background-rgb: 231, 242, 255;

    border-radius: 16px;
    box-shadow: rgba(var(--ion-color-rose-rgb), 0.3) 0px 10px 15px -3px;
}
</style>