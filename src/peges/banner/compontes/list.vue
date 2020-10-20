<template>
<div>
       <el-table
    :data="list"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="id"
      label="商品编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="轮播图标题">
    </el-table-column>
    <el-table-column
      label="图片">
      <template slot-scope="scope">
          <img class="img" :src="'http://localhost:3000'+scope.row.img" alt="">
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope='scope'> 
      <el-button v-if="scope.row.status==1" type='primary'>启用</el-button>
      <el-button v-else type='info'>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width='200'
      >
         <template slot-scope='scope'>
        <el-button type='primary' @click='edit(scope.row.id)'>编辑</el-button>
        <el-button type='danger' @click="open(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {successAlert,warningAlert } from '../../../utils/alert'
import {reqBannerDel} from '../../../utils/axios'
export default {
props:[],
components:{},
data(){
return {
}
},
computed:{
...mapGetters({
            list:'banner/list'
})
},
methods:{
...mapActions({
    reqBanList:'banner/reqBanList'
}),
// 修改页码
changePage(e){
   this.changPag(e)
},
// 删除
open(id){
        this.$confirm('你确定要删除吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
         reqBannerDel(id).then(res=>{
              if(res.data.code==200){
                // 成功的消息提示
                successAlert(res.data.msg)
                // 页面更新
               this.reqBanList()
              }
         })
        }).catch(() => {
           warningAlert('已取消删除')
        });
},
// 编辑
edit(id){
        this.$emit('edit',id)
}
},
mounted(){
     this.reqBanList()
 
},
}
</script>
<style scoped>
  .img{
      width: 100px;
      height: 100px;
  }
</style>