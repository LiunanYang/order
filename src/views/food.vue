<!--  -->
<template>
  <transition>
    <div id="food" v-show="showFlag">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <span class="iconfont icontubiao_xiangzuo"></span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="sell-rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" v-show="food.count"></cartcontrol>
          </div>
          <div class="buy" v-show="!food.count||food.count===0" @click.stop.prevent="addFirst">加入购物车</div>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from "@/components/cartcontrol"
import split from "@/components/split"
import '../../static/iconfont.css'
import Vue from "vue"
export default {
  props:{
    food:{
      type:Object
    }
  },
  data() {
    return {
      showFlag:false
    };
  },
  components:{
    cartcontrol,
    split
  },
  methods:{
    show(){
      this.showFlag=true
    },
    hide(){
      this.showFlag=false
    },
    addFirst(event){
      Vue.set(this.food,"count",1)
    }
  }
}
</script>
<style>
  #food{
    position:fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 0;
    width: 100%;
    background: #fff;
    overflow: scroll;
  }
  #food .food-content .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  #food .food-content .image-header img{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
  }
  #food .food-content .image-header .back{
    position: absolute;
    left: 0;
    top: 10px;
  }
  #food .food-content .image-header .back .iconfont{
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }
  #food .food-content .content{
    padding: 18px;
    position: relative;
  }
  #food .food-content .content .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color:rgb(7,17,27);
  }
  #food .food-content .content .detail{
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0;
    height: 10px;
  }
  #food .food-content .content .detail .sell-count{
    font-size: 10px;
    color:rgb(147,153,159);
    margin-right: 12px;
  }
  #food .food-content .content .detail .sell-rating{
    font-size: 10px;
    color:rgb(147,153,159);
  }
  #food .food-content .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  #food .food-content .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color:rgb(240,20,20);
  }
  #food .food-content .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  #food .food-content .content .cartcontrol-wrapper{
    position: absolute;
    bottom:12px;
    right:12px;
  }
  #food .food-content .content .buy{
    position:absolute;
    bottom: 18px;
    right: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding:0 12px;
    box-sizing: border-box;
    font-size:10px;
    color:#fff;
    background: rgb(0,160,220);
    border-radius: 12px;
  }
  #food .food-content .info{
    padding: 18px;
  }
  #food .food-content .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  #food .food-content .info .text{
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77,85,93);
  }






  .v-enter,.v-leave-to{
    opacity:0;
    transform: translateX(150px);
  }
  .v-enter-active,.v-leave-active{
    transition: all 1s ease;
    /* transform:translateX(10px); */
  }
</style>
