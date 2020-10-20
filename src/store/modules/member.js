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

//接受页面传来的动作
const actions={
    reqMember(context){
        reqMemberList().then(res=>{
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
     namespaced:true
}