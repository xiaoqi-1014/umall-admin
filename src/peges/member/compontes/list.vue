<template>
<div>
       <el-table
    :data="list"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="id"
      label="用户编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号">
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
      label="操作">
         <template slot-scope='scope'>
        <el-button type='primary' @click='edit(scope.row.uid)'>编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {successAlert,warningAlert } from '../../../utils/alert'
import {reqRoleDel,reqRoleUpdate} from '../../../utils/axios'
export default {
props:[],
components:{},
data(){
return {
}
},
computed:{
...mapGetters({
    // list:'role/list',
    list:'mamber/list'
})
},
methods:{
...mapActions({
  reqRolelie:'role/reqRolelie',
  reqMember:'mamber/reqMember'
}),
// 删除
open(id){
        this.$confirm('你确定要删除吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
         reqRoleDel(id).then(res=>{
              if(res.data.code==200){
                // 成功的消息提示
                successAlert(res.data.msg)
                // 页面更新
                 this.reqRolelie()
              }
         })
        }).catch(() => {
           warningAlert('已取消删除')
        });
},
// 编辑
edit(id){
        this.$emit('edit',id)
        // 获取单条数据
        // reqRoleDetail(id).then(res=>{

        // })
        // 修改当前的数据
        // reqRoleUpdate(id).then(res=>{

        // })
}
},
mounted(){
  this.reqRolelie()
  this.reqMember()
},
}
</script>
<style scoped>
</style>