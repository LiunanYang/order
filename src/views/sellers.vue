<!--  -->
<template>
  <div class='seller'>
    <div class="sell-content">
      <div class="overview">
        <h1 class="name">{{seller.name}}</h1>
        <div class="desc">
          <star class="star" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="strong">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="strong">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="strong">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="iconfont icontubiao_shoucang" :class="{'icon-active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="support"  v-if="seller.supports">
        <ul>
          <li class="support-item" v-for="item in seller.supports">
            <div class="icon" :class="supportClassMap[item.type]"></div>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
          <ul class="pic-list">
            <li class="pic-item" v-for="item in seller.pics">
              <img width="120" height="90" :src="item" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from "@/components/star"
import split from "@/components/split"
import "@/assets/css/common.css"
import "../../static/iconfont.css"
export default {
  data() {
    return {
      seller:[],
      supportClassMap:["decrease","discount","special","invoice","guarantee"],
      favorite:false
    };
  },
  mounted(){
    this.$http.get('/seller').then((res)=>{
      this.seller = res.body.seller
    })
  },
  components:{
    star,
    split
  },
  computed:{
    favoriteText(){
      return this.favorite?"已收藏":"收藏"
    }
  },
  methods:{
    toggleFavorite(){
      this.favorite = !this.favorite
    }
  }
}
</script>
<style>
  .seller{
    position:absolute;
    top: 174px;
    left: 0;
    width: 100%;
    overflow: scroll;
  }
  .seller .sell-content .overview{
    position: relative;
    padding: 18px;
  }
  .seller .sell-content .overview .name{
    margin-bottom: 8px;
    line-height: 14px;
    color:rgb(7,17,27);
    font-size: 14px;
  }
  .seller .sell-content .overview .desc{
    padding-bottom: 18px;
    border-bottom:1px solid rgb(7,17,27,0.1);
    font-size: 0;
  }
  .seller .sell-content .overview .desc .star{
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
  }
  .seller .sell-content .overview .desc .text{
    display: inline-block;
    vertical-align: top;
    margin-right: 12px;
    line-height: 18px;
    font-size: 10px;
    color:rgb(77,85,93);
  }
  .seller .sell-content .overview .remark{
    display: flex;
    padding-top: 18px;
  }
  .seller .sell-content .overview .remark .block{
    flex:1;
    text-align: center;
    border-right:1px solid rgba(7,17,27,0.1);
  }
  .seller .sell-content .overview .remark .block:last-child{
    border-right:0;
  }
  .seller .sell-content .overview .remark .block h2{
    margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  .seller .sell-content .overview .remark .block .content{
    line-height: 24px;
    font-size: 10px;
    color:rgb(7,17,27);
  }
  .seller .sell-content .overview .remark .block .content .strong{
    font-size: 24px;
  }
  .seller .sell-content .overview .favorite{
    position: absolute;
    right: 18px;
    top:18px;
    text-align: center;
    width: 50px;
  }
  .seller .sell-content .overview .favorite .iconfont{
    display: block;
    margin-bottom: 8px;
    line-height: 24px;
    font-size: 24px;
    color:#d4d6d9;
  }
  .seller .sell-content .overview .favorite .icon-active{
    color:rgb(240,20,20);
  }
  .seller .sell-content .overview .favorite .text{
    display: block;
    line-height: 10px;
    font-size: 10px;
    color:rgb(77,85,93);
  }
  .seller .sell-content .bulletin{
    padding: 18px 18px 0 18px;
  }
  .seller .sell-content .bulletin .title{
    margin-bottom: 8px;
    line-height: 14px;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  .seller .sell-content .bulletin .content-wrapper{
    padding: 0 12px 16px 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .sell-content .bulletin .content-wrapper .content{
    line-height: 24px;
    font-size: 12px;
    font-weight: 200;
    color:rgb(240,20,20);
  }
  .seller .sell-content .support {
    padding: 0 12px;
  }
  .seller .sell-content .support .support-item{
    padding: 16px 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 0;
  }
  .seller .sell-content .support .support-item:last-child{
    border-bottom: 0;
  }
  .seller .sell-content .support .support-item .icon{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat
  }
  .seller .sell-content .support .support-item .text{
    line-height: 16px;
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .seller .sell-content .pics {
    padding: 18px;
  }
  .seller .sell-content .pics .title{
    margin-bottom: 12px;
    line-height: 14px;
    color: rgb(7,17,27);
    font-size: 14px;
  }
  .seller .sell-content .pics .pic-wrapper{
    width: 100%;
    overflow: scroll;
    white-space: nowrap;
  }
  .seller .sell-content .pics .pic-wrapper .pic-list{
    font-size: 0;
  }
  .seller .sell-content .pics .pic-wrapper .pic-list .pic-item{
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 60px;
  }
  .seller .sell-content .info {
    padding: 18px 18px 0 18px;
    color:rgb(7,17,27);
  }
  .seller .sell-content .info .title{
    padding-bottom: 12px;
    line-height: 14px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    font-size: 14px;
  }
  .seller .sell-content .info .info-item{
    padding: 16px 12px;
    line-height: 16px;
    font-size: 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .sell-content .info .info-item:last-child{
    border-bottom: 0;
  }
</style>
