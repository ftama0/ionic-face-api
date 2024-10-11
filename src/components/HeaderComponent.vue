<template>
    <ion-header :translucent="true" class="ion-no-border ion-margin-bottom">
        <ion-toolbar class="toolbar-custom">
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="$router.push({ name: 'Notification' })">
                    <ion-icon :icon="notificationsOutline"></ion-icon>
                    <ion-badge slot="end" color="danger">{{ homeData.total_notification }}</ion-badge>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from 'vue';
import { notificationsOutline } from 'ionicons/icons';
import { useLoginStore } from '@/store/loginStore';
const loginStore = useLoginStore();
const homeData = computed(() => loginStore.homeData);
const props = defineProps({
    title: String,
});

</script>

<style scoped>
.toolbar-custom {
    box-shadow: 0 -4px 16px rgba(0, 0, 1, 0.1);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: var(--ion-background-color);
}
</style>