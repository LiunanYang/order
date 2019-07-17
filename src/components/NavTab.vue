<!--  -->
<template>
  <div class='tab'>
    <div class="tab_item">
      <router-link to="/" class="a">商品</router-link>
    </div>
    <div class="tab_item">
      <router-link to="/ratings" class="a">评论</router-link>
    </div>
    <div class="tab_item">
      <router-link to="/sellers" class="a">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  }
}
</script>
<style>
  .tab{
    display: flex;
    width: 100%;
    height:40px;
    line-height: 40px;
    background-color: white;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tab_item{
    flex: 1;
    font-size: 14px;
    text-align: center;
  }
  .a{
    text-decoration: none;
    color: rgb(77,85,93);
    /* color:rgb(240,20,20); */
  }
</style>
