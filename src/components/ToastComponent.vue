<!-- src/components/ToastComponent.vue -->
<template>
    <ion-toast :is-open="isOpen" :message="toastMessage" :duration="toastDuration" :position="toastPosition"
        :color="toastColor" :buttons="toastButtons" @didDismiss="setOpen(false)" class="custom-toast">
    </ion-toast>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { IonToast } from '@ionic/vue';

export default defineComponent({
    name: 'ToastComponent',
    components: { IonToast },
    setup() {
        const toastMessage = ref('');
        const toastDuration = ref(5000);
        const toastPosition = ref('top');
        const toastColor = ref('primary');
        const isOpen = ref(false);
        const toastButtons = [
            {
                text: 'X',
                role: 'cancel',
            },
        ];

        const setOpen = (state) => {
            isOpen.value = state;
        };

        const showToast = (message, color = 'light', duration = 5000, position = 'top', buttons = []) => {
            toastMessage.value = message;
            toastDuration.value = duration;
            toastPosition.value = position;
            toastColor.value = color;
            toastButtons.value = buttons;
            setOpen(true);
        };

        return {
            toastMessage,
            toastDuration,
            toastPosition,
            toastColor,
            isOpen,
            toastButtons,
            setOpen,
            showToast,
        };
    },
});
</script>