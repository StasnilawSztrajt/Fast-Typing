<template>
    <div class="word">{{ word.word }}&nbsp;</div>
</template>
<script>

export default {
    name: 'Words',
    props: {
      word: Object
    }
}
</script>
<style lang="scss">
@import '../scss/variables';

  .word{
    &:nth-child(1){
      display: none;
    }
  }

</style>