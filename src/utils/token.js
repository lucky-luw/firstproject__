//对外暴露一个函数
export default setToken=(token)=>{
    localStorage.setItem('TOKEN',token)

}
//把本地存储的token放到这个文件夹中，暴露函数给调用