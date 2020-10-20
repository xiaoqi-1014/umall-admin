<template>
  <div>
    <el-dialog :title="info.inofAdd==true? '添加角色':'编辑角色'" :visible.sync="info.isshow" @closed="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for='item in cateList' :key='item.id' :label='item.catename' :value='item.id' ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 上传文件 -->
        <el-form-item label="图片">
            <div class="my-upload">
                <h3>+</h3>
                <img class="img" v-if='imgUrl' :src="imgUrl" alt="">
                <input type="file" class="my-input" @change="getFile">
            </div>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取消</el-button>
        <el-button type="primary" @click="qd" v-if='info.inofAdd==true'>添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqCateAdd,reqCateinfo,reqCatedit} from "../../../utils/axios";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
        imgUrl:'',
      form: {
          pid:0,
          catename:'',
          img:null,
          status:1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
     list:"menu/list",
      cateList:'cate/list'
    }),
  },
  methods: {
    ...mapActions({
      //  reqMenu:"menu/reqListAction",
       reqCateList:'cate/reqCateList'
    }),
    //点击取消弹框消失
    qx() {
      this.info.isshow = false;
      if(!this.info.inofAdd==true){
         // 样式重置
       this.empty()
      }
     
    },
    // 弹框消失之前判断是添加页面还是编辑页面 使用弹框消失默认事件
    close(){
      if(this.info.inofAdd==true){
         this.info.inofAdd==true
      }else{
        this.empty()
      }
    },
    // 样式重置
    empty() {
        this.form={
          pid:0,
          catename:'',
          img:null,
          status:1,
      },
      this.imgUrl='';
    },
      //  当用户点击添加之后把用户写的数据存放到后台数据库 
    qd() {
      reqCateAdd(this.form).then((res) => {
            if(res.data.code==200){
              // 弹出成功的消息提示
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 更新页面
             this.reqCateList()
            }else{
              warningAlert(res.data.msg)
            }
      });
    },
    // 获取当前数据的详情
    look(id){
         reqCateinfo(id).then(res=>{
            if(res.data.code==200){
              this.form=res.data.list
              // 给img重新赋值
              this.imgUrl=this.$img+this.form.img
              this.form.id=id
            }else{
              warningAlert(res.data.msg)
            }
        })
    },
    update(){
       reqCatedit(this.form).then(res=>{
         if(res.data.code==200){
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 页面刷新
              this.reqCateList()
         }else{
           warningAlert(res.data.msg)
         }
       })
    },
    // 上传图片
    getFile(e){
        let file=e.target.files[0]
    //     把图片的文件信息转换成路径就可以展示出图片
    //     大小不能超过2MB
        if(file.size>2*1024*1024){
            warningAlert('文件不能超过2MB')
            return;
        }
         
    //     传到后台的只能是图片文件
    // let imgExtArr=['.jpg','.png','.jpeg','gif']
    // let extname=file.name.slice(file.name.lastIndexOf('.'));
    // if(!imgExtArr.some(item=>item==extname)){
    //     warningAlert('文件格式不正确')
    //     return;
    // } 
    // 将一个文件转换成地址
        this.imgUrl=URL.createObjectURL(file)
        
        // 将文件赋值给form中的img，为了放到数据库
        this.form.img=file
    }
  },
  mounted() {
    // this.reqMenu()
    this.reqCateList()
  },
};
</script>
<style scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}
.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}
.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  /* 鼠标悬停时图标显示小手 */
  cursor: pointer;
  /* 透明色 */
  opacity: 0;
}
.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>