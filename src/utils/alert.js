// 二次封装弹框
import Vue from 'vue'
// 实例化一个vue
let vm=new Vue()
//  导出一个成功消息的弹框
export const successAlert=(msg)=>{
    vm.$message({
        message:msg,
        type: 'success'
      });
}
// 导出一个失败消息的弹框
export const warningAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:'warning'
    })
}