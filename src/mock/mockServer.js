import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
//json数据格式没有对外暴露，但是可以引入使用？
//webpack默认对外暴露的：图片，json数据格式

//mock数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor', { code: 200, data: floor })
