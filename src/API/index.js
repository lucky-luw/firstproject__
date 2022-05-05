//当前模块对api接口进行统一管理
import requests from './request'
export const reqCategoryList=()=>{//当调用这个函数时，发请求，返回一个promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

//获取轮播图接口
import mockRequerst from './mockAjax'
export const reqListContainer=()=>{
    return mockRequerst({url:'/banner',method:'get'})
}
export const reqFloorList=()=>{
    return mockRequerst({url:'/floor',method:'get'})
}


// search接口
export const reqGetSearchInfo=(params)=>{
    //参数应该有默认值，至少是一个空对象
    return requests.post('/list',{
        params,
    })
}

//detail接口
export const reqGoodsInfo = (skuId)=>{
    return requests({ url: `/item/${skuId}`,method:'get'})
}

//加入购物车接口
export const  reqAddOrUpdataShopCart=(skuId,skuNum)=>{
    //发请求时携带参数
    return requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
}
//获取购物车数据的接口
export const reqCarList=()=>{
    return requests({url:'/cart/cartList',method:'get'})
} 
//删除购物车商品的接口
export const reqDeleteCartById = skuId => requests({ url: `/cart/deleteCart/${skuId} `, method:'DELETE'})

//修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
export const reqGetCode = phone => requests({ url:`/user/passport/sendCode/${phone}`,method:'get'})
//提交注册信息
export const reqRegisterInfo = (data) => requests({url:'/user/passport/register',method:'post',data})
//登录
export const reqLogin = data => requests({ url:'/user/passport/login',method:'post',data})
//登录后获取用户信息
export const reqUserInfo = () => requests({ url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout=()=>{
    return requests({ url:'/user/passport/logout',method:'get'})
}
//获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取交易商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({ url: `/order/auth/submitOrder/?tradeNo=${tradeNo}`, method: 'post',data})
//获取订单信息
export const reqPayInfo = (orderId) => requests({ url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//返回订单支付状态
export const reqPayStatus = orderId => requests({ url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

export const reqMyOrderList = (page, limit) => requests({ url:`/order/auth/${page}/${limit}`,method:'get'})