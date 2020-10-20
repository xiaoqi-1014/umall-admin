<template>
<div>
  <el-button type='primary' class="el" @click="tj">添加</el-button>
  <v-list @edit='edit'></v-list>
  <v-add :info='info' ref='add'></v-add>
</div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"
import vList from './compontes/list'
import vAdd from './compontes/add'
export default {
props:[],  
components:{
   vList,
   vAdd
},
data(){
return {
   info:{
    //  控制弹框的弹出
     isshow:false,
    //  控制标题的改变
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
     this.info.isshow=true
     this.info.inofAdd=true
 },
 edit(id){
      this.info.isshow=true
      this.info.inofAdd=false
      this.$refs.add.look(id)
 }
},
mounted(){},
}
</script>
<style scoped>
.el{
  margin-top: 20px;
}
</style>