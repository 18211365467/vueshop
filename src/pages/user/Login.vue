<template>
    <div class="login">
        <div class="mui-content">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input type="text" v-model="loginForm.username" class="mui-input-clear mui-input" placeholder="请输入账号"/>
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input type="password" v-model="loginForm.password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
            </form>
            <div class="mui-content-padded">
                <button @click="login" type="button" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
                <div class="link-area">
                    <a @click="register">还没有账号？前往注册</a>
                </div>    
            </div>
        </div>
    </div>
</template>
<script>
//import {request} from 'network/request.js'
import Axios from 'axios'
export default {
    name: 'Login',
    data(){
        return{
            loginForm:{
                username:'',
                password:''
            },
            userToken:''
        }
    },
    /* created(){
        this.getUser()
    }, */
     methods:{
        /*  getUser(){
             getUser().then(res=>{
                 
             },err=>{this.$toast("登录失败")})
         }, */
       login(){
           if(this.loginForm.username===''||this.loginForm.password===''){
               this.$toast("请输入账号或密码")
           }else{
               Axios.post('http://tpadmin.test/api/login',this.loginForm).then(res=>{
                   if(res.data.code===0){
                       this.$toast(res.data.msg)
                   }else{
                       //登录成功
                       this.$toast(res.data.msg)
                       this.$store.commit('user/setUser',res.data.data)
                       this.$auth.setAuthorization(res.data.data.session_id)
                       this.$router.replace({ name: 'user' })
                   }
               })
               //console.log(getUser())
              /*   getUser(this.loginForm).then(res=>{
                   console.log(res)
                   if(res.data.code===0){
                       this.$toast(res.data.msg)
                   }else{
                       this.$toast(res.data.msg)
                   } 
               },err=>{
                   this.$toast("登录失败")
               })  */
           }
       },
       register(){
           this.$router.push({ name: 'register' })
       }
     }  
}
</script>
<style scoped>
    .mui-input-group{
        margin-top: 10px;
        background-color: transparent;
    }
    .mui-input-group label{
        width: 20%;
    }
    .mui-input-row:last-child{
        background: #fff;
    }
    .mui-input-row{
        margin-top:20px;
        background: #fff;
    }
    .mui-input-row label ~ input,
    .mui-input-row label ~ select,
    .mui-input-row label ~ textarea {
        width: 78%;
    }
    .link-area{
        display: block;
        margin-top:25px ;
        text-align: center;
    }
    mui-content-padded{
        margin-top: 30px;
    }
</style>