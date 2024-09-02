<template>
    <div>
        <ChipComponent :id="triggerId" :width="width">
            {{ strategy.frgco }}
        </ChipComponent>
        <ion-popover :trigger="triggerId" side="top" trigger-action="click" size="auto">
            <ion-content class="ion-padding">
                {{ strategy.frgct }}
            </ion-content>
        </ion-popover>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ChipComponent from './ChipComponent.vue';

export default defineComponent({
    name: 'StrategyChip',
    components: { ChipComponent },
    props: {
        strategy: {
            type: Object,
            required: true
        },
        triggerId: {
            type: String,
            required: true
        },
        width: {
            type: [String, Number],
            required: true
        }
    }
});
</script>