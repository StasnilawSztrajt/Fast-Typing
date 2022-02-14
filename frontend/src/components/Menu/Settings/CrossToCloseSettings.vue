<template>
    <div class="flexCross" @click="showLayerSettings">
        <i class="fas fa-times sett cross"></i>
    </div>
</template>

<script>
export default {
    name: 'CrossToCloseSettings',
    methods: {
        showLayerSettings(){
            this.$emit('show-layer-settings')
        }
    }
}
</script>

<style lang="scss">
@import '../../../scss/variables.scss';
.flexCross{
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    top: 0;

    .cross{
        text-align: center;
        line-height: 5vh;
        font-size: 2rem;
        width: 5vh;
        height: 5vh;
        transition: all .5s;
        background-color: $color-strong;
        color: $bg-main;


        &:hover{
            opacity: 0.7;
        }
    }
}

</style>