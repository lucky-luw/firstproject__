//这个文件的目的返回一个随机数，而且本地存储中的随机数固定，不会因为多次访问而改变id

import {v4 as uuidv4} from 'uuid'
//一下函数生成一个随机的字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID=()=>{
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    //重点：判断当前本地存储中是否有身份，如果没有则生成，如果有则返回原来的
    if (!uuid_token){
        uuid_token=uuidv4() //生成临时身份并存储
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
} 