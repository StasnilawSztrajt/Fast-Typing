<template>
  <span
    class="excessLetters"
    v-for="(letter, index) in excessLetters"
    :key="index">
    {{ letter }}
  </span>
</template>

<script>
export default {
  name: 'ExcessLetters',
  props: {
    excessLetters: Array
  }
}
</script>

<style lang="scss">

</style>