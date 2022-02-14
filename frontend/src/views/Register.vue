<template>
  <div class="container">
    <div class="register">
      <h1>
          <i class="fas fa-user-plus"></i> Register
          <p>FastTyping</p>
      </h1>
        <div class="form-group">
            <label for="name" class="name">name</label>
            <br>
            <input
              type="name"
              id="name"
              name="name"
              class="form-control"
              placeholder="Enter Name"
              v-model="usernameValue"
            >
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <br>
            <input
              type="email"
              id="email"
              name="email"
              class="form-control"
              placeholder="Enter Email"
              v-model="emailValue"
            >
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <br>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              placeholder="Enter Password"
              v-model="passwordValue"
            >
        </div>
        <div class="form-group">
            <label for="password2">Password</label>
            <br>
            <input
              type="password"
              id="password2"
              name="password2"
              class="form-control"
              placeholder="Create Password"
              v-model="repeatPasswordValue"
            >
        </div>
        <button type="submit" class="btn" @click="register">Register</button>
      <p class="lead">Have an Account? <router-link to="/login" class="router">Login</router-link></p>
      <p><router-link to="/" class="router">Main page</router-link></p>
      <div v-show="validationError" style="color: red;" role="alert">
        <span class="block sm:inline">{{ validationText }}</span>
      </div>
      <div v-show="!validationError" style="color: red;" role="alert">
        <span class="block sm:inline">&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
import API_URL from '../API_URL'


export default {
  name: 'Dashboard',
  data(){
    return{
      usernameValue: '',
      emailValue: '',
      passwordValue: '',
      repeatPasswordValue: '',

      validationText: '',
      validationError: false,

      ISjwt: this.$cookies.isKey('jwt'),

      setTimeout: null,
      setTimeoutTime: 4000,
    }
  },
  created() {
    if(this.ISjwt){
      this.$router.push('/dashboard')
    }
  },
  methods: {
    async register(){
      clearTimeout(this.setTimeout)
      console.log('siema')

      if(!this.usernameValue || !this.emailValue || !this.passwordValue || !this.repeatPasswordValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Uzupełnij puste pola'
        return this.validationError = true
      }

      if(this.usernameValue.length < 4){
        this.usernameLengthErrorText = ''
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Nazwa użytkownika jest za krótka (co najmniej 4 znaki)'
        return this.validationError = true
      }

      if(this.usernameValue.length > 20){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Nazwa użytkownika jest zbyt długa (maksymalnie 20 znaki)'
        return this.validationError = true
      }

      if(this.passwordValue.length < 6){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Hasło jest za krótkie (co najmniej 6 znaków)'
        return this.validationError = true
      }

      if(this.passwordValue.length > 20){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Hasło jest za długie (maksymalnie 20 znaków)'
        return this.validationError = true
      }

      if(this.passwordValue != this.repeatPasswordValue){
        this.setTimeout = setTimeout(()=>{
          this.validationError = false
        },this.setTimeoutTime)
        this.validationText = 'Powtórzone hasło nie zgadza sie z podanym wcześniej'
        return this.validationError = true
      }


      const user = {
        username: this.usernameValue,
        email: this.emailValue,
        password: this.passwordValue,
        bestWPM15: 0,
        accuracy15: 0,
        bestWPM60: 0,
        accuracy60: 0
      }

      const registerResponse = await fetch(`${API_URL}/auth/local/register`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      const registerResponseJSON = await registerResponse.json();
      console.log(registerResponseJSON)

      try{
        if(registerResponseJSON.message[0].messages[0].message == 'Email already taken'){
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Nazwa użytkownika jest zajęta'
          return this.validationError = true;
        }

        else{
          setTimeout(()=>{
            this.validationError = false
          },this.setTimeoutTime)
          this.validationText = 'Email jest zajęty'
          return this.validationError = true;
        }
      } catch(err){
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables.scss';
body{
    background: $bg-main;
    color: $color-strong;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    color: $color-sub;

    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;

        .register{
            background-color: #2c2828;
            border-radius: 25px;
            width: 40vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .alert{
                background-color: #f5e625;
                border-color: #fcf8c2;
                position: relative;
                padding: .75rem 1.25rem;
                margin-bottom: 1rem;
                border: 1px solid transparent;
                border-radius: .25rem;

                button{
                    background-color: transparent;
                    border: 1px solid black;
                    cursor: pointer;
                    transition: .3s all;

                    &:hover{
                        background-color: black;
                        color: white;
                    }
                }
            }

            .alert-warning{
                color: #7f7813;
                background-color: #fdfad3;
                border-color: #fcf8c2;
            }

            .alert-dismissible{
                padding-right: 4rem;
            }

            .fade{
                transition: opacity .15s linear;
            }

            h1{
            color: $color-strong;
            font-size: 3rem;
                p{
                    color: #5f5a5a;
                    font-size: 1.5rem;
                    font-weight: 400;
                }
            }
            .form-control{
                outline: none;
                border: none;
                width: 20vw;
                height: 2vh;
                margin-bottom: 1vh;
                padding: 1rem;
                background-color: transparent;
                border-bottom: 1px solid $color-strong;
                color: $zaje-color;
                transition: .3s all;
                font-size: 1.2rem;


                &:focus{
                    color: $color-strong;
                    border-bottom: 1px solid $zaje-color;
                }
            }

            .btn{
                width: 22vw;
                border-radius: 25px;
                height: 5vh;
                border: none;
                transition: .3s all;
                font-size: 1.5rem;
                padding: 3px;
                outline: none;
                background-color: $bg-main;
                color: $zaje-color;
                margin-top: 2vh;
                cursor: pointer;
                &:hover, &:focus{
                    box-shadow: 0 0 1rem $color-strong;
                }
            }

            .router{
                text-decoration: none;
                color: $zaje-color;
                font-weight: bold;
            }
        }
    }
}

@media screen and (max-width: 1500px) and(min-width: 1025px){
  .register{
    width: 50vw;
  }
}

@media screen and (max-width: 1024px) and(min-width: 769px){
  .register{
    width: 70vw;
  }
}

@media screen and (max-width: 768px) and(min-width: 481px){
  .register{
    width: 80vw;
  }
}

@media screen and (max-width: 480px) and(min-width: 320px){
  .register{
    width: 90vw;
  }
}
</style>