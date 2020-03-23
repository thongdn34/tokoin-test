<template>
  <section class="profile section">
    <div class="profile__start container" v-if="!isLogin">
      <h1 class="profile__title">We'll help you find great things to read</h1>
      <cta :secondary="true" @click="onClickSignup">Get started</cta>
      <p>
        Already have an account?
        <span
          class="profile__signin"
          @click="onClickSignin"
        >Sign in</span>
      </p>
    </div>

    <div class="profile__start container" v-else>
      <div class="row">
        <div class="col-md-3">
          <div class="profile__avatar" v-bg-img="''"></div>
        </div>
        <div class="col-md-3">
          <h2>{{ user.fullname }}</h2>
          <p>{{ user.username }}</p>
          <cta :secondary="true" @click="onClickLogout">Log out</cta>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asyncComponentLoaded } from '../utils/mixins'
import Cta from '../components/common/Cta'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Profile',

  mixins: [ asyncComponentLoaded ],

  components: {
    Cta
  },

  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      user: state => state.user
    })
  },

  methods: {
    ...mapActions([
      'logOut'
    ]),

    onClickSignin () {
      this.$bus.$emit('show-signin-popup')
    },

    onClickSignup () {
      this.$bus.$emit('show-signup-popup')
    },

    onClickLogout () {
      this.logOut()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.profile {
  &__signin {
    color: $color-blue-1;
    cursor: pointer;
  }

  &__title {
    font-size: 3.2em;
    margin: 1rem 0;
  }

  &__avatar {
    @extend %bg-cover;
    @extend %bg-center;
    padding-bottom: 100%;
  }
}
</style>
