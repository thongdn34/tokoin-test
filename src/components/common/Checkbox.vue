<template>
  <label
    :class="[
      'checkbox',
      right && '--right',
      error && '--error',
      disabled && '--disabled'
    ]"
    @click.stop
  >
    <input
      ref="input"
      class="checkbox__input"
      :type="type"
      :name="name"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      :required="required"
      :data-validate-field="validate"
      @change="onChange" />
    <span class="checkbox__item-name">
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',

  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    name: String,
    value: String,
    validate: String,
    right: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data: vm => ({
    state: false,
    _checked: vm.checked,
    val: vm.getValue()
  }),

  methods: {
    updateValue () {
      this.val = this.getValue()
    },

    getValue () {
      return this._checked ? this.$refs.input.value : false
    },

    onChange (evt) {
      this._checked = evt.currentTarget.checked

      this.updateValue()
      this.$emit('change', this)
    }
  }
}
</script>

<style lang="scss">
.checkbox {
  $this: &;
  $this-input: "#{$this}__input";
  $this-right: "#{$this}.\--right";
  $this-radio: "#{$this-input}[type='radio']";
  $this-checked: "#{$this-input}:checked";
  $this-validate-error: "#{$this-input}.js-validate-error-field";

  $checkbox-width: 10px;
  $checkbox-checked-width: 6px;
  $checkbox-diff: ($checkbox-width - $checkbox-checked-width) / 2;
  $checkbox-top: .1em;
  $checkbox-left: 4px;
  $side-padding: $checkbox-width + $checkbox-left * 2;

  position: relative;
  display: inline-block;
  padding: 0 1rem 0 $side-padding;
  cursor: pointer;

  &.\--right {
    padding: 0 $side-padding 0 1rem;
  }

  &.\--error {
    color: $color-red-1;
  }

  &.\--disabled {
    opacity: .5;
    pointer-events: none;
  }

   &__input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    visibility: hidden;
  }

  %item-name-pseudo {
    content: "";
    display: block;
    position: absolute;
    transition: all .1s ease;
  }

  &__item-name {
    display: inline-block;

    #{$this-validate-error} + & {
      color: $color-red-1;
    }

    &:before,
    &:after {
      @extend %item-name-pseudo;

      #{$this-radio} + & {
        border-radius: 50%;
      }

      #{$this-right} & {
        left: auto;
      }
    }

    &:before {
      top: $checkbox-top;
      left: $checkbox-left;
      @include size($checkbox-width);
      border: 1px solid currentColor;
      opacity: .2;

      #{$this-right} & {
        right: $checkbox-left;
      }

      #{$this-checked} + & {
        opacity: 1;
      }
    }

    &:after {
      $left: $checkbox-diff + $checkbox-left;

      top: calc(#{$checkbox-top} + #{$checkbox-diff});
      left: $left;
      @include size($checkbox-checked-width);
      background-color: currentColor;
      transform: scale(0) translateZ(0);

      #{$this-right} & {
        right: $left;
      }

      #{$this-checked} + & {
        transform: scale(1) translateZ(0);
      }
    }
  }

}
</style>
