<template>
  <input
    type="text"
    maxlength="20"
    v-model="valueInput"
    @keydown="checkWord"
    @focus="whileFocusInput"
    @blur="unFocusInput"
    class="inputToWrite"
    :disabled="disabled"
    ref="focusInputWrite"
  >
</template>

<script>
export default {
  props: {
    valueInputToWrite: String,
  },
  methods: {
    checkWord(){
      this.$emit('check-word')
    },
    whileFocusInput(){
      this.$emit('while-focus-input')
    },
    unFocusInput(){
      this.$emit('un-focus-input')
    }
  }
}
</script>

<style lang="scss">
  .inputToWrite{
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    outline: none;
    font-size: 2rem;
    border: none;
  }
  .inputToWrite:focus{
    border: none;
  }
</style>