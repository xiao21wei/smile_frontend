import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import userInfoView from '../views/userInfoView.vue'

Vue.use(VueRouter)

let AdminRouterGuard = (to, from, next) => {
  let identity = localStorage.getItem('identity');
  if (identity) {
    if (identity == 'admin')
      next();
    else
      next(false);
  } else {
    next('/login');
  }
}

let UserRouterGuard = (to, from, next) => {
  let identity = localStorage.getItem('identity');
  if (identity) {
    if (identity == 'user')
      next();
    else
      next(false);
  } else {
    next('/login');
  }
}

let WorkerRouterGuard = (to, from, next) => {
  let identity = localStorage.getItem('identity');
  if (identity) {
    if (identity == 'admin')
      next();
    else
      next(false);
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginVue.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path:'/userInfo',
    name:'userInfo',
    component:userInfoView
  },
  {
    path:'/writeRepair',
    name:'wirteRepair',
    component:() => import('../views/writeRepairView.vue')
  },
  {
    path:'/visitorAppm',
    name:'visitorAppointment',
    component:() => import('../views/appointmentView.vue')
  },
  {
    path:'/UserRepairList',
    name:'UserRepairList',
    component:() => import('../views/UserRepairList.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/all_client',
    name: 'All_client',
    component: () => import('../views/administrator_all_client.vue')
  },
  {
    path: '/lease',
    name: 'laese',
    component: () => import('../views/userLeaseView.vue')
  },
  {
    path: '/proterty',
    name: 'proterty',
    component: () => import('../views/userPropertyView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginVue.vue')
  },
  {
    path: '/repair',
    name: 'repair',
    component: () => import(/* webpackChunkName: "login" */ '../views/RepairInfoView.vue')
  },{
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "login" */ '../views/createUserView.vue')
  },
  {
    path: '/clientdetail',
    name: 'clientdetail',
    component: () => import(/* webpackChunkName: "login" */ '../views/clientDetail.vue')
  },
  {
    path: '/rentstate',
    name: 'rentstate',
    component: () => import(/* webpackChunkName: "rentstate" */ '../views/AdminRentStateView.vue'),
  },
  {
    path: '/repair_change',
    name: 'repair_change',
    component: () => import(/* webpackChunkName: "rentstate" */ '../views/RepairInfoChange.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import(/* webpackChunkName: "rentstate" */ '../views/MessageView.vue')
  },
  {
    path: '/repair_orders',
    name: 'repair_orders',
    component: () => import(/* webpackChunkName: "rentstate" */ '../views/RepairOrders.vue')
  },
  {
    path: '/clientmessage',
    name: 'clientmessage',
    component: () => import('../views/ClientMessageView.vue')
  },
  {
    path: '/AdminRepair',
    name: 'AdminRepair',
    component: () => import('../views/AdminRepairView.vue')
  },
  {
    path: '/repairmessage',
    name: 'repairmessage',
    component: () => import('../views/RepairMessageView.vue')
  },
  {
    path: '/historymessage',
    name: 'historymessage',
    component: () => import('../views/RepairHistoryView.vue')
  },
  {
    path: '/Graph',
    name: 'Graph',
    component: () => import('../views/GraphView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
