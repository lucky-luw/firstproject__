import { reqGetSearchInfo } from '@/API/index'

const state={
    SearchList:{}//仓库中返回的数据是对象，初始化为对象
}
const mutations={
    REQGETSEARCHINFO(state,SearchList){
        state.SearchList=SearchList
    }
}
const actions={
    getSearchList({commit},params={}){
        //params={},默认参数
        reqGetSearchInfo(params).then((res)=>{
            commit('REQGETSEARCHINFO',res.data)
        },(err)=>{
            console.log(err.message);
        })
    }
}
const getters={//简化仓库中的数据，比如对象中分离出某个数组,相当于计算属性
    //参数中state是当前仓库中的
    goodsList(state){
        // return state.SearchList.goodsList  可能返回undefined
        return state.SearchList.goodsList || []
    },
    trademarkList(state){
        return state.SearchList.trademarkList || []
    },
    attrsList(state){
        return state.SearchList.attrsList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}