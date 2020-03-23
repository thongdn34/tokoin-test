<template>
  <input
    v-if="type !== 'textarea'"
    class="textbox"
    ref="input"
    :type="type"
    :required="required"
    :placeholder="$data._placeholder"
    :data-validate-field="validate"
     />

  <textarea
    v-else
    class="textbox"
    :value="accessories"
    :required="required"
    :placeholder="$data._placeholder"
    :data-validate-field="validate"
  />
</template>
<script>

export default {
  name: 'Textbox',

  props: {
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    validate: String,
    accessories: {
      type: String,
      default: ''
    }
  },

  data: vm => ({
    _placeholder: vm.placeholder && vm.placeholder + (vm.required ? '*' : '')
  })
}
</script>

<style lang="scss">
.textbox {
  appearance: none;
  padding: 1.1rem 1rem 1rem;
  border-radius: $border-radius-1;
  border: 1px solid $color-black-trans-1;
  resize: none;
}
</style>
