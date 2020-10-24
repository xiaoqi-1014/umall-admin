<template>
  <div>
    <el-dialog :title="inof.inofAdd==true? '添加商品列表':'编辑商品列表'" :visible.sync="inof.isshow" @closed="close" @opened='open'>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change='changeFirst'>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for='item in cateList' :key='item.id' :label="item.catename" :value='item.id' ></el-option>
          </el-select>
        </el-form-item>
        <!-- {{form.first_cateid}} -->
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="i in secondCateList" :key="i.id" :label='i.catename' :value='i.id' ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <!-- 上传文件 -->
        <el-form-item label="图片">
            <div class="my-upload">
                <h3>+</h3>
                <img class="img" v-if="imgUrl" :src="imgUrl" alt="">
                <input type="file" class="my-input" @change="getFile">
            </div>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change='changeSpecs'>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for='item in speca' :key='item.id' 
            :label='item.specsname' :value='item.id'></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option v-for="itm in goodslist" :key="itm.id" :label='itm' :value='itm'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='是否新品'>
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
  <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label='是否热卖'>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
  <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>  
        <el-form-item label='商品描述'>
         <div v-if="inof.isshow" id="box">
         </div>
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
 import E from 'wangeditor'
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import {reqGoodsAdd,reqGoodsUpdate,reqCatelist,reqGoodsDetail} from "../../../utils/axios";
export default {
  props: ["inof"],
  components: {},
  data() {
    return {
      imgUrl:'',
      // 数据初始值 后台要什么，我们传什么
       form:{
            first_cateid:'',
            second_cateid:'',
            goodsname:'',
            price:'',
            market_price:'',
            img:null,
            description:"",
            specsid:"",
            specsattr:[],//后端要字符串数组
            isnew:1,
            ishot:1,
            status:1,
       },
      defaultProps: {
        label: "title",
      },
      //二级分类list
      secondCateList:[],
      // 商品规格list
       goodslist:[]
    };
  },
  computed: {
    ...mapGetters({
      cateList:'cate/list',
      speca:"speca/list",
      
    }),
  },
  methods: {
    ...mapActions({
       reqCateList:'cate/reqCateList',
       reqSpecs:'speca/reqSpecs',
       reqGoodsActions:'good/reqGoodsActions',
       reqgoodTotal:'good/reqgoodTotal'
    }),
    // 弹框加载完成时加载
      open(){
          this.editor = new E('#box')
          this.editor.create()
          this.editor.txt.html(this.form.description)
      },
    // 商品规格发生了改变，计算商品属性的数组
    changeSpecs(){
      // 不懂的怎么操作
      this.form.specsattr=[]
       this.changeObj()

    },
    // 商品属性数据
    changeObj(){
      let obj=this.speca.find(item=>item.id==this.form.specsid)
          this.goodslist=obj.attrs

    },
    // 当触发了一级分类时发送一个axiso请求
      changeFirst(){
        this.form.second_cateid=''
        this.reqgodli()
      },
      // 二级分类的数据
      reqgodli(){
          reqCatelist({pid:this.form.first_cateid}).then(res=>{
          //  二级分类数据
            this.secondCateList=res.data.list
        })
      },
    //点击取消弹框消失
    qx() {
      this.inof.isshow = false;
      if(!this.inof.inofAdd==true){
         // 样式重置
       this.empty()
      }
     
    },
    // 弹框消失之前判断是添加页面还是编辑页面 使用弹框消失默认事件
    close(){
      if(this.inof.inofAdd==true){
         this.inof.inofAdd==true
      }else{
        this.empty()
      }
    },
    // 样式重置
    empty() {
        this.form={
         first_cateid:'',
            second_cateid:'',
            goodsname:'',
            price:'',
            market_price:'',
            img:null,
            description:"",
            specsid:"",
            specsattr:[],//后端要字符串数组
            isnew:1,
            ishot:1,
            status:1,
      },
      this.imgUrl='';
    },
      //  当用户点击添加之后把用户写的数据存放到后台数据库 
    qd() {
           let data=this.form
            // 获取到富文本的值存放到form.description中
            data.description=this.editor.txt.html()
            data.specsattr=JSON.stringify(data.specsattr)
            reqGoodsAdd(data).then((res) => {
            if(res.data.code==200){
              // 弹出成功的消息提示
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 更新页面
             this.reqGoodsActions()
            //  点击确定之后重新计算总数据刷新一下页面
                   this.reqgoodTotal()
            }else{
              warningAlert(res.data.msg)
            }
      });
    },
    // 获取当前数据的详情
    lock(id){
         reqGoodsDetail({id:id}).then(res=>{
            if(res.data.code==200){
              this.form=res.data.list
              //当前form如过没有id，我们就手动补一个id
               this.form.id=id
              // 加载二级分类的数据
               this.reqgodli()
            //   // 给img重新赋值
              this.imgUrl=this.$img+this.form.img
              //商品属性从字符串转成数组
              this.form.specsattr=JSON.parse(this.form.specsattr)
              // 获取商品属性的数组
              this.changeObj()
                 // 获取二级分类的数据
              this.reqgodli()
              // 刷新页面
              this.reqGoodsActions()
            }else{
              warningAlert(res.data.msg)
            }
        })
    },
    // 修改
    update(){
      let data=this.form
      data.specsattr=JSON.stringify(data.specsattr)
       reqGoodsUpdate(data).then(res=>{
         if(res.data.code==200){
              successAlert(res.data.msg)
              // 弹框消失
              this.qx()
              // 数据重置
              this.empty()
              // 页面刷新
              this.reqGoodsActions()
         }else{
           warningAlert(res.data.msg)
         }
       })
    },
    getFile(e){
      // 点击了上传文件，获取到图片的字符串
      let file=e.target.files[0]
       // 把图片的文件信息转换成路径就可以展示出图片
      // URL.createObjectURL
      this.imgUrl=URL.createObjectURL(file)
      // 把拿到的文件地址赋值给img，然后放到数据库
      this.form.img=file
      // 判断文件的大小不能超过2mb
      if(file.size>2*1024*1024){
        warningAlert('文件不能超过2MB')
        return;
      }
      //限制文件的格式
  
    }
  },
  mounted() {
    this.reqCateList()
    this.reqSpecs(true)
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