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
        <div class="description"></div>
        <div class="support"></div>
      </div>
    </div>
    <div id="signScroll">
      <span class="icon"></span>
      <span class="text"></span>
    </div>
  </div>
</template>

<script>
const ERR_OK = 0
export default {
  data () {
    return {
      seller:{}
    }
  },
  create(){
    this.$http.get('/seller').then((res)=>{
      console.log(res.body.data)
      this.seller = res
    })
  }
}
</script>

<style>
  #header{
    height: 134px;
    width: 100%;
    color:#fff;
    background-image: url("../assets/images/avatar.png");
    background-repeat: no-repeat;
    background-size:100% 134px;
    position: relative;
  }
  /* 公告栏 */
  #signScroll{
    width: 100%;
    height: 28px;
    line-height: 28px;
    background-color: rgba(7,17,27,0.2);
    color:rgb(255,255,255);
    font-size: 13px;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
