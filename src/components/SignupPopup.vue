<template>
  <popup class="signup-popup" ref="popup">
    <h2>Sign up</h2>
    <div class="signup-popup__content">
      <div class="row">
        <div class="col-md-2">
          <p class="signup-popup__label">Username</p>
        </div>
        <div class="col-md-5">
          <input
            v-model="username"
            class="signup-popup__input"
            name="username"
            placeholder="ginchiyo"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <p class="signup-popup__label">Fullname</p>
        </div>
        <div class="col-md-5">
          <input
            v-model="fullname"
            class="signup-popup__input"
            name="fullname"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <p class="signup-popup__label">Password</p>
        </div>
        <div class="col-md-5">
          <input
            v-model="password"
            class="signup-popup__input"
            name="password"
            :type="'password'"
          />
        </div>
      </div>
      <cta
        class="signup-popup__button"
        :secondary="true"
        @click="onClickSignup"
      >Sign in</cta>
      <p>{{ error }}</p>
    </div>
  </popup>
</template>

<script>
import Popup from './common/Popup'
import Cta from '@/components/common/Cta'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignupPopup',

  components: {
    Popup,
    Cta
  },

  data: () => ({
    username: '',
    password: '',
    fullname: '',
    remmember: false
  }),

  computed: {
    ...mapState({
      error: state => state.error,
      isLogin: state => state.isLogin
    })
  },

  methods: {
    ...mapActions([
      'onRegister'
    ]),

    toggle (value) {
      this.$refs.popup.toggle(value)
    },

    open () {
      this.toggle(true)
    },

    close () {
      this.toggle(false)
    },

    onClickSignup () {
      this.onRegister({
        username: this.username,
        password: this.password,
        fullname: this.fullname
      })
    }
  },

  watch: {
    isLogin (val) {
      if (val) {
        this.close()
      }
    }
  }
}
</script>

<style lang="scss">
.signup-popup {
  &__content {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    font-size: .75em;
    line-height: 1.5;
  }

  &__input {
    width: 100%;
    appearance: none;
    padding: 1.1rem 1rem 1rem;
    border-radius: $border-radius-1;
    border: 1px solid $color-black-trans-1;
    resize: none;
  }

  &__button {
    font-size: 1.2em;
  }
}
</style>
