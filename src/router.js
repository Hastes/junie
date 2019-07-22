import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'

Vue.use(Router);



const ifNotAuthenticated = (to, from, next) => {
   if (!store.getters.isAuthenticated) {
      next();
      return
    }
    next('/')
};

// const ifAuthenticated = (to, from, next) => {
//     if (store.getters.isAuthenticated) {
//       next();
//       return
//     }
//     next('/login')
// };

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/Home")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/auth/Login"),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login/callback',
      name: 'callback',
      props: (route) => ({ query: route.query.q }),
      component: () => import("@/views/auth/Callback"),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import("@/views/auth/Register")
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import("@/views/profile/Profile"),
    },
    {
      path: '/lobby/:id',
      name: 'lobby-detail',
      component: () => import("@/views/games/lobby/Game"),
    }
    ,
    {
      path: '/lobby-panel/',
      name: 'lobby',
      component: () => import("@/views/games/lobby/Panel"),
    }
  ]
})
