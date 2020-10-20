<template>
  <div class="login">
      <div class="box">
          <h3>登录</h3>
          <div class="line">
              <el-input placeholder='请输入账号' clearable v-model="form.username"></el-input>
          </div>
          <div class="line">
              <el-input placeholder='请输入密码' clearable show-password v-model="form.password"></el-input>
          </div>
          <div class="center">
              <el-button type='primary' @click="login">登录</el-button>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {reqManagelogin} from '../../utils/axios.js'
import {successAlert,warningAlert} from '../../utils/alert'
export default {
   data(){
       return{
          form:{
              username:"",
              password:'',
          }
       }
   },
   computed:{
       ...mapGetters({
       })
   },
   methods:{
       ...mapActions({
             reqLogin:'reqLogin'
       }),
     login(){
       reqManagelogin(this.form).then(res=>{
              if(res.data.code==200){
                // 用户信息存起来，共多个组件使用
                  this.reqLogin(res.data.list)
                this.$router.push('/home')
                  successAlert(res.data.msg)
              }else{
                  warningAlert(res.data.msg)
              }
    })
     }
   },
   mounted(){
   }
}
</script>

<style scoped>
   .login{
       width: 100vw;
       height: 100vh;
       background: linear-gradient(to right,#553443,#303D60);
       position: relative;
   }
   .box{
       width: 300px;
       height: 200px;
       position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color: #ffffff;
        border-radius: 20px;
        padding: 20px;
        
   }
   .box .line{
           margin-top: 20px;
   }
   .login .box h3{
       text-align: center;
       line-height: 20px;
   }
   .center{
       text-align: center;
       margin-top: 20px;
   }
</style>