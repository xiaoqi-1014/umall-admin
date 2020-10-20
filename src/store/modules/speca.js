import {reqSpecsList,reqSpecsount} from '../../utils/axios'

// 状态
const state={
    list:[],
    // 一页的数量
    size:2,
    // 总数
    total:0,
    // 修改页码
    page:1,
}

// 修改状态
const mutations={
    changelist(state,arr){
        state.list=arr
    },
    // 修改总数
    changeTotal(state,num){
        state.total=num
    },
    //  页码
    changePage(state,page){
        state.page=page
    }
}

// 接收页面传过来的动作
const actions={
    reqSpecs(context,bool){
        let  params= bool==true? {}:{page:context.state.page, size:context.state.size}
        reqSpecsList(params).then(res=>{
          let list=res.data.list
        // 判断一下当前数组的长度是否为0 ，如果为0，就让页码减一，展现上一条数据
        if(context.state.page>1&&list.length==0){
                context.commit('changePage',context.state.page-1)
                context.dispatch('reqSpecs')
                return; 
        };
          list.forEach(i=>{
            //  将字符串转成数组
              i.attrs=JSON.parse(i.attrs)
          })
            context.commit('changelist',res.data.list)
        })
    },
    // 总数
    reqSpeunt(context){
        reqSpecsount().then(res=>{
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 修改页码
    changePageActio(context,page){
        context.commit('changePage',page)
        context.dispatch('reqSpecs')
    }
}

// 导出数据
const getters={
    list(state){
        return state.list
    },
    size(state){
        return state.size
    },
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
    namespaced:true,
}