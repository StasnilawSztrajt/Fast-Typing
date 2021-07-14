<template>
    <nav>
        <div class="navElements" v-show="!isLayerSett || !isLayerTopUsers">
        <a href="/"><span>FastTyping</span></a>
        <i class="fas fa-cog" @click="showLayerSett"></i>
        <a href="/visit"><i class="fas fa-question"></i></a>
        <i class="fas fa-tachometer-alt" @click="showLayerTopUsers"></i>
        <a href="/faq"><i class="fas fa-headset"></i></a>
        <a href="http://localhost:8080/login/">
            <i class="fas fa-sign-in-alt"></i>
            <span class="username">{{ userInfo.username }}</span>
        </a>

        </div>
    </nav>
</template>
<script>

export default {
    name: 'Menu',
    props: {
        isLayerSett:     Boolean,
        isLayerTopUsers: Boolean,
        userInfo:      Object,
    },
    methods: {
        showLayerSett(){
            this.$emit('show-layer-sett')
        },
        showLayerTopUsers(){
            this.$emit('show-layer-top-users')
        },
    },
}
</script>
<style lang="scss">
@import '../../scss/variables.scss';

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