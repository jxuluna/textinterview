<template>
<div>

<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#111122"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1">GIS地图信息</el-menu-item>
  <el-menu-item index="2"><router-link to='/home'>资产管理</router-link></el-menu-item>
  <el-menu-item index="3">能耗分析</el-menu-item>
  <el-menu-item index="4"><router-link to='/alarm'>事件告警</router-link></el-menu-item>
  <el-menu-item index="5">系统用户</el-menu-item>
  <el-menu-item index="6">项目管理</el-menu-item>
  <el-menu-item index="7">工单管理</el-menu-item>

</el-menu>
</div>
</template>

<script>


export default {
  name: 'App',


}
</script>

<style lang="scss">
.el-menu-demo{
  height: 80px;
  li{
    height: 80px !important;
    line-height: 80px !important;
  }
  .el-menu{
    border-right: none !important;
  }
}

</style>
