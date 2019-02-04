<template>
  <el-container class="container">
    <el-header class="header" height="70px">
      <img src="./assets/logo.png" style="width: 200px; height: 70px;"/>
      <el-row style="padding-top:10px; float:right;">
        <el-col :span="24" >
          <span>当前登录用户: root   </span>
          <el-button type="text">退出</el-button>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu :default-active="this.$router.path"
                 router
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 unique-opened
                 active-text-color="#19be6b"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="/home/stock">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">进货管理</span>
            </template>
            <el-menu-item index="/home/stock/in">进货入库</el-menu-item>
            <el-menu-item index="/home/stock/order">订单查询</el-menu-item>
          </el-submenu>

          <el-menu-item index="/home/product">
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>

          <el-menu-item index="/home/user">
            <i class="el-icon-document"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-menu-item index="/home/employee">
            <i class="el-icon-document"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>

          <el-menu-item index="/home/chart">
            <i class="el-icon-setting"></i>
            <span slot="title">报表统计</span>
          </el-menu-item>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">回收站</span>
            </template>
            <el-menu-item index="7-1">单据恢复</el-menu-item>
            <el-menu-item index="7-3">员工恢复</el-menu-item>
            <el-menu-item index="7-4">用户恢复</el-menu-item>
            <el-menu-item index="7-5">清空所有</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>


      <!--Main-->
      <el-main class="main">
        <el-container>
          <el-breadcrumb separator="/" style="margin-top:5px;">
            <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
              <router-link :to="item.path">{{item.name}}</router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-container>


        <el-container style="margin-top: 30px;">
          <router-view></router-view>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import User from './views/User'
  export default {
    data() {
      return {
        activeIndex: 'first',
        levelList:[]
      };
    },
    components:{
      User
    },
    watch:{
      $route(){
        this.getBreadcrumb()
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getBreadcrumb() {
        let matched = this.$route.matched;
        this.levelList = matched;
        for(let i ; i < matched.length; i++)
          console.log(matched[i].path)
      },
    },
    created() {
      this.getBreadcrumb();
    },

  }
</script>

<style scoped>
  .el-menu-vertical-demo {
    width: 229px;
    min-height:100%;
  }

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .header {
    height: 40px;
    line-height: 40px;
    background: #545c64;
    color: #fff;
  }

  .main{
    width:100%;
    padding:15px 25px;
  }
</style>

