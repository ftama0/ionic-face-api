// src/plugins/device.js
import { Device } from '@capacitor/device';

export const getDeviceInfo = async () => {
  const info = await Device.getInfo();
  console.log(info);
  return info;
};
export const logBatteryInfo = async () => {
    const info = await Device.getBatteryInfo();
    console.log(info);
    return info;
  };
export const isMobilePlatform = async () => {
  const info = await Device.getInfo();
  console.log(info);
  return info.platform !== 'web';
};
