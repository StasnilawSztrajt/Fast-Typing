<template>
    <div>
        <div class="settings-blur" v-show="alphabetTip"></div>
        <div class="alphabetTip" v-show="alphabetTip">
                <div class="cross" @click="showAlphabetTip"></div>
                <div class="text">
                    If you are starting to learn to type quickly then start learning the middle of the keyboard as these keys are the most used
                </div>
                <img src="../assets/tips/tipalphabet.png" alt="">
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
        <div class="setting" v-show="layerSett">
            <div class="alertSuccess" v-show="alertSuccess">
                Success
                <i class="fas fa-times sett cross" @click="closeAlert"></i>
            </div>
            <div class="flexCross" @click="showLayerSett">
                <i class="fas fa-times sett cross"></i>
            </div>
            <div class="settings-flex">
                <div class="grid-elements">

                    <div class="langS settings">
                        <h1 class="lang-h1">Languages</h1>
                        <div class="languages" >
                            <div
                                v-for="(lang,index) in languagesArray"
                                :key="index"
                                class="lang button"
                                @click="$emit('change-language', lang.json)"
                                >
                                {{ lang.lang }}
                            </div>

                        </div>
                    </div>

                    <div class="forLearnS settings">
                        <h1>Learning to write <span class="tips" @click="showAlphabetTip"> <i class="fas fa-lightbulb"></i>  &nbsp;tip</span> </h1>


                        <div class="forLearn">
                            <div
                                v-for="(char,index) in alphabetArray"
                                :key="index"
                                class="char button"
                                @click="$emit('change-language-alphabet', char.json)"
                                >
                                {{ char.char }}
                            </div>
                        </div>
                    </div>

                    <div class="timeS settings">
                        <h1 class="time-h1">Time</h1>
                            <div class="times">
                                <div
                                    class="time button"
                                    v-for="time in timeToChangeArray"
                                    :key="time"
                                    @click="$emit('change-time-spent',time)"
                                    >
                                    {{ time }}s
                                </div>
                            </div>
                        <input type="number" placeholder="Here you can enter your own time(in seconds)" max="10000" class="inputOptionalTime">
                        <div class="approveBtnOptionalTime" @click="changeTimeSpentOptional">confirm</div>
                    </div>

                    <div class="writingS settings">
                        <h1 class="writing-h1">Type of writing</h1>
                        <div class="tows">
                            <div class="button" @click="changeTypeOfWriting1" >letters and words shifting</div>
                            <div class="button" @click="changeTypeOfWriting2" >line after words moves</div>
                        </div>
                    </div>

                    <div class="live-scoreS settings">
                        <h1 class="score-h1">Live score</h1>
                        <div class="button" @click="showLiveScore">{{ showScore }}</div>
                    </div>

                    <div class="keyboardS settings">
                        <h1>Screen keyboard <span class="tips" @click="showAlphabetTip"> <i class="fas fa-lightbulb"></i>  &nbsp;tip</span></h1>
                        <div class="button" @click="showKeyboardFunction">{{ showKeyboard }}</div>
                        <h3>Select layout keyboard</h3>
                        <button class="button-layout" @click="$emit('change-layout', keyboardQWERTY)">QWERTY</button>
                        <button class="button-layout" @click="$emit('change-layout', keyboardDVORAK)">DVORAK</button>
                        <button class="button-layout" @click="$emit('change-layout', keyboardCOLEMAK)">COLEMAK</button>
                        <button class="button-layout" @click="$emit('change-layout', keyboardWORKMAN)">WORKMAN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        layerSett:         Boolean,
        showScore:         String,
        showKeyboard:      String,
        languagesArray:    Array,
        timeToChangeArray: Array,
        alertSuccess:      Boolean,
        alphabetArray:     Array,
        keyboard:          Array,
        keyboardQWERTYY:   Array,
        keyboardDVORAK:    Array,
        keyboardCOLEMAK:   Array,
        keyboardWORKMAN:   Array,
        alphabetTip:       Boolean,
        value:             String
    },
    methods: {
        showLayerSett(){
            this.$emit('show-layer-sett')
        },
        changeTimeSpentOptional(){
            this.$emit('change-time-spent-optional')
        },
        changeTypeOfWriting1(){
            this.$emit('change-type-of-writing1')
        },
        changeTypeOfWriting2(){
            this.$emit('change-type-of-writing2')
        },
        showLiveScore(){
            this.$emit('show-live-score')
        },
        showKeyboardFunction(){
            this.$emit('show-keyboard-function')
        },
        showLayerTopUsers(){
            this.$emit('show-layer-top-users')
        },
        closeAlert(){
            this.$emit('close-alert')
        },
        changeLayout(){
            this.$emit('change-layout')
        },
        showAlphabetTip(){
            this.$emit('show-alphabet-tip')
        },

    },
}
</script>

