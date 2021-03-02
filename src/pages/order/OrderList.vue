<template>
    <div class="pay-list">
    <div class="mui-card" v-for="order in orderlist" :key="order.id">
      <div class="mui-card-header">
        <span class="title">{{ order.create_time }}</span>
        <span>
          <span v-if="order.is_pay">已支付</span>
          <span v-else>未支付</span> |
          <span v-if="order.is_cancel">已取消</span>
          <span v-else @click="cancel(order.id)">取消订单</span>
        </span>
      </div>
      <div @click="show(order.id)" class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="cover" v-for="item in order.user_order_goods" :key="item.id">
            <div class="img-con">
              <img :src="item.goods_goods.image" />
            </div>
            <div class="img-tag">x{{ item.count }}</div>
          </div>
        </div>
      </div>
      <p>
        实付金额：
        <span>¥{{ order.price }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            orderlist:[]
        }
    },
    created(){
        this.getOrderList()
    },
    methods:{
        cancel(id){
            //发送请求取消订单操作
            this.$http.post('order/cancel',{id:id}).then(res=>{
                 if(res.data.code===0){
                    this.$toast(res.data.msg)
                }else if(res.data.code===1){
                    //取消订单成功，刷新页面，得到最新的订单
                    this.getOrderList()
                }else if(res.data.code===2){
                    this.$router.push("/user/login")
                }
            })
        },
        show(id){
            //导航到订单页面详情页面
            this.$router.push({name:'order_show',params:{id:id}})

        },
        getOrderList(){
            this.$http.get("order/list").then(res=>{
                if(res.data.code===0){
                    this.$toast(res.data.msg)
                }else if(res.data.code===1){
                    //this.$toast(res.data.msg)
                    //判断有没有订单列表消息
                    if(res.data.data.length>0){
                        this.orderlist=res.data.data

                    }else{
                        this.$toast("你没买过东西")
                    }
                }else if(res.data.code===2){
                    this.$router.push("/user/login")
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.pay-list p {
  padding: 0 10px;
  text-align: right;
  span {
    color: #151515;
  }
}
.mui-card-header {
  color: #999;
  font-size: 13px;
  span.title {
    font-size: 13px;
    color: #888;
  }
}
.mui-card-content-inner {
  .cover {
    position: relative;
    width: 70px;
    height: 70px;
    display: inline-block;
    margin-right: 10px;
    .img-con {
      width: 100%;
      height: 100%;
      margin-right: 10px;
      border-radius: 2px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
    .img-tag {
      position: absolute;
      opacity: 0.5;
      background: #000;
      color: #fff;
      text-align: center;
      font-size: 12px;
      right: 0;
      bottom: 0;
      padding: 0 5px;
      border-radius: 2px 0;
    }
  }
}
</style>
