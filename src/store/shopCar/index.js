import { reqCarList, reqDeleteCartById ,reqUpdateCheckedById } from "@/API"

const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    //获得加入购物车产品数据
    async getCartList({commit}){
       let result= await reqCarList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    //删除某个产品
    deleteCartListBySkuId(_,skuId){
        reqDeleteCartById(skuId).then(()=>{
       
        },()=>{
            Promise.reject(new Error('faile'))
        })
    },
    //更新产品的选中状态
    async updateCheckedById(_,{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId, isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部选中的产品
    deleteAllChecked(context){
        //调用actions中的方法，用context
        let PromiseAll=[]
        context.getters.cartList.cartInfoList.filter((item)=>item.isChecked==1).forEach((item)=>{
            let result=context.dispatch('deleteCartListBySkuId',item.skuId)  //每次返回promise
            PromiseAll.push(result);
        })
        //Promise.all只要数组中promise元素都成功，返回结果即为成功，如果有一个失败，返回失败
        return Promise.all(PromiseAll)
    },
    updateAllCheckedById({dispatch,getters},isChecked){
        getters.cartList.cartInfoList.forEach(item=>{
            if(item.isChecked!=isChecked) dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
        })
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
  
}

export default{
    state,mutations,actions,getters
}