import { reqGoodsInfo, reqAddOrUpdataShopCart } from '@/API/index'
import { getUUID } from '@/utils/uuid_token'


const state = {
    goodInfo: {},
    uuid_token: getUUID()//生成唯一身份，再请求拦截器中带上
}
const mutations = {
    GETGOODSINFO(state,data){
        state.goodInfo=data//该数据返回的是一个对象
    },
  

}
const actions = {
    //获取指定产品的详细信息
    getGoodsInfo({commit},goodId){
        reqGoodsInfo(goodId).then((res)=>{
            commit('GETGOODSINFO',res.data)
        })
    },
   
    reqAddOrUpdataShopCart(_,{skuId, skuNum}){
        reqAddOrUpdataShopCart(skuId,skuNum)
    } 
       

   
}
const getters = {
    //简化数据
    categoryView(state){
        //!impotant goodInfo初始状态为空对象时，goodInfo.categoryVie为undefined，undefined读取里面的数据时会报错。当数据还没请求回来时
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}