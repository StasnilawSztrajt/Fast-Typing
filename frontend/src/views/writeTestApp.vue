<template @load="loadWords">
  <div id="app" >
    <!-- Pobieranie elementow z compenent i wyswietlanie ich przez <NazwaComponentu /> -->
    <!-- Getting items from a component and displaying them by <NameCompenent /> -->
    <div class="menu" :style="styleBody">
      <Menu
        :userInfo="userInfo"
        :isLayerSett="isLayerSett"
        @show-layer-sett="showLayerSett"
      />
      <div class="settings">
        <div class="settings-blur" v-show="isAlphabetTip"></div>
        <AlphabetTip
          :isAlphabetTip="isAlphabetTip"
          @show-alphabet-tip="showAlphabetTip"
        />
        <div class="setting" v-show="isLayerSett">
          <SuccessAlert
            :isAlertSuccess="isAlertSuccess"
            @close-alert="closeAlert"
          />
          <CrossToCloseSettings
            @show-layer-sett="showLayerSett"
          />
          <div class="setting-flex">
            <div class="grid-elements">
              <LanguagesSettings
                :languagesArray="languagesArray"
                @change-language="changeLanguage"
              />
              <AlphabetForLearnSettings
                :alphabetArray="alphabetArray"
                @show-alphabet-tip="showAlphabetTip"
                @change-language-alphabet="changeLanguageAlphabet"
              />
              <TimeSettings
                :timeToChangeArray="timeToChangeArray"
                @change-time-spent="changeTimeSpent"
                @change-time-spent-optional="changeTimeSpentOptional"
                @input="valueTimeSpentOptional = $event.target.value"
              />
              <WritingSettings
                @change-type-of-writing1="changeTypeOfWriting1"
                @change-type-of-writing2="changeTypeOfWriting2"
              />
              <LiveScoreSettings
                :isShowScore="isShowScore"
                @show-live-score="showLiveScore"
              />
              <ScreenKeyboardSettings
                :isShowKeyboard="isShowKeyboard"
                :keyboardQWERTY="keyboardQWERTY"
                :keyboardDVORAK="keyboardDVORAK"
                :keyboardCOLEMAK="keyboardCOLEMAK"
                :keyboardWORKMAN="keyboardWORKMAN"
                @show-alphabet-tip="showAlphabetTip"
                @show-keyboard-function="showKeyboardFunction"
                @change-keyboard-layout="changeKeyboardLayout"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ScreenKeyboard
      :keyboard="keyboard"
      :style="opacityStart"
      v-show="isShowKeyboardBool"
    />
    <main v-show="isShowMain">
      <EndScore
        v-if="isEndTest"
        :wordsPerMinute="wordsPerMinute"
        :wrongLetters="wrongLetters"
        :goodLetters="goodLetters"
        :accuracy="accuracy"
        :userInfo="userInfo"
        :timeSpentPlus="timeSpentPlus"
        :IDuser="IDuser"
        :wpmChartTimeArray="wpmChartTimeArray"
        :wpmChartArray="wpmChartArray"
        :isEndTest="isEndTest"
        :timeSpent="timeSpent"
        />
      <AlertsFocus
        :style="opacityStart"
        v-show="focusInput"
        @focus-input-on-click="focusInputOnClick"
      />

      <div class="allWords" :style="opacityStart" @click="focusInputOnClick">
        <div class="lineBehindLetter" :style="marginLineBehindLetter"></div>
        <div class="firstWord" :style="marginWordAfterKeyup">
          <FirstWord
            :natural="natural"
            :letter="letter"
            :wordsOnPage="wordsOnPage"
            v-for="letter in wordsOnPage[0].letters"
            :key="letter.id"
          />

          <ExcessLetters
            v-for="(letter, index) in excessLetters"
            :key="index"
            :letter="letter"
          />
        </div>

        <div class="subWords">
          <Words
            :word="word"
            v-for="word in wordsOnPage"
            :key="word.id"
          />
        </div>
      </div>

      <div class="elements">
        <!-- nie wrzucilem do componentu bo nie wiedzialem do konca w jaki sposob przekazac ref'a  -->
        <input
          type="text"
          maxlength="20"
          v-model="valueInputToWrite"
          @input="AFKdetector"
          @keydown="checkWord"
          @focus="whileFocusInput"
          @blur="unFocusInput"
          class="inputToWrite"
          ref="focusInputToWrite"
          :disabled="disabled"
        >

        <div class="helper-elements" >
          <TimeSpentButton
            :normalColorTimeSpent="normalColorTimeSpent"
            :opacityColorTimeSpent="opacityColorTimeSpent"
            :timeSpent="timeSpent"
            :opacityStart="opacityStart"
            @change-opacity-time-spent="opacityTimeSpent"
          />
          <ReloadButton
            @reload-functions="reload"
          />
          <Shortcut/>
        </div>
      </div>

      <Scores
        :wordsPerMinute="wordsPerMinute"
        :wrongLetters="wrongLetters"
        :goodLetters="goodLetters"
        :accuracy="accuracy"
        :isShowScore="isShowScore"
        :isShowScoreBool="isShowScoreBool"
        :style="opacityStart"
      />

    </main>
  </div>
