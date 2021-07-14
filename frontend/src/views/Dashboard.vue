<template>
  <main>
    <a href="/users/logout">
      <button class="button">
        <a href="/users/logout" class="router"><i class="fas fa-sign-out-alt"></i> Log out</a>
      </button>
    </a>
    <a href="http://localhost:8080/" class="logo-href"><h1 class="logo">FastTyping</h1></a>

    <h2>Dashboard <span class="info-user">{{ user.username }}</span></h2>
    <div class="info">
      <h1 class="info-h1">INFO</h1>
      <div class="info-elements">
        <p class="info-element">email: <span>{{ user.email }}</span></p>
        <p class="info-element">ID user: <span>{{ user.id }}</span></p>
        <p class="info-element">Date registered: <span>{{ user.createdAt }}</span></p>
        <div class="info-best">
          <p>Record for 15 seconds : <span class="info-user">{{ user.bestWPM15 }}wpm with {{ user.accuracy15 }}% accuracy</span></p>
          <p>Record for 60 seconds : <span class="info-user">{{ user.bestWPM60 }}wpm with {{ user.accuracy60 }}% accuracy</span></p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data(){
    return{
        jwt: this.$cookies.get('jwt'),
        userCookie: this.$cookies.get('user'),
        user: {},

        API_URL: 'http://localhost:1337',
    }
  },
  created(){
    axios.get(`${this.API_URL}/users/${this.userCookie.id}`)
    .then(res => this.user = res.data)
    .catch(err => console.log(err))
  }
}
</script>

<style lang="scss">
@import '../scss/variables';

body{
  background: $bg-main;
  color: $color-strong;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  color: $zaje-color;
  font-weight: 400;

  main{
      display: flex;
      flex-direction: column;
      align-items: center;


      .button{
          display: inline-block;
          background-color: transparent;
          align-self: flex-end;
          outline: none;
          font-weight: 400;
          font-size: 2rem;
          width: 17vw;
          padding: .5rem;
          border: 1px solid $zaje-color;
          border-radius: 5px;
          transition: background-color .3s;
          cursor: pointer;

          &:hover{
              background-color: #58595c;
          }

          .router{
              text-decoration: none;
              color: $zaje-color;
              font-weight: bold;
          }
      }

      h1{
          font-size: 5rem;
          color: $color-strong;
          font-weight: 400;
          margin-top: -7vh;
      }
      .logo-href{
          text-decoration: none;
          align-self: flex-start;
          .logo{
              display: block;
          }
      }


      .info-h1{
          margin-top: 3vh;
          text-align: center;
      }

      h2{
          font-weight: 400;
          align-self: flex-start;
          margin-top: -3vh;
          .info-user{
              color: $color-strong;
          }
      }

      .info{
          .info-elements{
              .info-user{
                  color: $color-strong;
              }
              .info-element{
                  font-size: 1.5rem;
              }

              .info-best{
                  margin-top: 10vh;
                  font-size: 1.5rem;
                  color: $color-sub;
              }

          }

      }
  }
}

@media screen and (max-width: 1200px) and (min-width: 1025px){
    html{
        font-size: 14px;
    }
}

@media screen and (max-width: 1024px) and(min-width: 769px){
    html{
        font-size: 12px;

        .main{
            .logo{
                margin-top: 0;
            }
        }
    }
}

@media screen and (max-width: 768px) and(min-width: 481px){
    html{
        font-size: 8px;


    }

    main{
        .logo{
            margin-top: -3vh;
        }
    }
}

@media screen and (max-width: 480px) and(min-width: 320px){
    html{
        font-size: 6px;

        main{
            .logo{
                margin-top: -2vh;
            }
        }
    }
}
@media screen and (max-width: 319px) and(min-width: 100px){
    html{
        font-size: 4px;

        main{
            .logo{
                margin-top: -1vh;
            }

            h2{
                margin-top: -2vh;
            }
        }
    }
}
</style>