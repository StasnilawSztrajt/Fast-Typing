<template>
  <div>
    <nav>
      <a href="/"><span>FastTyping</span></a>
      <a href="/visit/"><i class="fas fa-question"></i></a>
      <a href="/topUsers/"><i class="fas fa-tachometer-alt"></i></a>
      <a href="/faq/"><i class="fas fa-headset"></i></a>
      <a href="/login"><i class="fas fa-sign-in-alt"></i></a>
    </nav>
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

export default {
  name: 'FAQ',
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

  nav{
    text-align: center;

    a{
        text-decoration: none;
    }

    .username{
        font-size: 1rem;
        color: $color-sub;
        margin-left: 1vw;
        transition: .3s color;

        &:hover{
            color: $color-strong;
        }
    }

    span{
        color: $color-strong;
        font-weight: 600;
        font-size: 2rem;
    }

    .fas {
        margin-left: 1vw;
        transition: .3s color;
        color: $color-sub;
        font-size: 1rem;
        cursor: pointer;

        &:hover{
            color: $color-strong;
        }
    }

    .fa-cog{
        font-size: 2rem;
    }

    .settings-blur{
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 12;
        background-color: transparent;
        position: absolute;
        background: transparent;
        backdrop-filter: blur(4px);
    }

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