</template>

<script>
// Biblioteki  axios: do pobierania i wysyłania danych, deounce: w danym czasie aktywuje sie funkcja zawarta w debounce()

import axios from 'axios'

// importowanie Componentow
// importing Components

import Menu from '../components/Menu/Menu';
import AlphabetTip from '../components/Menu/Settings/AlphabetTip';
import SuccessAlert from '../components/Menu/Settings/SuccessAlert';
import CrossToCloseSettings from '../components/Menu/Settings/CrossToCloseSettings';
import LanguagesSettings from '../components/Menu/Settings/LanguagesSettings';
import AlphabetForLearnSettings from '../components/Menu/Settings/AlphabetForLearnSettings';
import TimeSettings from '../components/Menu/Settings/TimeSettings';
import WritingSettings from '../components/Menu/Settings/WritingSettings';
import LiveScoreSettings from '../components/Menu/Settings/LiveScoreSettings';
import ScreenKeyboardSettings from '../components/Menu/Settings/ScreenKeyboardSettings';


import ScreenKeyboard from '../components/Menu/Settings/ScreenKeyboard';
import AlertsFocus from '../components/AlertsFocus';


import FirstWord from '../components/FirstWord';
import ExcessLetters from '../components/ExcessLetters';
import Words from '../components/Words';

import EndScore from '../components/EndScore';
import Scores from '../components/Scores';

import TimeSpentButton from '../components/TimeSpentButton'
import ReloadButton from '../components/ReloadButton'
import Shortcut from '../components/Shortcut'

// importowanie layoutow
// importing layouts

import keyboardQWERTY from '../keyboard-layouts/qwerty.json'
import keyboardDVORAK from '../keyboard-layouts/dvorak.json'
import keyboardCOLEMAK from '../keyboard-layouts/colemak.json'
import keyboardWORKMAN from '../keyboard-layouts/workman.json'

// importowanie Jezykow
// importing languages

import english from '../languages/english.json';
import french from '../languages/french.json';
import german from '../languages/german.json';
import italian from '../languages/italian.json';
import polish from '../languages/polish.json';
import portuguese from '../languages/portuguese.json';
import russian from '../languages/russian.json';
import spanish from '../languages/spanish.json';
import swedish from '../languages/swedish.json';

// importowanie alfabetu
// importing alphabet

import Aa from '../languages/alphabet/a.json'
import Bb from '../languages/alphabet/b.json'
import Cc from '../languages/alphabet/c.json'
import Dd from '../languages/alphabet/d.json'
import Ee from '../languages/alphabet/e.json'
import Ff from '../languages/alphabet/f.json'
import Gg from '../languages/alphabet/g.json'
import Hh from '../languages/alphabet/h.json'
import Ii from '../languages/alphabet/i.json'
import Jj from '../languages/alphabet/j.json'
import Kk from '../languages/alphabet/k.json'
import Ll from '../languages/alphabet/l.json'
import Mm from '../languages/alphabet/m.json'
import Nn from '../languages/alphabet/n.json'
import Oo from '../languages/alphabet/o.json'
import Pp from '../languages/alphabet/p.json'
import Qq from '../languages/alphabet/q.json'
import Rr from '../languages/alphabet/r.json'
import Ss from '../languages/alphabet/s.json'
import Tt from '../languages/alphabet/t.json'
import Uu from '../languages/alphabet/u.json'
import Vv from '../languages/alphabet/v.json'
import Ww from '../languages/alphabet/w.json'
import Xx from '../languages/alphabet/x.json'
import Yy from '../languages/alphabet/y.json'
import Zz from '../languages/alphabet/z.json'

import API_URL from '../API_URL'

