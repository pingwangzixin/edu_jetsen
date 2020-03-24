import  Vue from "vue"
import  Vuex from "vuex"
Vue.use(Vuex)
const state = {
    userInfo:JSON.parse(sessionStorage.getItem("userInfo"))||{}
}
const actions = {

}
const mutations = {
    record(state,obj){
        sessionStorage.setItem("userInfo",JSON.stringify(obj))
        state.userInfo = JSON.parse(JSON.stringify(obj))
    }
}






export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules:{
     
    }
})