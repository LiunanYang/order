<!--  -->
<template>
  <div id='cartcontrol'>
    <transition>
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" >
        <span class="iconfont iconjianhao1"></span>
      </div>
    </transition>
    <transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    </transition>
    <div class="cart-add iconfont iconjiahao" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from "vue"
import "../../static/iconfont.css"
export default {
  props:{
    food:{
      type:Object
    }
  },
  data() {
    return {

    };
  },
  methods:{
    addCart(event){
      // if(!event._constructed){
      //   return;
      // }
      if(!this.food.count){
          Vue.set(this.food,"count",1)
      }else{
        this.food.count++
      }
    },
    decreaseCart(){
      this.food.count--
    }

  }
}
</script>
<style>
  #cartcontrol{
    font-size: 0;
  }
  #cartcontrol .cart-decrease{
    display: inline-block;
    padding:6px;
    transition:all 0.3s linear;
  }
  #cartcontrol .cart-decrease .iconfont{
    font-size: 24px;
    line-height: 24px;
    color:rgb(0,160,220);
    transition:all 0.3s linear;
  }
  #cartcontrol .cart-add{
    display: inline-block;
    padding:6px;
    line-height: 24px;
    color:rgb(0,160,220);
    font-size: 24px;
  }
  #cartcontrol .cart-count{
    display: inline-block;
    vertical-align: top;
    width:12px;
    padding-top:6px;
    line-height:24px;
    text-align: center;
    font-size:10px;
    color:rgb(147,153,159);
    transition:all 0.3s linear;
  }

  /* transition */
  .v-enter,.v-leave-to{
    opacity:1;
    transform: translate3d(0,0,0);
  }
  .v-enter-active,.v-leave-active{
    opacity: 0;
    transform:translate3d(36px,0,0);
  }
</style>
