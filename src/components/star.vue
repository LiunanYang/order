<!--  -->
<template>
  <div class='star'>
    <span class="star-item" v-for="item in itemsClass" :class="item"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';
  export default {
    name: "star",
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemsClass() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer=Math.floor(score);
        for (let i=0; i<integer;i++){
          result.push(STAR_ON);
        }
        if (hasDecimal){
          result.push(STAR_HALF)
      }
      
        while (result.length<LENGTH){
          result.push(STAR_OFF)
        }
        return result;
      }
    }
  }
</script>
<style>
  .star {
    font-size: 0;
  }
  .star .star-item {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: 16px 16px;
    display: inline-block;
    background-repeat: no-repeat;
  }
  .on {
    background-image: url("../assets/images/star48_on@2x.png");
  }
  .half {
    background-image: url("../assets/images/star48_half@2x.png");
  }
  .off {
    background-image: url("../assets/images/star48_off@2x.png");
  }
</style>
