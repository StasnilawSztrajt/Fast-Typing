<template>
    <div class="alertSuccess">
        Success
        <i class="fas fa-times sett cross" @click="closeAlert"></i>
    </div>
</template>

<script>
export default {
    name: 'AlertChangeSettings',
    methods: {
        closeAlert(){
            this.$emit('close-alert')
        }
    }
}
</script>

<style lang="scss">
    .alertSuccess{
        position: absolute;
        background-color: rgb(162, 247, 162);
        top: 0;
        left: 0%;
        width: 20vw;
        height: 5vh;
        color: #1d8f37;
        font-size: 1.2rem;
        display: flex;
        padding: .5rem;
        flex-direction: row;
        justify-content: space-between;

        .fas{
            color: #1d8f37;
            font-size: 2rem;
            transition: .2s;

            &:hover{
                color: #000;
            }
        }
    }
</style>