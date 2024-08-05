// storage.js
import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

// Create a singleton storage instance
const storage = new Storage({
  name: '_hasnurDB',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});

let isInitialized = false;

const initStorage = async () => {
  if (!isInitialized) {
    await storage.create();
    isInitialized = true;
  }
};

export { storage, initStorage };