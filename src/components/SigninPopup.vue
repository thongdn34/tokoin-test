<template>
  <popup class="signin-popup" ref="popup">
    <h2>Sign in</h2>
    <div class="signin-popup__content">
      <div class="row">
        <div class="col-md-2">
          <p class="signin-popup__label">Username</p>
        </div>
        <div class="col-md-5">
          <input
            v-model="username"
            class="signin-popup__input"
            name="username"
            placeholder="ginchiyo"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2">
          <p class="signin-popup__label">Password</p>
        </div>
        <div class="col-md-5">
          <input
            v-model="password"
            class="signin-popup__input"
            name="password"
            :type="'password'"
          />
        </div>
      </div>
      <cta
        class="signin-popup__button"
        :secondary="true"
        @click="onClickSignin"
      >Sign in</cta>
      <checkbox
        name="rememberme"
        validate="gender"
        :checked="remmember"
        @change="onCheckBoxChange"
      >Remember me</checkbox>
      <p>{{ error }}</p>
    </div>
  </popup>
</template>

<script>
import Popup from './common/Popup'
import Cta from '@/components/common/Cta'
import Checkbox from '@/components/common/Checkbox'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SigninPopup',

  components: {
    Popup,
    Cta,
    Checkbox
  },

  data: () => ({
    username: '',
    password: '',
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
      'onLogin'
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

    onCheckBoxChange (ctx) {
      this.remmember = ctx._checked
    },

    onClickSignin () {
      this.onLogin({
        username: this.username,
        password: this.password,
        remmember: this.remmember
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
.signin-popup {
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
