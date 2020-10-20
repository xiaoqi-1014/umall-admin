<template>
  <div>
    <el-dialog :title="inof.inofAdd==true? '添加会员':'编辑会员'" :visible.sync="inof.isshow" @closed='close'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="qd" v-if='inof.inofAdd==true'>添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { Login } from '../../../../../kuangjia/doy07/01-meituan/src/utils/axios';
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMemberInfo,reqMemberEdit} from "../../../utils/axios";
export default {
  props: ["inof"],
  components: {},
  data() {
    return {
      form: {
         nickname:'',
         phone:'',
         password:'',
         status:1,
         uid:''
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
    //  menuList:"menu/list"
    }),
  },
  methods: {
    ...mapActions({
         reqMember:'mamber/reqMember'
    }),
    //点击取消弹框消失
    qx() {
      this.inof.isshow = false;
      if(!this.inof.inofAdd==true){
         // 样式重置
       this.empty()
      }
     
    },
    // 样式重置
    empty() {
      this.form = {
         nickname:'',
         phone:'',
         password:'',
         status:1,
         uid:''
      };
    },
    qd() {
      // 将数组转换成字符串数组
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      // console.log(this.form);
      //  当用户点击添加之后把用户写的数据存放到后台数据库 
      reqRoleadd(this.form).then((res) => {
            if(res.data.code==200){
              // 弹出成功的消息提示
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 更新页面
              this.reqRolelie()
            }else{
              warningAlert(res.data.msg)
            }
      });
    },
    // 获取当前数据的详情
    lock(id){
         reqMemberInfo(id).then(res=>{
            if(res.data.code==200){
              this.form=res.data.list
            //    this.uid=this.form.uid
            }else{
              warningAlert(res.data.msg)
            }
        })
    },
    update(){
       reqMemberEdit(this.form).then(res=>{
         if(res.data.code==200){
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 页面刷新
              this.reqMember()
         }else{
           warningAlert(res.data.msg)
         }
       })
    },
    close(){
      if(this.inof.inofAdd==true){
               this.inof.inofAdd=true
      }else{
            this.inof.inofAdd=false   
     }
    }
  },
  mounted() {
 
  },
};
</script>
<style scoped>
</style>    