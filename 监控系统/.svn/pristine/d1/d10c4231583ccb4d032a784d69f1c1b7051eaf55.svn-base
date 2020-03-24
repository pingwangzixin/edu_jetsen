// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './assets/css/reset.css';
import './assets/css/public.css';
import './assets/iconFont/iconfont.css';
import './assets/css/main.css';

Vue.config.productionTip = false

//路由全局守卫
router.beforeEach((to,from,next)=>{
  if(to.path!=="/index/login"){
    if(!store.state.userInfo.id){
        next("/index/login")
        return
    }
  }
  next()
})



/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

