import {reqRolelist} from '../../utils/axios'
// 状态  数据
const state={
    list:[]
}

// 修改数据
const mutations={
    // 第一个参数指的是当前状态，第二是数据
    changename(state,arr){
        state.list=arr
    }
}

// 接受组件派发的动作
const actions={
    reqRolelie(context){
        reqRolelist().then(res=>{
            let list=res.data.list? res.data.list:[]
            context.commit('changename',list)
        })
    }
}
// 导出数据
const getters={
    list(state){
        return state.list
    }
}
export default {
      state,
      mutations,
      actions,
      getters,
    //   命名空间
    namespaced: true
}
