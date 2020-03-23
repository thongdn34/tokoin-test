<template>
  <section class="categories section">
    <h1>Custom news: {{ date }}</h1>
    <div class="categories__body section">
      <div class="row">
        <div class="categories__list col-md-9">
          <list-new
            :list="categoriesNews"
            @select="onSelectItem"
          />
        </div>
      </div>
      <div class="categories__filter">
        <p>Fillter</p>
        <div class="categories__item"
          v-for="(item, index) in filter"
          :key="index"
        >
          <checkbox
            type="radio"
            name="checkbox"
            :checked="index === selectedIndex"
            @change="onCheckBoxChange(index)"
          >{{ item }}</checkbox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { asyncComponentLoaded } from '../utils/mixins'
import Checkbox from '@/components/common/Checkbox'
import ListNew from '@/components/ListNew'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Categories',

  mixins: [ asyncComponentLoaded ],

  components: {
    Checkbox,
    ListNew
  },

  data: () => ({
    filter: ['bitcoin', 'apple', 'earthquake', 'animal'],
    selectedIndex: 0
  }),

  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      categoriesNews: state => state.categories.categoriesNews
    }),

    type: vm => vm.filter[vm.selectedIndex],
    date: () => new Date().toDateString()
  },

  methods: {
    ...mapActions('categories', [
      'getFilterNewsList',
      'selectNew'
    ]),

    onCheckBoxChange (index) {
      this.selectedIndex = index
      this.getData()
    },

    onSelectItem (index) {
      this.selectNew(index)
      this.$router.push('/detail')
    },

    getData () {
      this.getFilterNewsList({
        category: this.$route.meta.id,
        options: {
          q: this.type,
          from: new Date().toISOString().substr(0, 10),
          sortBy: 'publishedAt'
        }
      })
    }
  },

  mounted () {
    if (!this.categoriesNews[0]) {
      this.getData()
    }
  }
}
</script>

<style lang="scss">
.categories {
  h1 {
    margin: 1rem 0;
  }

  &__body {
    position: relative;
  }

  &__filter {
    position: fixed;
    right: 311px;
    top: 120px;
  }
}
</style>