<style lang="scss">
@import '../scss/variables';

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

    .setting{
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 11;
        background-color: $bg-main;
        position: absolute;




        .alertSuccess{
            position: absolute;
            background-color: rgb(162, 247, 162);
            top: 0;
            left: 0%;
            width: 20vw;
            height: 5vh;
            color: #1d8f37;
            font-size: 1.2rem;
            display: flex;
            padding: .5rem;
            flex-direction: row;
            justify-content: space-between;
            transition: .3s all;

            .fas{
                color: #1d8f37;
                font-size: 2rem;
                transition: .2s;

                &:hover{
                    color: #000;
                }
            }
        }

        .flexCross{
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
            top: 0;

            .cross{
                text-align: center;
                line-height: 5vh;
                font-size: 2rem;
                width: 5vh;
                height: 5vh;
                transition: all .5s;
                background-color: $color-strong;
                color: $bg-main;


                &:hover{
                    opacity: 0.7;
                }
            }
        }

        .settings-flex{
            height: 90%;
            display:flex;
            align-items:center;
            justify-content:center;

            .grid-elements{
                display: grid;
                grid-template-columns: 40vw 40vw;
                grid-row: auto auto;
            }

            .langS{
                text-align: left;
                .lang{
                    display: inline-block;
                    width: 30%;
                }
            }
            .timeS{
                text-align: left;
                .time{
                    display: inline-block;
                    width: 10%;
                }
            }
            .live-scoreS{
                text-align: left;
                .live-score{

                }
            }
            .writingS{
                text-align: center;
                .tows{

                }
            }
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
            .keyboardS{
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
            }

            .settings{
                padding-bottom: 8vh;

                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
                .inputOptionalTime{
                    background-color: transparent;
                    outline: none;
                    border: none;
                    border-bottom: 2px solid #5e5c5cb9;
                    color: $zaje-color;
                    margin-top: 3vh;
                    font-size: 1.2rem;
                    width: 60%;
                }
                .approveBtnOptionalTime{
                    display: inline-block;
                    border: 2px solid #5e5c5cb9;
                    cursor: pointer;
                    width: 5vw;
                    height: 3vh;
                    text-align: center;
                    margin-left: 1%;
                    transition: .3s background-color;

                    &:hover{
                        background-color: #5e5c5cb9;
                    }
                }


                &:nth-child(1){
                    border-right: 1px solid #5e5c5cb9;
                    border-bottom: 1px solid #5e5c5cb9;
                }
                &:nth-child(2){
                    border-left: 1px solid #5e5c5cb9;
                    border-bottom: 1px solid #5e5c5cb9;
                }
                &:nth-child(3){
                    border-right: 1px solid #5e5c5cb9;
                    border-top: 1px solid #5e5c5cb9;
                    border-bottom: 1px solid #5e5c5cb9;
                }
                &:nth-child(4){
                    border-left: 1px solid #5e5c5cb9;
                    border-top: 1px solid #5e5c5cb9;
                    border-bottom: 1px solid #5e5c5cb9;
                }
                &:nth-child(5){
                    border-top: 1px solid #5e5c5cb9;
                    border-right: 1px solid #5e5c5cb9;
                }
                &:nth-child(6){
                    border-left: 1px solid #5e5c5cb9;
                    border-top: 1px solid #5e5c5cb9;
                }

                h1{
                    color: $color-strong;
                }

                .button{
                    font-size: 1.4rem;
                    padding: 5px;
                    transition: all .2s;
                    cursor: pointer;
                    color: $color-strong-sub;


                    &:hover{
                        color: $color-strong;
                    }
                }

                .button-layout{
                    background: transparent;
                    color: $color-sub;
                    border: none;
                    margin-left: 4vh;
                    transition: .3s opacity;
                    font-size: 1rem;
                    cursor: pointer;

                    &:hover{
                        opacity: .5;
                    }
                }

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