import { Storage } from '@ionic/storage';
import { Drivers } from '@ionic/storage';

const storage = new Storage({
  name: '_hasnurDB',
  driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
});

const initStorage = async () => {
  await storage.create();
};

export { storage, initStorage };
