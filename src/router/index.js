import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '../peges/home/home.vue'
import login from '../peges/login/login.vue'
import menu from '../peges/menu/menu.vue'
import member from '../peges/member/member.vue'
import banner from '../peges/banner/banner.vue'
import cate from '../peges/cate/cate.vue'
import goods from '../peges/goods/goods.vue'
import manage from '../peges/manage/manage.vue'
import role from '../peges/role/role.vue'
import seckil from '../peges/seckil/seckill.vue'
import specs from '../peges/specs/specs.vue'
import index from '../peges/index/index.vue'
import store from '../store'

function checkedEnter(path,next){
  let menus_url=store.state.userinfo.menus_url;
       if(menus_url.includes(path)){
         next()
       }else{
         next('/index')
       }
}
// 首页下面的二级路由规则
export let indexRouter = [  
   {
    path: '/menu',
    component: menu,
    name: "菜单管理",
    // 设置独享守卫
     beforeEnter(to,from,next){
      checkedEnter('/menu',next)
     }
  },
  {
    path: '/member',
    component: member,
    name: '会员管理',
    beforeEnter(to,from,next){
      checkedEnter('/member',next)
     }
  },
  {
    path: '/banner',
    component: banner,
    name: '轮播图管理',
    beforeEnter(to,from,next){
      checkedEnter('/banner',next)
     }
  },
  {
    path: '/cate',
    component: cate,
    name: '商品分类',
    beforeEnter(to,from,next){
      checkedEnter('/cate',next)
     }
  },
  {
    path: '/goods',
    component: goods,
    name: '商品管理',
    beforeEnter(to,from,next){
      checkedEnter('/goods',next)
     }
  },
  {
    path: '/seckil',
    component: seckil,
    name: '秒杀活动',
    beforeEnter(to,from,next){
      checkedEnter('/seckil',next)
     }
  },
  {
    path: '/manage',
    component: manage,
    name: '管理员管理',
    beforeEnter(to,from,next){
      checkedEnter('/manage',next)
     }
  },
  {
    path: '/role',
    component: role,
    name: '角色管理',
    beforeEnter(to,from,next){
      checkedEnter('/role',next)
     }
  },
  {
    path: '/specs',
    component: specs,
    name: '商品规格',
    beforeEnter(to,from,next){
      checkedEnter('/specs',next)
     }
  },
  {
    path: '/index',
    component: index,
    name: '首页管理',
  },
]
let router = new Router({
  // 配置路由规则
  routes: [
    {
      path: '/home',
      component: home,
      children: [
        // 导出所有的二级路由
        ...indexRouter,
        {
          path: '',
          redirect: "/index"
        }
      ]
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '*',
      redirect: '/login',
    },
  ]
})

// 设置全局守卫
router.beforeEach((to, from, next) => {
  // 判断如果时前往登录，next
  if (to.path == '/login') {
    next();
    return;
  }

  // 如果前往的不是登录
  // 查看是否登录，如果登录过了，next；如果没有登录过，就next('/login)
  if (store.state.userinfo.token) {
    next()
    return;
  } else {
    next('/login')
  }
})

// 导出路由
export default router
