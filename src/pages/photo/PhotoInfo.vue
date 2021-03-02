<template>
    <div class="photoinfo-container">
        <!--顶部内容布局-->
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time}}</span>
            <span>点击{{photoinfo.click}}次</span>
        </p>
        <!--图片缩略图列表-->
        <div class="thumbs">
            <!--使用vue-preview组件来展示缩略图-->
            <!--通过slides属性绑定vue-preview组件需要展示的图片咧-->
            <vue-preview :slides="list" @click="getPhotoList"></vue-preview>
        </div>
        <!--图片详情-->
        <div class="content" v-html="photoinfo.content"></div>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            photoinfo:{},
            list:[]
        }
    },
    created(){
        this.getPhotoInfo()
        this.getPhotoList()
    },
    methods:{
        //获取图片的咨询详情
        getPhotoInfo(){
            this.$http.get('photo/getimageInfo',{params:{id:this.id}}).then(res=>{
                if(res.data.status===0){
                   

                    this.photoinfo=res.data.message[0]
                }else{
                    this.$toast("查询失败")
                }
            })
        },
        getPhotoList(){
            this.$http.get("photo/getthumimages",{params:{id:this.id}}).then(res=>{
                if(res.data.status===0){
                     //需要开启图片的懒加载，就需要设置图片的宽高等数据
                     res.data.message.forEach(item=>{
                         item.w=600,
                         item.h=400
                         item.msrc=item.src
                     })
                    this.list=res.data.message
                }else{
                    this.$toast("查询失败")
                }
            })
        }
    }
}
</script>
<style lang="scss">
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    .my-gallery {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
    }
    figure {
      margin: 0.2em;
    }
    img {
      width: 5.6em;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
