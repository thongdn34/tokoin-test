<template>
  <div class="card" @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CardNew',

  methods: {
    onClick () {
      this.$emit('click', this)
    }
  }
}
</script>

<style lang="scss">
.card {
  position: relative;
  height: 100%;

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid $color-red-1;
    opacity: 0;
  }
}
</style>
