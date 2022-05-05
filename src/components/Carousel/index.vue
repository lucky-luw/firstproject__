<template>
            <div class="swiper-container" >
                <div class="swiper-wrapper">
                    <div
                    class="swiper-slide"
                    v-for="item in list"
                    :key="item.id"
                    >
                    <img :src="item.imgUrl" />
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name:'ACarousel',
    props:['list'],
    watch:{
        list:{
            immediate:true,//立即监听，不管数据有没有变化，执行handler
            handler(){
                this.$nextTick(()=>{
                    //只能监听到数据已经有了，但是v-for动态渲染结构没有办法确定是否完成，所以nextTick
                    new Swiper('.swiper-container', {
                        loop:true,
                        autoplay:true,
                        pagination: {
                        el: ".swiper-pagination",
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                        }
                    })
                })
            }
        }
    }
}
</script>

<style>

</style>