<template>
  <div>
   <el-button type="primary" class="but" @click="btn">添加</el-button>
   <!-- 表格 -->
     <v-list @edit='edit'></v-list>
     <!-- 添加组件 -->
      <add :inof='inof' ref='add'></add>
  </div>
</template>

<script>
import add from './components/add'
import vList from './components/list'
import {mapGetters,mapActions} from 'vuex';

export default {
  // 接收数据
   props:[],
  //  组件
   components:{
      vList,
       add,
   },
  //  数据
   data(){
     return{
       inof:{
        //  false 弹框隐藏，true弹框显示
          isshow:false,
          // 控制弹框标题的变量，true值为添加菜单，false值为编辑菜单
          inofAdd:true,
       },
     }
   },
  //  计算
   computed:{
     ...mapGetters({})
   },
  //  方法
   methods:{
     ...mapActions({}),
    //  点击添加按钮弹框显示
     btn(){
         this.inof.isshow=true
        //  控制弹框标题
         this.inof.inofAdd=true
     },
    //  编辑
      edit(id){
        // 弹框显示
        this.inof.isshow=true
        // 改变标题
        this.inof.inofAdd=false
        // 让add组件获取发起详情的请求
         this.$refs.add.lock(id)
      }
   },
  //  挂载完成
   mounted(){
         
   },
}
</script>

<style scoped> 
 
 .but{
   margin-top: 20px;
 }
</style>