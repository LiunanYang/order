<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description }}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <div class="icon" :class="supportClassMap[seller.supports[0].type]"></div>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="iconfont icontubiao_xiangyou"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="iconfont icontubiao_xiangyou"></span>
    </div>
    <div class='background'>
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <div class="detail" v-show="detailShow" @click="hiddenDetail">
      <h1 class="name">{{seller.name}}</h1>
      <star class="star" :score="seller.score"></star>
      <div class="support">
        <h1 class="title">优惠信息</h1>
        <ul class="support-wrapper">
          <li class="support-item" v-for="item in seller.supports">
            <div class="icon" :class="supportClassMap[item.type]"></div>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="bulletin">
        <h1 class="title">商家公告</h1>
          <p class="text">{{seller.bulletin}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import '../../static/iconfont.css'
import '../assets/css/common.css'
import star from "@/components/star"
const ERR_OK = 0
export default {
  data () {
    return {
      seller:{},
      supportClassMap:["decrease","discount","special","invoice","guarantee"],
      detailShow:false
    }
  },
  mounted(){
    this.$http.get('/seller').then((res)=>{
      this.seller=res.body.seller
    })
  },
  methods:{
    showDetail(){
      this.detailShow = true
    },
    hiddenDetail(){
      this.detailShow=false
    }
  },
  components:{
    star
  }
}
</script>

<style>
  #header{
    color:#fff;
    background-color: rgba(7,17,27,0.5);
    position: relative;
    overflow: hidden;
  }
  #header .content-wrapper{
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  #header .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  #header .content-wrapper .avatar img{
    border-radius:2px;
  }
  #header .content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
  }
  #header .content-wrapper .content .title{
    margin: 2px 0 8px 0;
  }
  #header .content-wrapper .content .title .brand{
    width: 30px;
    height: 18px;
    display: inline-block;
    vertical-align: top;
    background-image: url('../assets/images/brand@2x.png');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  #header .content-wrapper .content .title .name{
    margin-left:8px;
    font-size: 16px;
    font-weight: bold;
  }
  #header .content-wrapper .content .description{
    margin-bottom: 10px;
    line-height:12px;
    font-size: 12px;
  }
  #header .content-wrapper .content .support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  #header .content-wrapper .content .support .text{
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
  }
  #header .content-wrapper .support-count{
    position:absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    border-radius: 14px;
    background-color: rgba(0,0,0,0.2);
    text-align: center;
  }
  #header .content-wrapper .support-count .count{
    font-size: 10px;
  }
  #header .content-wrapper .support-count .iconfont{
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
  }
  #header .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background-color: rgba(7,17,27,0.2);
  }
  #header .bulletin-wrapper .bulletin-title{
    display: inline-block;
    vertical-align: top;
    margin-top:8px;
    width: 22px;
    height: 12px;
    background-image: url('../assets/images/bulletin@2x.png');
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  #header .bulletin-wrapper .bulletin-text{
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
  }
  #header .bulletin-wrapper .iconfont{
    position: absolute;
    font-size: 10px;
    right: 12px;
  }
  #header .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  #header .detail{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7,17,27,0.8)
  }
  #header .detail .name{
    margin-top: 64px;
    font-size: 16px;
    font-weight: 700;
    color:rgb(255,255,255);
    line-height: 16px;
    text-align: center;
  }
  #header .detail .star{
    text-align: center;
    margin:16px 0 28px 0;
  }
  #header .detail .support .title{
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color:rgb(255,255,255);
    line-height: 14px;
  }
  #header .detail .support .support-wrapper{
    padding: 24px 36px 28px 36px;
  }
  #header .detail .support .support-wrapper .support-item {
    margin-bottom: 12px;
    line-height: 24px;
  }
  #header .detail .support .support-wrapper .support-item .icon{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat
  }
  #header .detail .support .support-wrapper .support-item .text{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    font-weight: 200;
    color:rgb(255,255,255);
    line-height: 24px;
  }
  #header .detail .bulletin .title{
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color:rgb(255,255,255);
    line-height: 14px;
  }
  #header .detail .bulletin .text{
    margin: 24px 12px 0 12px;
    font-size: 12px;
    font-weight: 200;
    color:rgb(255,255,255);
    line-height: 24px;
  }




</style>
