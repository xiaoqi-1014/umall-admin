<template>
  <div>
    <el-dialog :title="inof.inofAdd==true? '管理员管理':'编辑管理员'" :visible.sync="inof.isshow" @closed='close'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid">
            <el-option label="请选择角色" :value="0" disabled></el-option>
            <el-option v-for='item in role' 
            :key='item.id'
            :label="item.rolename" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
        <!-- 树形节点 -->
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="qd" v-if="inof.inofAdd==true">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {reqManageAdd,reqManageinfo,reqManagedit} from "../../../utils/axios";
export default {
  props: ["inof"],
  components: {},
  data() {
    return {
      form: {
         roleid:1,
         username:'',
         password:'',
         status:1,
      },
    };
  },
  computed: {
    ...mapGetters({
         role:'role/list'
    }),
  },
  methods: {
    ...mapActions({
       reqRoleList:'role/reqRolelie',
       reqRolelie:'manage/reqManageLi',
       reqTotalAction:"manage/reqTotalAction"
    }),
    //点击取消弹框消失
    qx() {
      this.inof.isshow = false;
      if (!this.inof.inofAdd == true) {
         // 样式重置
        this.empty();
      }
    },
    // 样式重置
    empty(){
      this.form={
         roleid:1,
         username:'',
         password:'',
         status:1,
      }
    },
    qd(){
        reqManageAdd(this.form).then(res=>{
              if(res.data.code==200){
                // 成功提示
               successAlert(res.data.msg)
               
                //  数据重置
               this.empty()
                
                // 弹框消失
                this.qx()
               // 数据刷新
               this.reqRolelie()
              //  刷新总数
              this.reqTotalAction()
              }else{
                warningAlert(res.data.msg)
              }
        })
    },
    // 获取当前数据的详情
    lock(id) {
      reqManageinfo(id).then(res=> {
        if (res.data.code == 200) {
          // 拿到当前下表的内容，赋值给form
          this.form=res.data.list 
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    update() {
      console.log('123');
      console.log(this.form);
      // reqManagedit(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     successAlert(res.data.msg);
      //     // 弹框消失
      //     this.qx();
      //     // 数据重置
      //     this.empty();
      //     // 页面刷新
      //     this.reqRolelie();
      //   } else {
      //     warningAlert(res.data.msg);
      //   }
      // });
    },
    close(){
      if(this.inof.inofAdd=true){
        this.inofAdd=true
      }else{
        this.empty()
      }
    }
  },
  mounted() {
      this.reqRoleList()
  },
};
</script>
<style scoped>
</style>