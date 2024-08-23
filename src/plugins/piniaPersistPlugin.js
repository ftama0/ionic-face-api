// plugins/piniaPersistPlugin.js
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import { storage } from "@/store/storage";

// Create and configure the plugin
export const piniaPersistPlugin = createPersistedStatePlugin({
  storage: {
    getItem: async (key) => await storage.get(key),
    setItem: async (key, value) => await storage.set(key, value),
    removeItem: async (key) => await storage.remove(key),
  },
});
