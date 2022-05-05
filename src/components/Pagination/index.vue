<template>
   <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>

    <button v-if="StartEnd.start>=2"  @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="StartEnd.start>=3">···</button>
    <!--用v-for遍历数字  -->
    <button v-for="(page,index) in StartEnd.end" :key="index" v-show="page>=StartEnd.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="StartEnd.end<totalPage-1">···</button>
    <button v-if="StartEnd.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>

    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>

</template>

<script>
//分页器重点在于搞清楚，连续的页数和现实的页数能否实现；实现后最开始的页数和结束的页数是什么，中间可通过加一减一是实现，注意首尾特殊
export default {
    name:'APagination',
    props:['pageNo','pageSize','total','continues'],
    //页面当前页码，页面展示条数，总的条数，页码连续数量
    computed:{
        //计算总共多少页
        totalPage(){
            //ceil天花板向上取整，floor向下
            return Math.ceil(this.total/this.pageSize)
        },
        //计算连续页码的结束和开始的数字
        StartEnd(){
            //解构一下，省去写this
            const {pageNo,totalPage,continues}=this;
            //起始和结束页
            let start,end;
            //解决不正常现象：数据不够五页
            if(continues>totalPage){
                start=1;
                end=totalPage;
            }else{
                //减去位数不能写死，continues不同时，可以变
                start=pageNo-parseInt(continues/2)
                end=pageNo+parseInt(continues/2)
               
                //当当前页是1是，会出现不正常现象
                if(start<1){
                    start=1
                    end=continues
                }
                if(end>totalPage){
                    end=totalPage
                    start=end-continues+1
                }

            }
            return {start,end}
        }
    }
}
</script>

<style lang="less" scope>
.pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }

</style>