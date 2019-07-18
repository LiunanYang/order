<!--  -->
<template>
  <div id='cartcontrol'>
    <div class="cart-decrease iconfont iconjianhao1"></div>
    <div class="cart-count"></div>
    <div class="cart-add iconfont iconjiahao"></div>
  </div>
</template>

<script>
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
  }
}
</script>
<style>
  #cartcontrol{
    font-size: 0;
  }
  #cartcontrol .cart-decrease, .cart-add{
    display: inline-block;
    padding:6px;
    line-height: 24px;
    color:rgb(0,160,220);
    font-size: 24px;
  }
  #cartcontrol .cart-count{
    display: inline-block;
  }
</style>
