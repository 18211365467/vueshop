<template>
  <div id="app">
      <mt-header fixed :title="$route.meta.title">
        <span slot="left" @click="goBack" v-show="showBack">
        <mt-button icon="back">返回</mt-button>
        </span>
      </mt-header>
      <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import TabBar from 'components/TabBar'
export default {
  name:'App',
  components:{
    TabBar
  },
  data(){
    return{
      showBack:false
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    checkLogin(){
       this.$http.get('/user').then(res=>{
        if(res.data.code===1){
          this.$store.commit('user/setUser',res.data.data)
        }
      })
    }
  },
  created(){
    this.showBack=this.$route.path!=='/home'
    this.checkLogin()
  },
  watch:{
    '$route.path'(newVal){
      this.showBack=this.$route.path!=='/home'
    }
  }
}
</script>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
</style>