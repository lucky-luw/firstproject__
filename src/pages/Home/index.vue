<template>
  <div>
      <!-- 该组件已经祖册为全局组件，因此不需引入 -->
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <Recommend></Recommend>
      <Rank></Rank>
      <Like></Like>
      <Floor v-for="item in FloorList" :key="item.id" :list="item"></Floor>
      <Brand></Brand>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TypeNav from '@/components/TypeNav'
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'


export default {
    name:'AHome',
    components:{
        ListContainer,Recommend,  Rank,Like,Floor,Brand,TypeNav
    },
    mounted(){
        //这个请求不能在floor组件内部发，因为这时还没有遍历出floor
        this.$store.dispatch('getFloorList')
      
    },
    computed:{
        ...mapState({
            'FloorList': state=>state.Home.FloorList
        })
    }
}
</script>

<style>

</style>