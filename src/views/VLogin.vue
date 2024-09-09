<template>
    <ion-page v-bind="$attrs">
        <ion-header :translucent="true" class="ion-no-border">
            <ion-toolbar class="ion-text-center ion-padding-top ion-margin-top white-toolbar">
                <ion-grid>
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="12" class="ion-text-center">
                            <img src="@/assets/images/logo_Hasnur.png" class="ion-margin-top logo-center" alt="App Icon"
                                width="140" height="120" />
                        </ion-col>
                        <ion-col size="12" class="ion-margin-top">
                            <h1 class="ion-padding-top approval-system-title"><b>Approval System</b></h1>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" scroll-y="true">
            <form @submit.prevent="submitForm">
                <ion-list class="login-list">
                    <ion-item class="ion-margin-bottom login-item">
                        <ion-input label-placement="stacked" label="Username" placeholder="Enter Username" type="text"
                            fill="outline" v-model="vdata.username" required>
                            <ion-icon slot="start" :icon="icons.personOutline" aria-hidden="true"></ion-icon>
                        </ion-input>
                    </ion-item>
                    <ion-item class="ion-margin-bottom login-item">
                        <ion-input label-placement="stacked" label="Password" placeholder="Enter Password"
                            type="password" fill="outline" v-model="vdata.password" required>
                            <ion-icon slot="start" :icon="icons.keyOutline" aria-hidden="true"></ion-icon>
                            <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                        </ion-input>
                    </ion-item>
                    <ion-button expand="block" type="submit" id="login-button" size="default" shape="round"
                        class="login-button">
                        <span>Login</span>
                        <ion-icon slot="end" :icon="icons.logInOutline"></ion-icon>
                    </ion-button>
                </ion-list>
            </form>
        </ion-content>
        <ion-footer class="ion-no-border custom-footer" keyboard-attach>
            <ion-toolbar class="white-toolbar">
                <ion-title class="ion-text-center">
                    <h6> <b> Copyright © 2024 </b></h6>
                    <h6> <b> PT Hasnur Informasi Teknologi</b> </h6>
                    <h6><i><b> All rights reserved </b> </i> </h6>
                </ion-title>
            </ion-toolbar>
        </ion-footer>
        <LoadingComponent :isOpen="loading" :message="'Loading...'" />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, computed, watch, getCurrentInstance } from 'vue';
import { useLoginStore } from '@/store/loginStore';
import { useRouter } from 'vue-router';
import { Keyboard } from '@capacitor/keyboard';

const vdata = ref({
    username: '',
    password: ''
});
const loginStore = useLoginStore();
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const router = useRouter();
const loading = ref(false);

// api 
const submitForm = async () => {
    loading.value = true;
    try {
        console.log('masuk', vdata.value)
        await loginStore.login(vdata.value.username, vdata.value.password);
        router.push({ name: 'Home' });
    } catch (error) {
        console.error('API failed:', error);
        proxy.$toast('Username or password is wrong', 'danger');
    }
    finally {
        loading.value = false;
    }
};
const initialize = async () => {
};
onMounted(async () => {
    // Keyboard.addListener('keyboardWillShow', (info) => {
    //     document.querySelector('ion-footer').style.marginBottom = `${info.keyboardHeight}px`;
    // });

    // Keyboard.addListener('keyboardWillHide', () => {
    //     document.querySelector('ion-footer').style.marginBottom = '0px';
    // });
    Keyboard.addListener('keyboardWillShow', () => {
        document.querySelector('ion-footer').classList.add('hidden-footer');
    });

    Keyboard.addListener('keyboardWillHide', () => {
        document.querySelector('ion-footer').classList.remove('hidden-footer');
    });
});

</script>

<style scoped>
ion-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.hidden-footer {
    display: none;
}

.logo-center {
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.login-list {
    margin-top: 1rem;
}

.login-item {
    margin-bottom: 1.5rem;
}

.login-button {
    margin-top: 2rem;
}

.custom-footer {
    height: 100px;
    /* Sesuaikan tinggi sesuai kebutuhan */
}

.custom-footer ion-toolbar {
    --min-height: 100px;
    /* Sesuaikan tinggi sesuai kebutuhan */
}

.white-toolbar {
    --background: white;
}

.approval-system-title {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
}
</style>