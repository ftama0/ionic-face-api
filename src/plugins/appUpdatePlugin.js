// src/plugins/appUpdatePlugin.js
import { Capacitor } from '@capacitor/core';
import { AppUpdate, AppUpdateAvailability } from '@capawesome/capacitor-app-update';

const AppUpdatePlugin = {
install(app) {
    app.config.globalProperties.$appUpdate = {
      getCurrentAppVersion: async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (Capacitor.getPlatform() === 'android') {
          return result.currentVersionCode;
        } else {
          return result.currentVersionName;
        }
      },
      getAvailableAppVersion: async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (Capacitor.getPlatform() === 'android') {
          return result.availableVersionCode;
        } else {
          return result.availableVersionName;
        }
      },
      openAppStore: async () => {
        await AppUpdate.openAppStore();
      },
      performImmediateUpdate: async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
          return;
        }
        if (result.immediateUpdateAllowed) {
          await AppUpdate.performImmediateUpdate();
        }
      },
      startFlexibleUpdate: async () => {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
          return;
        }
        if (result.flexibleUpdateAllowed) {
          await AppUpdate.startFlexibleUpdate();
        }
      },
      completeFlexibleUpdate: async () => {
        await AppUpdate.completeFlexibleUpdate();
      }
    };
  }
};

export default AppUpdatePlugin;