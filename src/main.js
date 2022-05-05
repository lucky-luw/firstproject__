import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'


import store from '@/store'//引入仓库
import '@/mock/mockServer'//该文件没有暴露，引入使其执行一次
import '../node_modules/swiper/css/swiper.css';
import atm from '@/assets/images/atm.jpeg'//图片默认对外暴露的
Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)//全局注册组件
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name, Pagination)

import VueLazyload from 'vue-lazyload'//引入插件 图片懒加载
Vue.use(VueLazyload,{
  loading:atm//默认图片
 
})//注册插件，本质上是插件的install方法
//引入表单校验插件
import '@/plugins/validate' 

import { MessageBox } from 'element-ui';

import * as API from '@/API'
new Vue({
  render: h => h(App),
  router,//注册路由信息，所有组件身上就有了$router $route
  store,//祖册仓库，组件实例多了$store
  beforeCreate(){
    Vue.prototype.$bus=this
    //给vue的原型链上添加API，所有组件实例都能访问到，不用从API文件中引入也能使用接口
    Vue.prototype.$API=API;
    //单独引用方式，挂载到vue原型上
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$message = MessageBox 

  }
  
}).$mount('#app')
