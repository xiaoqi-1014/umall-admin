import {reqSeckList} from '../../utils/axios'

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

// 接受页面传过的动作
const actions={
    reqSecklist(context){
        reqSeckList().then(res=>{
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