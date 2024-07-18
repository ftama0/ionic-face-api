// src/plugins/ionicons.js
import { addIcons } from 'ionicons';
import {
  heart, logIn, personOutline, keyOutline, basketOutline,basketSharp, cartOutline,
  homeOutline, logOutOutline, personCircleOutline, cashOutline, bagOutline,
  bagHandleOutline,bagHandleSharp, bagCheckOutline, settingsOutline, 
  informationCircleOutline, ellipsisHorizontal,ellipsisHorizontalCircle, 
  openOutline, readerOutline, checkmarkOutline,closeOutline,peopleOutline,
} from 'ionicons/icons';

const icons = {
  heart, logIn, personOutline, keyOutline, basketOutline,basketSharp, cartOutline,
  homeOutline, logOutOutline, personCircleOutline, cashOutline, bagOutline,
  bagHandleOutline,bagHandleSharp, bagCheckOutline, settingsOutline, 
  informationCircleOutline, ellipsisHorizontal,ellipsisHorizontalCircle, 
  openOutline, readerOutline, checkmarkOutline,closeOutline,peopleOutline,
};

export default {
  install: (app) => {
    addIcons(icons);
    app.config.globalProperties.$icons = icons;
  }
};
