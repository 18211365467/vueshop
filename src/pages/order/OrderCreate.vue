<template>
    <div class="shopcart-container">
    <!-- 收货地址区域 -->
    <div class="address-container">
      <div class="mui-card">
        <router-link :to="{name: 'address_select'}" replace>
          <h3>{{ address.name }} {{ address.tel }}</h3>
          <p>{{ address.area }} {{ address.detail }}</p>
        </router-link>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card">
        <div class="mui-card-content" v-for="(item) in goodslist" :key="item.id">
          <div class="mui-card-content-inner flex">
            <img :src="item.image" />
            <div class="info">
              <h1>{{ item.name }}</h1>
              <p class="flex">
                <span class="price">¥{{ item.price }}</span>
                <span>x{{ item.count }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 配送信息 -->
        <div class="process-info">
          <p>
            <strong>配送服务</strong>
            <strong>快递运输</strong>
          </p>
          <p>
            <span>中小件送货时间</span>
            <span>工作日、双休日与节假日均可送货</span>
          </p>
        </div>
        <!-- 订单备注 -->
        <div class="store-info">
          <strong>订单备注</strong>
          <textarea v-model="note" type="text" placeholder="选填，给商家留言"></textarea>
        </div>
      </div>
    </div>
    <!-- 运费信息 -->
    <ul class="fare-info mui-card">
      <li class="fare-price flex">
        <span>商品金额</span>
        <span class="red">¥{{ amount.toFixed(2) }}</span>
      </li>
      <li class="fare-price flex">
        <span>运费</span>
        <span class="red">¥0.00</span>
      </li>
      <li class="fare-price flex">
        <span>
          <strong>总价</strong>
        </span>
        <span class="red">¥{{ amount.toFixed(2) }}</span>
      </li>
      <!-- 创建订单按钮 -->
      <div class="flex">
        <button class="mui-btn mui-btn-primary mui-btn-block" @click="order">创建订单</button>
      </div>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
    data(){
        return{
            goodslist:[],
            amount:0,
            note:'',
            address: {},
            addressId:0
        }
    },
    computed:{
        ...mapState('shopcart',['buy']),
        ...mapGetters('shopcart',['getBuy'])
    },
    created(){
        if(this.$route.params.id){
          //获取选择收货地址返回数据id的参数
          this.addressId=this.$route.params.id
        }
        this.getGoodsList()
        this.getAddress()

    },
    methods:{
      order(){
        //发送订单创建
        this.$http.post("order/create",{address:this.addressId,note:this.note,goods:this.buy})
        .then(res=>{
          if(res.data.code===0){
            this.$toast(res.data.msg)
          }else if(res.data.code===1){
            //提示创建订单成功，跳转到订单页面
            this.$toast(res.data.msg)
            this.$router.replace({name:'order_list'})
          }else if(res.data.code===2){
            this.$router.push("/user/login")
          }

        })
      },
      getAddress(){
        //选择收货地址
        this.$http.get("address/def",{params:{id:this.addressId}}).then(res=>{
          if(res.data.code===0){
            this.$toast(res.data.msg)
          }else if(res.data.code===1){
            if(res.data.data){
              this.address=res.data.data
              this.addressId=this.address.id
            }else{
              this.$toast("请先添加收货地址")
              this.$router.push('/user/address')
            }
          }else if(res.data.code===2){
            this.$router.push("/user/login")
          }
        })
      },
      getGoodsList(){
            const idArr=[]
            this.buy.forEach(item =>idArr.push(item.id))

            this.$http.get('shopcart',{params:{ids:idArr}}).then(res=>{
                this.goodslist=res.data.data
                let amount=0
                this.goodslist.forEach(item=>{
                    //通过getBuy将得到商品id对应的购买数量
                    item.count=this.getBuy[item.id].count
                    amount+=item.count*item.price
                })
                //将总价格保存到data的amount中
                this.amount=amount
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
.shopcart-container {
  background: #eee;
  overflow: hidden;
  .address-container{
    .mui-card{
      margin: 0;
      padding: 10px;
      text-align: left;
      h3{
        color: #333;
        font-size: 16px;
        font-weight: blod;
      }
    }
  }
  // 商品列表
  .goods-list {
    margin-top: 10px;
    .mui-card {
      margin: 0;
      .mui-card-content {
        border-bottom: 1px solid #eee;
        .mui-card-content-inner {
          align-items: center;
          padding: 10px;
          img {
            width:60px;
          }
          .info {
            margin-left: 10px;
            box-sizing: border-box;
            width: 100%;
            overflow: hidden;
            h1 {
              font-size: 13px;
              font-weight: bold;
              line-height: 20px;
              padding-top: 22px;
              text-align: left;
            }
            p {
              flex-direction: row;
              align-items: center;
              text-align: left;
              justify-content: space-between;
              .price {
                font-size: 16px;
                font-weight: 700;
                color: red;
                flex: 1;
              }
            }
          }
        }
      }
      // 配送信息
      .process-info {
        padding: 10px;
        border-bottom: 1px solid #eee;
        p {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          color: #333;
          span {
            color: #999;
          }
        }
      }
      // 店铺备注
      .store-info {
        padding: 10px;
        textarea {
          font-size: 13px;
        }
      }
    }
  }
  // 运费信息
  .fare-info {
    padding: 10px;
    margin: 10px 0 0 0;
    .fare-price {
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      .red {
        color: red;
        font-size: 16px;
      }
    }
  }
  // 收货地址
  .address-container {
    .mui-card {
      margin: 0;
      padding: 10px;
      h3 {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>
