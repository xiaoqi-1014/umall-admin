<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号" width="100"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="open(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <div class="for">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
    @current-change="changePage"
    >
    </el-pagination>
   </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqManagelete, reqRoleUpdate } from "../../../utils/axios";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      size:'manage/size',
      total:'manage/total'
    }),
  },
  methods: {
    ...mapActions({
      reqManageLi: "manage/reqManageLi",
      changePageAction:'manage/changePageAction',
      reqTotalAction:"manage/reqTotalAction"
    }),
    changePage(e){
      this.changePageAction(e)
    },
    // 删除
    open(id) {
      console.log(id);
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqManagelete(id).then((res) => {
            if (res.data.code == 200) {
              // 成功的消息提示
              successAlert(res.data.msg);
              // 页面更新
              this.reqManageLi();
              // 总数
              this.reqTotalAction()
            }
          });
        })
        .catch(() => {
          warningAlert("已取消删除");
        });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqManageLi();
  },
};
</script>
<style scoped>
.for{
  float: right;
  overflow: hidden;
}
</style>