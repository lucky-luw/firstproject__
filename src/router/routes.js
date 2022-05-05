


//路由的引入用到了路由懒加载











export default [
    {
        path: '/detail/:skuId',
        component: ()=>import('@/pages/Detail'),
        meta: {
            footerIsShow: true,
        }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: {
            footerIsShow: true,
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        //？params参数可传或不传
        //如何指定params参数可传可不传？如果路由要求传递params，但没有传递，url会有问题
        //在配置路由的时候，在占位后面加上? 实现需求？

        //路由组件能不能实现传递props数据？（少用,一般直接$route.params.--）
        // props:true,//Boolean写法，可以把params参数作为路由组件身上的属性，在相应组件身上props接收
        // props($route){
        //     return {keyWord:$route.params.keyWord,k:$route.query.k}
        // },//常用函数写法：两种参数都可以传递给该路由组件
        component: () => import('@/pages/Search'),
        meta: {
            footerIsShow: true,
        }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        name:'login',
        meta: {
            footerIsShow: false,
        }
    },
    {

        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {
            footerIsShow: false,
        }
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta:{
            footerIsShow:true
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {
            footerIsShow: true
        }
    },
    //重定向:在项目跑起来的时候，访问该端口/，就能定向到首页
    {
        path: '*',
        redirect: '/home'
    },
    {
        path:'/trade',
        name:'trade',
        component: () => import('@/pages/ATrade'),
        meta:{
            footerIsShows:true
        },
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            if(from.path=='/shopcart') next()
            else next(false) //如果url改变了，重置from的url
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/pages/Pay') ,
        meta: {
            footerIsShows: true
        },
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade') next()
            else next(false)
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: {
            footerIsShows: true
        }
    },
    {
        path: '/center',
        name: 'center',
        component: () => import('@/pages/Center'),
        meta: {
            footerIsShows: true
        },
        children:[
            {
                path: 'myOrder',
                component: () => import('@/pages/Center/myOrder'),
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/groupOrder'),
            },//二级路由不能有/
            {
                path:'/center',
                component: () => import('@/pages/Center/myOrder')
            }//路由重定向，一开始没有指定路由，就显示的路由
        ]
    },
]