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
                <ion-item v-for="item in vdata" :key="item.id" :button="true" detail="false"
                    @click="readNotification(item)">
                    <div class="unread-indicator-wrapper" slot="start">
                        <div class="unread-indicator"></div>
                    </div>
                    <ion-label>
                        <strong>{{ item.title }}</strong>
                        <br>
                        <ion-note color="medium" class="ion-text-wrap">
                            {{ item.message }}
                            <br>
                            <span class="notification-date">{{ item.created_at }}</span>
                        </ion-note>
                    </ion-label>
                    <div class="metadata-end-wrapper" slot="end">
                        <!-- <ion-note color="medium">{{ item.created_at }}</ion-note> -->
                    </div>
                </ion-item>
            </ion-list>
            <ion-infinite-scroll threshold=" 10px" @ionInfinite="loadMore">
                <ion-infinite-scroll-content loading-text="Please wait..." loading-spinner="bubbles">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
            <RefresherComponent @refresh="refreshData()" />
        </ion-content>
        <LoadingComponent :isOpen="loading" :message="'Loading...'" />
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { createGesture } from '@ionic/vue';
import { notificationStore } from '@/store/notificationStore';
const notification = notificationStore();

// data
const { proxy } = getCurrentInstance()

const loading = ref(false);
const icons = ref(proxy.$icons);
const page = ref(1);
const limit = ref(5);
const NotifItem = ref(null);

const vdata = computed(() => notification.notificationListFormatted);


const fetchAllNotification = async (refresh = true) => {
    loading.value = refresh;
    try {
        refresh ? page.value = 1 : page.value++;
        await notification.allNotification(refresh, page.value, limit.value);
    } catch (error) {
        console.error('Error mengambil data:', error);
    } finally {
        loading.value = false;
    }
};

const readNotification = async (item) => {
    loading.value = true;
    try {
        await notification.readNotification(item.id);
        await fetchAllNotification(true);
        proxy.$toast('Read Successfully', 'primary');
    } catch (error) {
        console.error('Error read notif:', error);
        proxy.$toast('Error read notif', 'danger');
    } finally {
        loading.value = false;
    }
};
const refreshData = async () => {
    await fetchAllNotification(true);
};

const loadMore = async (event) => {
    if (vdata.value.length >= vdata.value.total) {
        event.target.complete();
        return;
    }
    await fetchAllNotification(false);
    event.target.complete();
};

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
    await fetchAllNotification();
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

.notification-date {
    font-size: 0.8em;
    /* Ukuran font lebih kecil */
    color: gray;
    /* Warna teks abu-abu */
    margin-top: 4px;
    /* Jarak atas untuk pemisahan */
}
</style>