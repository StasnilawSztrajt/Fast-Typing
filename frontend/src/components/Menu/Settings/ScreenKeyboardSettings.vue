<template>
  <div class="keyboardS settings">
    <h1>Screen keyboard <span class="tips" @click="showAlphabetTip"> <i class="fas fa-lightbulb"></i>  &nbsp;tip</span></h1>
    <div class="button" @click="showKeyboardFunction">{{ isShowKeyboard }}</div>
    <h3>Select layout keyboard</h3>
    <!-- niby mozna tu bylo zrobic tablice i v-forem to zrobic , ale stwierdzilem ze dla 4 elementow sie nie oplaca -->
    <button class="button-layout" @click="changeKeyboardLayout(keyboardQWERTY)">QWERTY</button>
    <button class="button-layout" @click="changeKeyboardLayout(keyboardDVORAK)">DVORAK</button>
    <button class="button-layout" @click="changeKeyboardLayout(keyboardCOLEMAK)">COLEMAK</button>
    <button class="button-layout" @click="changeKeyboardLayout(keyboardWORKMAN)">WORKMAN</button>
  </div>
</template>

<script>
export default {
  name: 'ScreenKeyboardSettings',
  props: {
    isShowKeyboard:      String,
    keyboardQWERTYY:   Array,
    keyboardDVORAK:    Array,
    keyboardCOLEMAK:   Array,
    keyboardWORKMAN:   Array,
  },
  methods: {
    showAlphabetTip(){
      this.$emit('show-alphabet-tip')
    },
    showKeyboardFunction(){
      this.$emit('show-keyboard-function')
    },
    changeKeyboardLayout(keyboardLayout){
      this.$emit('change-keyboard-layout', keyboardLayout)
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/sett.scss';
.keyboardS{
    text-align: center;
    .tips{
        font-size: 1rem;
        border: 1px solid $color-sub;
        color: $color-sub;
        padding: .4rem;
        margin-left: 3vw;
        font-weight: 100;
        transition: .3s;

        .fas{
            margin-left: 0;
            color: $color-strong-sub
        }

        &:hover{
            opacity: .5;
            cursor: pointer;
        }
    }
}

</style>