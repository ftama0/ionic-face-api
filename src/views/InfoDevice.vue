<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border">
            <ion-toolbar class="ion-text-center ion-padding-top ion-margin-top">
                <ion-title>
                    <h3 class="ion-padding-top">Info Device</h3>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-loading v-if="isLoading" message="Loading ..." spinner="circles"></ion-loading>
            <div v-if="deviceInfo">
                <p><strong>Platform:</strong> {{ deviceInfo.platform }}</p>
                <p><strong>Model:</strong> {{ deviceInfo.model }}</p>
                <p><strong>Operating System:</strong> {{ deviceInfo.operatingSystem }}</p>
                <p><strong>OS Version:</strong> {{ deviceInfo.osVersion }}</p>
                <p><strong>All Device Info :</strong> {{ deviceInfo }}</p>
            </div>
        </ion-content>
        <ion-footer class="ion-no-border ion-padding-bottom">
            <ion-toolbar>
                <ion-title class="ion-text-center">
                    <h6>Copyright © 2024</h6>
                    <h6>PT Hasnur Informasi Teknologi</h6>
                    <h6 class="italic">All rights reserved</h6>
                </ion-title>
            </ion-toolbar>
        </ion-footer>
        <ion-toast :is-open="isOpen" :message="toastMessage" :duration="toastDuration" :position="toastPosition"
            @didDismiss="setOpen(false)"></ion-toast>
    </ion-page>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { getDeviceInfo, isMobilePlatform } from '@/plugins/device';
export default {
    name: 'Login',
    components: {},
    setup() {
        const deviceInfo = ref(null);
        const isLoading = ref(false);
        //  toast 
        const toastMessage = ref(''); // Toast message
        const toastDuration = ref(5000); // Toast duration in milliseconds
        const toastPosition = ref('top'); // Toast position on screen
        const isOpen = ref(false); // Reactive variable to control toast visibility
        const setOpen = (state) => {
            isOpen.value = state;
        };

        const showToast = (message, duration = 5000, position = 'top') => {
            toastMessage.value = message;
            toastDuration.value = duration;
            toastPosition.value = position;
            setOpen(true);
        };

        // api 
        onMounted(async () => {
            isLoading.value = true;
            deviceInfo.value = await getDeviceInfo();
            const isMobile = await isMobilePlatform();
            console.log('Running on mobile:', isMobile);
            isLoading.value = false;
        });

        return {
            isLoading,
            toastDuration,
            toastPosition,
            isOpen,
            toastMessage,
            deviceInfo,
        };
    },
};
</script>

<style>
/* Add your custom styles here */
</style>