// src/plugins/ionicons.js
import { addIcons } from 'ionicons';
import {
  heart, logInOutline, personOutline, keyOutline, basketOutline,basketSharp, cartOutline,
  homeOutline, logOutOutline, personCircleOutline, cashOutline, bagOutline,
  bagHandleOutline,bagHandleSharp, bagCheckOutline, settingsOutline, 
  informationCircleOutline, ellipsisHorizontal,ellipsisHorizontalCircle, 
  openOutline, readerOutline, checkmarkOutline,closeOutline,peopleOutline,
  filterOutline, personAddOutline,createOutline, trashOutline,
  idCardOutline, ellipsisHorizontalCircleOutline, addOutline,  
} from 'ionicons/icons';

const icons = {
  heart, logInOutline, personOutline, keyOutline, basketOutline,basketSharp, cartOutline,
  homeOutline, logOutOutline, personCircleOutline, cashOutline, bagOutline,
  bagHandleOutline,bagHandleSharp, bagCheckOutline, settingsOutline, 
  informationCircleOutline, ellipsisHorizontal,ellipsisHorizontalCircle, 
  openOutline, readerOutline, checkmarkOutline,closeOutline,peopleOutline,
  filterOutline, personAddOutline,createOutline, trashOutline,
  idCardOutline, ellipsisHorizontalCircleOutline, addOutline,  
};

export default {
  install: (app) => {
    addIcons(icons);
    app.config.globalProperties.$icons = icons;
  }
};
