<template>
    <div class="newsinfo-container">
        <h1 class="title">{{newsInfoList.title}}</h1>
            <p class="newsinfo-nav">
                <span>发表时间：{{newsInfoList.add_time}}</span>
                <span>点击{{newsInfoList.click}}</span>                
            </p>
            <div class="content" v-html="newsInfoList.content"></div>
    </div>
</template>
<script>
export default {
    props:['id'],
    data(){
        return{
            newsInfoList:[]
      }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            //根据新闻id获取到新闻的详情信息
            this.$http.get("news/show",{params:{id:this.id}}).then(res=>{
                if(res.data.status===0){
                    this.newsInfoList=res.data.message[0]
                }else{
                    this.$toast("加载失败")
                }
            })
        }
    }
}
</script>
<style scoped lang="scss">
.newsinfo-container{
    padding: 0 5px;
    text-align: left;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 10px 0;
        color:orangered;
    }
    .newsinfo-nav{
        display: flex;
        justify-content: space-between;
        color: #26a2ff;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>