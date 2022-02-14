<template>
    <div class="timeSpent">
        <span
            :class="{opacityColorTimeSpent,normalColorTimeSpent}"
            @click="opacityTimeSpent"
            :style="opacityStart"
        >
        {{ timeSpent }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        opacityColorTimeSpent: Boolean,
        normalColorTimeSpent: Boolean,
        timeSpent: Number,
        opacityStart: Object
    },
    methods: {
        opacityTimeSpent(){
            this.$emit('change-opacity-time-spent')
        },
    }
}
</script>

<style lang="scss">
@import '../scss/variables';

    .timeSpent{
        text-align: center;
    }
    .opacityColorTimeSpent{
        color: transparent;
    }
    .opacityColorTimeSpent , .normalColorTimeSpent{
        font-size: 10rem;
        text-align: center;
        opacity: .3;
        cursor: pointer;
    }
</style>