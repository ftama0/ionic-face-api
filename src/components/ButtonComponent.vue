<template>
    <ion-button :size="size" :color="color" :class="class" :shape="shape" fill="default" @click="handleClick">
        <ion-icon aria-hidden="true" slot="start" :icon="icon"></ion-icon>
        <slot>Action</slot>
    </ion-button>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    size: {
        type: String,
        default: 'default',
    },
    color: {
        type: String,
        default: 'default',
    },
    class: {
        type: String,
        default: 'detail-button',
        required: true,
    },
    icon: {
        type: String,
    },
    shape: {
        type: String,
        default: 'default',
    },
    item: {
        type: Object,
    },
});

const emit = defineEmits(['action-click']);

function handleClick() {
    emit('action-click', props.item);
}
onMounted(async () => {
    // console.log('Props:', props.class);
});
</script>

<style scoped>
.action-button,
.detail-button,
.approve-buttons,
.reject-buttons {
    --border-radius: 10px;
    --border-style: solid;
    --border-width: 1px;
    --box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.10);
    --padding-top: 10px;
    --padding-bottom: 10px;
    font-size: 17px;
    line-height: 18px;
    font-weight: 600;
}

.action-button {
    --background-color: #CFE5FF;
    --background: #CFE5FF;
    --color: #0070F2;
    --border-color: #CFE5FF;
    --ripple-color: deeppink;
}

.detail-button {
    --color: #0070F2;
    --border-color: #BCC3CA;
    --ripple-color: deeppink;
}

.approve-buttons {
    --color: #ffffff;
    --background: #27733A;
    --border-color: #27733A;
    --ripple-color: deeppink;
}

.reject-buttons {
    --color: #ffffff;
    --background: #AA0808;
    --border-color: #AA0808;
    --ripple-color: deeppink;
}
</style>