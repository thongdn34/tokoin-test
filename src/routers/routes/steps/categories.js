export default {
  path: '/categories',
  name: 'Categories',
  meta: {
    id: 'everything'
  },
  component: () => import(/* webpackChunkName: "categories" */ '@/views/Categories.vue')
}
