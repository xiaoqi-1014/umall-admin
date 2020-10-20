import {reqMemberList} from '../../utils/axios'

// 状态
const state={
    list:[]
}

// 修改状态
 const mutations={
     changeList(state,arr){
         state.list=arr
     }
 }

//  接收页面传过来的数据
const actions={
     reqMember(context){
        reqMemberList().then(res=>{
            console.log(res)
            console.log('============');
          context.commit('changeList',res.data.list)
        })
     }
}

// 导出数据
const getters={
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced:true,
}