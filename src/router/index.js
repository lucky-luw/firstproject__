//注意引入到入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import store from '@/store' //想拿到token，引入模块
Vue.use(VueRouter)

let originPush=VueRouter.prototype.push;//备份原来的push方法
let originReplace=VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)//保证上下文为vueRouter类的实例，直接调是window
    }else {
        originPush.call(this,location, () => {}, () => {})
        //call与apply区别就在于传参，call多个参数用逗号隔开，apply传递数组
    }
}//重写push方法，使多次跳转当前路由时失败被捕获，不会显示
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this, location, resolve, reject)
    }else{
        originReplace.call(this, location, () => {}, () => {})
    }
}//重写replace方法，以后再调用时就不用传后两个参

 let router=new VueRouter({
    routes,
    //滚动行为
    scrollBehavior (){
        return {y:0}
        //x,y默认为横轴和竖轴，数字为停留位置
    }
})
//全局守卫:前置守卫，在路由跳转之前进行判断
router.beforeEach(async (to,from,next)=>{
    //next()放行 next('/login') 放行到指定的路径
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        //登录了
        if(to.path=='/login') next('/home')  //不能跳转到登录页面
        else{
         //登录了，跳转的是别的
            if(name){
                //如果仓库中有userInfo，放行
                next()
            }else{
                //如果仓库中没有userInfo，获取后才放行
                try {
                    await store.dispatch('getUserInfo');
                    next()
                } catch (error) {
                    //当有token，却派发getUSerInfo失败时，说明服务器中对应的token已失效
                    //清除登录
                   await store.dispatch('userLogout')
                   next('/login')
                }
            }
            
        }
    }else{
        //没有登录,不能前往支付相关及个人中心
        const errorPath=['/trade','/pay','/paySuccess','/center','/center/myOrder','/center/groupOrder']  //或者可以在meta中限定
        if(errorPath.includes(to.path)) next(`/login?repath=${to.path}`)
        // 用路由query参数保存原本想去的路径，当登录后就能直接跳转
        else next()
    }
})

export default router
