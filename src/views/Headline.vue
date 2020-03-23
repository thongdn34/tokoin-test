<template>
  <section class="headline section">
    <h1 class="headline__title">Top Healines in US</h1>
    <list-new
      :list="news"
      @select="onSelectItem"
    />
  </section>
</template>

<script>
import { asyncComponentLoaded } from '../utils/mixins'
import { mapState, mapActions } from 'vuex'
import ListNew from '../components/ListNew'

export default {
  name: 'Headline',

  mixins: [ asyncComponentLoaded ],

  components: {
    ListNew
  },

  computed: {
    ...mapState('news', [
      'news'
    ]),
    ...mapState(['selectedNew'])
  },

  methods: {
    ...mapActions('news', [
      'getNewsList',
      'selectNew'
    ]),

    onSelectItem (index) {
      this.selectNew(index)
      this.$router.push('/detail')
    }
  },

  mounted () {
    if (!this.news[0]) {
      this.getNewsList({
        category: this.$route.meta.id,
        options: {
          country: 'us'
        }
      })
    }
  }
}
</script>

<style lang="scss">
.headline {
  &__title {
    margin: 2rem 0;
    text-align: center;
  }
}
</style>
