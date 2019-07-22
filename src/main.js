import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ApiService from "@/api/index";

import { USER_DATA } from "./store/actions.type";

Vue.config.productionTip = false;

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(USER_DATA)]).then(() => {
    next()
  })
);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
