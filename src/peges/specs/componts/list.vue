<template>
  <div>
    <div>
      <el-table
        :data="list"
        style="width: 100%"
        row-key="id"
        border
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="id" label="规格编号" width="80"></el-table-column>
        <el-table-column prop="specsname" label="规格名称" width="150"></el-table-column>
        <el-table-column prop="attrs" label="规格属性" width="500">
          <template slot-scope="scope">
            <el-tag v-for="i in scope.row.attrs" :key="i">{{i}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
            <el-button v-else type="info">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="open(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
    @current-change='changePage'
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqSpecsDel, reqRoleUpdate } from "../../../utils/axios";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "speca/list",
      size: "speca/size",
      total: "speca/total",
    }),
  },
  methods: {
    ...mapActions({
      reqRolelie: "speca/reqSpecs",
      reqSpeunt: "speca/reqSpeunt",
      changePageActio:'speca/changePageActio'
    }),
    // 删除
    open(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqSpecsDel(id).then((res) => {
            if (res.data.code == 200) {
              // 成功的消息提示
              successAlert(res.data.msg);
              // 页面更新
              this.reqRolelie();
              // 点击删除之后更新数据总数
              this.reqSpeunt();
            }
          });
        })
        .catch(() => {
          warningAlert("已取消删除");
        });
    },
    changePage(e){
        this.changePageActio(e)
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.reqRolelie();
    this.reqSpeunt();
  },
};
</script>
<style scoped>
</style>