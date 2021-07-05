<template>
    <div class="score">
        <EndScoreChartLine
            :wpmChartTimeArray="wpmChartTimeArray"
            :wpmChartArray="wpmChartArray"
            :isEndTest="isEndTest"
            :timeSpent="timeSpent"
            class="chartLine"
        />
        <div class="elements">
            <div class="element" v-if="IDuser != '' && timeSpentPlus === 15">
                Record words per minute:
                <div class="element-info">
                    {{ infoUser.bestWPM15 }}wpm
                </div>
            </div>
            <div class="element" v-if="IDuser != ''  && timeSpentPlus === 15">
                Record accuracy:
                <div class="element-info">
                    {{ infoUser.accuracy15 }}
                </div>
            </div>
            <div class="element" v-if="IDuser != '' && timeSpentPlus === 60">
                Record words per minute:
                <div class="element-info">{{ infoUser.bestWPM60 }}wpm</div>
            </div>
            <div class="element" v-if="IDuser != '' && timeSpentPlus === 60">
                Record accuracy:
                <div class="element-info">{{ infoUser.accuracy60 }}</div>
            </div>

            <div class="element">
                words per minute:
                <div class="element-info">{{ wordsPerMinute }}wpm</div>
            </div>
            <div class="element">
                correct chars:
                <div class="element-info">{{ goodLetters }}</div>
            </div>
            <div class="element">
                wrong chars:
                <div class="element-info">{{ wrongLetters }}</div>
            </div>
            <div class="element">
                accuracy:
                <div class="element-info">{{ accuracy }}%</div>
            </div>
        </div>
    </div>
</template>

<script>
import EndScoreChartLine from './EndScoreChartLine'

export default {
    name: 'EndScore',
    components: {
        EndScoreChartLine
    },
    props: {
        wordsPerMinute: String,
        wrongLetters: Number,
        goodLetters: Number,
        accuracy: String,
        visableLiveScore: Boolean,
        userInfo: Object,
        timeSpentPlus: Number,
        IDuser: String,
        wpmChartTimeArray: Array,
        wpmChartArray: Array,
        isEndTest: Boolean,
        timeSpent: Number
    },
}
</script>

<style lang="scss" scope>
@import '../scss/variables';

.score{
    position: absolute;
    height: 30vh;
    background: $bg-main;
    top: 37%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    .elements{
        margin-top: 0;
        margin-left: 10vw;
        .element{
            font-size: 1.3rem;
            color: $color-sub;

            .element-info{
                color: $color-strong;
            }
        }

    }
}



@media screen and (max-width: 1500px) and(min-width: 1025px){
    html{
        font-size: 14px;
        .chartLine{
            width: 40vw;
        }
    }
}

@media screen and (max-width: 1024px) and(min-width: 769px){
    html{
        font-size: 14px;
        .chartLine{
            width: 40vw;
        }
    }
}

@media screen and (max-width: 768px) and(min-width: 481px){
    html{
        font-size: 13px;
        .chartLine{
            width: 70vw;
        }
    }
}

@media screen and (max-width: 480px) and(min-width: 320px){
    html{
        font-size: 12px;
        .chartLine{
            width: 70vw;
        }
    }
}
@media screen and (max-width: 319px) and(min-width: 100px){
    html{
        font-size: 11px;
    }
}


</style>