<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.Id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @click=" updateChecked(cart.skuId,$event)" >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li> 
          <li class="cart-list-con4">
            <span class="price">{{cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)" >+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @click="updataAllCart" >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{productNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{SumPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to='/trade'>结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()//把获取数据的函数独立出来，因为有多次调用
    },
    methods:{
      getData(){
        this.$store.dispatch('getCartList');
      },
       //修改某个产品的个数时发请求,type为修改类型，disNum为变化量，input输入时disNum为最终的量,type区分哪个元素，cart身上有id
       //throttle节流，多次触发变少次，向服务器请求不过于频繁
      handler:throttle(async function(type,disNum,cart){//if-else 也可以使用三目运算符
        switch(type){
          case 'add':
            disNum=1
            break
          case 'minus':
            //判断产品的个数大于1，才可以传递给服务器-1
            if(cart.skuNum>=2) disNum=-1
            else disNum=0
            break
          case 'change':
            //disNum为变化量
            if(isNaN(disNum) || disNum<1) disNum=0
            else disNum=parseInt(disNum)-cart.skuNum
            break
        }
        try{
          //如果发请求修改数量成功的话
          await this.$store.dispatch('reqAddOrUpdataShopCart',{skuId:cart.skuId,skuNum:disNum})
          //重新获取修改后的数据改页面
          this.getData()
        }catch(error){
          console.log(error.message);
        }
      },500),
      //删除加入的商品
      async deleteCartById(skuId){
        try {
          //只有等待删除数据成功时，才执行getData
          await this.$store.dispatch('deleteCartListBySkuId',skuId)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      //修改某个产品的勾选状态
      async updateChecked(skuId,e){
       //如果修改成功后，重新请求数据
       try {
            let isChecked=e.target.checked ? '1':'0'
            await this.$store.dispatch('updateCheckedById',{skuId,isChecked})
            this.getData()
            console.log('getdata')
       } catch (error) {
         alert(error.message)
       }

      },
      //删除选中的商品
      async deleteAllChecked(){
        try {
          await this.$store.dispatch('deleteAllChecked')
          this.getData()
        } catch (error) {
          console.log(error.message)
        }
      },
      //修改全部产品的选中状态
      async updataAllCart(e){
        try {
             let isChecked=e.target.checked ?'1':'0';
             await this.$store.dispatch('updateAllCheckedById',isChecked)
             this.getData()
        }catch (error) {
                alert(error.message)
          }
    },
    },
    computed:{
      ...mapGetters(['cartList']),
      //加入购物车产品的信息
      cartInfoList(){
        return this.cartList.cartInfoList || []
      },
      //计算产品的总价
       SumPrice(){
         return this.cartInfoList.filter(item=>{return item.isChecked==1}).reduce((pre,item)=>pre+item.cartPrice*item.skuNum,0)
         //reduce累加：pre上一次的返回值，item数组中的元素，回调后的参数是初始值
         //filter 中回调的参数有 item 当前的元素【必须】 index[在数组中的位置]  self【数组本身】
         //可以用filter和reduce进行数组去重
      },
      //判断底部复选框是否勾选
      isAllChecked(){
        //every方法遍历数组，一假即假
        if(this.cartInfoList==[]) return false
        else return this.cartInfoList.every(item=>item.isChecked==1)
      },
      //计算选中产品个数
      productNum(){
        return this.cartInfoList.filter((item)=>item.isChecked==1).reduce((pre,item)=>pre+item.skuNum,0)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;
    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>