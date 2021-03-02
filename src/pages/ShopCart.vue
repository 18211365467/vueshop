<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--商品列表-->
            <div class="mui-card">
                <div class="mui-car-content"  v-for="item in goodslist" :key="item.id">
                    <div class="mui-card-content-inner flex">
                        <!--复选框-->
                        <div class="mui-input-row mui-checkbox mui-left">
                            <label>&nbsp;</label>
                            <input type="checkbox" v-model="getGoodsSelected[item.id]" @change="selectChanged(item.id,getGoodsSelected[item.id])"
                            :disabled="item.num===0"
                            />
                        </div>
                        <!--商品图片-->
                        <img :src="item.image" >
                        <!--商品详情-->
                        <div class="info">
                            <h1>{{item.name}}</h1>
                            <p class="flex">
                                <span class="price">￥{{item.price}}</span>
                                <num-box v-if="item.num" :max="item.num" :initCount="getGoodsCount[item.id]" :goodsid="item.id"
                                @count="countChanged" size='min'></num-box>
                                <span v-else style="margin-right:20px;">该商品暂时无货</span>
                                <a href="#" @click.prevent="remove(item.id)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--结算板块-->
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner balance">
                        <div class="left">
                            <p>总计不含运费</p>
                            <p>
                                已勾选商品<span class="red">{{getSelectedCount}}</span>件，
                                总价<span class="red">￥{{getSelectedAmount |showPrice}}</span>
                            </p>
                        </div>
                        <mt-button type="primary" @click="createOrder">去结算</mt-button>
                    </div>
                </div>
            </div>
            <!--清空按钮-->
            <div class="mui-card">
                <mt-button @click="empty" type="primary" class="mui-btn mui-btn-danger-mui-btn-block">清空购物车</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import Axios from 'axios'
import NumBox from 'components/NumBox'
import { MessageBox } from 'mint-ui';
export default {
    components:{
        NumBox
    },
    filters:{
        showPrice(price){
            return price.toFixed(2)
        }
    },
    data(){
        return{
            goodslist:[]
        }
    },
    computed:{
        ...mapState('shopcart',['car']),
        ...mapGetters('shopcart',['getGoodsCount','getGoodsSelected','getSelectedCount','getSelectedGoods']),
        getSelectedAmount(){
            const selectedGoods=this.getSelectedGoods
            let amount=0 
            this.goodslist.forEach(item=>{
                //判断选中的商品才会去执行if中的代码进行求取总价
                if(selectedGoods[item.id]){
                    amount+=item.price*selectedGoods[item.id].count
                }
            }) 
            return amount      
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            //获取Vuex中购物车的数据
            const idArr=[]
            this.car.forEach(item => idArr.push(item.id))
            if(idArr.length<=0){return }
            
            Axios.get("http://tpadmin.test/api/shopcart",{params:{ids:idArr}}).then(res=>{
                this.goodslist=res.data.data
                this.goodslist.forEach(item =>{
                    if(item.num===0){
                        //将购物车中的商品之前的选中状态修改为false
                        this.selectChanged(item.id,false)
                    }
                })
            })
        },
        countChanged(goodsinfo){
            //console.log(goodsinfo)
            this.$store.commit('shopcart/updateGoodsInfo',goodsinfo)
        },
        selectChanged( id,selected){
            this.$store.commit('shopcart/updateGoodsSelected',{
                id:id,
                selected:selected
            })
        },
        remove(id){
            //删除goodslist的商品数据
            this.goodslist.some((item,index)=>{
                if(parseInt(item.id)===parseInt(id)){
                    this.goodslist.splice(index,1)
                    return true
                }
            })
            //根据id参数做删除购物车的操作
            this.$store.commit("shopcart/removeShopcart",id)
        },
        createOrder(){
            if(this.getSelectedCount<=0){
                this.$toast("您没有选择需要购买的商品")
                return
            }
            this.$store.commit('shopcart/setBuy')
            this.$router.push({ name: 'order_create' })
        },
        empty(){
            MessageBox.confirm('你确定清空购物车').then(action => {
                this.goodslist.some(item=>{item.count=0
                    this.goodslist=[]
                })
                this.$store.commit("shopcart/clearGoodscart")
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.shopcar-container {
  background: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      align-items: center;
      padding: 10px;
      .mui-checkbox.mui-left input[type="checkbox"] {
        left: 0px;
      }
      .mui-radio.mui-left label,
      .mui-checkbox.mui-left label {
        padding-left: 20px;
        padding-right: 35px;
        padding-bottom: 22px;
      }
    }
    img {
      width: 60px;
    }
    .info {
      margin-left: 10px;
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      h1 {
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        padding-top: 10px;
        text-align: left;
      }
      p {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .price {
          text-align: left;
          font-size: 14px;
          font-weight: 700;
          color: red;
          flex: 1;
        }
        a {
          line-height: 20px;
        }
      }
    }
  }
  .balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>