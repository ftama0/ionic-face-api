<template>
    <ion-button :size="size" :color="color" :class="class" @click="handleClick">
        <ion-icon aria-hidden="true" slot="start" :icon="icon"></ion-icon>
        <slot>Action</slot>
    </ion-button>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

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
        required: true,
    },
    item: {
        type: Object,
        required: true,
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
.action-button {
    background-color: #CFE5FF;

    --color: #0070F2;

    --border-radius: 10px;
    --border-color: #BCC3CA;
    --border-style: solid;
    --border-width: 1px;

    /* --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.2); */

    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;
    font-size: 17px;
    line-height: 18px;
    font-weight: 600;
}

.detail-button {
    /* --background: #93e9be;
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be; */

    --color: #0070F2;

    --border-radius: 10px;
    --border-color: #BCC3CA;
    --border-style: solid;
    --border-width: 1px;

    /* --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.2); */

    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;
    font-size: 17px;
    line-height: 18px;
    font-weight: 600;
}
</style>