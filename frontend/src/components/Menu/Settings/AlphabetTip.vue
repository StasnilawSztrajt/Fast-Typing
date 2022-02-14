<template>
    <div class="alphabetTip" v-if="isAlphabetTip">
        <div class="cross" @click="showAlphabetTip"></div>
        <div class="text">
            If you are starting to learn to type quickly then start learning the middle of the keyboard as these keys are the most used
        </div>
        <img src="../../../assets/tips/tipalphabet.png" alt="">
        <div class="fingers">
            <div>
                1 - first finger
            </div>
            <div>
                2 - second finger
            </div>
            <div>
                3 - third finger
            </div>
            <div>
                4 - fourth finger
            </div>
            <div>
                5 - fifth finger
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlphabetTip',
    props: {
        isAlphabetTip: Boolean,
    },
    methods: {
        showAlphabetTip(){
            this.$emit('show-alphabet-tip')
        },
    }
}
</script>

<style lang="scss">
@import '../../../scss/variables.scss';

.alphabetTip{
  width: 50vw;
  height: 70vh;
  background-color: #161616;
  font-family: 'Spartan', sans-serif;
  text-align: center;
  position: absolute;
  z-index: 15;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  .cross{
      align-self: flex-end;

      &:before{
          content: "";
          margin-left: -7vh;
          width: 1vh;
          height: 5vh;
          background-color: #fff;
          transform: rotate(45deg);
          position: absolute;
          transition: .3s transform;
      }

      &:hover::before{
          transform: rotate(90deg)
      }

      &:after{
          content: "";
          margin-left: -7vh;
          display: inline-block;
          width: 1vh;
          height: 5vh;
          background-color: #fff;
          transform: rotate(-45deg);
          transition: .3s transform;
      }

      &:hover::after{
          transform: rotate(-90deg)
      }
  }

  .text{
      width: 60%;
      font-size: 1.5rem
  }

  img{
      margin-top: 5vh;
      width: 55%;
      height: 30%;
  }

  .fingers{
      text-align: left;
      margin-top: 4vh;
      font-size: 1.5rem;
  }
}




</style>