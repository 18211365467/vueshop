<template>
    <form  class="mui-input-group">
        <div class="mui-input-row">
            <label class="title">用户名</label>
            <input type="text" v-model="from.name" class="mui-input-clear" placeholder="请输入收货人">
        </div>
        <div class="mui-input-row">
            <label class="title">联系方式</label>
            <input type="text"  v-model="from.tel" class="mui-input-clear" placeholder="请输入收货人电话号码">
        </div>
        <div class="mui-input-row">
            <label class="title">所在地区</label>
            <input type="text" v-model="from.area" class="mui-input-clear" placeholder="请输入收货地区" @click="choose"/>
            <div class="divwrap">
                <div class="mask" v-show="show" @click="choose"></div>
                <v-distpicker v-show="show" type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"
                    :province="addressInfo.province" :city="addressInfo.city" :area="addressInfo.area"
                ></v-distpicker>
            </div>
        </div>
        <div class="mui-input-row">
            <label class="title">详细地址</label>
            <input type="text" v-model="from.detail" class="mui-input-clear" placeholder="请输入详细地址">
        </div>
        <div class="mui-button-row">
            <button @click="save" type="button" class="mui-btn mui-btn-primary mui-btn-block">确认</button>
            <button v-show="id" @click="del" type="button" class="mui-btn mui-btn-danger mui-btn-block">删除</button>
        </div>
    </form>
</template>

<script>
import VDistpicker from 'v-distpicker'
//import Axios from 'axios'
export default {
    props:['id'],
    components:{
        "v-distpicker":VDistpicker
    },
    data(){
        return{
            from:{
                name:'',
                tel:'',
                area:'',
                detail:''
            },
            show:false,
            addressInfo:{
                privince:'',
                city:'',
                area:''
            }
        }
    },
    created(){
        this.getAddress()
    },
    methods:{
        getAddress(){
            if(!this.id){
                return
            }
            //发送请求根据ID获取收货地址信息
            this.$http.get('address/edit',{params:{id:this.id}}).then(res=>{
                if(res.data.code===0){
                    this.$toast(res.data.msg)
                }else if(res.data.code===1){
                    this.from=res.data.data
                }else if(res.data.code===2){
                    this.$router.push('/user/login')
                }
            })
        },
        //删除收货地址
        del(){
           this.$http.post('address/del',{id:this.id}).then(res=>{
                if(res.data.code===0){
                    this.$toast(res.data.msg)
                }else if(res.data.code===1){
                    //删除成功，退回到收获地址列表页面
                    this.$toast(res.data.msg)
                    this.$router.go(-1)
                }else if(res.data.code===2){
                    this.$router.push('/user/login')
                }
            })
        },
        //编辑
        save(){
            //检查收货人姓名，电话号码等内容是否有内容
            //制作新增收货地址功能
            this.from.id=this.id
            const reg=(!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[6,7]))\d{8}$/.test(this.from.tel)))
            if(this.from.tel===''){ this.$toast("联系方式不能为空")}
            else if (reg){
                this.$toast('手机号码格式不正确')
            }
            else{
                this.$http.post('address/save',this.from).then(res=>{
               if(res.data.code===0){
                    //新增失败
                    this.$toast(res.data.msg)
                }else if(res.data.code===1){
                    //新增成功，退回到收获地址列表页面
                    this.$toast(res.data.msg)
                    this.$router.go(-1)
                }else if(res.data.code===2){
                    //没有登录，导航至登录页面
                    this.$router.push('/user/login')
                } 
            })

        }
            }
            ,
        choose(){
            this.show=!this.show
        },
        onChangeProvince(data){
            this.addressInfo.privince=data.value
        },
        onChangeCity(data){
            this.addressInfo.city=data.value
        },
        onChangeArea(data){
            this.addressInfo.area=data.value
            this.from.area=this.addressInfo.privince+'-'+this.addressInfo.city+"-"+this.addressInfo.area
            this.show=false
        },
    }
    
}
</script>
<style lang="scss" scoped>
.mui-input-group .mui-button-row {
  height: auto;
}
.mui-input-clear {
  font-size: 14px;
}
.mui-input-group:before {
  list-style: none;
}
.mui-button-row {
  margin-top: 20px;
  button {
    margin: 20px 0;
    padding: 10px 0;
  }
}
.title {
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
}
.divwrap > .mask {
  background: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.divwrap > .distpicker-address-wrapper {
  color: #999;
  background: #fff;
  border-top: 1px solid #ccc;
  z-index: 1;
  height: 300px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
