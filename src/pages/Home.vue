<template>
    <div>
        <swiper :imgList='imgList'></swiper>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-clo-sm-3">
                <router-link :to="{name: 'news_list'}" class="title">
                    <img src="~assets/img/menu1.png" >
                    <div class="mui-media-body">新闻咨询</div>
                </router-link>    
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-clo-sm-3">
                <router-link :to="{name: 'photo_list'}" class="title">
                    <img src="~assets/img/menu2.png" >
                    <div class="mui-media-body">图片分享</div>
                </router-link>    
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-clo-sm-3">
                <router-link :to="{name: 'category'}" class="title">
                    <img src="~assets/img/menu3.png" >
                    <div class="mui-media-body">商品购买</div>
                </router-link>    
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-clo-sm-3">
                    <img src="~assets/img/menu4.png" >
                    <div class="mui-media-body">留言反馈</div>  
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-clo-sm-3">
                    <img src="~assets/img/menu5.png" >
                    <div class="mui-media-body">视频专区</div>  
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-clo-sm-3">
                    <img src="~assets/img/menu6.png" >
                    <div class="mui-media-body">联系我们</div>  
            </li>  
        </ul>
    </div>
</template>
<script>
import Swiper from 'components/Swiper'
import {getHome} from 'network/request/home.js'
export default {
    name: 'Home',
    components:{
        Swiper
    },
    data(){
        return{
            imgList:[]
        }
    },
    created(){
        this.getHome()
    },
    methods:{
        getHome(){
            getHome().then(res=>{
                this.imgList=res.data
            })
        }
    }
}
</script>
<style scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}
img{
    width: 60px;
    height: 60px;
}
.mui-table-view-cell >a.title{
    display: inline;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: 0;
}
</style>