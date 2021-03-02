function setItem(name,item){
    localStorage.setItem(name,JSON.stringify(item))
}
function getItem(name){
    return JSON.parse(localStorage.getItem(name) || '[]')
}

export default{
    state:{
        //car:[{id:商品id,count:商品数量,}]
        car:getItem('car'),
        //buy数组中存放的是需要购买的商品的数量
        //当我们点击去结算的时候，将buy的数组的商品去做结算操作
        buy:getItem('buy')
    },
    mutations:{
        //添加商品到购物车
        addShopcart(state,goodsinfo){
            //注意：如果购车已有对应goodinfo对应的商品，那么就应该商品数增加
            //否则购物车中没有对应goodsinfo的商品，就应该把goodsinfo天骄到购物车
            //当flag为false的时候表示购物车没有相同的商品，如果flag为true表示有相同商品
            let flag=false
            //判断购物车中是否有goodsinfo对应商品，如果有就增加数量
            state.car.some(item=>{
                if(item.id===goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count)
                    flag=true
                    return true
                }
            })
                if(!flag){
                    //购物没有相同 的商品，将这个goodsinfo直接保存到购物车
                    state.car.push(goodsinfo)
                }
                //调用setItem方法将购物车数据保存到localStorage
                setItem('car',state.car)
        },
        //修改商品数量
        updateGoodsInfo(state,goodsinfo){
            state.car.some(item=>{
                if(parseInt(item.id)===parseInt(goodsinfo.id)){
                    item.count+=parseInt(goodsinfo.count)
                    
                }
            })
            setItem('car',state.car)
        },
        //修改商品选中的状态
        updateGoodsSelected(state,goodsinfo){
            state.car.some(item=>{
                if(parseInt(item.id)===parseInt(goodsinfo.id)){
                    item.selected=goodsinfo.selected
                }
            })
            setItem('car',state.car)
        },
        //根据id的参数删除商品
        removeShopcart(state,id){
            state.car.some((item,index)=>{
                if(parseInt(item.id)===parseInt(id)){
                    state.car.splice(index,1)
                    return true
                }
            })
            setItem("car",state.car)
        },
        setBuy(state,goods){
            state.buy=[]
            if(goods){
                //是将要购买的那一个商品加入到buy数组中
                state.buy.push(goods)
            }else{
                state.car.forEach(item=>{
                    if(item.selected){
                        state.buy.push(item)
                    }
            })
            
            setItem('buy',state.buy)
            }
        },
        clearGoodscart(state){
            state.car.some(item=>{
                item.count=0
                state.car=[]
            })
            setItem('car',state.car)
        }
    },
    actions:{},
    getters:{
        //获取商品数量
        getGoodsCount(state){
            //goods:[701:2,888:1]
            var goods={}
            state.car.forEach(item => {
                goods[item.id]=item.count
            })
            return goods
        },
        //获取商品有没有选中的状态值（selected）
        getGoodsSelected(state){
            //goods:[701:true,888:false]
            var goods={}
            state.car.forEach(item=>{
                goods[item.id]=item.selected
            })
            return goods
        },
        //获取选中商品的件数
        getSelectedCount(state){
            var count=0
            state.car.forEach(item=>{
                if(item.selected){
                    count+=item.count
                }
            })
            return count
        },
        //获取选中的商品
        getSelectedGoods(state){
            var goods={}
            state.car.forEach(item=>{
                if(item.selected){
                    goods[item.id]=item
                }
            })
            return goods
        },
        //获取想要购买的商品
        getBuy(state){
            var goods={}
            state.buy.forEach(item=>{
                goods[item.id]=item
            })
            return goods
        }
    },
    namespaced:true
}
