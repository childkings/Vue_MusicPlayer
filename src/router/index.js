import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import PhoneLogin from '@/components/PhoneLogin.vue'
import EmailLogin from '@/components/EmailLogin.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login/mode1' },
  {
    path: '/login',
    redirect: '/login/mode1',
    component: Login,
    children: [
      { path: 'mode1', component: PhoneLogin },
      { path: 'mode2', component: EmailLogin }
    ]
  },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {
  if (to.fullPath === '/home') {
    if (window.localStorage.getItem('token')) {
      next()
    } else {
      next('/')
    }
  } else if (to.fullPath === '/login/mode1' || to.fullPath === '/login/mode2') {
    if (window.localStorage.getItem('token')) {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
