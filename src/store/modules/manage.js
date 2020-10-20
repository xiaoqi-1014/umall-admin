import {reqManagelist,reqManageount} from '../../utils/axios'

// 状态
const state={
    list:[],
    size:2,
    // 数据总数
    total:0,
    // 页码
    page:1
}

// 修改状态
const mutations={
    changelist(state,arr){
        state.list=arr
    },
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,page){
        state.page=page
    }
}

// 接受页面传过来的动作
const actions={
    reqManageLi(context){
        reqManagelist({page: context.state.page,size:context.state.size}).then(res=>{
             let list=res.data.list? res.data.list:[]

            //  如果取到的数据是null，并且不是第一页那么页码减1，重新请求list
            if(context.state.page>1&&list.length==0){
                context.commit('changePage',context.state.page-1)
                context.dispatch('reqManageLi')
                return;
            }
            context.commit('changelist',list)

        })
    },
    // 获取总数
    reqTotalAction(context){
        reqManageount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 组件修改了页码
    changePageAction(context,page){
        // 修改页码
        context.commit('changePage',page)
        // 发起list请求
        context.dispatch('reqManageLi')
    }
}

// 导出数据
const getters={
    list(state){
        return state.list
    },
    // 一页的数量
    size(state){
        return state.size
    },
    // 总数
    total(state){
       return state.total
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