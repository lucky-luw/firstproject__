<template>
        <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" v-show="show">
                            <div class="all-sort-list2" @click="goSearch">
                                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" >
                                    <!-- 利用鼠标经过的索引值和当前比较，相同的就加上背景色 -->
                                    <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex===index}" >
                                        <a href="javascript:;" :data-categoryname="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    </h3>
                                    <!--通过index控制显示与隐藏 -->
                                    <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                        <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                            <dl class="fore">
                                                <dt>
                                                    <a href="javascript:;" :data-categoryname="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                </dt>
                                                <dd>
                                                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                        <a href="javascript:;" :data-categoryname="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    </em>
                                                
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'//按需引入
//import _ from 'lodash'引入所有功能，一般按需引入，_是一个对象

export default {
    name:'TypeNav',
    //当组件挂载完毕，可以向服务器发送请求
    data(){
        //记录用户鼠标在哪一个分类上,把数据保存在这里，当位置改变时，也跟着改变
        return {
         currentIndex:-1,
         show:false
        }
    },
    mounted(){
        if(this.$route.path=='/home'){//如果不是home路由组件，将该三极导航隐藏,重新挂载到其它路径
            this.show=true
        }
    },
    computed:{
        // ...mapState('Home',['categoryList'])
        ...mapState({
            //这里的state是全局的
            categoryList:state=>state.Home.categoryList
        })
    },
    methods:{
        changeIndex:throttle(function(value){
            this.currentIndex=value
        },100),//节流多次变少次，回调函数不用箭头函数
        goSearch(e){//event获取到当前事件的节点
            //如何确保点击的是a标签:给a标签独立加上自定义属性，
            let element=e.target
            let {categoryname,category1id,category2id,category3id}=element.dataset //节点有一个dataset属性，可以获取节点的自定义属性和属性值
            if(categoryname){
                let location={name:'search'}
                let query={categoryName:categoryname}
                if(category1id){//如果是一级标题
                    query.category1Id=category1id;
                    console.log(1);
                }else if(category2id){
                    query.category2Id=category2id;
                    console.log(2);

                }else if(category3id){
                    query.category3Id=category3id;
                    console.log(3);

                }
                if(this.$route.params){
                    location.params=this.$route.params
                }//如果跳转时有params参数，就带上
                location.query=query
                this.$router.push(location)
            }
               
        },//这里不用声明式导航，利用事件委派和编程式导航进行跳转
        enterShow(){
            this.show=true
        },
        leaveShow(){
            this.currentIndex=-1
            if(this.$route.path!='/home') this.show=false
        }
    }

}
</script>

<style scoped lang="less">
    
        .type-nav {
            border-bottom: 2px solid #e1251b;
            .container {
                width: 1200px;
                margin: 0 auto;
                display: flex;
                position: relative;

                .all {
                    width: 210px;
                    height: 45px;
                    background-color: #e1251b;
                    line-height: 45px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                }

                .nav {
                    a {
                        height: 45px;
                        margin: 0 22px;
                        line-height: 45px;
                        font-size: 16px;
                        color: #333;
                    }
                }

                .sort {
                    position: absolute;
                    left: 0;
                    top: 45px;
                    width: 210px;
                    height: 461px;
                    background: #fafafa;
                    z-index: 999;
                    .all-sort-list2 {
                        .item {
                            h3 {
                                line-height: 27px;
                                font-size: 14px;
                                font-weight: 400;
                                overflow: hidden;
                                padding: 0 20px;
                                margin: 0;
                                a {
                                    color: #333;
                                }
                            }

                        .item-list {
                        
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                        
                    }
                }
            }

            //过渡动画样式，过渡动画开始状态
            .sort-enter,.sort-leave-to{
                height: 0px;
            }
            .sort-enter-to,.sort-leave{
                height: 461px;
            }
            .sort-enter-active{
                transition: all 0.4s linear;
            }//定义动画的时间，速率
        
        }
    }
    .cur {
        background-color: skyblue;
    }
</style>