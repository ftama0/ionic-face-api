<template>
    <ion-card class="ion-margin-top ion-elevation-3" style="border-radius: 15px;">
        <ion-row class="ion-margin-top">
            <ion-col size="12">
                <ion-row>
                    <ion-col size="2">
                        <ion-icon class="custom-icon-cart" :icon="icons.cartOutline"></ion-icon>
                    </ion-col>
                    <ion-col size="8">
                        <div class="row">
                            <ion-col size="12">
                                <ion-label class="ion-card-title">{{ item.po_no }}</ion-label>
                            </ion-col>
                        </div>
                        <ion-row>
                            <ion-col size="4">
                                <ion-label class="ion-card-label">Belum </ion-label>
                            </ion-col>
                            <ion-col size="1">·</ion-col>
                            <ion-col size="7">
                                <ion-label class="ion-card-label">{{ item.release_date }}</ion-label>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                    <ion-col size="2">
                        <ion-button fill="clear" @click="$emit('readPo', item)">
                            <ion-icon class="custom-icon" :icon="icons.ellipsisVertical"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
                <hr style="border-top: 1px solid #ccc; margin: 10px 0;">
            </ion-col>
            <ion-col size="12" class="ion-padding-horizontal">
                <ion-label class="ion-card-label">{{ item.header }}</ion-label>
            </ion-col>
            <ion-col size="12" class="ion-padding-horizontal ion-text-start ion-align-self-center">
                <ion-label class="ion-card-amount">{{ item.total_amount }}</ion-label>
                <br>
                <ion-label>{{ item.item_count }} Item</ion-label>
            </ion-col>
        </ion-row>
    </ion-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import ChipComponent from '@/components/ChipComponent.vue';
import '@/assets/css/cardPurchase.css';

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    icons: {
        type: Object,
        required: true,
    },
});

defineEmits(['readPo']);
</script>

<style scoped></style>