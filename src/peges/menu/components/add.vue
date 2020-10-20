<template>
  <div>
    <el-dialog
    @closed='close' 
    :title="inof.inofAdd==true? '添加菜单':'编辑菜单'" :visible.sync="inof.isshow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for='item in list' :key='item.id' :label='item.title' :value='item.id' ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择上级菜单">
            <el-option v-for="item in icon" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择上级菜单">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            ></el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value='1' :inactive-value='2'></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :plain="true" @click="qx">取消</el-button>
        <el-button :plain="true" @click="qd" type='primary' v-if='inof.inofAdd==true'>添加</el-button>
        <el-button :plain="true" @click="update" type='primary' v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouter } from "../../../router/index";
import {reqMenuAdd,reqMenuinfo,reqMenudit} from '../../../utils/axios'
import {warningAlert} from '../../../utils/alert'
import {successAlert} from '../../../utils/alert'
import {mapGetters,mapActions} from 'vuex'
export default {
  props:['inof'],
  data() {
    return {
      // 图标
      icon: [
        "el-icon-s-tools",
        "el-icon-s-goods",
        "el-icon-s-help",
        "el-icon-message-solid",
      ],
      // value:treu,
      indexRouter: indexRouter,
      form: {
        pid:0,
        title:"",
        icon:"",
        type:1,
        url:"",
        status:1,
      },
    };
  },
  components:{},
  computed:{
    ...mapGetters({
      list:'menu/list'
    })
  },
  methods: {
    ...mapActions({
      reqListAction:'menu/reqListAction'
    }),
     // 数据重置
   cz(){
     this.form={
        pid:0,
        title:"",
        icon:"",
        type:1,
        url:"",
        status:1,
      }
   },
    qx(){
      this.inof.isshow=false
    },
    // 解决弹框消失时的bug
    close(){
      // 判断如果当前点击的是 编辑就清空内容，如果不是就不变
         if(!this.inof.inofAdd==true){
           this.cz()
         }
    },
    lock(id){
           reqMenuinfo(id).then(res=>{
            if(res.data.code==200){
            //  这个时候的form是没有id的
             this.form=res.data.list
            //  我们给form补一条id
            this.form.id=id
            }else{
              warningAlert(res.data.msg)
            }
           })
    },
     changePid(){
     if(this.form.pid==0){
           this.form.type=1
     }else{
         this.form.type=2
     }
   },
     // 点击添加之后
    qd(){
       reqMenuAdd(this.form).then((res)=>{
        if(res.data.code==200){
           // 数据重置
        this.cz()
        // 添加成功时弹出成功提示的弹框
        successAlert(res.data.msg)
        //  弹框消失
        this.qx()
        // list数据刷新
        this.reqListAction()
        }else{
          warningAlert(res.data.msg)
        }
       })   
    },
    // 点击修改之后
    update(){
      reqMenudit(this.form).then(res=>{
              if(res.data.code==200){
                successAlert(res.data.msg)
                // 数据清空
                this.cz()
                //  弹框消失
                this.qx()
                //  页面刷新
                 this.reqListAction()
              }else{
                warningAlert(res.data.msg)
              }
      })
    }
   },
};
</script>

<style>
</style>