<template>
  <div class="filter-input-dropdown">
    <input
      type="text"
      class="filter-input-dropdown__input-hidden"
      readonly
      ref="input"
      :name="name"
      :data-validate-field="validate"
      :required="required"
      :value="selectedId" />
    <input
      type="text"
      class="filter-input-dropdown__input"
      v-model="inputValue"
      placeholder="CP"
      @input="onInput" />
    <dropdown
      class="filter-input-dropdown__dropdown"
      ref="dropdown"
      :chooseFirst="false"
      :list="renderedList"
      @choose="onChoose" />
  </div>
</template>

<script>
import Dropdown from './Dropdown'

const keyUpEvt = document.createEvent('Event')

keyUpEvt.initEvent('keyup', true, true)

export default {
  name: 'FilterInputDropdown',

  props: {
    name: String,
    validate: String,
    list: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    inputShowKey: {
      type: String,
      default: 'code_postal'
    },
    loadId: {
      type: String,
      default: ''
    }
  },

  components: {
    Dropdown
  },

  data: () => ({
    inputValue: '',
    selectedId: '',
    inputEventTimeout: null,
    isLoadConfig: false
  }),

  computed: {
    filteredList: vm => {
      let inputValue = vm.inputValue.trim()

      if (inputValue) {
        const regEx = new RegExp(`^${inputValue.slice(0, 2)}`, 'i')

        return vm.list.filter(item => regEx.test(item[vm.inputShowKey]))
      }

      return vm.list
    },

    renderedList: vm => [].concat({
      [vm.inputShowKey]: '', id: '', title: 'Choisissez votre concession'
    }, vm.filteredList)
  },

  methods: {
    updateSelectedId (id) {
      this.selectedId = id

      clearTimeout(this.inputEventTimeout)
      this.inputEventTimeout = setTimeout(() => {
        this.$refs.input.dispatchEvent(keyUpEvt)
      }, 100)
    },

    onChoose (item) {
      item && this.updateSelectedId(item.id)
    },

    async chooseFirstValue () {
      await this.$nextTick()

      let list = !this.inputValue ? this.renderedList : this.filteredList
      let chooseItem = this.isLoadConfig
        ? list.filter(item => item.id === this.loadId)[0]
        : list[0]
      this.$refs.dropdown.choose(chooseItem && chooseItem.id)
    },

    onInput ({ data }) {
      (!!this.filter.onlyNumber(data) || !data) && this.chooseFirstValue()
    }
  },

  watch: {
    list () {
      this.loadId && this.chooseFirstValue()
    },

    loadId (val) {
      this.isLoadConfig = true
      this.chooseFirstValue()
    },

    inputValue (val) {
      this.inputValue = this.filter.onlyNumber(val)
    }
  },

  mounted () {
    this.filter = this.$options.filters
    this.loadId && (this.isLoadConfig = true)
    this.chooseFirstValue()
  }
}
</script>

<style lang="scss">
.filter-input-dropdown {
  $dropdown-width-xs: 83%;
  $dropdown-width-md: 87.1%;

  display: flex;
  align-items: center;

  &__input-hidden {
    display: none;
  }

  &__input {
    appearance: none;
    width: 100% - $dropdown-width-xs;
    padding: 1rem;
    border: 1px solid $color-black-trans-1;
    border-radius: $border-radius-1 0 0 $border-radius-1;
    background: transparent;
    text-align: center;
    line-height: 1;

    @include mq(1024) {
      width: 100% - $dropdown-width-md;
    }

    .js-validate-error-field ~ & {
      border-color: $color-red-1;
    }
  }

  &__dropdown {
    width: $dropdown-width-xs;

     @include mq(1024) {
      width: $dropdown-width-md;
    }

    .dropdown__chosen {
      padding: 1.2rem 1.7rem 1rem 1rem;
      font-size: 1.05em;
      background-color: $color-blue-1;
      color: $color-white-1;
      border-color: $color-blue-1;
      border-radius: 0 $border-radius-1 $border-radius-1 0;

      .js-validate-error-field ~ & {
        background-color: $color-red-1;
        border-color: $color-red-1;
      }

      .dropdown__item-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: normal;
      }
    }

    .dropdown__list {
      padding-right: 1.7rem;
      padding-left: 1rem;
    }

    .dropdown__icon {
      display: inline-block;
      margin-top: 0
    }
  }
}
</style>
