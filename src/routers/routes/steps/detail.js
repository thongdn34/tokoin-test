export default {
  path: '/detail',
  name: 'Detail',
  meta: {
    id: 'detail'
  },
  component: () => import(/* webpackChunkName: "detail" */ '@/views/DetailNew.vue')
}
