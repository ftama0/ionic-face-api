// src/plugins/modalPlugin.js
import { modalController } from '@ionic/vue';

export default {
    install(app) {
        app.config.globalProperties.$modal = {
            async open(component, props) {
                const modal = await modalController.create({
                    component,
                    componentProps: props
                });
                return modal.present();
            },
            async close(data, role) {
                return modalController.dismiss(data, role);
            }
        };
    }
};
