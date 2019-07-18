<!--  -->
<template>
  <div id='shopcart'>
    <div class="content">
      <div class="content-left">
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
        <div class="pay payActive" v-else>
          <!-- ￥{{totalPrice + seller.deliveryPrice}}元 -->
          去结算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../static/iconfont.css"
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
      seller:{}
    };
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
  }
}
</script>
<style>
 #shopcart{
   position:fixed;
   left: 0;
   bottom: 0;
   z-index: 50;
   width: 100%;
   height: 48px;
   background-color: gray;
 }
 #shopcart .content{
   display: flex;
   background: #141d27;
   font-size: 0;
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
</style>
