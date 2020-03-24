import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import login from '../components/login.vue'
import list from "../components/monitorAdmin/list.vue"
import schoolData from "../components/monitorAdmin/schoolData.vue"


Vue.use(Router)

const  router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:"/index/login",
      children:[
        {
          path:'/index/login',
          name:"login",
          component:login
        },
        {
          path:'/index/list',
          name:"list",
          component:list
        },
        {
          path:'/index/schoolData/:id',
          name:'schoolData',
          component:schoolData,
          props:true,
        }
    
      ]
    },
    
  ]
})



export default  router