export default {
  path: '/profile',
  name: 'Profile',
  meta: {
    id: 'profile'
  },
  component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
}
