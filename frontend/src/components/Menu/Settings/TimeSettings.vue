<template>
  <div class="timeS settings">
    <h1 class="time-h1">Time</h1>
      <div class="times">
        <div
            class="time button"
            v-for="time in timeToChangeArray"
            :key="time"
            @click="changeTimeSpent(time)"
        >
          {{ time }}s
        </div>
      </div>
    <input type="number" placeholder="Here you can enter your own time(in seconds)" max="10000" class="inputOptionalTime" value="valueTimeSpentOptional">
    <div class="approveBtnOptionalTime" @click="changeTimeSpentOptional">confirm</div>
  </div>
</template>

<script>
export default {
  name: 'TimeSettings',
  props: {
    timeToChangeArray: Array,
    valueTimeSpentOptional: String
  },
  methods: {
    changeTimeSpent(time){
      this.$emit('change-time-spent', time)
    },
    changeTimeSpentOptional(){
      this.$emit('change-time-spent-optional')
    }
  }
}
</script>

<style lang="scss">
@import '../../../scss/sett.scss';
.timeS{
    text-align: left;
    .time{
        display: inline-block;
        width: 10%;
    }
}

</style>