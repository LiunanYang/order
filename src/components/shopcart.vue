<!--  -->
<template>
  <div id='shopcart'>
    <div class="content">
      <div class="content-left" @click="openList">
        <div class="logo-wrapper">
          <div class="logo" :class="{'logoActive':totalCount>0}">
            <span class="iconfont icontubiao_gouwuche" :class="{'iconfontActive':totalCount>0}"></span>
          </div>
          <div class="count" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费{{seller.deliveryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay" v-show="totalCount==0">
          ￥{{seller.minPrice}}元起送
        </div>
        <div class="pay" v-if="(totalPrice+seller.deliveryPrice)<seller.minPrice">
          还差 ￥{{seller.minPrice-(totalPrice+seller.deliveryPrice) }}元 起送
        </div>
        <div class="pay payActive" v-else @click="pay">
          <!-- ￥{{totalPrice + seller.deliveryPrice}}元 -->
          去结算
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop">
        <div class="ball" v-for="ball in balls" v-show="ball.show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
    <transition name="list">
      <div class="shopcart-list" v-show="flagF()">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="filter" v-show="flagF()" @click="openList"></div>
  </div>
</template>

<script>
import "../../static/iconfont.css"
import cartcontrol from "@/components/cartcontrol"
export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return [
          {
            price:9,
            count:1
          },{
            price:5,
            count:3
          }
        ]
      }
    }
  },
  data() {
    return {
      seller:{},
      balls:[],
      listFlag:false
    };
  },
  components:{
    cartcontrol
  },
  mounted(){
    this.$http.get('/seller').then((res)=>{
      this.seller = res.body.seller
    })
  },
  computed:{
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total+=food.price * food.count
      })
      return total
    },
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food)=>{
        count+=food.count
      })
      return count
    }
  },
  methods:{
    openList(){
      if(this.totalCount){
        this.listFlag= !this.listFlag
      }
    },
    flagF(){
      if(!this.totalCount){
        return false
      }else{
        return this.listFlag
      }
    },
    empty(){
      this.selectFoods.forEach((food)=>{
        food.count=0
      })
      this.listFlag=false
    },
    pay(){
      alert(`支付${this.totalPrice}`)
    }
  }
}
</script>
<style>

 #shopcart{
   position:fixed;
   left: 0;
   bottom: 0;
   /* z-index: 50; */
   width: 100%;
   height: 48px;
   background-color: gray;
 }
 #shopcart .content{
   display: flex;
   background: #141d27;
   font-size: 0;
   z-index: 50;
 }
 #shopcart .content .content-left{
   flex: 1;
 }
 #shopcart .content .content-left .logo-wrapper{
   display: inline-block;
   vertical-align: top;
   position: relative;
   top: -10px;
   margin: 0 12px;
   padding: 6px;
   width: 56px;
   height: 56px;
   box-sizing: border-box;
   border-radius: 50%;
   background-color: #141d27;
 }
 #shopcart .content .content-left .logo-wrapper .logo{
   width: 100%;
   height: 100%;
   background-color: rgba(255,255,255,0.1);
   border-radius: 50%;
   text-align: center;
 }
 #shopcart .content .content-left .logo-wrapper .logoActive{
   background: rgb(0,160,220);
 }
 #shopcart .content .content-left .logo-wrapper .count{
   position: absolute;
   top: 0;
   right: 0;
   width: 24px;
   height: 16px;
   line-height: 16px;
   text-align: center;
   border-radius: 16px;
   font-size: 9px;
   font-weight: 700;
   color: #fff;
   background: rgb(240,20,20);
   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
 }
 #shopcart .content .content-left .logo-wrapper .logo .iconfont{
   line-height: 44px;
   font-size: 24px;
   color:#80858a;
 }
 #shopcart .content .content-left .logo-wrapper .logo .iconfontActive{
   color: #fff;
 }
 #shopcart .content .content-left .price{
   display: inline-block;
   vertical-align: top;
   margin-top:12px;
   line-height: 24px;
   padding-right: 12px;
   box-sizing: border-box;
   border-right: 1px solid rgba(255,255,255,0.1);
   font-size: 16px;
   font-weight: 700;
   color: rgba(255,255,255,0.4);
 }
 #shopcart .content .content-left .desc{
   display: inline-block;
   vertical-align: top;
   line-height: 24px;
   margin: 12px 0 0 12px;
   color: rgba(255,255,255,0.4);
   font-size: 10px;
   box-sizing: border-box;
 }
 #shopcart .content .content-right{
   flex: 0 0 105px;
   width: 105px;
 }
 #shopcart .content .content-right .pay{
   line-height: 48px;
   height: 48px;
   text-align: center;
   font-size: 12px;
   color: rgba(255,255,255,0.4);
   font-weight: 700;
   background: #2b333b;
 }
 #shopcart .content .content-right .payActive{
   background: #00b43c;
   color: #fff;
 }
 #shopcart .ball-container .ball{
  position: fixed;
  left: 32px;
  bottom: 22px;
  z-index: 200;
  transition: all 0.4s ease;
 }
 #shopcart .ball-container .ball .inner{
   width: 16px;
   height:16px;
   border-radius: 50%;
   background:rgb(0,160,220);
 }
 #shopcart .shopcart-list{
   position: fixed;
   left: 0;
   bottom: 48px;
   z-index:-1;
   width: 100%;
   background:#fff;
   padding-bottom: 24px;
   /* transition: all 0.4s ease; */
 }
 #shopcart .shopcart-list .list-header{
   background:#f3f5f7;
   height: 40px;
   border-bottom: 2px solid rgba(7,17,27,0.1);
 }
 #shopcart .shopcart-list .list-header .title{
   display: inline-block;
   font-size: 14px;
   font-weight: 200;
   color:rgb(7,17,27);
   line-height: 40px;
   margin-left:18px;
 }
 #shopcart .shopcart-list .list-header .empty{
   font-size: 12px;
   color: rgb(0,160,220);
   line-height: 40px;
   margin-right: 18px;
   float: right;
 }
 #shopcart .shopcart-list .list-content{
   padding:0 18px;
   max-height: 217px;
   overflow:scroll;
 }
 #shopcart .shopcart-list .list-content .food{
   position:relative;
   padding: 12px 0;
   height:48px;
   box-sizing: border-box;
   border-bottom: 1px solid rgba(7,17,27,0.1);
 }
 #shopcart .shopcart-list .list-content .food .name{
   font-size: 14px;
   color: rgb(7,17,27);
   line-height: 24px;
 }
 #shopcart .shopcart-list .list-content .food .price{
   position:absolute;
   bottom: 12px;
   right: 84px;
   font-size: 14px;
   font-weight: 700;
   color:rgb(240,20,20);
   line-height: 24px;
 }
 #shopcart .shopcart-list .list-content .food .cartcontrol-wrapper{
   position:absolute;
   bottom: 6px;
   right: 0;
 }
 #shopcart .filter{
  width: 100%;
  height: 100vh;
  background-color: rgba(7,17,27,0.6);
  backdrop-filter: blur(10px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: -2;
 }

 /* transition */
.drop-enter,.drop-leave-to{

}
.drop-enter-active,.drop-leave-active{

}
.list-enter,.list-leave-to{
}
.list-enter-active,.list-leave-active{
}
</style>
