<template>
  <el-container class="container">
    <el-header class="header" height="70px">
      <img src="./assets/logo.png" style="width: 200px; height: 70px;"/>
      <el-row style="padding-top:12px; float:right; padding-right: 30px;">
        <el-col :span="24" >
            <el-dropdown @command="handleCommand">
                  <img src="./assets/touxiang.jpg" style="width: 45px; height: 45px;border-radius: 50%;"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                <el-dropdown-item command="clear">清空缓存</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-col>
      </el-row>

    </el-header>
    <el-container>
      <el-aside width="230px">
        <el-menu :default-active="activeMenuIndex"
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
          <el-menu-item index="/home" >
            <i class="iconfont sa--shouye ali"></i>
            <span slot="title">首页</span>
          </el-menu-item>

            <el-menu-item index="/home/in">
              <i class="el-icon-d-arrow-right"></i>
              <span slot="title">入库</span>
            </el-menu-item>
            <el-menu-item index="/home/out">
              <i class="el-icon-d-arrow-left"></i>
              <span slot="title">出库</span>
            </el-menu-item>
            <el-menu-item index="/home/order">
              <i class="el-icon-search"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>

          <el-menu-item index="/home/product">
            <i class="el-icon-document"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>

          <el-menu-item index="/home/user">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>

          <el-menu-item index="/home/employee">
            <i class="el-icon-time"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>

          <el-menu-item index="/home/chart">
            <i class="el-icon-news"></i>
            <span slot="title">报表统计</span>
          </el-menu-item>

          <el-menu-item index="/home/restore">
            <i class="el-icon-refresh"></i>
            <span slot="title">订单恢复</span>
          </el-menu-item>

        </el-menu>
      </el-aside>


      <!--Main-->
      <el-main class="main">

          <el-row style="width:100%">
          <el-col :span="24">
            <el-card shadow="always">
              <el-breadcrumb separator="/" style="margin-top:5px;">
                <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path">
                  <router-link :to="item.path" >{{item.name}}</router-link>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
          </el-col>
          </el-row>

          <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import User from './views/User'
  import {conversion} from './commons/BooleanUtil'
  import {clear} from "./commons/cache";

  export default {
    data() {
      return {
        activeIndex: 'first',
        levelList:[],
        count:0
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
      //清除缓存
      clearLocalStorage(){
        clear();
        this.$notify({
          title: '成功',
          offset: 100,
          duration: 1000,
          message: '本地缓存已经清除',
          type: 'success'
        });
      },
      //登出
      logout(){
        sessionStorage.setItem("loginStatus","false");
        this.$router.push('/login')
      },
      //处理下拉菜单
      handleCommand(command){
          switch (command) {
            case "logout": this.logout();
                  break;
            case "clear": this.clearLocalStorage();
                  break;
          }
      }
    },
    created() {
      console.log("home: conversion loginStatus: " + conversion(sessionStorage.getItem("loginStatus")))
      if(!conversion(sessionStorage.getItem("loginStatus"))){
        this.$router.push('/login')
      }
      this.getBreadcrumb();
    },
    computed:{
      activeMenuIndex(){
        return this.$route.path
      }
    }

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

  .ali{
    margin-left: 5px;
    margin-right: 8px;
  }
</style>

