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
                <ion-grid fixed>
                    <ion-row>
                        <ion-col size="12">
                            <ion-input label-placement="stacked" label="Username" placeholder="Enter Username"
                                type="text" fill="outline" v-model="vdata.username">
                                <ion-icon slot="start" :icon="icons.personOutline" aria-hidden="true"></ion-icon>
                            </ion-input>
                        </ion-col>
                        <ion-col size="12">
                            <ion-input label-placement="stacked" label="Password" placeholder="Enter Password"
                                type="password" fill="outline" v-model="vdata.password">
                                <ion-icon slot="start" :icon="icons.keyOutline" aria-hidden="true"></ion-icon>
                                <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                            </ion-input>
                        </ion-col>
                        <ion-col size="12">
                            <ion-button expand="full" type="submit" id="login-button" size="medium">
                                <span>Login</span>
                                <ion-icon slot="end" :icon="icons.logInOutline"></ion-icon>
                            </ion-button>
                            <ion-loading v-if="isLoading" message="Loading ..." spinner="circles"></ion-loading>
                        </ion-col>

                    </ion-row>
                </ion-grid>
            </form>
        </ion-content>
        <ion-footer class="ion-no-border" keyboard-attach>
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
import { useLoginStore } from '@/store/loginStore';
import { useRouter } from 'vue-router';

const vdata = ref({
    username: '',
    password: ''
});
const isLoading = ref(false);
const loginStore = useLoginStore(); // Menggunakan useLoginStore untuk mendapatkan store
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
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

<style scoped></style>