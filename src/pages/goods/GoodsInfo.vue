<template>
    <div class="goods-info">
        <!--轮播图-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper imgList='goodsinfo.album'></swiper>
                </div>
            </div>
        </div>
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball">

            </div>
        </transition>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.name}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        定价：
                        <span>￥{{goodsinfo.price}}</span>
                    </p>
                    <div v-if="goodsinfo.num">
                        <!--加减数量的组件-->
                        <p class="go-num">
                            购买数量
                             <num-box @count="countChanged" :max='goodsinfo.num' initCount="1" :goodsid="goodsinfo.id"></num-box>

                        </p>
                        <p class="go-buy">
                            <mt-button type="primary" size="small" @click="buy">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
                        </p>
                    </div>
                    <div v-else>该商品暂时无货</div>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <!--商品参数-->
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品卖点：{{goodsinfo.sell_point}}</p>
                    <p>库存情况：{{goodsinfo.num}}件</p>
                    <p>上架时间：{{goodsinfo.create_time}}</p>
                </div>
            </div>
            <!--商品详情-->
             <div class="mui-card-header">商品详情</div>
            <div class="mui-card-content good-desc">
                <div class="content" v-html="goodsinfo.content"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import Swiper from 'components/Swiper'
import NumBox from 'components/NumBox'
export default {
    name:"GoodsInfo",
    props:['id'],
    components:{
        Swiper,
        NumBox
    },
    data(){
        return{
            goodsinfo:{},
            selectedCount:1,
            ballFlag:false
        }
    },
    created(){
        this.getGoodsInfo()
    },
    methods:{
        getGoodsInfo(){
            Axios.get("http://tpadmin.test/api/goodsinfo",{params:{id:this.id}}).then(res=>{
                if(res.data.code===0){
                    this.$toast(res.data.msg)
                }else if(res.data.code===1){
                    this.goodsinfo=res.data.data
                }else{
                    this.$toast("商品不存在")
                }
            })
        },
        countChanged(val){
            this.selectedCount =val.count
        },
        addCar(){
            this.ballFlag=!this.ballFlag
            this.$store.commit('shopcart/addShopcart',{
                id:parseInt(this.id),
                count:this.selectedCount,
                selected:true
            })
            this.$toast("加入购物车成功")
        },
        //动画前
        beforeEnter(el){
            //参数el就是红色的小球
            el.style.transform='translate(0,0)'
        },
        //进入动画
        enter(el,done){
            //参数done是一个函数，当调用done函数的时候表示动画就结束了
            const ballPosition=this.$refs.ball.getBoundingClientRect()
            const badgePosition=document.getElementById('badge').getBoundingClientRect()
            const distanceX=badgePosition.left-ballPosition.left
            const distanceY=badgePosition.top-ballPosition.top

            el.style.transform='translate('+distanceX+'px,'+distanceY+'px)'
            el.style.transition='all .5s cubic-bezier(.4,-0.3,1,.68)'
            done()
        },
        //动画结束
        afterEnter(el){
            this.ballFlag=!this.ballFlag
        },
        buy(){
            //将当前的商品和购买的数量添加到vuex的数组中
            this.$store.commit("shopcart/setBuy",{id:this.$props.id,count:this.selectedCount,selected:true})
            this.$router.push({name:'order_create'})
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-info {
  background: #f1f1ff;
  overflow: hidden;
  .price {
    span {
      color: red;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .go-buy {
    display: flex;
    margin: 10px 0 0px;
    justify-content: center;
    button {
      margin: 0 5px;
    }
  }
  .good-desc {
    background: #fff;
    padding: 5px;
    h3 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
    .content {
      font-size: 14px;
      line-height: 28px;
      img {
        width: 100%;
      }
    }
  }
  .go-num {
    div {
      margin-left: 10px;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    background: red;
    z-index: 99;
    left: 132px;
    top: 390px;
    transform: translate(93px, 230px);
  }
}
</style>
