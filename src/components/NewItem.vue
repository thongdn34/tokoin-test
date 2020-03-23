<template>
  <div class="new-card" @click="onClickNewItem">
    <card-new>
      <div class="new-card__wrapper">
        <div class="--bg-cover new-card__img" v-bg-img="image" />
        <div class="new-card__content">
          <p class="new-card__name">{{ title }}</p>
          <div class="new-card__info">
            <div class="new-card__left">
              <p class="new-card__desc">{{ description }}</p>
              <p class="new-card__author">{{ author }}</p>
              <p class="new-card__publish-date">{{ publishedAt }}</p>
            </div>
          </div>
        </div>
      </div>
    </card-new>
  </div>
</template>

<script>
import CardNew from './common/CardNew'

export default {
  name: 'NewItem',

  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },

  components: {
    CardNew
  },

  computed: {
    image: vm => vm.article.urlToImage,
    title: vm => vm.article.title,
    description: vm => vm.article.description,
    author: vm => vm.article.author,
    publishedAt: vm => new Date(vm.article.publishedAt).toLocaleString()
  },

  methods: {
    onClickNewItem () {
      this.$emit('click', this)
    }
  }
}
</script>

<style lang="scss">
.new-card {
  $this: &;

  padding: 0 .3rem;
  cursor: pointer;

  @include mq(1024) {
    padding: 0 .5rem;
  }

  &__wrapper {
    $outline-width: 2px;

    position: relative;
  }

  &__img {
    height: 0;
    padding-bottom: 49.5%;

    @include mq(1024) {
      padding-bottom: 50%;
    }
  }

  &__content {
    padding: 2.5rem 1.6rem 2.5rem 2rem;
    background-color: rgba($color-blue-1, .05);
  }

  &__name {
    font-weight: bold;
    font-size: 1.13em;
    margin: 0;
  }

  &__left {
    margin-top: .3rem;
  }

  &__desc {
    font-weight: bold;
    font-size: .88em;
    color: rgba($color-blue-1, .6);
    margin: 0;
  }

  &__author {
    font-weight: bold;
    margin: 2.1rem 0 0;
    font-size: .75em;
  }

  &__publish-date {
    margin: .3rem 0 0;
    font-size: .75em;
  }

  &__right {
    margin-top: -.3rem;
    font-size: .6em;
    line-height: 1.4;
    text-align: right;

    strong {
      font-size: 1.5em;

      &.\--txt-big  {
        font-size: 2.35em;
        line-height: 1.6;
      }
    }
  }

  &__info-btn {
    margin-top: -.2em;
    font-size: 1.9em;
    color: $color-blue-1;
  }

  &__cta-wrapper {
    margin-top: 2.4rem;

    .cta:first-child {
      margin-left: -.3rem;

      &.\--secondary {
        margin-left: -.2rem;
      }
    }
  }

  &__small-content {
    margin-top: -.4rem;
  }

  &__small-text {
    opacity: .5;
  }
}
</style>
