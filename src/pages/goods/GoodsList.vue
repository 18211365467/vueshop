<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodslist" :key="item.id">
            <router-link :to="{name:'goods_info',params:{id:item.id}}">
                <img :src="item.image" alt="">
                <h1 class="title">{{item.name}}</h1>
                <p class="info">
                    <span class="price">￥{{item.price}}</span>
                    <span class="sell">剩余{{item.num}}件</span>
                </p>
            </router-link>
        </div>
        <mt-button class="more" v-if="goodslist.length!==0" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    props:['category_id'],
    data(){
        return{
            goodslist:[],
            last_id:0
        }
    },
    methods:{
        getGoodsList(){
            this.$indicator.open({text:'加载中...'})
            const params={category_id:this.category_id,last_id:this.last_id}
            //发送请求获取分类id对应的商品列表
            Axios.get("http://tpadmin.test/api/goodslist",{params:params}).then(res=>{
                this.$indicator.close()
                if(res.data.code===1){
                    if(res.data.data.length>0){
                        //concat方法作用是将参数拼接到数组里面
                        this.goodslist=this.goodslist.concat(res.data.data)
                        //当请求成功之后，last_id的值就应该不是0了，改成最后一个商品的id
                        this.last_id=res.data.data[res.data.data.length-1].id
                    }else if(this.goodslist.length>0){
                            this.$toast("已经到达底部")
                    }
                    else{
                        this.$toast("商品列表为空")
                    }
                }
            })
        },
        getMore(){
            this.getGoodsList()
        }
    },
    created(){
        this.getGoodsList()
    }
}
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  .goods-item {
    width: calc(calc(100% / 2) - 10px);
    margin: 10px 10px 0 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      color: #333;
      margin: 10px 0;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      .price {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .sell {
        font-size: 13px;
      }
    }
  }
  .more {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
