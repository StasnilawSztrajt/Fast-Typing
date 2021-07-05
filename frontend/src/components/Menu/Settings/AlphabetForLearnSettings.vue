<template>
    <div class="forLearnS settings">
        <h1>Learning to write <span class="tips" @click="isShowAlphabetTip"> <i class="fas fa-lightbulb"></i>  &nbsp;tip</span> </h1>

        <div class="forLearn">
            <div
                v-for="(char,index) in alphabetArray"
                :key="index"
                class="char button"
                @click="changeLanguageAlphabet(char.json)"
                >
                {{ char.char }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AlphabetForLearnSettings',
    props: {
        alphabetArray: Array,
    },
    methods: {
        showAlphabetTip(){
            this.$emit('show-alphabet-tip')
        },
        changeLanguageAlphabet(char){
            this.$emit('change-language-alphabet', char)
        }
    }
}
</script>

<style lang="scss">
@import '../../../scss/sett.scss';
.forLearnS{
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

    .forLearn{
        width: 38vw;
        .char{
            display: inline-block;
            margin-left: 3vw;
            font-family: 'Roboto Mono', monospace;
        }

    }
}



</style>