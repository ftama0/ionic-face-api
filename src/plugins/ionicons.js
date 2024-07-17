// src/plugins/ionicons.js
import { addIcons } from 'ionicons';
import {
  heart, logIn, personOutline, keyOutline, basketOutline,basketSharp, cartOutline,
  homeOutline, logOutOutline, personCircleOutline, cashOutline, bagOutline,
  bagHandleOutline,bagHandleSharp, bagCheckOutline, settingsOutline
} from 'ionicons/icons';

const icons = {
  heart, logIn, personOutline, keyOutline, basketOutline,basketSharp, cartOutline,
  homeOutline, logOutOutline, personCircleOutline, cashOutline, bagOutline,
  bagHandleOutline,bagHandleSharp, bagCheckOutline, settingsOutline
};

export default {
  install: (app) => {
    addIcons(icons);
    app.config.globalProperties.$icons = icons;
  }
};
