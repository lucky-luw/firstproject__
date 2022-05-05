import { reqAddressInfo, reqOrderInfo } from "@/API"
const state={
    addressInfo:[],
    orderInfo:{}
}
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}){
        let result=await reqAddressInfo()
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
        }
    },
    //获取商品清单的数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('GETORDERINFO',result.data)
        }
    }
}

const mutations = {
    GETUSERADDRESS(state,data){
        state.addressInfo=data 
    },
    GETORDERINFO(state,data){
        state.orderInfo=data
    }
}
const getters = {
    detailArrayList(state){
        return state.orderInfo.detailArrayList
    }
}

export default{
    actions,
    state,
    mutations,
    getters
}
