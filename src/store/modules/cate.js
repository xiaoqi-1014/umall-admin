import {reqCatelist} from '../../utils/axios'

// 状态 数据
const state={
        list:[]
}

// 修改数据
const mutations={
    changeList(state,arr){
        state.list=arr
    }
}

//接收页面传过来的动作
const actions={
      reqCateList(context){
        reqCatelist({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)
        })
      }
}

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