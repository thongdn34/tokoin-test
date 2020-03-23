<template>
  <div v-show="!isLoaded" class="loader"></div>
</template>

<script>
export default {
  name: 'Loader',

  props: {
    isLoaded: Boolean
  }
}
</script>

<style lang="scss">
.loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-white-1;
  z-index: z-index(loader);

  &:before {
    $size: 150px;

    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -$size / 2;
    margin-left: -$size / 2;
    border-top: 8px rgba($color-blue-1, 1) solid;
    border-radius: 50%;
    @include size($size);
    animation: spin-loader .7s infinite linear;
  }
}

@keyframes spin-loader {
  from {
    transform: rotate(0deg) translateZ(0);
  }

  to {
    transform: rotate(359deg) translateZ(0);
  }
}
</style>
