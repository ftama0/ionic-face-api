<template>
    <ion-chip :class="class" :color="color" :style="{ width: chipWidth }">
        <slot>Default</slot>
    </ion-chip>
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
        default: 'primary',
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
    width: {
        type: String,
        default: '100px',
    },
});

const emit = defineEmits(['action-click']);

function handleClick() {
    emit('action-click', props.item);
}
const chipWidth = props.width;
onMounted(async () => {
    // console.log('Props:', props.data);
});
</script>

<style scoped>
ion-chip {
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
}
</style>