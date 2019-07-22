<!--  -->
<template>
  <div id=''>
    <div id="goods">
      <div class="menu-wrapper" >
        <ul>
          <li v-for="item in goods" class="menu-item">
            <span class='text' >
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" >
        <ul>
          <li v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <food :food="selectedFood" ref=food></food>
    <shopcart :select-foods="selectFoods"></shopcart>
  </div>
</template>

<script>
import '@/assets/css/common.css'
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart';
import cartcontrol from '@/components/cartcontrol';
import food from '@/views/food';

export default {
  data() {
    return {
      goods:[],
      classMap:["decrease","discount","special","invoice","guarantee"],
      selectedFood:{}
    };
  },
  components:{
    shopcart,
    cartcontrol,
    food
  },
  mounted(){
    this.$http.get("/seller").then((res)=>{
      this.goods = res.body.goods
    })
  },
  computed:{
    selectFoods(){
      let foods = []
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods:{
    selectFood(food,event){
      this.selectedFood = food
      this.$refs.food.show()
    }
  }
}
</script>

<style>
  #goods{
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }
  #goods .menu-wrapper{
    flex:0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
    overflow: scroll;
  }
  #goods .menu-wrapper .menu-item{
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
  }
  #goods .menu-wrapper .menu-item:last-child .text{
    border-bottom: 0;
  }
  #goods .menu-wrapper .menu-item .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  #goods .menu-wrapper .menu-item .text{
    font-size: 12px;
    display: table-cell;
    width: 56px;
    font-weight: 200;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    vertical-align: middle;
  }
  #goods .foods-wrapper{
    flex: 1;
    overflow: scroll;
  }
  #goods .foods-wrapper .title{
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left:2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147,153,159);
    background-color: #f3f5f7;
  }
  #goods .foods-wrapper .food-item{
    display: flex;
    margin: 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding-bottom: 18px;
    /* background: white; */
    position: relative;
  }
  #goods .foods-wrapper .food-item:last-child{
    border-bottom: 0px;
    padding-bottom: 0;
  }
  #goods .foods-wrapper .food-item .icon{
    flex:0 0 57px;
    margin-right: 10px;
  }
  #goods .foods-wrapper .food-item .content{
    flex: 1;
  }
  #goods .foods-wrapper .food-item .content .name{
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7,17,27);
  }
  #goods .foods-wrapper .food-item .desc,.extra{
    line-height: 10px;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  #goods .foods-wrapper .food-item .desc{
    margin-bottom: 8px;
  }
  #goods .foods-wrapper .food-item .extra .count{
    margin-right: 12px;
  }
  #goods .foods-wrapper .food-item .price{
    font-weight: 700;
    line-height: 24px;
  }
  #goods .foods-wrapper .food-item .price .now{
    margin-right: 8px;
    font-size: 14px;
    color:rgb(240,20,20);
  }
  #goods .foods-wrapper .food-item .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color:rgb(147,153,159);
  }
  #goods .foods-wrapper .food-item .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 12px;
  }

</style>


