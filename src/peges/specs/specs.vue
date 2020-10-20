<template>
<div>
    <el-button type="primary" class='tian' @click="tj">添加</el-button>
     <v-list @edit='edit'></v-list> 
     <v-add :inof='inof' ref="add"></v-add>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import vList from './componts/list'
import vAdd from'./componts/add'
export default {
props:[],
components:{
     vList,
     vAdd
},
data(){
return {
    inof:{
      isshow:false,
      inofAdd:true
    }
}
},
computed:{
...mapGetters({
})
},
methods:{
...mapActions({
}),
  tj(){
     this.inof.isshow=true
     this.inof.inofAdd=true
  },
  // 编辑
  edit(id){
    this.inof.isshow=true
    this.inof.inofAdd=false
    // 让add组件发起详情的请求
    this.$refs.add.lock(id)
  }
},
mounted(){

},
}
</script>
<style scoped>
.tian{
  margin-top:20px;
}
</style>