<template>
    <div class="address-container">
        <div>
            <div class="mui-card" v-for="item in addressList" :key="item.id">
                <ul class="selected">
                    <li @click="select(item.id)">
                        <strong>{{item.name}}</strong>&nbsp;
                        <strong>{{item.tell}}</strong>
                    </li>
                    <li @click="select(item.id)">{{item.area}} {{item.detail}}</li>
                    <li>
                        <router-link :to="{name:'address_edit',params:{id:item.id}}" class="edit">编辑</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mod_btns fixed">
            <router-link :to="{ name: 'address_add' }" class="mod_btn">
                新增收获地址
            </router-link>
        </div>
    </div>
</template>
<script>
//import Axios from 'axios'
export default {
    data(){
        return{
            addressList:[]
        }
    },
    created(){
        this.getAddressList()
    },
    methods:{
        getAddressList(){
            //发送请求得到的收货地址数据
       this.$http.get('address').then(res=>{
            this.addressList=res.data.data
        })
        },
        select(id){
            //如果是从订单页面跳转过来，那么我么的路由就是
            if(this.$route.name!=='address_select'){
                return
            }
            this.$router.push({name:'order_create',params:{id:id}})
        }
    }
}
</script>
<style lang="scss" scoped>
.address-container {
  background: #eee;
  overflow: hidden;
  .mod_btn {
    font-size: 16px;
    line-height: 46px;
    height: 46px;
    text-align: center;
    background: #3884ff;
    flex: 1;
    display: block;
    color: #fff;
  }
  .mod_btns .fixed {
    display: flex;
    overflow: hidden;
  }
  .mui-card {
    padding: 7px 40px;
    position: relative;
    overflow: hidden;
    padding: 15px;
    color: #666;
    .selected {
      margin: 0;
      padding: 0;
      list-style: none;
      padding-right: 50px;
      li{
          font-size: 16px;
          text-align: left;
      }
      .title {
        font-size: 16px;
      }
      .edit {
        color: #e93b3d;
        width: 50px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
