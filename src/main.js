import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import { ionicComponents } from './plugins/ionicComponents';
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
import './assets/css/output.css';
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
// one signal

// storage
// import { initStorage } from "@/store/configStorage";
// initStorage();
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
// Daftarkan komponen Ionic secara global
Object.entries(ionicComponents).forEach(([name, component]) => {
  app.component(name, component);
});
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
