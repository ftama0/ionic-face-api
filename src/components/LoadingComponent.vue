<template>
    <ion-loading :is-open="isOpen" :duration="duration" :message="message" :spinner="spinner"></ion-loading>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    duration: {
        type: Number,
        default: 3000
    },
    message: {
        type: String,
        default: 'Processing...'
    },
    spinner: {
        type: String,
        default: 'circles'
    }
});
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>