<template>
<div>
    <div
        class="keyboard"
        :id="keyboard"
        ref="keyboardRef"
        @mousemove="draging(keyboard)"
        @mousedown="drag(keyboard)"
        @mouseup="drop(keyboard)"
         >
        <div class="firstColumn column">
            <div
                class="button"
                v-for="(key,index) in keyboard[1]"
                :key="index"
                :style="key.active">
                {{ key.letter }}
            </div>
        </div>

        <div class="secondColumn column">
            <div
                class="button"
                v-for="(key,index) in keyboard[2]"
                :key="index"
                :style="key.active">
                {{ key.letter }}
            </div>
        </div>
        <div class="thirdColumn column">
            <div
                class="button"
                v-for="(key,index) in keyboard[3]"
                :key="index"
                :style="key.active">
                {{ key.letter }}
            </div>
        </div>
        <div class="fourthColumn column">
            <div
                class="button"
                v-for="(key,index) in keyboard[4]"
                :key="index"
                :style="key.active">
                {{ key.letter }}
            </div>
        </div>
        <div class="fifthColumn column">
            <div
                class="button"
                v-for="(key,index) in keyboard[5]"
                :key="index"
                :style="key.active">
                {{ key.letter }}
            </div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    name: 'ScreenKeyboard',
    data(){
        return{
            pickedUp: false,
            heightKeyboard: 0,
            widthKeyBoard: 0
        }
    },
    props: {
        keyboard: Array,
        opacityStart: Object
    },
    methods: {
        //łapanie klawiatury
        drag(keyboard){
            let doc = document.getElementById(keyboard);
            doc.style.position = "absolute";
            this.pickedUp = true;
        },
        //przeciąganie klawiatury
        draging(keyboard){
            let doc = document.getElementById(keyboard);
            if(this.pickedUp){
                if(doc.offsetTop < 0){
                    return doc.style.top = 1 + 'px';
                }
                else if(doc.offsetLeft < 0){
                    return doc.style.left = 0 + 'px';
                }
                else if(doc.offsetTop + this.heightKeyboard > window.innerHeight){
                    return doc.style.top = (window.innerHeight - this.heightKeyboard) + 'px';
                }
                else if(doc.offsetLeft + this.widthKeyboard > window.innerWidth){
                    return doc.style.left = (window.innerWidth - this.widthKeyboard) + 'px';
                }
                else{
                    doc.style.left = event.clientX - 250 + "px";
                    doc.style.top = event.clientY - 50 + "px";
                    this.heightKeyboard = this.$refs.keyboardRef.clientHeight;
                    this.widthKeyboard = this.$refs.keyboardRef.clientWidth;
                }

            }

        },
        //rzucanie klawiatury
        drop(){
            this.pickedUp = false;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables.scss';

    .keyboard{
        position: absolute;
        top: 100px;
        left: 100px;
        display: flex;
        flex-direction: column;
        width: 75vh;
        height: 25vh;
        box-sizing: border-box;
        z-index: 10;
        font-size: .8rem;
        background-color: $bg-main;
        cursor: pointer;
        overflow: hidden;


        .column{
            .button{
                width: 5vh;
                height: 5vh;
                border: 1px solid white;
                text-align: center;
                padding: .6rem;
            }
        }

        .firstColumn{
            display: flex;
            flex-direction: row;
            .button{
                &:last-child{
                    width: 10vh;
                }
            }

        }
        .secondColumn{
            display: flex;
            flex-direction: row;

            .button{
                &:first-child{
                    width: 7.5vh;
                }

                &:last-child{
                    width: 7.5vh;
                }
            }
        }
        .thirdColumn{
            display: flex;
            flex-direction: row;

            .button{
                &:first-child{
                    width: 10vh;
                }
                &:last-child{
                    width: 12.5vh;
                }
            }
        }
        .fourthColumn{
            display: flex;
            flex-direction: row;

            .button{
                &:first-child{
                    width: 12.5vh;
                }
                &:last-child{
                    width: 12.5vh;
                }
            }
        }
        .fifthColumn{
            display: flex;
            flex-direction: row;

            .button{
                &:nth-child(1){
                    width: 7vh;
                }
                &:nth-child(3){
                    width: 6vh;
                }
                &:nth-child(4){
                    width: 35vh;
                }
                &:nth-child(5){
                    width: 7vh;
                }
                &:nth-child(7){
                    width: 6vh;
                }
                &:nth-child(8){
                    width: 7vh;
                }
            }

        }
    }
</style>
