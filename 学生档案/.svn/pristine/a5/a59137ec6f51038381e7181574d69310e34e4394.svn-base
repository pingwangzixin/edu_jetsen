// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import Axios from 'axios'
import App from './App'
import router from './router'
//import {record} from './api'
import './assets/css/reset.css'
import './assets/css/public.css'
import './assets/iconFont/iconfont.css'
import './assets/css/main.css'
import './assets/iconFont/iconfont.css'
import htmlToPdf from './assets/js/htmlToPdf'
Vue.use(htmlToPdf)

Vue.config.productionTip = false

/*record.stuRecordAll({'stuNo':'G430281199209301331'}).then(res => {
	console.log(res)
})*/
router.beforeEach((to, from, next) => {
  if(to.path == '/index/studentRecord' || to.path ==　'/index/studentStatusCard'){
    document.title = "学籍卡"
  }else{
    document.title = "成长档案"
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
