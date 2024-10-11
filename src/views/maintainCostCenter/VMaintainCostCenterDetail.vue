<template>
    <ion-page id="cost-center-detail" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Maintain Cost Center</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list class="ion-margin-top">
                <ion-item class="detail__header">User Account</ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__sub">
                            {{ data.fullname }} ( {{ data.username }} )
                        </p>
                    </ion-label>
                </ion-item>
                <!-- <ion-item>
                    <ion-label>
                        <p class="detail__header">Client</p>
                        <p class="detail__sub" v-for="(user, index) in data.user_csks" :key="index">
                            {{ user.mandt }}
                        </p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Company Code</p>
                        <p class="detail__sub" v-for="(user, index) in data.user_csks" :key="index">
                            {{ user.bukrs }}
                        </p>
                    </ion-label>
                </ion-item> -->
                <ion-item class="detail__header">Cost Center</ion-item>
                <ion-row v-for="(user, index) in data.user_csks" :key="index">
                    <ion-col size="4" class="ion-no-padding">
                        <ion-item>
                            <ion-label>
                                <p class="detail__sub">
                                    {{ user.kostl }}
                                </p>
                            </ion-label>
                        </ion-item>
                    </ion-col>
                    <ion-col size="8" class="ion-no-padding">
                        <ion-item>
                            <ion-label>
                                <p class="detail__sub">
                                    {{ user.ltext }} ({{ user.bukrs }})
                                </p>
                            </ion-label>
                        </ion-item>
                    </ion-col>
                </ion-row>
            </ion-list>
        </ion-content>

    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { costCenterStore } from '@/store/costCenterStore';

const mainContentId = 'cost-center-detail';

const { proxy } = getCurrentInstance()
const csStore = costCenterStore();

const data = computed(() => csStore.dataDetails.data);



onMounted(async () => {
    console.log(data.value)
});
</script>

<style></style>