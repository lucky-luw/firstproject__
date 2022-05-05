//对于axios进行二次封装:请求拦截器，响应拦截器可以在发请求前处理一些业务
import axios from 'axios'
import nprogress from 'nprogress';//对象，进度条的使用 
import "nprogress/nprogress.css"//引入样式

import store from '@/store'//引入store

// 利用axios对象的方法create，去创建一个axios的实例
const requests=axios.create({//传入配置对象
    baseURL:'/api',//基础路径，发送请求的时候，路径中会出现api
    timeout:3000,//代表请求超时的时间
})
//请求拦截器：在发送请求前，请求拦截器可以拦截到，在发出前

requests.interceptors.request.use((config)=>{
    // config配置对象，对象里有headers属性
    nprogress.start()//进度条开始
    //如果有身份id的话，传到后台
    if (store.state.Detail.uuid_token){
        //请求头添加一个字段，和后台说好
        config.headers.userTempId = store.state.Detail.uuid_token
    }
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()//进度条结束
    return res.data//成功的回调，服务器数据回来之后，拦截器可以检测，做业务
},()=>{
    //失败的回调
    return Promise.reject(new Error('fail'))
})

export default requests