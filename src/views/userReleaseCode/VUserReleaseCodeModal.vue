<template>
    <form-modal-component :config="modalConfig" :submitForm="SubmitForm" @closeModal="handleCloseModal">
        <template #content class="content-modal">
            <ion-list class="ion-padding">
                <ion-item>
                    <ion-label><b>Name</b></ion-label>
                </ion-item>
                <ion-item>
                    <ion-select aria-label="status" label="Select User" label-placement="floating"
                        placeholder="Select User" fill="outline" v-model="vdata.uuid">
                        <ion-select-option v-for="user in listUser" :key="user.uuid" :value="user.uuid">
                            {{ user.fullname }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label><b>Release Code</b></ion-label>
                </ion-item>
                <ion-item v-for="(item, index) in listReleaseCode" :key="index">
                    <ion-checkbox :value="item.id" label-placement="start"
                        @ionChange="handleReleaseCodeChange(item.id, $event)" :checked="isChecked(item.id)">
                        {{ item.frgct }} ({{ item.frgco }})
                    </ion-checkbox>
                </ion-item>
            </ion-list>
            <LoadingComponent :isOpen="loading" :message="'Loading...'" />
        </template>
    </form-modal-component>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, watch, computed } from 'vue';
import { userAccountStore } from '@/store/userAccountStore';
import { userReleaseCodeStore } from '@/store/userReleaseCodeStore';
import { modalController } from '@ionic/vue';
const userAccount = userAccountStore();
const rcStore = userReleaseCodeStore();
const props = defineProps({
    action: String,
    type: String,
});
let vdata = ref({ release_id: [], type: props.type });
const listUser = computed(() => userAccount.userList);
const listReleaseCode = computed(() => rcStore.releaseCodeList);
const title = computed(() => props.type === 'RH' ? 'PR' : 'PO');

const modalConfig = ref({
    actionModal: props.action,
    modalTitle: `Release Code ${title.value}`,
    cancelButtonText: 'Close',
    cancelButtonColor: 'danger',
    saveButtonText: 'Save',
    anotherParam: 1
});
const { proxy } = getCurrentInstance()
const loading = ref(false);
// api
const SubmitForm = async () => {
    loading.value = true;
    try {
        console.log('ini form data', vdata.value)
        console.log(vdata.value);
        let res = '';
        if (props.action == 'Edit') {
            res = await rcStore.updateUserReleaseCode(vdata);
        } else {
            res = await rcStore.createUserReleaseCode(vdata);
        }
        await rcStore.allUserReleaseCode(props.type);
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
// mount 
onMounted(async () => {
    if (props.action == 'Edit') {
        let data = Object.assign({}, vdata.value, userAccount.userDetails);
        console.log('data', data);
        vdata.value.release_id = data[props.type === 'RH' ? 'pr_release' : 'po_release']?.map(item => item.release_id) || [];
        vdata.value.uuid = data.data.uuid;
        console.log('vdata.value', vdata.value);
    }
});

// Tambahkan fungsi ini
const handleReleaseCodeChange = (id, event) => {
    if (event.detail.checked) {
        vdata.value.release_id.push(id);
    } else {
        vdata.value.release_id = vdata.value.release_id.filter(item => item !== id);
    }
    // console.log('Release IDs:', vdata.value.release_id);
};

// Tambahkan fungsi ini
const isChecked = (id) => {
    return vdata.value.release_id.includes(id);
};

</script>
<style scoped>
.status-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

ion-checkbox {
    --size: 28px;
    --checkbox-background-checked: #0070F2;
}

ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #0070F2;
}
</style>