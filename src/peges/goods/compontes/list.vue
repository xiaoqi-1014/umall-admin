<template>
<div>
       <el-table
    :data="goodlist"
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
      prop="goodsname"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格">
    </el-table-column>
    <el-table-column
      label="图片">
      <template slot-scope="scope">
          <img class="img" :src="'http://localhost:3000'+scope.row.img" alt="">
      </template>
    </el-table-column>
     <el-table-column
      prop="status"
      label="是否新品">
      <template slot-scope='scope'> 
      <el-button v-if="scope.row.status==1" type='primary'>启用</el-button>
      <el-button v-else type='info'>禁用</el-button>
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
  <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size='size'
  @current-change='changePage'
  >
</el-pagination>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import {successAlert,warningAlert } from '../../../utils/alert'
import {reqGoodsDel} from '../../../utils/axios'
export default {
props:[],
components:{},
data(){
return {
}
},
computed:{
...mapGetters({
    size:'good/size',
    total:"good/total",
    goodlist:'good/list',
    cateList:'cate/list'
})
},
methods:{
...mapActions({
  reqGoodsActions:'good/reqGoodsActions',
  reqCateList:'cate/reqCateList',
  reqgoodTotal:'good/reqgoodTotal',
  changPag:'good/changePag'
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
         reqGoodsDel(id).then(res=>{
              if(res.data.code==200){
                // 成功的消息提示
                successAlert(res.data.msg)
                // 页面更新
                 this.reqGoodsActions()
                //  点击删除之后需要重新计算总数据
                this.reqgoodTotal()
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
  // this.reqRolelie()
  // this.reqCateList()
  this.reqGoodsActions()
  this.reqgoodTotal()
},
}
</script>
<style scoped>
  .img{
      width: 100px;
      height: 100px;
  }
</style>