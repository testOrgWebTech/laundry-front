import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CustomerList from '../views/admin/CustomerList.vue'
import OrderList from '../views/admin/OrderList.vue'
import PaymentList from '../views/admin/PaymentList.vue'
import PromotionList from '../views/admin/PromotionList.vue'
import CreateOrder from '../views/customer/CreateOrder.vue'

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
    path: '/order-list',
    name: 'OrderList',
    component: OrderList
  },
  {
    path: '/payment-list',
    name: 'PaymentList',
    component: PaymentList
  },
  {
    path: '/promotion-list',
    name: 'PromotionList',
    component: PromotionList
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: CreateOrder
  },
  /*{
    path: '/show-order',
    name: 'ShowOrder',
    component: ShowOrder
  },*/
]

const router = new VueRouter({
  routes
})

export default router
