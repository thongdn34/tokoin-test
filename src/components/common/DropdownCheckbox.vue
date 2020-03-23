<template>
  <div :class="['dropdown-checkbox', activeCls]">
    <div
      :class="['dropdown-checkbox__title', activeCls]"
      @click.stop="onTitleClick"
    >
      {{ name }}
      <em class="dropdown-checkbox__icon ico-arrow-1" />
    </div>

    <div :class="['dropdown-checkbox__list', activeCls]">
      <span class="dropdown-checkbox__item-title">{{ name }}</span>
      <div class="dropdown-checkbox__item-wrapper">
        <checkbox
          class="dropdown-checkbox__item"
          ref="checkbox"
          v-for="(item, index) in items"
          :key="index"
          :name="id"
          :value="item.id"
          :right="true"
          @change="onCheckboxChange($event, item)"
        >{{ item.name }}</checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from './Checkbox'

export default {
  name: 'DropdownCheckbox',

  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  components: {
    Checkbox
  },

  data: vm => ({
    opened: false,
    values: vm.getValues(vm.items)
  }),

  computed: {
    activeCls: vm => vm.opened && '--active',
    value: vm => ({ [vm.id]: vm.values })
  },

  methods: {
    toogleOpen (force) {
      let nextState = typeof force === 'boolean' ? force : !this.opened

      if (this.opened === nextState) {
        return
      }

      this.opened = nextState
      this.$emit(this.opened ? 'open' : 'close', this)
    },

    onTitleClick (evt) {
      this.$bus.$emit('dropdown-clicked', evt.currentTarget)
      this.toogleOpen(true)
    },

    onCheckboxChange (evt, item) {
      this.updateValues()

      this.$emit('change', this.value)
    },

    updateValues () {
      this.values = this.getValues()
    },

    getValues (items) {
      return (items || this.$refs.checkbox).reduce((values, { val }) => {
        return values.concat(val !== false ? val : [])
      }, [])
    }
  },

  mounted () {
    const $el = this.$el

    this.$bus.$on('body-clicked', () => {
      this.toogleOpen(false)
    })

    this.$bus.$on('dropdown-clicked', (target) => {
      $el !== target && this.toogleOpen(false)
    })
  }
}
</script>

<style lang="scss">
.dropdown-checkbox {
  $this: &;

  $top-padding: 1.2rem;
  $side-padding: 1.6rem;
  $item-side-padding: 1rem;
  $checkbox-width: 10px;
  $checkbox-checked-width: 6px;
  $checkbox-right: 4px;

  position: relative;
  display: inline-block;
  user-select: none;
  font-size: .8em;

  %title {
    display: block;
    padding: .9rem .4rem .5rem $item-side-padding;
    font-weight: bold;
    cursor: pointer;
  }

  &__title {
    @extend %title;
  }

  &__icon {
    position: relative;
    display: inline-block;
    margin-left: 1rem;
    font-size: .4em;
    color: $color-red-1;
    transform: rotate(0deg) translateZ(0);
    transition: transform .2s ease;
    z-index: 2;
    pointer-events: none;

    #{$this}__title.\--active & {
      transform: rotate(180deg) translateZ(0);
    }
  }

  &__list {
    position: absolute;
    top: calc(-1px - #{$top-padding});
    left: calc(-1px - #{$side-padding});
    min-width: 100%;
    padding: $top-padding $side-padding 2rem;
    box-sizing: content-box;
    background-color: $color-white-1;
    opacity: 0;
    visibility: hidden;
    z-index: 3;
    border: 1px solid $color-black-trans-1;
    box-shadow: 0 2px 3px -2px $color-black-trans-1;
    transition: all .1s ease;

    &.\--active {
      opacity: 1;
      visibility: visible;
    }
  }

  &__item-title {
    @extend %title;
  }

  &__item {
    display: block;
    margin-top: .9rem;
  }
}
</style>
