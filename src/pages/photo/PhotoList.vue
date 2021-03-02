<template>
    <div class="photo-con">
    <!-- 顶部的横向滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicatorcode mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', cateId == item.id ? 'mui-active': '']" v-for="item in cates" :key="item.id"
            @tap="getPhotoListByCateId(item.id)">
            {{item.title}}
          </a>
          <!-- 在这里使用tap（只有mui组件才可以使用） -->
        </div>
      </div>
    </div>
    <!-- 中间图片列表内容 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="{ name: 'photo_show', params: { id: item.id }}" tag="li">
        <img v-lazy="item.img_url"> <!-- 使用图片懒加载 -->
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from'../../lib/mui/js/mui'
export default {
    data(){
        return{
            cates:[],//保存所有列表
            list:[],//保存图片的列表
            cateId:0//保存图片id
        }
    },
    mounted(){
      mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
    },
    created(){
       this.getAllCategory()
       this.getPhotoListByCateId(0)//传入的id作为参数0，表示查询全部的列表
    },
    methods:{
        getAllCategory(){
            this.$http.get("photo/getimgcategory").then(res=>{
                if(res.data.status===0){
                    this.cates=res.data.message
                    this.cates.unshift({ title: '全部', id: 0 });
                }else{
                    this.$toast("加载失败")
                }
            })
        },
        getPhotoListByCateId(cateId){
            this.cateId=cateId
            this.$http.get("photo/getimages",{params:{id:this.cateId}}).then(res=>{
                if(res.data.status===0){
                    this.list=res.data.message
                }else{
                    his.$toast("加载失败")
                }
            })
        }
    }
}
</script>
<style lang="scss">
* {
  touch-action: pan-y; /*去除警告*/
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 5px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>