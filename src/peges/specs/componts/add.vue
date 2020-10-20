<template>
  <div>
    <el-dialog :title="inof.inofAdd==true? '添加商品规格':'编辑商品规格'" :visible.sync="inof.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(i,x) in attr" :key='x'>
           <div class="cont">
                <div class="input">
                     <el-input v-model="i.value"></el-input>
                </div>
              <el-button type='primary' v-if="x==0" @click="attrs">新增规格</el-button>
              <el-button type='danger' v-else @click='del(x)'>删除</el-button>
           </div>
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
import { reqSpecsAdd,reqSpecsinfo,reqSpecsDit} from "../../../utils/axios";
export default {
  props: ["inof"],
  components: {},
  data() {
    return {
        attr:[
        {value:""},
        {value:""},
        ],
      form:{
          specsname:"",
          attrs:'',
          status:1, 
    },
    };
  },
  computed: {
    ...mapGetters({
     speca:"speca/list"
    }),
  },
  methods: {
    ...mapActions({
      reqSpecs:'speca/reqSpecs',
      reqSpeunt:'speca/reqSpeunt'
    }),
      // 新增规格的添加
    attrs(){
        // 在数组中添加一条数据 添加属性push
         this.attr.push({value:''})
    },
    // 删除新增规格
    del(id){
        // 删除属性splice (当前数组内容的下标，删除的个数)
        this.attr.splice(id,1)
    },
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
      this.attr=[
        {value:""},
        {value:""},
        ],
      this.form={
          specsname:"",
          attrs:'',
          status:1, 
    }
    },
    qd() {
      // 判断规格名称是否为空
      if(this.form.specsname==''){
            warningAlert('规格名称不能为空')
            return;
      }
      // 规格属性有一个为空就不能添加
      if(this.attr.some(i=>i.value=='')){
         warningAlert('所有的规格属性都必填')
         return;
      };
      // 取出每一个value的值返回一个新的数组
      // console.log(this.attr.map(i=>i.value));
      // 将数组转成字符串
       this.form.attrs=JSON.stringify(this.attr.map(i=>i.value)) 
      reqSpecsAdd(this.form).then((res) => {
            if(res.data.code==200){
              // 弹出成功的消息提示
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 更新页面
              this.reqSpecs()
                 // 更新页面的总数
            this.reqSpeunt()
            }else{
              warningAlert(res.data.msg)
            };
      });
    },
    // 获取当前数据的详情
    lock(id){
         reqSpecsinfo(id).then(res=>{
          //  console.log(res);
            if(res.data.code==200){
              this.form=res.data.list[0]
              // 将字符串数组转换成json数组
              this.attr=JSON.parse(this.form.attrs).map(i=>({value:i}))
            }else{
              warningAlert(res.data.msg)
            }
        })
    },
    update(){
      if(this.form.specsname==''){
        warningAlert('规格名称不能为空')
        return;
      }
      if(this.attr.some(i=>i.value=='')){
         warningAlert('规格属性不能为空')
         return;
      }
    //  将json数组转换成字符串数组
       this.form.attrs=JSON.stringify(this.attr.map(i=>i.value))
       console.log(this.attr);
       reqSpecsDit(this.form).then(res=>{
         if(res.data.code==200){
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 页面刷新
              this.reqSpecs()
         }else{
           warningAlert(res.data.msg)
         }
       })
    },
  },
  mounted() {
    this.reqSpecs()
  },
};
</script>
<style scoped>
.cont{
    display: flex;
}
.cont .input{
    flex: 1;
}
</style>