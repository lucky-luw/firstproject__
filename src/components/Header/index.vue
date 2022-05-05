<template>
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <span>{{userName}}&nbsp;&nbsp;</span>
                            <a href="#" @click="logout">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center" v-if="$store.state.user.token">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <router-link to="/home">我的尚品汇</router-link>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" title="尚品汇" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyWord" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:'AHeader',
    data(){
        return {
            keyWord:''
        }
    },
    methods: {
        //搜索按钮的回调函数，向search路由进行跳转
        goSearch(){
            // this.$router.push('/search/'+this.keyWord+"?k="+this.keyWord.toUpperCase())//第一种方式字符串写法params和query，params要声明占位符
            // this.$router.push( `/search/${this.keyWord}/?k=${this.keyWord.toUpperCase()}`)//第二种方式模板字符串写法
            //第三种方式：对象写法，常用
           
            if(this.$route.query){//如果本来路径中有query参数
                let location={name:'search',params:{keyword:this.keyWord }}
                location.query=this.$route.query
                this.$router.push(location)
            }else {
                this.$router.push({
                name:'search',
                params:{keyword:this.keyWord},
            })
            }
            //使用undefined解决params参数传空字符问题params:{keyWord :''|| undefined} 路径没有问题

        },
        //退出登录：需要发请求通知服务器，清除数据；清除项目中的数据userInfo：token
        async logout(){
            try {
               await this.$store.dispatch('userLogout')
                this.$router.push('/home')
            }catch(error){
                alert(error.message)
            }
        }
    },
    mounted(){
        this.$bus.$on('clearKey',()=>{
            this.keyWord=''
        })
    },
   beforeDestroy() {
        this.$bus.$off('clearKey')
   },
  computed:{
      userName(){
          return this.$store.state.user.userInfo.name
      },
      
  },
 
    
  
}
</script>

<style scoped lang="less">
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;
            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }

</style>