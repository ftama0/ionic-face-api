<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button :color="config.cancelButtonColor" @click="emitClose('cancel')">
                    {{ config.cancelButtonText }}
                </ion-button>
            </ion-buttons>
            <ion-title>{{ config.actionModal }} {{ config.modalTitle }}</ion-title>
            <ion-buttons slot="end" @click="triggerSubmit">
                <ion-button type="submit" :strong="true">{{ config.saveButtonText }}</ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loading" type="indeterminate" color="primary"></ion-progress-bar>
        </ion-toolbar>
    </ion-header>
    <ion-content color="light">
        <form ref="myForm" @submit.prevent="submit">
            <slot name="content"></slot>
        </form>
    </ion-content>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
    config: {
        type: Object,
        default: () => ({
            actionModal: 'Create',
            modalTitle: 'Account',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'medium',
            saveButtonText: 'Save',
            anotherParam: 1
        })
    },
    submitForm: {
        type: Function,
        default: () => { }
    },
});
const emits = defineEmits(['closeModal']); // Define emit event

const myForm = ref(null);
const loading = ref(false);

const emitClose = (action, data = null) => {
    emits('closeModal', { action, data });
};

const triggerSubmit = () => {
    console.log(myForm.value);
    if (myForm.value && myForm.value.reportValidity()) {
        myForm.value.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
};

const submit = props.submitForm;

onMounted(() => {
});
</script>

<style scoped></style>
