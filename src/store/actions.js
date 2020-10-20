// 接收组件派发的动作
export const actions={
    reqLogin(context,info){
        context.commit('changeList',info)
    }
}