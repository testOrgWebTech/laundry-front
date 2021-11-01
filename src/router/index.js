import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CustomerList from '../views/admin/CustomerList.vue'
import AdminOrderList from '../views/admin/OrderList.vue'
import OrderHistory from '../views/admin/OrderHistory.vue'
import CreateOrder from '../views/customer/CreateOrder.vue'
import CustomerOrderList from '../views/customer/OrderList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/customer-list',
    name: 'CustomerList',
    component: CustomerList
  },
  {
    path: '/admin-order-list',
    name: 'AdminOrderList',
    component: AdminOrderList
  },
  {
    path: '/order-history',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: CreateOrder
  },
  {
    path: '/customer-order-list',
    name: 'CustomerOrderList',
    component: CustomerOrderList
  },
]

const router = new VueRouter({
  routes
})

export default router