export default {
  name: 'writeTestApp',
  // Przekazywanie importowanych componentow do components
  // Uploading imported components to components
  components: {
    Menu,
    AlphabetTip,
    SuccessAlert,
    CrossToCloseSettings,
    LanguagesSettings,
    AlphabetForLearnSettings,
    TimeSettings,
    WritingSettings,
    LiveScoreSettings,
    ScreenKeyboardSettings,
    ScreenKeyboard,
    AlertsFocus,
    FirstWord,
    ExcessLetters,
    Words,
    ReloadButton,
    TimeSpentButton,
    Shortcut,
    EndScore,
    Scores
  },
  data() {
    // Zmienne w aplikacji
    // Variables in the application
    return{
      // zmienne przekazywane z backendu poprzez axios
      // variables passed from the backend through axios
      IDuser: '',
      userInfo: {},
      userCookie: this.$cookies.get('user'),

      // Tablica , w której znajdują sie nazwy jezykow oraz ich plik .json
      // Array include the names of the languages and their .json file
      languagesArray: [

        {
          lang: 'English',
          json: english
        },
        {
          lang: 'French',
          json: french
        },
        {
          lang: 'German',
          json: german
        },
        {
          lang: 'Italian',
          json: italian
        },
        {
          lang: 'Polish',
          json: polish
        },
        {
          lang: 'Portuguese',
          json: portuguese
        },
        {
          lang: 'Russian',
          json: russian
        },
        {
          lang:'Spanish',
          json: spanish
        },
        {
          lang: 'Swedish',
          json: swedish
        }
      ],

      // Tablica , w której znajdują sie nazwy jezykow oraz ich plik .json
      // Array includes the names of thelanguages and their .json file
      alphabetArray: [
        {
          char: 'A a',
          json: Aa
        },
        {
          char: 'B b',
          json: Bb
        },
        {
          char: 'C c',
          json: Cc
        },
        {
          char: 'D d',
          json: Dd
        },
        {
          char: 'E e',
          json: Ee
        },
        {
          char: 'F f',
          json: Ff
        },
        {
          char: 'G g',
          json: Gg
        },
        {
          char: 'H h',
          json: Hh
        },
        {
          char: 'I i',
          json: Ii
        },
        {
          char: 'J j',
          json: Jj
        },
        {
          char: 'K k',
          json: Kk
        },
        {
          char: 'L l',
          json: Ll
        },
        {
          char: 'M m',
          json: Mm
        },
        {
          char: 'N n',
          json: Nn
        },
        {
          char: 'O o',
          json: Oo
        },
        {
          char: 'P p',
          json: Pp
        },
        {
          char: 'Q q',
          json: Qq
        },
        {
          char: 'R r',
          json: Rr
        },
        {
          char: 'S s',
          json: Ss
        },
        {
          char: 'T t',
          json: Tt
        },
        {
          char: 'U u',
          json: Uu
        },
        {
          char: 'V v',
          json: Vv
        },
        {
          char: 'W w',
          json: Ww
        },
        {
          char: 'X x',
          json: Xx
        },
        {
          char: 'Y y',
          json: Yy
        },
        {
          char: 'Z z',
          json: Zz
        },
      ],

      // Jezyk , ktory jest włączony (domyslny angielski)
      // active language (default english)
      languageOn: english,


      // zmienne z pliku ../scss/variables.scss
      // variables from ../scss/variables.scss
      bgMain: '#353638',
      colorStrong: '#f5ba3',
      colorSub: '#b3b3b3b9',
      colorStrongSub: '#c5c5c5',
      zajeColor: '#d1d0c5',

      // zmienne z głownego input
      // variables main input
      valueInputToWrite: '',
      valueInputLength: 0,
      timeSpent: 60,
      timeSpentPlus: 0,
      valueTimeSpentOptional: '',
      disabled: false,
      focusInput: false,
      timeDebounce: 60,
      timeToTypeStorage: 60,
      excessLetters: [],

      // zmienne dla : v-show / v-if / :class
      // variables for : v-show / v-if / :class
      normalColorTimeSpent: true,
      opacityColorTimeSpent: false,
      isLayerSett: false,
      isLayerTopUsers: false,
      isStopTime: false,
      natural: true,
      isEndTest: false,
      isShowMain: true,
      isAlertSuccess: false,
      isAlphabetTip: false,
      isKeyboardTip: false,
      styleBody: {
        'transition': '.2s opacity',
        'opacity': '1'
      },
      opacityElements: {
        'transition': '.2s opacity',
        'opacity': '1'
      },


      // zmienne wyników na żywo
      // live score variables
      isShowScore: 'OFF',
      isShowScoreBool: false,

      // zmienne klawiatury ekranowej
      // variables screen keyboard
      isShowKeyboard: 'OFF',
      isShowKeyboardBool: false,

      // zmienne powiązane ze słowami na minutę
      // variables bound to words per minute
      wordsPerMinute: 0,
      wordsPerMinuteEnd: 0,
      wrongLetters: 0,
      goodLetters: 0,
      accuracy: '',
      accuracyEnd: '',
      wpmChartArray: [],
      wpmChartTimeArray: [],

      // zmienna do ktorej zostanie przypisane setInterval()
      // The variable to which will be assigned setInterval()
      timer: 0,
      // checkLetterInterval: null,

      // zmienne potrzebne do sprawdzenia poprawnosci liter
      // variables needed to validate letters
      letterOfValue: '',
      numberOfLetter: 0,

      // zmienne ułady klawiatur
      // variables keyboard layouts
      keyboardQWERTY: keyboardQWERTY,
      keyboardDVORAK: keyboardDVORAK,
      keyboardCOLEMAK: keyboardCOLEMAK,
      keyboardWORKMAN: keyboardWORKMAN,

      // aktywny układy klawiatury
      // active keyboard layout
      keyboard: [],

      // inne zmienne
      // different variables
      useOnceAfterTimeZero: true,
      timeToChangeArray: [5,10,15,30,60,120],
      reloaded: true,

      // zmeinne potrzebne do wykorzystania :style
      // The variables needed to be used with :style
      opacityStart: {
        'transition': '.2s opacity',
        'opacity': '1'
      },
      marginLineBehindLetter: {
        'left': '0',
        'animationIterationCount': '100000000',
        type: true,
      },
      marginWordAfterKeyup: {
        'marginLeft': '0',
        type: false,
      },


      // tablia w ktorej znajdują sie wszystkie słowa
      // The array with all the words
      words: [],

      numberWords: 50,

      // słowa, ktore znajduja sie na stronie
      // words on page
      wordsOnPage:
      [
        {word: '',letters: [], id:0},
        {word: '',letters: [], id:1},
        {word: '',letters: [], id:2},
        {word: '',letters: [], id:3},
        {word: '',letters: [], id:4},
        {word: '',letters: [], id:5},
        {word: '',letters: [], id:6},
        {word: '',letters: [], id:7},
        {word: '',letters: [], id:8},
      ],
    }
  },

  // funkje ktore wywołują się po załadowaniu stronu
  // functions that are called when the page is loaded
  async created() {
    console.log(API_URL)
    this.keyboard =  this.keyboardQWERTY;
    this.loadWords();

    this.IDuser = this.userCookie.id ? this.userCookie.id : '';

    // pobieranie informacji o najlepszych zajerestrowanych użytkownikach
    // gets information about the best registered users
    if(this.IDuser === ''){
      console.log('cannot find id user')
    }
    else{
      await axios.get(`${API_URL}/users/${this.userCookie.id}`)
      .then((res) => {
        this.userInfo = res.data
      })
      .catch((err) => console.log(err))
    }
  },
  async mounted(){
    await this.$refs.focusInputToWrite.focus();
  },
  methods: {
    // definiowanie funkcji ktora ma za zadanie wysyłanie do bazy danych najlepszych wynikow jakie uzyskał użytkownik
    // defining the function that sends the best results obtained to the user to the database
    async sendBestUserStats(){
      if(this.IDuser === ''){
        console.log('user is not logged in')
      }
      else{
        if(this.timeSpentPlus === 14){
          if(this.wordsPerMinuteEnd > this.userInfo.bestWPM15){
            await axios.put(`${API_URL}/users/${this.IDuser}` ,
            {
              bestWPM15: this.wordsPerMinuteEnd,
              accuracy15: this.accuracyEnd,
              bestWPM60: this.userInfo.bestWPM60,
              accuracy60: this.userInfo.accuracy60,
            },
            {
              headers: `Bearer ${this.$cookies.get('jwt')}`
            })
            .then((response) => console.log('Stats have got edit: ', response))
            .catch((err) => console.log(err))
          }
        }
        if(this.timeSpentPlus === 59){
          if(this.wordsPerMinuteEnd > this.userInfo.bestWPM60){
            await axios.put(`${API_URL}/users/${this.IDuser}` ,
            {
              bestWPM15: this.userInfo.bestWPM15,
              accuracy15: this.userInfo.accuracy15,
              bestWPM60: this.wordsPerMinuteEnd,
              accuracy60: this.accuracyEnd
            },
            {
              headers: `Bearer ${this.$cookies.get('jwt')}`
            })
            .then((response) => console.log('Stats have got edit: ', response))
            .catch((err) => console.log(err))
          }
        }
      }
    },

    //definiowanie funkcji ktora ma za zadanie dodawac nadmiar liter , ktore wprowadził użytkownik
    //defining a function that is supposed to add excess letters entered by the user
    addExcessLetters(){
      if(this.valueInputToWrite.length  > this.wordsOnPage[0].word.length){
        this.excessLetters = this.valueInputToWrite
        this.excessLetters = this.excessLetters.split('')
        for(let i = 0; i<this.wordsOnPage[0].word.length; i++){
          this.excessLetters.shift()
        }
      }
      else {
        this.excessLetters = []
      }
    },

    async checkLetterAndPushWords(){
      // this.valueInputLength += 1
      if(this.wordsOnPage.length < 9){
        const x = Math.floor(Math.random()*50);
        this.wordsOnPage.push({word: this.words[x].word, id: 9, letters: []});
      }

      // dodawaine do tablicy letters obiekt potrzebny do sparwdzania poprawnosci liter
      // adding to the letters array to the object needed to validate letters
      if(this.wordsOnPage[0].letters.length === 0){
        for(let i = 0; i < this.wordsOnPage[0].word.length; i++){
          this.wordsOnPage[0].letters.push({
            letter: this.wordsOnPage[0].word[i],
            id: i,
            correctness: null
          });
        }
      }
      // dodawanie odpowiedniego id dla słów
      // adding the appropriate id for words
      this.wordsOnPage.forEach((word,index) => {
        word.id = index + 1
      })

      // zmienianie marginesu lini ,ktora wskazuje gdzie uzytkownik aktualnie pisze
      // changing the line margin that indicates where the user is currently typing
      for(let i=0; i<=20; i++){
        switch(this.valueInputToWrite.length){
          case i:
            if(this.marginLineBehindLetter.type){
              this.marginLineBehindLetter.left = `${i*0.9}rem`;
            }
            if(this.marginWordAfterKeyup.type){
              this.marginWordAfterKeyup.marginLeft = `-${i*0.9}rem`;
            }
            break;
        }
      }

      // sprawdzanie pojedynczych liter i przypisywanie im koloru
      // checking individual letters and assigning them a color
      if(this.numberOfLetter > this.wordsOnPage[0].letters.length - 1){
        this.numberOfLetter = this.wordsOnPage[0].letters.length - 1;
      }

      this.letterOfValue = this.wordsOnPage[0].letters[this.numberOfLetter].letter;

      for(let i = this.numberOfLetter + 1; i < this.wordsOnPage[0].letters.length; i++){
        if(this.numberOfLetter == 0){
          this.wordsOnPage[0].letters[0].correctness = {color: this.colorStrongSub};
        }
        this.wordsOnPage[0].letters[i].correctness = {color: this.colorStrongSub};
      }

      if(this.valueInputToWrite[this.numberOfLetter] === this.letterOfValue){
        this.wordsOnPage[0].letters[this.numberOfLetter].correctness = {color: 'green'};
        this.numberOfLetter = this.valueInputToWrite.length - 1;
      }
      else if(this.valueInputToWrite.length <= 0){
        this.correctness = null;
      }
      else{
        this.wordsOnPage[0].letters[this.numberOfLetter].correctness = {color: 'red'};
        this.numberOfLetter = this.valueInputToWrite.length - 1;
      }
      // Podczas gdy czas na pisanie bedzie rowny 0 wykona sie wyswietlenie wynikow jakie osiagnał uzytkownik ,
      // w przeciwnym wypadku uzywa sie funkcja addExcessLetters i oblicza sie words per minute
      // sending data and displaying or calculating wpm and calling the addExcessLetters function
      if(this.timeSpent == 0  ){
        this.isEndTest = true;
        this.opacityStart.opacity = 0;
        this.disabled = true;
        this.wordsPerMinuteEnd = this.wordsPerMinute;
        this.accuracyEnd = this.accuracy;
        // this.checkLetterInterval = null
        clearInterval(this.checkLetterInterval);

        if(this.useOnceAfterTimeZero) {
          this.sendBestUserStats();
          this.useOnceAfterTimeZero = false;
        }
      }
      else{
        this.addExcessLetters()
        this.wordsPerMinute =  ((this.goodLetters/5)*60/(this.timeSpentPlus+1)).toFixed(2);
      }
    },

    loadWords(){
      this.styleBody = {
        'transition': '.2s opacity',
        'opacity' : '1'
      };
      this.opacityElements = {
        'transition': '.2s opacity',
        'opacity': '1'
      },
      // przekazywanie słów z aktywnego jezyka do tablicy z słowami
      // przekazywanie słów z aktywnego jezyka do tablicy z słowami
      this.words = this.languageOn.words
      this.numberWords = this.languageOn.numberWords


      //loading words
      this.wordsOnPage.forEach(word =>{
        const x = Math.floor(Math.random()*this.numberWords);
        word.word =  this.words[x].word;
      })

      this.checkLetterAndPushWords()

      // clearInterval(this.checkLetterInterval)
    },

    // funkcja do zmiennej timer (do metody setInterval())
    // funkcja ma za zadanie zmniejszac czas przeznaczony na pisanie o -1 i
    // przekazywac dane do tablicy, ktora jest potrzebna do wykresow , aż czas bedzie rowny 0
    // function for use in timer
    timerFunction(){
      if(this.timeSpent == 1){
        this.isStopTime = false;
        this.AFKdetectorEnabled = false;
        this.reloaded = false

        this.isEndTest = true;
        this.opacityStart.opacity = 0;
        this.disabled = true;
        this.wordsPerMinuteEnd = this.wordsPerMinute
        this.accuracyEnd = this.accuracy

        if(this.useOnceAfterTimeZero) {
          this.sendBestUserStats()
          this.useOnceAfterTimeZero = false
        }
      }
      else{
        if(this.isStopTime){
          this.wordsPerMinute = ((this.goodLetters/5)*60/(this.timeSpentPlus+1)).toFixed(2);
          this.timeSpent--;
          this.timeSpentPlus++;
          this.wpmChartArray.push(this.wordsPerMinute);
          this.wpmChartTimeArray.push(this.timeSpentPlus);
          this.AFKdetectorEnabled = true;
        }
      }
    },

    // sprawdzanie poprawnosci słowa oraz podświetlanie klawiszy, ktore zostana naciśnięte (dla klawiatury ekranowej)
    // word validation and backlight of the keys to be pressed (for screen keyboard)
    checkWord(e){
      this.styleBody = {
        'transition': '.2s opacity',
        'opacity': '0'
      };

      this.opacityElements = {
        'transition': '.2s opacity',
        'opacity': '.5'
      };

      // this.checkLetterInterval = setInterval(this.checkLetterAndPushWords,0)

      if(this.isStopTime === false) {
        this.timer = setInterval(this.timerFunction, 1000)
      }

      this.isStopTime = true;
      this.marginLineBehindLetter.animationIterationCount = 0;


      // podświetlanie klawiszy, ktore zostana naciśnięte (dla klawiatury ekranowej)
      // backlight of the keys to be pressed (for screen keyboard)
      for(let i=0;i<5;i++){
        for(let j=0;j<this.keyboard[i].length; j++){
          if(e.code == this.keyboard[i][j].code){
            this.keyboard[i][j].active = {'background-color': this.colorSub}
            setTimeout(()=>{
              this.keyboard[i][j].active = {'background-color': this.bgMain}
            },150)
          }
        }
      }

      // sprawdzania poprawnosci słowa i aktualizowanie danych
      // word validation and updating data
      if(e.keyCode === 32){
        e.preventDefault();

        if(this.valueInputToWrite === this.wordsOnPage[0].word){
          this.goodLetters += this.wordsOnPage[0].word.length + 1;
          this.wordsOnPage.shift();
        }
        else if(this.valueInputToWrite === '') {
          return
        }
        else{
          this.wrongLetters += this.wordsOnPage[0].word.length + 1;
          this.wordsOnPage.shift();
        }


        this.accuracy = (this.goodLetters/(this.goodLetters+this.wrongLetters)*100).toFixed(2);

        this.valueInputToWrite = '';
        this.letterOfValue = '';
        this.numberOfLetter = 0;
      }
    },

    opacityTimeSpent(){
      //tutaj chcialem sprobowac zrobic classami zamiast style / v-if / v-show
      this.opacityColorTimeSpent = !this.opacityColorTimeSpent;
      this.normalColorTimeSpent = !this.normalColorTimeSpent;
    },

    // po kliknieciu na element input dostaje focus
    // after click the element getting focus
    async focusInputOnClick(){
      await this.$refs.focusInputToWrite.focus();
      this.focusInput = false
    },

    // nie wyswietla komuniktu, że input nie ma focus a
    // doesn't display the message that input has no focus
    whileFocusInput(){
      this.focusInput = false;
    },

    // wyswietla komuniktu, że input nie ma focus a
    // displays the message that input has no focus
    unFocusInput(){
      this.styleBody = {
        'transition': '.2s opacity',
        'opacity': '1'
      };

     this.opacityElements = {
        'transition': '.2s opacity',
        'opacity': '1'
      },
      this.focusInput = true;
    },

    // zamyka lub wyswietla ustawienia
    // exits or displays settings
    showLayerSett(){
      this.isLayerTopUsers = false;
      this.isLayerSett = !this.isLayerSett;
      this.isShowMain = !this.isShowMain;
      this.isAlertSuccess = false;
      this.reload();
    },

    // zmienia czasu na ukończenie testu
    // changes the time to complete the test
    changeTimeSpent(timeToType){
      this.timeSpent = timeToType;
      this.timeToTypeStorage = timeToType;

      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // zmienia czasu na ukończenie testu, czas jest podany przez użytkownika
    // changes the time to complete the test, the time is given by the user
    changeTimeSpentOptional(){
      if(this.valueTimeSpentOptional < 5) {
        this.valueTimeSpentOptional = 5;
      }

      this.valueTimeSpentOptional = parseInt(this.valueTimeSpentOptional)
      Math.floor(this.valueTimeSpentOptional)

      this.timeSpent = this.valueTimeSpentOptional;
      this.timeToTypeStorage = this.valueTimeSpentOptional;

      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // zmiana typu pisania na 1 (chodzi o sposob poruszania sie lini wskazującej gdzie aktualnie sie pisze)
    // changes the type of typing to 1 (it's about the way the line indicating where is currently typing moves)
    changeTypeOfWriting1(){
      this.marginLineBehindLetter.type = false;
      this.marginWordAfterKeyup.type = true;
      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // zmiana typu pisania na 2 (chodzi o sposob poruszania sie lini wskazującej gdzie aktualnie sie pisze)
    // change the type of typing to 2 (it's about the way the line indicating where is currently typing moves)
    changeTypeOfWriting2(){
      this.marginLineBehindLetter.type = true;
      this.marginWordAfterKeyup.type = false;
      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // ukrycie lub pokazanie wynikow na żywo
    // hide or show live results
    showLiveScore(){
      if(this.isShowScore === 'OFF'){
        this.isShowScore = 'ON'
        this.isShowScoreBool = true
      }
      else{
        this.isShowScore = 'OFF'
        this.isShowScoreBool = false
      }
      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // ukrycie lub pokazanie klawiatury ekranowej
    // hide or show screen keyboard
    showKeyboardFunction(){
      if(this.isShowKeyboard === 'OFF'){
        this.isShowKeyboard = 'ON'
        this.isShowKeyboardBool = true
      }
      else{
        this.isShowKeyboard = 'OFF'
        this.isShowKeyboardBool = false
      }
      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // zmiana języka, który użytkownik wybierze
    // changes the language that the user selects
    changeLanguage(language){
      this.languagesArray.forEach(item =>{
        if(language === item.json) {
          this.languageOn = item.json
        }
      })

      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // zmiana języka (w tym przypadku językami są literki z alfabetu) , który użytkownik wybierze
    // change the language (in this case the languages are letters from the alphabet), which the user selects
    changeLanguageAlphabet(alphabet){
      this.alphabetArray.forEach(item=>{
        if(alphabet === item.json){
          this.languageOn = item.json
        }
      })

      this.isAlertSuccess = true
      setTimeout(() => this.isAlertSuccess = false, 2000)
    },

    // zamykanie alertu po wybraniu jednego z ustawień
    // close an alert after selecting one of the settings
    closeAlert(){
      this.isAlertSuccess = false
    },

    changeKeyboardLayout(layout){
      this.keyboard = layout
    },

    showAlphabetTip(){
      this.isAlphabetTip = !this.isAlphabetTip
    },

    showKeyboardTip(){
      this.isKeyboardTip = !this.isKeyboardTip
    },

    // odświeżanie zmiennych
    // refreshing variables
    reload(){
      // musi byc setTimeout bo nie czyta DOMu a async/await nie dziala
      setTimeout(()=>{
        this.$refs.focusInputToWrite.focus();
      },0)
      this.focusInput = false;

      this.valueInputToWrite = '';
      this.timeSpent = 0;
      this.timeSpent = this.timeToTypeStorage;
      this.timeSpentPlus = 0;
      this.wordsPerMinute = 0;
      this.wrongLetters = 0;
      this.goodLetters = 0;
      this.accuracy = '';
      this.isStopTime = false;
      this.wordsOnPage[0].letters = [];
      this.correct = false;
      this.wrong = false;
      this.restUse = 0;
      this.marginLineBehindLetter.left = 0;
      this.isEndTest = false;
      this.disabled = false;
      this.opacityStart.opacity = 1;
      this.useOnceAfterTimeZero = true
      this.marginLineBehindLetter.animationIterationCount = 10000;
      this.excessLetters = []

      this.wpmChartArray = [];
      this.wpmChartTimeArray = [];

      this.reloaded = true

      this.loadWords();

      clearInterval(this.timer)
      // clearInterval(this.checkLetterInterval)
    },
  },
  watch: {
    valueInputToWrite: function(newValueInputToWrite, oldValueInputToWrite){
      // this.valueInputLength += 1
      if(this.wordsOnPage.length < 9){
        const x = Math.floor(Math.random()*50);
        this.wordsOnPage.push({word: this.words[x].word, id: 9, letters: []});
      }

      // dodawaine do tablicy letters obiekt potrzebny do sparwdzania poprawnosci liter
      // adding to the letters array to the object needed to validate letters
      if(this.wordsOnPage[0].letters.length === 0){
        for(let i = 0; i < this.wordsOnPage[0].word.length; i++){
          this.wordsOnPage[0].letters.push({
            letter: this.wordsOnPage[0].word[i],
            id: i,
            correctness: null
          });
        }
      }
      // dodawanie odpowiedniego id dla słów
      // adding the appropriate id for words
      this.wordsOnPage.forEach((word,index) => {
        word.id = index + 1
      })

      // zmienianie marginesu lini ,ktora wskazuje gdzie uzytkownik aktualnie pisze
      // changing the line margin that indicates where the user is currently typing
      for(let i=0; i<=20; i++){
        switch(newValueInputToWrite.length){
          case i:
            if(this.marginLineBehindLetter.type){
              this.marginLineBehindLetter.left = `${i*0.9}rem`;
            }
            if(this.marginWordAfterKeyup.type){
              this.marginWordAfterKeyup.marginLeft = `-${i*0.9}rem`;
            }
            break;
        }
      }
      // sprawdzanie pojedynczych liter i przypisywanie im koloru
      // checking individual letters and assigning them a color
      if(this.numberOfLetter > this.wordsOnPage[0].letters.length-1){
        this.numberOfLetter = this.wordsOnPage[0].letters.length-1;
      }

      if(newValueInputToWrite === ''){
        this.numberOfLetter = 0
      }

      this.letterOfValue = this.wordsOnPage[0].letters[this.numberOfLetter].letter;

      if(newValueInputToWrite[this.numberOfLetter] === this.letterOfValue){
        this.wordsOnPage[0].letters[this.numberOfLetter].correctness = {color: 'green'};
        this.numberOfLetter = newValueInputToWrite.length;
      }
      else if(newValueInputToWrite.length <= 0){
        this.correctness = null;
      }
      else{
        this.wordsOnPage[0].letters[this.numberOfLetter].correctness = {color: 'red'};
        this.numberOfLetter = newValueInputToWrite.length;
      }

      for(let i = this.numberOfLetter; i < this.wordsOnPage[0].letters.length; i++){
        this.wordsOnPage[0].letters[i].correctness = {color: this.colorStrongSub};
      }

      // Podczas gdy czas na pisanie bedzie rowny 0 wykona sie wyswietlenie wynikow jakie osiagnał uzytkownik ,
      // w przeciwnym wypadku uzywa sie funkcja addExcessLetters i oblicza sie words per minute
      // sending data and displaying or calculating wpm and calling the addExcessLetters function
      if(this.timeSpent == 0) return
      else{
        this.addExcessLetters()
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

*{
    box-sizing: border-box;

}

body{
    background: $bg-main;
    color: $color-strong;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    color: $color-sub;

}
main{
  .allWords{
    position: absolute;
    left: 60%;
    top: 30%;
    transform: translate(-50%,-50%);
    color: $color-sub;
    font-size: 1.5rem;
    font-family: 'Roboto Mono', monospace;
    width: 70%;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    padding-left: 4rem;


    .lineBehindLetter{
      height: 2.3rem;
      width: .12rem;
      padding-left: 4rem;
      border-right: solid .15rem $color-strong;
      position: absolute;
      top: -.2rem;
      animation: .8s beforeOpacity infinite;
      transition: left .08s;



      @keyframes beforeOpacity{
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
      }
    }

    .firstWord{

      display: flex;
      flex-direction: row;
    }

    .excessLetters{
      color: rgb(255, 117, 93);
    }


    .subWords{
      display: flex;
      flex-direction: row;
      margin-left: .8rem;
    }
  }

  .inputToWrite{
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    outline: none;
    font-size: 2rem;
    border: none;
  }
  .inputToWrite:focus{
    border: none;
  }
}

.helper-elements{
  width: 100%;
  margin-top: 30vh;
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

.settings{
    .setting-flex{
      height: 90%;
      display:flex;
      align-items:center;
      justify-content:center;


      .grid-elements{
          display: grid;
          grid-template-columns: 40vw 40vw;
          grid-row: auto auto;
      }
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
}







@media screen and (max-width: 1500px) and(min-width: 1025px){
    html{
        font-size: 15px;
    }
}

@media screen and (max-width: 1024px) and(min-width: 769px){
    html{
        font-size: 15px;
    }
}

@media screen and (max-width: 768px) and(min-width: 481px){
    html{
        font-size: 14px;
    }
}

@media screen and (max-width: 480px) and(min-width: 320px){
    html{
        font-size: 14px;
    }
}
@media screen and (max-width: 319px) and(min-width: 100px){
    html{
        font-size: 12px;
    }
}

</style>
