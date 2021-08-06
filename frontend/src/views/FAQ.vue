<template>
  <div>
    <MenuForSubRoutes />
    <main>
      <div class="numberSlide">{{ numberSlide + 1}}/{{ slides.length }}</div>
      <div class="slider">
        <button class="previous" @click="previousSlide"><i class="fas fa-arrow-left"></i></button>
        <img class="slide" :src="slideActive" alt="Bład ...">
        <button class="plus" @click="nextSlide"><i class="fas fa-arrow-right"></i></button>
      </div>
    </main>
  </div>
</template>

<script>
import MenuForSubRoutes from '../components/Menu/MenuForSubRoutes.vue'

export default {
  name: 'FAQ',
  components: {
    MenuForSubRoutes
  },
  data(){
    return{
      // wszystkie slajdy
      // all slides
      slides: [],
      // aktywny slajd
      // active slide
      slideActive: require('../assets/slider/slide1.png'),

      // numer slajdu
      // number slide
      numberSlide: 0,

      // zmienna do ktorej przekazywany jest setInterval
      // the variable to which setInterval is passed
      changeSlideInterval: 0
    }
  },
  methods: {
    // funkcja zmiany slajdu
    // function changes slide
    changeSlideFunction(){
      if(this.numberSlide >= this.slides.length - 1){
        this.numberSlide = 0
        this.slideActive = this.slides[this.numberSlide]
      }
      else{
        this.numberSlide++
        this.slideActive = this.slides[this.numberSlide]
      }
    },
    changeSlide(){
      this.changeSlideInterval = setInterval(this.changeSlideFunction, 3000)
    },

    // wyczyszczenie setInterval
    // clear setInterval
    clearChangeSlide(){
      clearInterval(this.changeSlideInterval)
      this.changeSlideInterval = setInterval(this.changeSlideFunction, 3000)
    },

    // cofnięcie slajdu
    // previous slide
    previousSlide(){
      this.clearChangeSlide()

      if(this.numberSlide === 0){
        this.numberSlide = this.slides.length
        this.slideActive = this.slides[this.numberSlide]
      }
      else{
        this.numberSlide--
        this.slideActive = this.slides[this.numberSlide]
      }
    },

    // następny slajd
    // next slide
    nextSlide(){
      this.clearChangeSlide()

      if(this.numberSlide >= this.slides.length - 1){
        this.numberSlide = 0
        this.slideActive = this.slides[this.numberSlide]
      }
      else{
        this.numberSlide++
        this.slideActive = this.slides[this.numberSlide]
      }
    }
  },
  mounted() {
    for(let i=1; i<=13; i++) {
      this.slides.push(require(`../assets/slider/slide${i}.png`))
    }
    this.changeSlide()
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';


  body{
    main{
      width: 100vw;
      height: 80vh;
      margin-top: 6vh;
      background-color: rgb(71, 70, 70);
      display: flex;
      align-items:center;
      justify-content:center;
    }

    .numberSlide{
      font-size: 4rem;
      position: absolute;
      top: 12%;
      left: 2%;
    }

    .slider{
      display: flex;
      align-items: center;
      justify-content: space-around;

      .previous,.plus{
        font-size: 4rem;
        background-color: transparent;
        border-radius: 10%;
        height: 5vw;
        width: 5vw;
        transition: all .3s;
        outline: none;
        border: none;
        cursor: pointer;
        color: $zaje-color;

        &:hover{
          opacity: .5;
        }
      }
      .slide{
        border: 2px solid $color-strong;
        width: 80%;
        height: 80%;
      }
    }
  }


@media screen and (max-width: 1500px) and(min-width: 1025px){
    html{
        font-size: 14px !important;
    }

}

@media screen and (max-width: 1024px) and(min-width: 769px){
    html{
        font-size: 13px !important;
    }
}

@media screen and (max-width: 768px) and(min-width: 481px){
    html{
        font-size: 8px !important;
    }
}

@media screen and (max-width: 480px) and(min-width: 320px){
    html{
        font-size: 6px !important;
    }
}
@media screen and (max-width: 319px) and(min-width: 100px){
    html{
        font-size: 5px !important;
    }
}
</style>