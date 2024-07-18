<template>
    <ion-page id="home-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1>Ini Hal Detail</h1>
            <!-- <ion-nav-link router-direction="forward" :component="component">
                <ion-button>Go to Page Three</ion-button>
            </ion-nav-link> -->
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { markRaw } from 'vue';
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonNavLink,
    IonButton,
    IonButtons,
    IonBackButton,
} from '@ionic/vue';
import Home from './VHome.vue';

export default {
    components: {
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
        IonNavLink,
        IonButton,
        IonButtons,
        IonBackButton,
    },
    data() {
        return {
        };
    },
};
</script>