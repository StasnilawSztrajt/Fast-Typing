<template>
  <nav>
    <router-link class="router" to="/">
      <span>
        FastTyping
      </span>
    </router-link>
    <router-link class="router" to="/visit/">
      <i class="fas fa-question"></i>
    </router-link>
    <router-link class="router" to="/topUsers/">
      <i class="fas fa-tachometer-alt"></i>
    </router-link>
    <router-link class="router" to="/faq/">
      <i class="fas fa-headset"></i>
    </router-link>
    <router-link class="router" to="/login">
      <i class="fas fa-sign-in-alt"></i>
      <span class="username">
        {{$cookies.get('user').username ? $cookies.get('user').username : ''}}
      </span>
    </router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../../scss/variables';


nav{
    text-align: center;

    .router{
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
  }
</style>