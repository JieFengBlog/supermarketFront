import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home.vue'
import Login from './Login'
import User from './views/User'
import First from "./views/First";
import Stock from "./views/Stock";
import Order from "./views/Order";
import Product from "./views/Product";
import Employee from "./views/Employee";
import Chart from "./views/Chart";
import OutStock from "./views/OutStock";
import OrderRestore from "./views/OrderRestore";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component:Login,
      name:'',
      hidden:true
    },

    {
      path: '/',
      component:Home,
      redirect:'/home'
    },

    {
      path: '/home',
      component: Home,
      name:'首页',
      children:[
        {path:'/',name:'入库',component:Stock},
        {path:'/home/out',name:'出库',component:OutStock},
        {path:'/home/order',name:'订单查询',component:Order},
        {path:'/home/user',name:'用户管理',component:User},
        {path:'/home/product',name:'商品管理', component:Product},
        {path:'/home/employee',name:'员工管理',component:Employee},
        {path:'/home/chart',name:'报表统计',component:Chart},
        {path:'/home/restore',name:'订单恢复',component:OrderRestore},
      ]
    },

  ]
})
