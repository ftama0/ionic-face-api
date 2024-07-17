<template>
    <ion-fab slot="fixed" vertical="bottom" horizontal="center">
        <ion-fab-button router-link="/home">
            <ion-icon :icon="icons.homeOutline"></ion-icon>
        </ion-fab-button>
    </ion-fab>
    <ion-footer>
        <ion-toolbar class="toolbar-custom">
            <!-- <ion-button slot="start" shape="round">
                <ion-icon :icon="icons.homeOutline"></ion-icon>
            </ion-button>
            <ion-button slot="center" shape="round">
                <ion-icon :icon="icons.personOutline"></ion-icon>
            </ion-button>
            <ion-button slot="end" shape="round">
                <ion-icon :icon="icons.homeOutline"></ion-icon>
            </ion-button> -->
        </ion-toolbar>
    </ion-footer>
</template>


<style scoped>
.toolbar-custom {
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.0.1);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    margin-top: 10px;
    height: 50px;
    padding: 10px;
    background-color: var(--ion-background-color);
}
</style>

<script setup>
import { getCurrentInstance, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()
const router = useRouter();
const icons = ref(proxy.$icons);
const props = defineProps({
    contentId: String,
});
</script>