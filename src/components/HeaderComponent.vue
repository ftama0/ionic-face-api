<template>
    <ion-header :translucent="true" class="ion-no-border ion-margin-bottom">
        <ion-toolbar class="toolbar-custom">
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>
</template>


<style scoped>
.toolbar-custom {
    box-shadow: 0 -4px 16px rgba(0, 0, 1, 0.2);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: var(--ion-background-color);
}
</style>

<script setup>
import { getCurrentInstance, ref, defineProps } from 'vue';

const props = defineProps({
    title: String,
});

</script>