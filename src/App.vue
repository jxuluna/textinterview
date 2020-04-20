<template>
  <div id="app">
    <SideBar class="side-bar"></SideBar>
    <div class='container'>
      <topBar class="top-bar"></topBar>
      <!-- <Home class="home"></Home> -->
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script>
// import Home from "./pages/Home.vue";
import SideBar from "./components/sideBar.vue";
import TopBar from "./components/topBar.vue";

export default {
  name: "App",
  components: {
    // Home,
    SideBar,
    TopBar
  }
};
</script>

<style lang="scss">
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
#app {
  display: flex;
  height: 100%;

  .side-bar {
    width: 200px;
    background-color: #111122;
    height: 100%;
  }
  .container{
    flex: 1;
    .top-bar{
      height: 80px;
      background-color: #111122;
    }
    .content{
      margin: 20px 40px;
    }
  }
}
</style>
