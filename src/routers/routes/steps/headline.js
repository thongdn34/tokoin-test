export default {
  path: '/',
  name: 'Headline',
  meta: {
    id: 'top-headlines'
  },
  component: () => import(/* webpackChunkName: "headline" */ '@/views/Headline.vue')
}
