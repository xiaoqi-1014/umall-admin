//  状态 数据
export const state={
    userinfo:sessionStorage.getItem('userinfo')? JSON.parse(sessionStorage.getItem('userinfo')):{}
}
// 修改数据
export const mutations={
    changeList(state,arr){
        state.userinfo=arr;
        // console.log(state.userinfo);
        // console.log('=============');
         // 由于状态层的数据一刷新就没了，但我们希望数据刷新还存在
         if(arr.id){
            sessionStorage.setItem('userinfo',JSON.stringify(arr))
         }else{
             sessionStorage.removeItem('userinfo')
         }
       
      }
   
}
// 导出数据
export const getters={
    userinfo(state){
        return state.userinfo
    }
}