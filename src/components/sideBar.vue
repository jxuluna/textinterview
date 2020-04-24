<template>
<div>
    <el-row class="tac">
  <el-col :span="24">
    <div class="logo">
      <img src="../assets/LogoSmartZx.png" alt="">
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#111122"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>资产管理</span>
        </template>
       <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <router-link to='/Home' slot="title">控制柜部署</router-link>
      </el-menu-item>
            <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <router-link to="/eleBox" slot="title">道路部署</router-link>
      </el-menu-item>
            <el-menu-item index="4">
        <i class="el-icon-menu"></i>
        <router-link to="/lighting" slot="title">灯具部署</router-link>
      </el-menu-item>
                  <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <router-link to="/lampmodel" slot="title">灯杆</router-link>
      </el-menu-item>
      </el-submenu>

    </el-menu>
  </el-col>
</el-row>

</div>
</template>

<style lang="scss" scoped>
.logo{
  text-align: center;
  line-height: 70px;
}
</style>


