<template>
  <div class="writingS settings">
    <h1 class="writing-h1">Type of writing</h1>
    <div class="tows">
        <div class="button" @click="changeTypeOfWriting1" >letters and words shifting</div>
        <div class="button" @click="changeTypeOfWriting2" >line after words moves</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WritingSettings',
  methods: {
    changeTypeOfWriting1(){
      this.$emit('change-type-of-writing1')
    },
    changeTypeOfWriting2(){
      this.$emit('change-type-of-writing2')
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/sett.scss';
.writingS{
  text-align: center;
}

</style>