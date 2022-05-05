import { reqCategoryList,reqListContainer,reqFloorList, } from '@/API/index'

const actions={
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器的数据
    categoryList({commit}){
        //返回promise对象
        reqCategoryList().then(res=>{
            commit('CATEGORYLIST',res.data)
        })
    },
    getListContainer({commit}){
        reqListContainer().then((res)=>{
            commit('GETLISTCONTAINER',res)
        })
    },
    getFloorList({commit}){
        reqFloorList().then((res)=>{
            commit('GETFLOORLIST',res.data)
        })
    },
}

const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categoryList=categoryList
    },
    GETLISTCONTAINER(state,ListContainer){
        state.ListContainer=ListContainer.data
    },
    GETFLOORLIST(state,FloorList){
        state.FloorList=FloorList
    },
}
const state = {
    categoryList:[],//默认初始值，根据接口的返回值进行初始化
    ListContainer:[],
    FloorList:[],
   
}

const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}