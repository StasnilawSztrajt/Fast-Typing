<template>
  <div class="live-scoreS settings">
    <h1 class="score-h1">Live score</h1>
    <div class="button" @click="showLiveScore">{{ isScoreOn }}</div>
  </div>
</template>

<script>
export default {
  name: 'LiveScoreSettings',
  props: {
    isScoreOn: String,
  },
  methods: {
    showLiveScore(){
      this.$emit('show-live-score')
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/sett.scss';
.live-scoreS{
    text-align: left;

}

</style>