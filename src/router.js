import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('pages/Home')
const Category = () =>import('pages/Category')
const ShopCart = () =>import('pages/ShopCart')
const User = () =>import('pages/User')
const Login = () => import('pages/user/Login')
const register= () =>import('pages/user/Register')
const GoodsList=()=>import('pages/goods/GoodsList')
const GoodsInfo=()=>import('pages/goods/GoodsInfo')
const Address =() =>import('pages/user/Address')
const AddressEdit=()=>import('pages/user/AddressEdit')
const OrderCreate=()=>import('pages/order/OrderCreate')
const OrderList=()=>import('pages/order/OrderList')
const OrderShow=()=>import('pages/order/OrderShow')
const NewsList =()=>import('pages/news/NewsList')
const NewsInfo = ()=>import('pages/news/NewsInfo')
const PhotoList =()=>import('pages/photo/PhotoList')
const PhotoInfo =()=>import('pages/photo/PhotoInfo')
Vue.use(Router)
const routes=[
  {
    path: '',
    redirect: '/home',
    meta: {title:'首页'}
  },
  {
    path:'/home',
    name:'home',
    component: Home,
    meta:{title:'首页'}
  },
  {
    path:'/category',
    name: 'category',
    component: Category,
    meta:{title:'分类'}
  },
  {
    path:'/shopcart',
    name:'shopcart',
    component:ShopCart,
    meta:{title:'购物车'}
  },
  {
    path:'/user',
    name:'user',
    component: User,
    meta:{title:'我的'}
  },
  {
    path:'/user/login',
    name:'login',
    component:Login,
    meta:{title:'登录'}
  },
  {
    path:'/user/register',
    name:'register',
    component: register,
    meta:{title:"注册"}
  },
  {
    path:'/goodslist/:category_id',
    component: GoodsList,
    props:true,
    meta:{title:"商品列表"}
  },
  {
    path:'/goodsinfo/:id',
    component: GoodsInfo,
    name:'goods_info',
    props:true,
    meta:{title:"商品详情"}
  },
  {
    path:'/user/address',
    name:'address',
    component:Address,
    meta:{title:'收货地址'}
  },
  {
    path:'/user/address/add',
    name:'address_add',
    component:AddressEdit,
    meta:{title:'新增收获地址'}
  },
  {
    path:'/user/address/edit/:id',
    name:'address_edit',
    props:true,
    component:AddressEdit,
    meta:{title:'编辑收获地址'}
  },
  {
    path:'/order/create',
    name:'order_create',
    component:OrderCreate,
    meta:{title:'下订单'}
  },
  {
    path:'/user/address/select',
    name:'address_select',
    component:Address,
    meta:{title:'选择收获地址'}
  },
  {
    path:'/order/list',
    name:'order_list',
    component:OrderList,
    meta:{title:'我的订单'}
  },
  {
    path:'/order/show/:id',
    name:'order_show',
    component:OrderShow,
    props:true,
    meta:{title:'查看订单'}
  },
  {
    path:'/news/list',
    name:'news_list',
    component: NewsList,
    meta:{title:'新闻资讯列表'}
  },
  {
    path:'/news/show/:id',
    name:'news_show',
    component: NewsInfo,
    props:true,
    meta:{title:'新闻详情'}
  },
  {
    path:'/photo/list',
    name:'photo_list',
    component: PhotoList,
    meta:{title:'图片分享列表'}
  },
  {
    path:'/photo/show/:id',
    name:'photo_show',
    component:PhotoInfo,
    props:true,
    meta:{title:'查看图片'}
  }
]

const router =new Router({
  routes,
  mode:'history',
  linkActiveClass:'mui-active'
})
router.beforeEach((to,from,next) =>{
  if(to.meta.title){
    document.title=to.meta.title
  }
  next()
})

export default router
