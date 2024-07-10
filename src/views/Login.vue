<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border">
            <ion-toolbar class="ion-text-center ion-padding-top ion-margin-top">
                <img src="@/assets/images/logo_Hasnur.png" class="ion-margin-top" alt="App Icon" width="140"
                    height="120" />
                <ion-title>
                    <h3 class="ion-padding-top">Approval System</h3>
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <form @submit.prevent="submitForm">
                <ion-card class="ion-margin-top">
                    <ion-list>
                        <ion-item class="ion-padding-top">
                            <ion-icon :icon="icons.personOutline"></ion-icon>
                            <ion-input label="" type="text" placeholder="Enter Username"
                                v-model="vdata.username"></ion-input>
                        </ion-item>
                        <ion-item class="ion-padding-top">
                            <ion-icon :icon="icons.keyOutline"></ion-icon>
                            <ion-input label="" type="password" placeholder="Enter Password" v-model="vdata.password">
                                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                            </ion-input>
                        </ion-item>
                    </ion-list>
                    <ion-row class="ion-justify-content-end ion-padding-top ">
                        <ion-col size="auto">
                            <ion-button type="submit" id="login-button" size="medium">
                                Login
                                <ion-icon slot="end" :icon="icons.logIn"></ion-icon>
                            </ion-button>
                            <ion-loading v-if="isLoading" message="Loading ..." spinner="circles"></ion-loading>
                        </ion-col>
                    </ion-row>
                </ion-card>
            </form>
        </ion-content>
        <ion-footer class="ion-no-border ion-padding-bottom">
            <ion-toolbar>
                <ion-title class="ion-text-center">
                    <h6>Copyright © 2024</h6>
                    <h6>PT Hasnur Informasi Teknologi</h6>
                    <h6 class="italic">All rights reserved</h6>
                </ion-title>
            </ion-toolbar>
        </ion-footer>

        <!-- <ion-toast position="bottom" :duration="5000"></ion-toast> -->
        <!-- <ion-toast :is-open="isOpen" message="This toast will disappear after 5 seconds" :duration="5000"></ion-toast> -->

        <ion-toast :is-open="isOpen" :message="toastMessage" :duration="toastDuration" :position="toastPosition"
            @didDismiss="setOpen(false)"></ion-toast>
    </ion-page>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import { logIn, personOutline, keyOutline } from 'ionicons/icons';
import { useLoginStore } from '@/store/loginStore';

export default {
    name: 'Login',
    components: {},
    setup() {
        const vdata = ref({
            username: '',
            password: ''
        });
        const icons = {
            logIn,
            personOutline,
            keyOutline,
        };
        const isLoading = ref(false);
        const store = useLoginStore(); // Menggunakan useLoginStore untuk mendapatkan store
        //  toast 
        const toastMessage = ref(''); // Toast message
        const toastDuration = ref(5000); // Toast duration in milliseconds
        const toastPosition = ref('top'); // Toast position on screen
        const isOpen = ref(false); // Reactive variable to control toast visibility
        const setOpen = (state) => {
            isOpen.value = state;
        };

        const showToast = (message, duration = 5000, position = 'top') => {
            toastMessage.value = message;
            toastDuration.value = duration;
            toastPosition.value = position;
            setOpen(true);
        };

        // api 
        const submitForm = async () => {
            try {
                isLoading.value = true;
                console.log('masuk', vdata.value)
                const result = await store.login(vdata.value.username, vdata.value.password);
                // console.log('Login result:', result);
                // Redirect atau tindakan lain setelah berhasil login
            } catch (error) {
                console.error('Login failed:', error);
                showToast('Username or password is wrong');
            }
            finally {
                isLoading.value = false;
            }
        };


        onMounted(() => {
            if (localStorage.getItem('user-login')) {
                store.autoLogin(localStorage.getItem('user-login')).then(() => {
                    showToast('Welcome Back');
                    // Redirect or perform other actions after successful auto login
                }).catch((error) => {
                    console.error('Auto login error:', error);
                    showToast(error.message || 'Silahkan login terlebih dahulu');
                });
            }
        });

        return {
            vdata,
            icons,
            submitForm,
            isLoading,
            toastDuration,
            toastPosition,
            isOpen,
            toastMessage
        };
    },
};
</script>

<style>
/* Add your custom styles here */
</style>