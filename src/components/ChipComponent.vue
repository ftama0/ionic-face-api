<template>
    <ion-chip :class="class" :color="color">
        <slot>Default</slot>
    </ion-chip>
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
        default: 'primary',
        required: true,
    },
    class: {
        type: String,
        default: 'detail-button',
    },
    icon: {
        type: String,
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
    // console.log('Props:', props.data);
});
</script>

<style scoped>
ion-chip {
    width: 100px;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
}
</style>