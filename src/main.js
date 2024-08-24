import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  IonicVue,
  IonPage,
  IonHeader,
  IonContent,
  IonFooter,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonCol,
  IonRow,
  IonGrid,
  IonCard,
  IonInputPasswordToggle,
  IonAlert,
  IonLoading,
  IonToast,
  IonCardContent,
  IonBadge,
  IonMenu,
  IonButtons,
  IonMenuButton,
  IonMenuToggle,
  IonFab,
  IonFabButton,
  IonSearchbar,
  IonText,
  IonCardTitle,
  IonCardHeader,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonRefresher,
  IonRefresherContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonActionSheet,
  IonAvatar,
  IonBackButton,
  IonFabList,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonProgressBar,
  IonPopover,
  IonCheckbox,
} from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import "@ionic/vue/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

// custom import
// import { addIcons } from 'ionicons';
// import 'remixicon/fonts/remixicon.css';
// import axios from 'axios';
import "./assets/css/main.css";
import "./assets/css/main.scss";
import { createPinia } from "pinia";
// plugins
import ToastPlugin from "@/plugins/toastPlugin";
import ionicons from "./plugins/ioniconsPlugin";
import AppUpdatePlugin from "./plugins/appUpdatePlugin";
// components
import ToastComponent from "@/components/ToastComponent.vue";
import MenuComponent from "@/components/MenuComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import RefresherComponent from "@/components/RefresherComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import FormModalComponent from "@/components/FormModalComponent.vue";
// storage
import { initStorage } from "@/store/configStorage";
await initStorage();
// create/run

const pinia = createPinia();

// note : pakai persist 2, can async-storage like indexedDB
// import { piniaPersistPlugin } from "@/plugins/piniaPersistPlugin";
// pinia.use(piniaPersistPlugin);

// note : pakai persist, only sync-storage like local storage
import persistedState from "pinia-plugin-persistedstate";
pinia.use(persistedState);

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(ionicons)
  .use(AppUpdatePlugin);

// component global
app.component("ion-content", IonContent);
app.component("ion-header", IonHeader);
app.component("ion-footer", IonFooter);
app.component("ion-label", IonLabel);
app.component("ion-list", IonList);
app.component("ion-page", IonPage);
app.component("ion-title", IonTitle);
app.component("ion-toolbar", IonToolbar);
app.component("ion-button", IonButton);
app.component("ion-input", IonInput);
app.component("ion-item", IonItem);
app.component("ion-icon", IonIcon);
app.component("ion-grid", IonGrid);
app.component("ion-row", IonRow);
app.component("ion-col", IonCol);
app.component("ion-card", IonCard);
app.component("ion-card-content", IonCardContent);
app.component("ion-input-password-toggle", IonInputPasswordToggle);
app.component("ion-alert", IonAlert);
app.component("ion-loading", IonLoading);
app.component("ion-toast", IonToast);
app.component("ion-badge", IonBadge);
app.component("ion-menu", IonMenu);
app.component("ion-buttons", IonButtons);
app.component("ion-menu-button", IonMenuButton);
app.component("ion-menu-toggle", IonMenuToggle);
app.component("ion-fab", IonFab);
app.component("ion-fab-button", IonFabButton);
app.component("ion-searchbar", IonSearchbar);
app.component("ion-text", IonText);
app.component("ion-card-title", IonCardTitle);
app.component("ion-card-header", IonCardHeader);
app.component("ion-tabs", IonTabs);
app.component("ion-tab-bar", IonTabBar);
app.component("ion-tab-button", IonTabButton);
app.component("ion-router-outlet", IonRouterOutlet);
app.component("ion-refresher", IonRefresher);
app.component("ion-refresher-content", IonRefresherContent);
app.component("ion-action-sheet", IonActionSheet);
app.component("ion-infinite-scroll", IonInfiniteScroll);
app.component("ion-infinite-scroll-content", IonInfiniteScrollContent);
app.component("ion-avatar", IonAvatar);
app.component("ion-back-button", IonBackButton);
app.component("ion-fab-list", IonFabList);
app.component("ion-chip", IonChip);
app.component("ion-select", IonSelect);
app.component("ion-select-option", IonSelectOption);
app.component("ion-toggle", IonToggle);
app.component("ion-progress-bar", IonProgressBar);
app.component("ion-popover", IonPopover);
app.component("ion-checkbox", IonCheckbox);
// custom component
app.component("MenuComponent", MenuComponent);
app.component("HeaderComponent", HeaderComponent);
app.component("FooterComponent", FooterComponent);
app.component("RefresherComponent", RefresherComponent);
app.component("LoadingComponent", LoadingComponent);
app.component("form-modal-component", FormModalComponent);
// note :toast
// Buat instance toastApp dan mount ke body
const toastApp = createApp(ToastComponent);
const toastDiv = document.createElement("div");
document.body.appendChild(toastDiv);
const toastInstance = toastApp.mount(toastDiv);

// Tambahkan toastInstance.showToast ke global properties
app.config.globalProperties.$toast = toastInstance.showToast;
// run

router.isReady().then(() => {
  app.mount("#app");
});
