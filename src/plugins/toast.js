// src/plugins/toastPlugin.js
import { createApp, ref } from 'vue';
import { IonToast } from '@ionic/vue';

export default {
  install(app) {
    const toastMessage = ref('');
    const toastDuration = ref(5000);
    const toastPosition = ref('top');
    const toastColor = ref('primary'); // Default color
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
      toastButtons.value = buttons; // Set the buttons
      setOpen(true);
    };

    const ToastComponent = {
      components: { IonToast },
      template: `
        <ion-toast :is-open="isOpen" :message="toastMessage" :duration="toastDuration" :position="toastPosition"
          :color="toastColor" :buttons="toastButtons" @didDismiss="setOpen(false)" class="custom-toast"></ion-toast>
      `,
      setup() {
        return {
          toastMessage,
          toastDuration,
          toastPosition,
          toastColor,
          isOpen,
          toastButtons, // Bind buttons
          setOpen
        };
      },
    };

    const toastApp = createApp(ToastComponent);
    const toastDiv = document.createElement('div');
    document.body.appendChild(toastDiv);
    toastApp.mount(toastDiv);

    app.config.globalProperties.$toast = showToast;
  },
};
