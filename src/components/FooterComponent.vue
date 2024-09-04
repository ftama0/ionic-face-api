<template>

    <ion-fab slot="fixed" vertical="bottom" horizontal="center">
        <ion-fab-button @click="$router.replace({ name: 'Home' })">
            <ion-icon :icon="icons.homeOutline"></ion-icon>
        </ion-fab-button>
    </ion-fab>
    <ion-footer class="ion-no-border">
        <ion-toolbar class="toolbar-custom"></ion-toolbar>
    </ion-footer>
    <!-- opsi pakai tabs  : -->
    <!-- <ion-tabs>
        <ion-fab slot="fixed" vertical="bottom" horizontal="center">
            <ion-fab-button router-link="/home">
                <ion-icon :icon="icons.homeOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
            <ion-tab-button tab="home" href="/home">
                <ion-icon :icon="icons.informationCircleOutline" />
                <ion-label>Info</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="home" href="/home">
                <ion-icon :icon="icons.settingsOutline" />
                <ion-label>Setting</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="home" href="/home">
                <ion-icon :icon="icons.bagHandleOutline" />
                <ion-label>Library</ion-label>
            </ion-tab-button>

            <ion-tab-button tab="home" href="/home">
                <ion-icon :icon="icons.bagHandleOutline" />
                <ion-label>Search</ion-label>
            </ion-tab-button>
        </ion-tab-bar>
    </ion-tabs> -->
</template>


<style scoped>
.toolbar-custom {
    box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    margin-top: 10px;
    height: 50px;
    padding: 10px;
    background-color: var(--ion-background-color);
}
</style>

<script setup>
import { getCurrentInstance, ref } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()
const router = useRouter();
const icons = ref(proxy.$icons);
const props = defineProps({
    contentId: String,
});

</script>