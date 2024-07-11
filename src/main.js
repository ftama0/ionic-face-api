import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

// custom by ferry
import { addIcons } from 'ionicons';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonFooter, IonLabel, IonList, IonItem, IonIcon, IonCol, IonRow, IonGrid, IonCard, IonInputPasswordToggle, IonAlert, IonLoading, IonToast, IonCardContent, IonBadge, IonMenu, IonButtons, IonMenuButton } from '@ionic/vue';
import { heart, logIn, personOutline, keyOutline, basketOutline, cartOutline  } from 'ionicons/icons';
import 'remixicon/fonts/remixicon.css';
import './assets/css/main.css';
import axios from 'axios';
import { createPinia } from 'pinia';
import ToastPlugin from '@/plugins/toast'; 

addIcons({heart,logIn,personOutline, keyOutline , basketOutline, cartOutline});
// create/run
const pinia = createPinia();
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(ToastPlugin);

// component global 
app.component('ion-content', IonContent);
app.component('ion-header', IonHeader);
app.component('ion-footer', IonFooter);
app.component('ion-label', IonLabel);
app.component('ion-list', IonList);
app.component('ion-page', IonPage);
app.component('ion-title', IonTitle);
app.component('ion-toolbar', IonToolbar);
app.component('ion-button', IonButton);
app.component('ion-input', IonInput);
app.component('ion-item', IonItem);
app.component('ion-icon', IonIcon);
app.component('ion-grid', IonGrid);
app.component('ion-row', IonRow);
app.component('ion-col', IonCol);
app.component('ion-card', IonCard);
app.component('ion-card-content', IonCardContent);
app.component('ion-input-password-toggle', IonInputPasswordToggle);
app.component('ion-alert', IonAlert);
app.component('ion-loading', IonLoading);
app.component('ion-toast', IonToast);
app.component('ion-badge', IonBadge);
app.component('ion-menu', IonMenu);
app.component('ion-buttons', IonButtons);
app.component('ion-menu-button', IonMenuButton);
// url 
// set base url 
// axios.defaults.baseURL = 'https://ebl-cms.hasnurgroup.com/index.php/'; 
// Menyimpan axios ke dalam aplikasi Vue
// app.config.globalProperties.$axios = axios;

// capasitor/device 


// run 
router.isReady().then(() => {
  app.mount('#app');
});
