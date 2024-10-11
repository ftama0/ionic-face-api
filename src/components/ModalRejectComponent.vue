<template>
    <form-modal-component :config="modalConfig" :submitForm="SubmitForm" @closeModal="handleCloseModal">
        <template #content class="content-modal">
            <ion-list :inset="true">
                <ion-item>
                    <ion-label class="small-label">Add a comment *</ion-label>
                </ion-item>
                <ion-item>
                    <ion-textarea placeholder="Write a Comment" rows="5" v-model="comment"
                        style="--background: #f0f0f0; border: 1px solid black;"></ion-textarea>
                </ion-item>
                <ion-item>
                    <ion-label class="small-label">(*) Wajib Diisi</ion-label>
                </ion-item>
            </ion-list>

            <LoadingComponent :isOpen="loading" :message="'Loading...'" />
        </template>
    </form-modal-component>
</template>


<script setup>
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
import { userAccountStore } from '@/store/userAccountStore';
import { modalController } from '@ionic/vue';

const loading = ref(false);
const props = defineProps({
    action: String,
    title: String,
});
const modalConfig = ref({
    actionModal: props.action.charAt(0).toUpperCase() + props.action.slice(1).toLowerCase(),
    modalTitle: props.title,
    cancelButtonText: 'Close',
    cancelButtonColor: 'danger',
    saveButtonText: 'Submit',
    anotherParam: 1
});
let comment = ref('');

const { proxy } = getCurrentInstance()

const SubmitForm = async () => {
    console.log('Nilai comment:', comment.value);
    if (!comment.value.trim()) {
        proxy.$toast('Komentar wajib diisi', 'warning');
        return false;
    }
    handleCloseModal(comment.value, 'confirm');
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
</style>