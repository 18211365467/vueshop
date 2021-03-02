<template>
    <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max" :style="myStyle">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input class="mui-input-numbox" type="number" :value="initCount" ref="num"
        @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>    
</template>
<script>
import mui from '../lib/mui/js/mui.min.js'
export default {
    props:['max','initCount','goodsid','size'],
    data(){
        return{
            myStyle:{}
        }
    },
    mounted(){
        mui('.mui-numbox').numbox()
        if(this.$props.size==='min'){
            this.myStyle={width:'110px',height:'25px',margin:'0 10px 0 10px'}
        }
    },
    methods:{
        countChanged(){
            //将数字输入框中
            const count=parseInt(this.$refs.num.value)
            this.$emit('count',{count:count,id:this.goodsid})
        }
    },
    watch:{
        'max'(newVal){
            mui('.mui-numbox').numbox().setOption('max',newVal)
        }
    }
}
</script>
