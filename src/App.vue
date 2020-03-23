<template>
  <div class="app" @click="onAppClick">
    <page-header />
    <main class="main" ref="main">
      <div :class="['main__content', isFrozen && '--freeze']"
        ref="mainContent"
      >
        <router-view />
      </div>
      <loader :is-loaded="isLoaded" />
    </main>
    <signin-popup ref="signinPopup" />
    <signup-popup ref="signupPopup" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import PageHeader from './modules/Header/Header'
import Loader from './components/Loader'
import SigninPopup from './components/SigninPopup'
import SignupPopup from './components/SignupPopup'

export default {
  components: {
    PageHeader,
    Loader,
    SigninPopup,
    SignupPopup
  },

  data: () => ({
    isFrozen: false
  }),

  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      users: state => state.users,
      user: state => state.user
    }),

    ...mapGetters([
      'isLoaded'
    ])
  },

  methods: {
    ...mapActions([
      'changeLoadingStatus',
      'getUsers'
    ]),

    onAppClick () {
      this.$bus.$emit('body-clicked')
    },

    showSigninPopup () {
      this.$refs.signinPopup.open()
    },

    showSignupPopup () {
      this.$refs.signupPopup.open()
    }
  },

  mounted () {
    this.$router.beforeEach((to, from, next) => {
      this.changeLoadingStatus(false)
      next()
    })

    this.$router.afterEach((to, from) => {
      this.changeLoadingStatus(true)
    })

    if (!this.users[0]) {
      this.getUsers()
    }

    this.$bus.$on('show-signin-popup', this.showSigninPopup)
    this.$bus.$on('show-signup-popup', this.showSignupPopup)
  }
}
</script>

<style lang="scss">
.app {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  position: relative;
  flex: 1;
  overflow: hidden;

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 3rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &.\--freeze {
      overflow-y: hidden;
    }

    @include mq(1024) {
      padding-top: 2.8rem;
    }
  }
}
</style>
