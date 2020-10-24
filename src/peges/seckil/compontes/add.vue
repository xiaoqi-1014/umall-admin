<template>
  <div>
    <el-dialog
      @closed="close"
      :title="inof.inofAdd==true? '添加活动':'编辑活动'"
      :visible.sync="inof.isshow"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限">
          <div class="block">
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changePid">
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeThirdList">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="itme in childreList"
              :key="itme.id"
              :label="itme.catename"
              :value="itme.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in thirdList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :plain="true" @click="qx">取消</el-button>
        <el-button :plain="true" @click="qd" type="primary" v-if="inof.inofAdd==true">添加</el-button>
        <el-button :plain="true" @click="update" type="primary" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { indexRouter } from "../../../router/index";
import {
  reqSeckAdd,
  reqSeckinfo,
  reqMenudit,
  reqGoodsList,
  reqCatelist,
  reqSeckEdit
} from "../../../utils/axios";
import { warningAlert } from "../../../utils/alert";
import { successAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["inof"],
  data() {
    return {
      childreList: [],
      thirdList: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
      },
      value2: "",
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list",
      goodList: "good/list",
    }),
  },

  methods: {
    ...mapActions({
      reqCateList: "cate/reqCateList",
      reqGoodsActions: "good/reqGoodsActions",
      reqSecklist: "seck/reqSecklist",
    }),
    // 数据重置
    cz() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: "",
      };
    },
    qx() {
      this.inof.isshow = false;
    },
    // 解决弹框消失时的bug
    close() {
      // 判断如果当前点击的是 编辑就清空内容，如果不是就不变
      if (!this.inof.inofAdd == true) {
        this.cz();
      }
    },
    //获取一条详情信息
    lock(id) {
      reqSeckinfo(id).then((res) => {
        if (res.data.code == 200) {
          // 把请求到的数据内容赋值给form
          this.form = res.data.list;
          this.value2=[new Date(parseInt(this.form.begintime)),new Date(parseInt(this.form.endtime))]
          //  这个时候的form是没有id的
          this.form.id = id;
          //得到二级分类的list
          this.reqgodli();
          //得到三级的list
          this.changeThirdList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 触发了一级分类之后发送一个请求
    changePid() {
      this.form.second_cateid = "";
      this.reqgodli();
    },
    reqgodli() {
      let id = this.form.first_cateid;
      reqCatelist({ pid: id }).then((res) => {
        this.childr = res.data.list;
        this.childreList = this.childr;
      });
    },
    changeThirdList() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.thirdList = res.data.list;
      });
    },
    // 点击添加之后
    qd() {
      let data = this.form;
      data.begintime = this.value2[0].getTime()+''
      data.endtime = this.value2[1].getTime()+''
      reqSeckAdd(data).then((res) => {
        if (res.data.code == 200) {
          // 添加成功时弹出成功提示的弹框
          successAlert(res.data.msg);
          //  弹框消失
          this.qx();
          // 数据重置
          this.cz();
          // list数据刷新
          this.reqSecklist();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 点击修改之后
    update() {
      // console.log(this.form);
      // console.log('打印完成');
      reqSeckEdit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 数据清空
          this.cz();
          //  弹框消失
          this.qx();
          //  页面刷新
          this.reqSecklist();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqCateList();
    this.reqGoodsActions(true);
  },
};
</script>

<style>
</style>