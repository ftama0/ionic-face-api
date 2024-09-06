<template>
    <ion-page id="detail-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Notification</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list :inset="true">
                <ion-item ref="NotifItem" :button="true" detail="false">
                    <div class="unread-indicator-wrapper" slot="start">
                        <div class="unread-indicator"></div>
                    </div>
                    <ion-label>
                        <strong>Rick Astley</strong>
                        <ion-text>Never Gonna Give You Up</ion-text><br />
                        <ion-note color="medium" class="ion-text-wrap">
                            Never gonna give you up Never gonna let you down Never gonna run...
                        </ion-note>
                    </ion-label>
                    <div class="metadata-end-wrapper" slot="end">
                        <ion-note color="medium">06:11</ion-note>
                    </div>
                </ion-item>
                <ion-item :button="true" detail="false">
                    <div class="unread-indicator-wrapper" slot="start">
                        <div class="unread-indicator"></div>
                    </div>
                    <ion-label>
                        <strong>Ionitron</strong>
                        <ion-text>I have become sentient</ion-text><br />
                        <ion-note color="medium" class="ion-text-wrap">That is all.</ion-note>
                    </ion-label>
                    <div class="metadata-end-wrapper" slot="end">
                        <ion-note color="medium">03:44</ion-note>
                    </div>
                </ion-item>
                <ion-item :button="true" detail="false">
                    <div class="unread-indicator-wrapper" slot="start">
                        <div class="unread-indicator"></div>
                    </div>
                    <ion-label>
                        <strong>Steam</strong>
                        <ion-text>Game Store Sale</ion-text><br />
                        <ion-note color="medium" class="ion-text-wrap">
                            That game you added to your wish list 2 years ago is now on sale!
                        </ion-note>
                    </ion-label>
                    <div class="metadata-end-wrapper" slot="end">
                        <ion-note color="medium">Yesterday</ion-note>
                    </div>
                </ion-item>
                <ion-item :button="true" detail="false">
                    <div class="unread-indicator-wrapper" slot="start">
                        <div class="unread-indicator"></div>
                    </div>
                    <ion-label>
                        <strong>Ionic</strong>
                        <ion-text>Announcing Ionic 7.0</ion-text><br />
                        <ion-note color="medium" class="ion-text-wrap">This version is one more than Ionic 6!</ion-note>
                    </ion-label>
                    <div class="metadata-end-wrapper" slot="end">
                        <ion-note color="medium">Yesterday</ion-note>
                    </div>
                </ion-item>
            </ion-list>
        </ion-content>
        <LoadingComponent :isOpen="loading" :message="'Loading...'" />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { createGesture } from '@ionic/vue';

// data
const { proxy } = getCurrentInstance()

const loading = ref(false);
const NotifItem = ref(null);

const onMove = (detail) => {
    const { deltaX } = detail;
    if (deltaX > 0) {
        NotifItem.value.$el.style.transform = `translateX(${deltaX}px)`;
    }
};

const onEnd = (detail) => {
    const { deltaX } = detail;
    if (deltaX > 100) {
        NotifItem.value.$el.style.transition = 'transform 0.3s ease-out';
        NotifItem.value.$el.style.transform = 'translateX(100%)';
        setTimeout(() => {
            NotifItem.value.$el.style.display = 'none';
        }, 300);
    } else {
        NotifItem.value.$el.style.transition = 'transform 0.3s ease-out';
        NotifItem.value.$el.style.transform = 'translateX(0)';
    }
};
onMounted(async () => {
    if (NotifItem.value) {
        const gesture = createGesture({
            el: NotifItem.value.$el,
            gestureName: 'swipe-to-dismiss',
            onMove: (detail) => onMove(detail),
            onEnd: (detail) => onEnd(detail),
        });

        gesture.enable();
    }
});
</script>

<style scoped>
.unread-indicator {
    width: 10px;
    height: 10px;
    background-color: blue;
    border-radius: 50%;
}
</style>