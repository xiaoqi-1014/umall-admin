<template>
  <div>
    <el-container class="box1">
      <el-aside width="200px" class="Aside">
        <!-- 左导航-->
        <el-col :span="12" class="col">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#666"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            unique-opened
          >
           <el-menu-item index="/index" >
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
            <div v-for="item in userinfo.menus" :key="item.id">
              <!-- 目录 -->
              <el-submenu index="2" v-if="item.children">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!--菜单 -->
           <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
            </div>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="Header">
          <div class="over">
            <p>{{userinfo.username}}</p>
           <el-button type='danger' @click="over">退出登录</el-button>
          </div>
        </el-header>
        <el-main class="Main">
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$route.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 二级路由出口 -->
            <router-view></router-view>
          </el-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import qs from "qs";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {
    ...mapActions({
      reqLogin:'reqLogin'
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    over(){
      this.reqLogin({})
      this.$router.push('/login')
    }
  },
  
  mounted() {
    
  },
};
</script>

<style scoped>
.box1 {
  height: 100vh;
}
.Aside {
  height: 100vh;
  background-color: #666;
}
.Header {
  background-color: #cccccc;
}
.col {
  width: 100%;
}
.over{
  float: right;
  line-height: 60px;
}
.over p{
  float: left;
}
</style>