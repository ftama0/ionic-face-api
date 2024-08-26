<template>
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
</template>

<script setup>
// import { defineEmits } from 'vue';

const emit = defineEmits();

const handleRefresh = async (event) => {
    try {
        await emit('refresh', event);
    } catch (error) {
        console.error('Refresh error:', error);
    } finally {
        event.target.complete();
    }
};
</script>

<style scoped></style>