<template>
    <div>
      <div class="loadingScreen" v-if="!isTopUsersLoaded">
        <div class="loadingScreenBox"></div>
        <h1 style="margin-top: 10vh; text-align: center">Loading...</h1>
      </div>
      <div class="topUsersLayer" v-else>
        <MenuForSubRoutes />
        <h1><i class="fas fa-crown"></i> Global Ranking users FastTyping<i class="fas fa-crown"></i></h1>
        <div class="topUsers">
          <div class="topUsers15">
            <tr class="titleTr">
              <td>Rank </td>
              <td>Name </td>
              <td>Time: 15</td>
              <td>Accuracy </td>

            </tr>
            <tr v-for="(user, index) in topUsers15" :key="user._id" class="topUsers15Tr">
              <td class="userPositiontd">{{ index + 1 }}</td>
              <td >{{ user.name }} </td>
              <td class="userWPMtd">{{ user.bestWPM15 }}wpm &nbsp;</td>
              <td>{{ user.accuracy15 }}%</td>
            </tr>
            </div>
        <div class="topUsers60">
            <tr class="titleTr">
              <td>Rank </td>
              <td>Name </td>
              <td>Time: 60 </td>
              <td>Accuracy </td>
            </tr>
            <tr v-for="(user, index) in topUsers60" :key="user._id" class="topUsers60Tr">
              <td class="userPositiontd">{{ index + 1 }}</td>
              <td >{{ user.name }}</td>
              <td class="userWPMtd">{{ user.bestWPM60 }}wpm &nbsp;</td>
              <td>{{ user.accuracy60 }}%</td>
            </tr>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

import MenuForSubRoutes from '../components/Menu/MenuForSubRoutes.vue'

import API_URL from '../API_URL'

export default {
  components: {
    MenuForSubRoutes
  },
  data(){
    return{
      users: [],
      topUsers15: [],
      topUsers60: [],
      isTopUsersLoaded: false
    }
  },
  async created(){
    console.log(typeof this.topUsers15)
    await axios.get(`${API_URL}/users`)
    .then(res =>{
      this.users = res.data

      this.users.forEach(item =>{
        this.topUsers15.push({
          name: item.username,
          bestWPM15: item.bestWPM15,
          _id: item._id,
          accuracy15: item.accuracy15
        })
        this.topUsers15.sort((a,b) => b.bestWPM15-a.bestWPM15)
        this.topUsers60.push({
          name: item.username,
          bestWPM60: item.bestWPM60,
          _id: item._id,
          accuracy60: item.accuracy60
          })
        this.topUsers60.sort((a,b) => b.bestWPM60-a.bestWPM60)
      })
      this.isTopUsersLoaded = true
    })
    .catch(err => console.log(err))
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

    .login{
      color: $color-sub;
      font-weight: 500;
    }

    .loadingScreen{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        .loadingScreenBox{
            height: 10vw;
            width: 10vw;
            background-color: $color-strong;
            animation: infinite rotateBox 2s
        }

        @keyframes rotateBox {
            0%{ transform: rotate(0deg); }
            50%{ transform: rotate(360deg); }
            100%{ transform: rotate(720deg); }
        }
    }

    .topUsersLayer{
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 11;
        background-color: $bg-main;
        position: absolute;

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
        h1{
            font-size: 4rem;
            color: $color-strong;
            text-align: center;

            .fas{
                font-size: 4rem;
                color: $color-strong;
            }
        }

        .topUsers{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            .topUsers15, .topUsers60{
                .titleTr{
                    color: $zaje-color;
                    font-size: 1.1rem;
                    font-weight: 700;
                }

                .topUsers15Tr, .topUsers60Tr{
                    td{
                        color: $zaje-color;
                        font-weight: 100;
                        font-size: 2rem;
                    }
                    .userWPMtd{
                        font-weight: bold;
                    }
                    .userPositiontd{
                        color: $color-strong;
                    }
                }
            }

            td{
                border-bottom: 1px solid rgb(180, 179, 179);
            }


        }
    }

    @media screen and (max-width: 1500px) and(min-width: 1025px){
    html{
        font-size: 14px !important;

        body{
            .topUsersLayer{
                .topUsers15{
                    margin-top: 10vh;
                }
                .topUsers60{
                    margin-top: 10vh;
                }
            }
        }
    }

}

@media screen and (max-width: 1024px) and(min-width: 769px){
    html{
        font-size: 13px !important;

        body{
            .topUsersLayer{
                .topUsers15{
                    margin-top: 10vh;
                }
                .topUsers60{
                    margin-top: 10vh;
                }
            }
        }
    }
}

@media screen and (max-width: 768px) and(min-width: 481px){
    html{
        font-size: 8px !important;

        body{
            .topUsersLayer{
                .topUsers60{
                    margin-top: 10vh;
                }
                .topUsers60{
                    margin-top: 10vh;
                }
            }
        }
    }
}

@media screen and (max-width: 480px) and(min-width: 320px){
    html{
        font-size: 6px !important;

        body{
            .topUsersLayer{
                .topUsers60{
                    margin-top: 10vh;
                }
                .topUsers60{
                    margin-top: 10vh;
                }
            }
        }
    }
}
@media screen and (max-width: 319px) and(min-width: 100px){
    html{
        font-size: 5px !important;

        body{
            .topUsersLayer{
                .topUsers60{
                    margin-top: 10vh;
                }
                .topUsers60{
                    margin-top: 10vh;
                }
            }
        }
    }
}
</style>