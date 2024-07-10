<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>New Item
                </ion-title>
                
            </ion-toolbar>
        </ion-header>
        <ion-content ref="content">
            <!-- <ion-icon :icon="heart"></ion-icon> -->
            <ion-button @click="scrollToBottom">Scroll to Bottom</ion-button>
            <ion-back-button default-href="/home"></ion-back-button>
        </ion-content>
    </ion-page>
</template>

<script setup>
// khusus local . JIka global maka di main.js
// import { heart, logoAndroid, logoApple } from 'ionicons/icons';
import { ref } from 'vue';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/vue';

const content = ref();
const scrollToBottom = () => {
    content.value.$el.scrollToBottom(300);
};
</script>