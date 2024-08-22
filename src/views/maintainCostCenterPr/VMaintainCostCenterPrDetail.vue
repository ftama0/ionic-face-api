<template>
    <ion-page id="cost-center-pr-detail" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Account Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>

                <div v-for="(item, index) in items" :key="index">
                    <ion-item>
                        <ion-label>
                            <h6>{{ item.title }}</h6>
                            <p>{{ item.value }}</p>
                        </ion-label>
                    </ion-item>
                </div>
            </ion-list>
        </ion-content>

    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const mainContentId = 'cost-center-pr-detail';

const items = ref([
    {
        id: 1,
        title: 'Client',
        value: '840',
    },
    {
        id: 2,
        title: 'Company Code',
        value: 'HR30',
    },
    {
        id: 3,
        title: 'User Account',
        value: 'Darla Corwin',
    },
    {
        id: 4,
        title: 'Release Code',
        value: 'General Manager',
    },
    {
        id: 5,
        title: 'Cost Center',
        value: '35KJ58',
    },
]);
</script>