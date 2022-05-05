<template>
  <div id="app">
   <Header/>
   <router-view></router-view>
   <!-- 给路由添加元信息meta判断footer 的显示和隐藏 -->
  
   <Footer v-show="$route.meta.footerIsShow"/>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'



export default {
  name: 'App',
  components: {
      Header,Footer
  },
  mounted(){
      //通知vuex发请求，获取数据，存储于仓库之中，在根组件这里存数据，比在对应组件每次挂载时请求数据要好
        this.$store.dispatch('categoryList');
  }
}
</script>

<style>

</style>
