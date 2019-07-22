<template>
  <div id="app">
    <nav-header></nav-header>
    <nav-tab></nav-tab>
    <router-view/>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader';
import NavTab from '@/components/NavTab';
export default {
  name: 'App',
  components:{
    NavHeader,
    NavTab
  }
}
</script>

<style>

</style>
