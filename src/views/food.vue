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
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span class="iconfont" :class="[{'icondamuzhi_shangGood':rating.rateType===0},{'icondamuzhi_xiaBad':rating.rateType===1}]"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from "@/components/cartcontrol"
import split from "@/components/split"
import ratingselect from "@/components/ratingselect"
import '../../static/iconfont.css'
import Vue from "vue"
import {formatDate} from '@/assets/js/date.js'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props:{
    food:{
      type:Object
    }
  },
  data() {
    return {
      showFlag:false,
      selectType:POSITIVE,
      onlyContent:true,
      desc:{
        all:"全部",
        positive:"推荐",
        negative:"吐槽"
      }
    };
  },
  components:{
    cartcontrol,
    split,
    ratingselect
  },
  methods:{
    show(){
      this.showFlag=true
      this.selectType=POSITIVE
      this.onlyContent=true
    },
    hide(){
      this.showFlag=false
    },
    addFirst(event){
      Vue.set(this.food,"count",1)
    },
    incrementTotal(type,data){
      this[type]=data
    },
    needShow(type,text){
      if(this.onlyContent && !text){
        return false
      }
      if(this.selectType===ALL){
        return true
      }else{
        return type==this.selectType
      }
    }
  },
  filters:{
    formatDate(item){
      let date = new Date(item)
      return formatDate(date,'YYYY-MM-DD hh:mm')
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
  #food .food-content .rating .title{
    padding-top: 18px;
    margin-left: 18px;
  }
  #food .food-content .rating .rating-wrapper{
    padding: 0 18px;
  }
  #food .food-content .rating .rating-wrapper .rating-item{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  #food .food-content .rating .rating-wrapper .rating-item .user{
    position:absolute;
    right: 0;
    top: 16px;
    line-height: 12px;
    font-size: 0;
  }
  #food .food-content .rating .rating-wrapper .rating-item .user .name{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    font-size:10px;
    color:rgb(147,153,159);
  }
  #food .food-content .rating .rating-wrapper .rating-item .user .avatar{
    border-radius: 50%;
  }
  #food .food-content .rating .rating-wrapper .rating-item .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  #food .food-content .rating .rating-wrapper .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color:rgb(7,17,27);
  }
  #food .food-content .rating .rating-wrapper .rating-item .text .iconfont{
    margin-right: 4px;
    line-height: 16px;
    font-size: 12px;
  }
  #food .food-content .rating .rating-wrapper .rating-item .text .icondamuzhi_shangGood{
    color:rgb(0,160,220)
  }
  #food .food-content .rating .rating-wrapper .rating-item .text .icondamuzhi_xiaBad{
    color:rgb(147,153,159)
  }
  #food .food-content .rating .rating-wrapper .no-rating{
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147,153,159);
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
