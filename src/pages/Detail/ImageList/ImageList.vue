<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(skuImage,index) in skuImageList" :key="skuImage.Id" >
        <img :src="skuImage.imgUrl" :class="{active:isActive==index}" @click="changeCurrentIndex(index)" >
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'

  export default {
    name: "ImageList",
    data(){
      return {
        isActive:0
      }
    },
     props:['skuImageList'],
     //在new swiper实例之前要保证收到数据并且页面有结构
     watch:{//监视属性是为了数据收到时，但可能v-for还没执行完
        skuImageList :{
           handler(){
                this.$nextTick(()=>{
                    //只能监听到数据已经有了，但是v-for动态渲染结构没有办法确定是否完成，所以nextTick
                    new Swiper('.swiper-container', {
                        loop:true,
                        // autoplay:true,
                        //设置同一个容器中显示多少个
                        slidesPerView:3,
                        //设置前进后退多少个元素
                        slidesPerGroup:2,
                        // 如果需要前进后退按钮
                        navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                        }
                    })
                })
            }
        
        }
     },
     methods:{
       changeCurrentIndex(index){
          this.isActive=index
          this.$bus.$emit('changeCurrentIndex',index)
          //小轮播和放大镜是兄弟组件的关系，点击哪个图片，展示哪个图片

       }
     }
    
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
     
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>