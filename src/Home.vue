<template>
  <el-container class="container">
    <el-header class="header" height="70px">
      <img src="./assets/logo.png" style="width: 200px; height: 70px;"/>
      <el-row style="padding-top:10px; float:right;">
        <el-col :span="24" >
          <el-button type="text" style="background: #545c64;"><i class="iconfont sa--tuichu" @click="logout"></i></el-button>
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
          <el-menu-item index="/home" >
            <i class="iconfont sa--shouye ali"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="/home/stock">
            <template slot="title">
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">进货管理</span>
            </template>
            <el-menu-item index="/home/stock/in">进货入库</el-menu-item>
            <el-menu-item index="/home/stock/order">订单查询</el-menu-item>
          </el-submenu>

          <el-menu-item index="/home/category">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
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
      logout(){
        sessionStorage.setItem("loginStatus","false");
        this.$router.push('/login')
      }
    },
    created() {
      console.log("home: conversion loginStatus: " + conversion(sessionStorage.getItem("loginStatus")))
      if(!conversion(sessionStorage.getItem("loginStatus"))){
        this.$router.push('/login')
      }
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

  .ali{
    margin-left: 5px;
    margin-right: 8px;
  }
</style>

