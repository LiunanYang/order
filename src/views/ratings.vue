<!--  -->
<template>
  <div class='ratings'>
    <div class="ratings-select">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :score="seller.serviceScore" ></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect @increment="incrementTotal" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratingTotal"></ratingselect>
    <div class="ratings-wrapper">
      <ul v-show="ratingTotal && ratingTotal.length">
        <li v-for="item in ratingTotal" class="rating-item"  v-show="needShow(item.rateType,item.text)">
          <div class="avatar">
            <img width="28" height="28" :src="item.avatar" alt="">
          </div>
          <div class="content">
            <h1 class="name">{{item.username}}</h1>
            <div class="star-wrapper">
              <star class="star"></star>
              <span class="delivery" v-show="item.deliveryTime">{{item.deliveryTime}}分钟</span>
            </div>
            <p class="text">{{item.text}}</p>
            <div class="recommend" v-show="item.recommend&&item.recommend.length">
              <span class="iconfont icondamuzhi_shangGood"></span>
              <span v-for="reco in item.recommend" class="reco-item">
                {{reco}}
              </span>
            </div>
            <div class="time">{{item.rateTime | formatDate }}</div>
          </div>
        </li>
      </ul>
      <div class="no-rating" v-show="!ratingTotal || !ratingTotal.length">暂无评价</div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star';
import split from '@/components/split';
import ratingselect from '@/components/ratingselect';
import {formatDate} from "@/assets/js/date"
import "../../static/iconfont.css"
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  data() {
    return {
      seller:[],
      ratings:[],
      selectType:POSITIVE,
      onlyContent:true,
      desc:{
        all:"全部",
        positive:"推荐",
        negative:"吐槽"
      }
    };
  },
  methods:{
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
  components:{
    star,
    split,
    ratingselect
  },
  mounted(){

    this.$http.get('/seller').then((res)=>{
      this.seller = res.body.seller
      this.ratings = res.body.ratings
    })
  },
  computed:{
    ratingTotal(){
      let arr=[]
      this.ratings.forEach((rating)=>{
        arr.push(rating)
      })
      return arr
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
  .ratings{
    position:absolute;
    top: 174px;
    left: 0;
    width: 100%;
  }
  .ratings .ratings-select .overview{
    display: flex;
    padding: 18px 0;
  }
  .ratings .ratings-select .overview .overview-left{
    flex:0 0 137px;
    width: 137px;
    padding: 6px 0;
    border-right: 1px solid rgba(7,17,27,0.2);
    text-align: center;
  }
  .ratings .ratings-select .overview .overview-left .score{
    margin-bottom: 6px;
    line-height: 28px;
    font-size:24px;
    color:rgb(255,153,0);
  }
  .ratings .ratings-select .overview .overview-left .title{
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 12px;
    color:rgba(7,17,27);
  }
  .ratings .ratings-select .overview .overview-left .rank{
    line-height: 10px;
    font-size: 10px;
    color:rgb(167,153,159);
  }
  .ratings .ratings-select .overview .overview-right{
    flex:1;
    padding:6px 0 6px 24px;
  }
  .ratings .ratings-select .overview .overview-right .score-wrapper{
    margin-bottom:8px;
    font-size: 0;
  }
  .ratings .ratings-select .overview .overview-right .score-wrapper .title{
    display: inline-block;
    vertical-align: top;
    line-height: 18px;
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .ratings .ratings-select .overview .overview-right .star{
    display: inline-block;
    vertical-align: top;
    margin:0 12px;
  }
  .ratings .ratings-select .overview .overview-right .score{
    display: inline-block;
    vertical-align: top;
    line-height: 18px;
    font-size: 12px;
    color:rgb(255,153,0);
  }
  .ratings .ratings-select .overview .overview-right .delivery-wrapper {
    font-size: 0;
  }
  .ratings .ratings-select .overview .overview-right .delivery-wrapper .title{
    line-height: 18px;
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .ratings .ratings-select .overview .overview-right .delivery-wrapper .time{
    margin-left: 12px;
    font-size:12px;
    color:rgb(147,153,159);
  }
  @media only screen and (max-width:320px) {
    .ratings .ratings-select .overview .overview-left {
      flex:0 0 100px;
      width: 100px;
    }
    .ratings .ratings-select .overview .overview-right {
      padding-left: 6px;
    }
  }
  .ratings .ratings-wrapper{
    padding: 0 18px;
  }
  .ratings .ratings-wrapper .rating-item{
    display:flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .ratings .ratings-wrapper .rating-item .avatar{
    flex:0 0 28px;
    margin-right:12px;
    width: 28px;
  }
  .ratings .ratings-wrapper .rating-item .avatar img{
    border-radius: 50%;
  }
  .ratings .ratings-wrapper .rating-item .content{
    position: relative;
    flex: 1;
  }
  .ratings .ratings-wrapper .rating-item .content .name{
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color:rgb(7,17,27);
  }
  .ratings .ratings-wrapper .rating-item .content .star-wrapper{
    margin-bottom: 6px;
    font-size: 0;
  }
  .ratings .ratings-wrapper .rating-item .content .star-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }
  .ratings .ratings-wrapper .rating-item .content .star-wrapper .delivery{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    line-height: 12px;
    color:rgb(147,153,159);
  }
  .ratings .ratings-wrapper .rating-item .content .text{
    line-height: 18px;
    margin-bottom: 8px;
    color:rgb(7,17,27);
    font-size: 12px;
  }
  .ratings .ratings-wrapper .rating-item .content .recommend{
    line-height: 16px;
    font-size: 0;
  }
  .ratings .ratings-wrapper .rating-item .content .recommend .iconfont,.reco-item{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 12px;
  }
  .ratings .ratings-wrapper .rating-item .content .recommend .iconfont{
    color:rgb(0,160,220);
  }
  .ratings .ratings-wrapper .rating-item .content .recommend .reco-item{
    padding: 0 6px;
    border: 1px solid rgba(7,17,27,0.1);
    border-radius: 1px;
    color:rgb(147,153,159);
    background: #fff;
  }
  .ratings .ratings-wrapper .rating-item .content .time{
    position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color:rgb(147,153,159)
  }
</style>
