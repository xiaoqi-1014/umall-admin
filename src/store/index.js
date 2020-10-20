import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

import {state,getters,mutations} from './mutations'
import menu from './modules/menu'
import role from './modules/role'
import {actions} from './actions'
import manage from './modules/manage' 
import cate from './modules/cate'
import speca from './modules/speca'
import good from './modules/good'
import mamber from './modules/mamber'
import banner from './modules/banner'
export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        menu,
        role,
        manage,
        cate,
        speca,
        good,
        mamber,
        banner
    }
})