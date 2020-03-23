<template>
  <div class="dropdown">
    <input
      v-if="name"
      type="text"
      class="dropdown__input"
      :value="value"
      :name="name"
      :data-validate-field="validate"
      :required="required">

    <div class="dropdown__chosen" @click.stop="onLabelClick">
      <div class="dropdown__chosen-wrapper">
        <p
          class="dropdown__item-title"
          v-show="!selectedItem"
          v-html="list[0].title" />
        <p
          class="dropdown__item-title"
          v-show="selectedItem"
          v-html="selectedItem && selectedItem.title" />
        <p
          class="dropdown__item-description"
          v-show="selectedItem"
          v-html="selectedItem && selectedItem.description" />
      </div>
      <em
        v-if="listItem[0]"
        :class="['dropdown__icon', 'ico-arrow-1', openCls]" />
    </div>
    <div :class="['dropdown__list', openCls]" v-if="listItem[0]">
      <div
        class="dropdown__item"
        v-for="({ id, title, description }) in listItem"
        v-show="id"
        :key="id"
        @click.stop="choose(id)"
      >
        <p class="dropdown__item-title" v-if="title" v-html="title" />
        <p class="dropdown__item-description" v-if="description" v-html="description" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',

  props: {
    name: String,
    validate: String,
    list: {
      type: Array,
      default: () => []
    },
    valKey: {
      type: String,
      default: 'id'
    },
    required: {
      type: Boolean,
      default: false
    },
    chooseFirst: {
      type: Boolean,
      default: true
    }
  },

  data: vm => ({
    opened: false,
    selectedId: ''
  }),

  computed: {
    trueList: vm => vm.list.filter(({ id }) => id),
    listItem: vm => vm.trueList.filter(({ id }) => id !== vm.selectedId),
    selectedItem: vm => vm.list.filter(({ id }) => id === vm.selectedId)[0],
    openCls: vm => vm.opened && '--open',
    value: vm => vm.selectedItem ? vm.selectedItem[vm.valKey] : ''
  },

  methods: {
    toggle (force, stopTriggerEvent) {
      if (!this.listItem[0]) {
        return
      }

      let nextState = typeof force === 'boolean' ? force : !this.opened

      if (this.opened === nextState) {
        return
      }

      this.opened = typeof force === 'boolean' ? force : !this.opened
      !stopTriggerEvent && this.$emit(this.opened ? 'open' : 'close')
    },

    choose (id, stopTriggerEvent) {
      this.selectedId = id
      !stopTriggerEvent && this.$emit('choose', this.selectedItem)
      this.toggle(false, stopTriggerEvent)
    },

    onLabelClick () {
      this.$emit('click')
      this.toggle()
      this.$bus.$emit('dropdown-clicked', this)
    },

    chooseFirstValue () {
      let list = this.trueList[0] || this.list[0]

      list && this.choose(list.id, true)
    }
  },

  watch: {
    list () {
      this.chooseFirst && this.chooseFirstValue()
    }
  },

  mounted () {
    this.$bus.$on('body-clicked', () => {
      this.toggle(false)
    })

    this.$bus.$on('dropdown-clicked', (component) => {
      component !== this && this.toggle(false)
    })

    this.chooseFirst && this.chooseFirstValue()
  }
}
</script>

<style lang="scss">
.dropdown {
  $item-padding-top: 1.2rem;
  $item-padding-right: 1.8rem;
  $item-padding-left: 1.7rem;

  position: relative;

  &__chosen {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $item-padding-top $item-padding-left 1.5rem $item-padding-right;
    background: $color-gray-2;
    border-radius: $border-radius-1;
    border: 1px solid $color-gray-2;
    cursor: pointer;
    transition: border-color .1s ease;

    .js-validate-error-field.js-validate-error-field ~ & {
      border-color: $color-red-1;
      background-color: $color-red-1;
    }
  }

  &__chosen-wrapper {
    overflow: hidden;
  }

  &__list {
    position: absolute;
    top: calc(100% - #{$border-radius-1 - 1px});
    left: 0;
    width: 100%;
    max-height: 0;
    background: $color-gray-2;
    opacity: 0;
    padding: 0 $item-padding-left 0 $item-padding-right;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transition: all .2s ease;
    z-index: z-index(dropdown);
    pointer-events: none;

    &.\--open {
      opacity: 1;
      max-height: 9.2em;
      pointer-events: auto;

      @include mq(1025) {
        max-height: 8.5em;
      }
    }
  }

  &__item {
    padding: $item-padding-top 0;
    border-top: 1px solid rgba(0, 44, 71, 0.25);
    cursor: pointer;
  }

  &__item-title {
    font-size: .89em;
    font-weight: bold;
    margin: 0;
  }

  &__item-description {
    font-size: .69em;
    margin: .2rem 0 0;
  }

  &__icon {
    margin: .5rem 0 0 1rem;
    font-size: .55em;
    color: $color-blue-1;
    pointer-events: none;
    transform: rotate(0deg) translateY(0) translateZ(0);
    transition: transform .2s ease;
    z-index: 2;

    &.\--open {
      transform: rotate(180deg) translateY(3px) translateZ(0);
    }
  }

  &__input {
    display: none;
  }
}
</style>
