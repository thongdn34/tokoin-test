<template>
  <button
    @click="onClick"
    :class="['cta', secondary && '--secondary', checked && '--checked']"
    v-if="!link"
  >
    <em class="ico-checked-mark" v-if="checked" />
    <slot></slot>
  </button>

  <a
    @click="onClick"
    :class="['cta --link', secondary && '--secondary', checked && '--checked']"
    v-else
  >
    <em class="ico-checked-mark" v-if="checked" />
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'Cta',

  props: {
    link: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss">
.cta {
  display: inline-block;
  appearance: none;
  border: 0;
  min-width: 10em;
  padding: 1rem 2.2rem .9rem;
  border: 1px solid $color-red-1;
  border-radius: $border-radius-1;
  background-color: $color-red-1;
  color: $color-white-3;
  font-size: .78em;
  letter-spacing: -.3px;
  cursor: pointer;

  &.\--link {
    text-decoration: none;
    color: $color-blue-1;
  }

  &.\--checked {
    padding-left: 1.5rem;
  }

  &.\--secondary {
    background-color: $color-white-1;
    color: $color-blue-1;
    border-color: rgba($color-black-1, .2);
  }

  &.\--disabled,
  &:disabled {
    background-color: $color-gray-1;
    border-color: $color-gray-1;
    cursor: not-allowed;
  }

  em:first-child {
    margin-right: .5em;
  }

  em:last-child {
    margin-left: .5em;
  }
}
</style>
