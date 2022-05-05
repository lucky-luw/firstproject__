//登录与注册模块的仓库
import { reqGetCode, reqRegisterInfo, reqLogin, reqUserInfo, reqLogout } from '@/API'
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),//当在刷新的时候，直接从本地存储捞
    userInfo: {}
}
const actions={
    //得到验证码
    async getCode(context,phone){
        let result=await reqGetCode(phone)
        if(result.code==200){
            context.state.code = result.data;          
            //正常情况下发请求后台会向用户发验证码并返回该码，这里没有，

        }else {
            return  Promise.reject(new Error('faile'))

        }
    },
    //注册
    async SendRegisterInfo(_,{phone,code,password}){
        let result=await reqRegisterInfo({ phone, code, password})
        if(result.code==200){
     
            return 'ok'
        }else {
            return  Promise.reject(new Error(result.message))        
        }
    },
    //用户登录
    async userLogin({commit},data){
       let result= await reqLogin(data)
        if (result.code == 200) {
            commit('USERLOGIN',result.data.token)
            //登录过一次，持久化存储token，
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        } else {
            return  Promise.reject(new Error(result.message))
        }
    },
    //得到用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        console.log(result)
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    //退出登录
    async userLogout({commit}){
        //服务器清空token
        let result=await reqLogout()
        if(result.code==200){
            commit('USERLOGOUT')
            //actions里面不能操作state,要在mutations中
        }else{
            return Promise.reject(new Error(result.message))
        }
    }
}
const mutations={
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state, obj) {
        state.userInfo = obj
    },
    USERLOGOUT(state){
        //清除仓库中的token，别忘了清除本地存储中的
        state.token='';
        state.userInfo={}
        localStorage.removeItem('TOKEN')
    }
}
const getters={}
export default {
    state,actions,mutations,getters
}