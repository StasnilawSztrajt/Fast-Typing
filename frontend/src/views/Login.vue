<template>
  <div class="container">
    <div class="login">
      <h1>
        <i class="fas fa-sign-in-alt"></i>  Login
        <p>Fast Typing</p>
      </h1>
      <div class="form-group">
      <label for="name">email</label>
      <br>
      <input
          type="name"
          id="name"
          name="name"
          class="form-control"
          placeholder="Enter name"
          v-model="emailValue"
      />
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
      />
      </div>
      <button type="submit" class="btn" @click="login" >Login</button>
      <p class="lead">
          No Account? <router-link to="/register" class="router">Register</router-link>
      </p>
      <p><router-link to="/" class="router">Go back to the main page</router-link></p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

import API_URL from '../API_URL'

export default {
  name: 'Dashboard',
  data(){
    return{
      emailValue: '',
      passwordValue: '',
      infoUser: '',
      ISjwt: this.$cookies.isKey('jwt'),

      loginError: false,

      setTimeout: Function,
      setTimeoutTime: 4000
    }
  },
  created(){
    if(this.ISjwt){
      this.$router.push('/dashboard')
    }
  },
  methods: {
    async login(){
      console.log('siema')
      await axios.post(`${API_URL}/auth/local`, {
        identifier: this.emailValue,
        password: this.passwordValue
      })

      .then(async res=>{
        this.infoUser = res.data
        console.log(res.data.user)

        await this.$cookies.set('jwt',this.infoUser.jwt, '7d')
        await this.$cookies.set('user',this.infoUser.user, '7d')

        this.$router.push('/dashboard')
      })
      .catch(() =>{
        this.setTimeout = setTimeout(() =>{
          this.loginError = false
        },this.setTimeoutTime)
        return this.loginError = true
      })
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables.scss';
body{
    background: $bg-main;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
    padding: 0;
    color: $color-sub;

    .container{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90vh;



        .login{
            background-color: #2c2828;
            border-radius: 25px;
            width: 25vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: -3vh;

            .alert{
                background-color: #f76809;
                border-color: #fcf8c2;
                position: relative;
                padding: .75rem 1.25rem;
                margin-bottom: 1rem;
                border: 1px solid transparent;
                border-radius: .25rem;
                color: black;

                button{
                    background-color: transparent;
                    border: 1px solid black;
                    cursor: pointer;

                    &:hover{
                        background-color: black;
                        color: white;
                    }
                }
            }

            .alert-warning{
                color: #7f7813;
                background-color: #f76809;
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
                font-size: 1.2rem;
                background-color: transparent;
                border-bottom: 1px solid $color-strong;
                color: $zaje-color;
                transition: .3s all;

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
                margin-top: 2vh;
                padding: 3px;
                outline: none;
                background-color: $bg-main;
                color: $zaje-color;
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
</style>