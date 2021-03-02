<template>
    <div class="login">
        <div class="mui-content">
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>账号</label>
                    <input type="text" v-model="regForm.username" class="mui-input-clear mui-input" placeholder="请输入账号"/>
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input type="password" v-model="regForm.password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
                 <div class="mui-input-row">
                    <label>确认</label>
                    <input type="text" v-model="regForm.rePassword" class="mui-input-clear mui-input" placeholder="请输入密码"/>
                </div>
                <div class="mui-input-row">
                    <label>邮箱</label>
                    <input type="email" v-model="regForm.email" class="mui-input-clear mui-input" placeholder="请输入邮箱">
                </div>
            </form>
            <div class="mui-content-padded">
                <button @click="register" type="button" class="mui-btn mui-btn-block mui-btn-primary">注册</button>    
            </div>
             <div class="link-area">
                    <a @click="register"></a>
                </div> 
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
export default {
    name:'Register',
    data(){
        return{
            regForm:{
                username:'',
                password:'',
                rePassword:'',
                email:''
            }
        }
    },
    methods:{
        register(){
            if(this.regForm.username===''){
                this.$toast("账号不能为空")
                return
            }
            if(this.regForm.password===''){
                this.$toast("密码不能为空")
                return
            }
            if(this.regForm.rePassword===''){
                this.$toast("密码不能为空")
                return
            }
            if(this.regForm.email===''){
                this.$toast("邮箱不能为空")
                return
            }
            if(this.regForm.password!==this.regForm.rePassword){
                this.$toast("密码不一致")
                return
            }
            Axios.post('http://tpadmin.test/api/register',this.regForm).then(res=>{
                if(res.data.code===0){
                    this.$toast(res.data.msg)
                }else{
                    this.$store.commit('user/setUser',res.data.data)
                    this.$auth.setAuthorization(res.data.data.session_id)
                    this.$toast(res.data.msg)
                    this.$router.push('/user')
                }
            },err=>{
                this.$toast("注册失败")
            })
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