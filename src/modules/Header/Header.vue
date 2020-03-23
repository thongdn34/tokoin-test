<template>
  <header class="header">
    <span >
      <img
        class="header__logo"
        src="@/assets/images/travel.svg"
        @click="goHome" />
        TOKOIN NEWS
    </span>
    <ul class="header__steps" ref="steps">
      <li
        class="header__step"
        ref="step"
        v-for="({ name, path, meta: { id } }, index) in tabs"
        :data-index="index"
        :key="id"
      >
        <router-link
          :to="path"
          :class="{
            'header__step-name': true,
          }"
        >{{ name }}</router-link>
        <em class="header__step-icon" />
      </li>
    </ul>
  </header>
</template>

<script>
import steps from '../../routers/routes/steps'

const reduntDistances = 40

export default {
  name: 'PageHeader',

  data: () => ({
    steps,
    stepsWrapperOffsetLeft: 0,
    stepsOffsetLeft: []
  }),

  computed: {
    tabs: vm => {
      return vm.steps.reduce((tabs, step, index) => {
        if (index < 3) {
          return [
            ...tabs,
            step
          ]
        }

        return tabs
      }, [])
    }
  },

  methods: {
    recalcOffsetLeft () {
      this.stepsWrapperOffsetLeft = this.$refs.steps && this.$refs.steps.offsetLeft
      this.stepsOffsetLeft = this.$refs.step && this.$refs.step.map((step) => step.offsetLeft)
    },

    scrollToStep (route) {
      const { meta: { index } } = route || this.$route
      const stepLeft = this.stepsOffsetLeft[index]

      if (typeof stepLeft === 'undefined') {
        return
      }

      const left = stepLeft - this.stepsWrapperOffsetLeft - reduntDistances

      this.$refs.steps.scrollTo({
        left,
        behavior: 'smooth'
      })
    },

    goHome () {
      this.$router.push('/')
    }
  },

  watch: {
    '$route' (dest) {
      this.scrollToStep(dest)
    }
  },

  mounted () {
    this._recalcOffsetLeft = this.recalcOffsetLeft.bind(this)

    this.$bus.$on('window:x-resized', this._recalcOffsetLeft)
    this.recalcOffsetLeft()
    this.scrollToStep()
  },

  destroyed () {
    if (this._recalcOffsetLeft) {
      this.$bus.$off('window:x-resized', this._recalcOffsetLeft)
      this._recalcOffsetLeft = null
    }
  }
}
</script>

<style lang="scss">
.header {
  $this: &;

  display: flex;

  & > span {
    display: flex;
    flex-direction: column;
    background-color: $color-white-1;
  }

  &__logo {
    height: 55px;
    cursor: pointer;
  }

  &__steps {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    border-left: 1px solid rgba($color-white-1, .3);
    list-style: none;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    background-color: $color-blue-1;
  }

  &__step {
    position: relative;
    flex: 1;
    flex-basis: auto;
    text-align: center;
    padding: 2.2rem 2.8rem 2.2rem;
    margin-top: -2px;
  }

  &__step-name {
    $line: 2px;

    position: relative;
    display: inline-block;
    padding-bottom: $line + 2px;
    color: $color-white-1;
    font-size: 1.2em;
    text-decoration: none;
    white-space: nowrap;

    @include mq(1024) {
      white-space: normal;
    }

    &:after {
      content: "";
      position: absolute;
      display: block;
      bottom: 0;
      left: 0;
      width: 0;
      height: $line;
      background-color: $color-red-1;
      transition: width .2s ease;
    }

    &.\--exact-active:after {
      width: 100%;
    }
  }
}
</style>
