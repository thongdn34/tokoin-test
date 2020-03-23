<template>
  <div class="list-new">
    <div class="list-new__main row">
      <div class="col-md-4" v-for="(item, index) in list" :key="index">
        <new-item :article="item" @click="onClickNewItem(index)"/>
      </div>
    </div>
  </div>
</template>

<script>
import NewItem from './NewItem'
export default {
  name: 'ListNew',

  components: {
    NewItem
  },

  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },

  methods: {
    onClickNewItem (index) {
      this.$emit('select', index)
    }
  }
}
</script>
