import {reqGoodsList,reqGoodsCount} from '../../utils/axios'

// 状态
const state={
    list:[],
    // 总数
    total:0,
    //页数
    size:1,
    // 当前页码
    page:1,
}

// 修改状态
const mutations={
    changeList(state,arr){
        state.list=arr
    },
    //  总数
    changeTotal(state,total){
        state.total=total
    },
    // 当前页码
    changePag(state,page){
        state.page=page
    }
}

// 接收页面穿过来的参数
const actions={
    reqGoodsActions(context,bool){
        let params=bool==true? {}:{page:context.state.page,size:context.state.size}
        reqGoodsList(params).then(res=>{
            let list=res.data.list? res.data.list:[]
            // 点击删除刷新页面，如果当前的size为0，就让页面展现上一条数据
            if(context.state.page>1&&list.length==0){
                context.commit('changePag',context.state.page-1)
                // 当页码改变之后，再次刷新一下当前的页面
                context.dispatch('reqGoodsActions')
                return;
            }
            context.commit('changeList',list)
        })
    },
    // 数据总数
    reqgoodTotal(context){
        reqGoodsCount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 修改页码
     changePag(context,page){
          context.commit('changePag',page)
          context.dispatch('reqGoodsActions')
     }
}
// 导出数据
const getters={
    list(state){
        return state.list
    },
    // 总数
    total(state){
        return state.total
    },
    size(state){
        return state.size
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