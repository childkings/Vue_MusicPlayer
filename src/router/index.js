import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import PhoneLogin from '@/components/PhoneLogin.vue'
import EmailLogin from '@/components/EmailLogin.vue'
import Home from '@/views/Home.vue'
import Homepage from '@/components/Homepage.vue'
import Searchpage from '@/components/Searchpage.vue'

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
  {
    path: '/home',
    component: Home,
    redirect: '/home/homepage',
    children: [
      { path: 'homepage', component: Homepage },
      { path: 'searchpage', component: Searchpage }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {
  if (to.fullPath === '/home/homepage' || to.fullPath === '/home/searchpage') {
    if (window.localStorage.getItem('token')) {
      if (from.fullPath === '/home/searchpage' && to.fullPath === '/home/searchpage') {
      } else {
        next()
      }
    } else {
      next('/login')
    }
  } else if (to.fullPath === '/login/mode1' || to.fullPath === '/login/mode2') {
    if (window.localStorage.getItem('token') === 'true') {
      next('/home')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
