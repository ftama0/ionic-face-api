<template>
    <ion-page>
        <ion-header :translucent="true" class="ion-no-border">
            <ion-toolbar class="ion-text-center ion-padding-top ion-margin-top">
                <ion-grid>
                    <ion-row>
                        <ion-col size="12">
                            <img src="@/assets/images/logo_Hasnur.png" class="ion-margin-top" alt="App Icon" width="140"
                                height="120" />
                        </ion-col>
                        <ion-col size="12">
                            <h3 class="ion-padding-top">Approval System</h3>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" scroll-y="false">
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
    </ion-page>
</template>

<script setup>
import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue';
import { logIn, personOutline, keyOutline } from 'ionicons/icons';
import { useLoginStore } from '@/store/loginStore';
import { useRouter } from 'vue-router';

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
const loginStore = useLoginStore(); // Menggunakan useLoginStore untuk mendapatkan store
const { proxy } = getCurrentInstance()
const router = useRouter();
// api 
const submitForm = async () => {
    try {
        isLoading.value = true;
        console.log('masuk', vdata.value)
        const result = await loginStore.login(vdata.value.username, vdata.value.password);
        router.push({ name: 'Home' });
    } catch (error) {
        console.error('Login failed:', error);
        proxy.$toast('Username or password is wrong', 'danger');
    }
    finally {
        isLoading.value = false;
    }
};


onMounted(async () => {
    if (localStorage.getItem('user-login')) {
        await loginStore.autoLogin(localStorage.getItem('user-login')).then(() => {
            proxy.$toast('Welcome Back', 'primary');
            // Redirect
            router.push({ name: 'Home' });
        }).catch((error) => {
            console.error('Auto login error:', error);
            proxy.$toast(error.message || 'Silahkan login terlebih dahulu', 'warning');
        });
    }
});

</script>

<style>
/* Add your custom styles here */
</style>