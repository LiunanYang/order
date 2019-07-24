<!--  -->
<template>
  <div class='tab'>
    <div class="tab_item" >
      <router-link to="/" class="a" :class="{'a-active':flag==1}" >
        <span @click="toggle(1)">商品</span>
      </router-link>
    </div>
    <div class="tab_item">
      <router-link to="/ratings" class="a" :class="{'a-active':flag==2}">
        <span @click="toggle(2)">评论</span>
      </router-link>
    </div>
    <div class="tab_item">
      <router-link to="/sellers" class="a" :class="{'a-active':flag==3}">
        <span @click="toggle(3)">商家</span>        
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      flag:1
    };
  },
  methods:{
    toggle(num){
      this.flag=num
    }
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
  }
  .a-active{
    color:rgb(240,20,20);
  }
</style>

