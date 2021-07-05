<template>
  <div class="live-scoreS settings">
    <h1 class="score-h1">Live score</h1>
    <div class="button" @click="showLiveScore">{{ isShowScore }}</div>
  </div>
</template>

<script>
export default {
  name: 'LiveScoreSettings',
  props: {
    isShowScore: String,
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
    .live-score{

    }
}

</style>