<template>
  <div>
   <el-table
   :data='list'
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="title"
      label="活动名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope='scope'> 
      <el-button v-if="scope.row.status==1" type='primary'>启用</el-button>
      <el-button v-else type='info'>禁用</el-button>
      </template>
    </el-table-column>

    <el-table-column
      prop="status"
      label="操作">
      <template slot-scope='scope'>
        <el-button type='primary' @click='edit(scope.row.id)'>编辑</el-button>
        <el-button type='danger' @click="open(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import { successAlert, warningAlert } from '../../../utils/alert';
import {reqSeckDel} from '../../../utils/axios'
export default {
  props:[],
  components:{},
    data(){
      return{}
    },
    computed:{
        ...mapGetters({
                 list:'seck/list'
        })
    },
    methods:{
      ...mapActions({
              reqSecklist:'seck/reqSecklist'
      }),
      //删除按钮
      open(id){
        this.$confirm('你确定要删除吗?', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('成功打印');
          reqSeckDel(id).then(res=>{
            console.log(res);
            console.log('打印完成');
              if(res.data.code==200){
                successAlert(res.data.msg)
                // 页面更新
                this.reqSecklist()
              }
            })
        }).catch(() => {
          console.log('失败打印');
            warningAlert('已取消删除')
        });
      },
      // 编辑
      edit(id){
        // 使用自定义事件通知父级改变info的值，并传入当前元素的id
         this.$emit('edit',id)
      }
    },
    // 一进页面就发送请求
    mounted(){
             this.reqSecklist()
    }
}
</script>

<style>

</style>