<template>
    <div class="natural" :style="letter.correctness">
        {{ letter.letter }}
    </div>
</template>

<script>
//
export default {
    name: 'FirstWord',
    props: {
        letter: Object
    },
}
</script>

<style lang="scss">
@import '../scss/variables';

    .natural{
        color: $color-strong-sub;
    }

</style>