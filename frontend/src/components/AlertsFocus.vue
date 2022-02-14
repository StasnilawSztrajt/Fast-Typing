<template>
  <div class="Alerts">
    <div class="alertFocusBackGround"></div>
    <div class="alertFocus" @click="focusInputOnClick">click on the words to get focus</div>
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  methods: {
    focusInputOnClick(){
      this.$emit('focus-input-on-click')
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

.alertFocusBackGround, .alertFocus{
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%,-50%);
  height: 10vh;
  width: 100vw;
  z-index: 1;
  background: transparent;
  backdrop-filter: blur(4px);
  transition: 2s opacity;
  transition: 2s;
}

.alertFocus{
  text-align: center;
  z-index: 2;
  color: $color-strong;
  font-family: 900;
  font-size: 2rem;
  line-height: 5.5rem;
}


@media screen and (max-width: 1050px) and(min-width: 769px){
    html{
        font-size: 15px;

        .alertFocusBackGround, .alertFocus{
          height: 20vh;
          width: 100%;
        }
    }
}

@media screen and (max-width: 768px) and(min-width: 481px){
    html{
        font-size: 14px;

        .alertFocusBackGround, .alertFocus{
          height: 25vh;
          width: 100%;
        }
    }
}

@media screen and (max-width: 480px) and(min-width: 320px){
    html{
        font-size: 13px;

        .alertFocusBackGround, .alertFocus{
          height: 25vh;
          width: 100%;
        }
    }
}
@media screen and (max-width: 319px) and(min-width: 100px){
    html{
        font-size: 12px;

        .alertFocusBackGround, .alertFocus{
          height: 25vh;
          width: 100%;
        }
    }
}
</style>