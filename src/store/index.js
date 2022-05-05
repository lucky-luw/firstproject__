import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

import Home from './Home'
import Search from './Search'
import Detail from './Detail'
import shopCar from './shopCar'
import user from './user'
import trade from './trade'




export default new Vuex.Store({
    modules:{
        Home, Search, Detail, shopCar,user,trade
    }
})//vuex模块式开发