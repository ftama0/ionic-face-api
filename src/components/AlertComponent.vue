<template>
    <ion-alert :is-open="isOpen" :header="header" :buttons="alertButtons" @didDismiss="handleDismiss"></ion-alert>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { ref } from 'vue';
import { IonAlert } from '@ionic/vue';

const props = defineProps({
    isOpen: Boolean,
    header: String,
    confirmText: {
        type: String,
        default: 'OK'
    },
    cancelText: {
        type: String,
        default: 'Batal'
    },
    currentAction: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['dismiss']);

const alertButtons = [
    {
        text: props.cancelText,
        role: 'cancel',
        cssClass: 'alert-button-cancel',
        handler: () => {
            emit('dismiss', { role: 'cancel' });
        },
    },
    {
        text: props.confirmText,
        role: 'confirm',
        handler: () => {
            console.log(`Alert dikonfirmasi untuk ${props.currentAction}`);
            emit('dismiss', { role: 'confirm', action: props.currentAction });
        },
    },
];

const handleDismiss = (ev) => {
    emit('dismiss', ev.detail);
};
</script>
<style scoped></style>