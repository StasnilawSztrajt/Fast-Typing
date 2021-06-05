<template>
    <div class="flexReload">
        <button
            class="reload"
            @click="reload">
            <i class="fas fa-sync-alt"></i>
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        reload(){
            this.$emit('reload-functions')
        }
    }
}
</script>

<style lang="scss">
@import '../scss/variables';

    .flexReload{
        display: flex;
        justify-content: center;
        .reload{
            font-size: 5rem;
            text-align: center;
            background: transparent;
            border: none;
            margin-top: 6vh;
            color: $color-sub;
            transition: .2s background-color;

            &:hover{
                border: none;
                outline: none;
                background-color: rgb(71, 67, 67);
            }
            &:focus{
                border: none;
                outline: none;
                background-color: rgb(71, 67, 67);
            }
        }
    }
</style>