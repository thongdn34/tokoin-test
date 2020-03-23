<template>
  <section class="section">
    <div class="detail container">
      <div class="row">
        <div class="col-md-12">
          <div class="detail__head">
            <h1 class="detail__title">{{ title }}</h1>
            <div class="detail__description">{{ description }}</div>
            <div class="detail__info">
              <p class="detail__author">{{ author }}</p>
              <p class="detail__date">{{ publishAt }}</p>
            </div>
          </div>
          <div class="detail__body">
            <div class="detail__img" v-bg-img="image"/>
            <div class="detail__content">{{ content }}</div>
            <a class="detail__link" :href="url" target="blank">Original Link</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'DetaiNew',

  computed: {
    ...mapState([
      'selectedNew'
    ]),

    title: vm => vm.selectedNew.title,
    description: vm => vm.selectedNew.description,
    author: vm => vm.selectedNew.author,
    publishAt: vm => new Date(vm.selectedNew.publishedAt).toLocaleString(),
    image: vm => vm.selectedNew.urlToImage,
    content: vm => vm.selectedNew.content,
    url: vm => vm.selectedNew.url
  }
}
</script>

<style lang="scss">
.detail {
  margin-bottom: 2rem;

&__title {
    font-size: 2em;
    margin-bottom: 1rem;
  }

  &__img {
    @extend %bg-cover;
    @extend %bg-center ;
    @extend %bg-no-repeat;
    padding-bottom: 70%;
    margin-bottom: 2rem;
  }

  &__link {
    font-size: 1em;
  }

  &__author {
    margin: .5rem 0;
    font-size: .9em;
    font-weight: bold;
  }

  &__date {
    margin: 0;
    font-size: .7em;
  }

  &__info {
    margin: 2rem 0 4rem;
  }

  &__content,
  &__description {
    line-height: 1.5;
  }
}
</style>
