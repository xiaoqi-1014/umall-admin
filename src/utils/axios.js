import axios from 'axios'
import qs from 'qs'
import Vue from "vue"
import store from '../store'
import {successAlert,warningAlert} from '../utils/alert'
import {router} from '../utils/axios'

// 开发环境
// Vue.prototype.$img="http://localhost:3000"
// let baseUsl='/api'

// 打包环境
Vue.prototype.$img=""
let baseUsl=''

// 请求拦截
  axios.interceptors.request.use(req=>{
    //   console.log('======请求拦截======');
    //   console.log(req);
    if(req.url!==baseUsl+'/api/userlogin'){
        req.headers.authorization=store.state.userinfo.token
    }
      return req;
  })

// 响应拦截
axios.interceptors.response.use(res=>{
    // console.group('本次请求路径是：'+res.config.url)
    // console.log(res);
    if(res.data.msg=='登录已过期或访问权限受限'){
        warningAlert('登录已过期或访问权限受限')
          router.push('/login')
    }
    console.groupEnd();
    return res;
})

// 菜单添加
export const reqMenuAdd=(params)=>{
     return axios({
         url:baseUsl+"/api/menuadd",
         method:'post',
         data:qs.stringify(params)
     })
}

// 菜单列表
export const reqMenuList=()=>{
      return axios({
          url:baseUsl+'/api/menulist',
          method:'get',
          params:{
             istree:true
          }
      })
}

// 菜单删除
export const reqMenuDel=(id)=>{
    return axios({
        url:baseUsl+'/api/menudelete',
        method:'post',
        data:qs.stringify({id:id})
    })
}
// 菜单查询
export const reqMenuinfo=(id)=>{
      return axios({
          url:baseUsl+"/api/menuinfo",
          method:'get',
          params:{
              id:id,
          }
      })
}
//菜单编辑
export const reqMenudit=(form)=>{
    return axios({
        url:baseUsl+'/api/menuedit',
        method:'post',
        data:qs.stringify(form)
    })
}
/*=======角色管理=========*/
//添加
export const reqRoleadd=(form)=>{
    return axios({
         url:baseUsl+'/api/roleadd',
         method:"post",
         data:qs.stringify(form)
    })
} 

// 角色列表
export const reqRolelist=()=>{
    return axios({
        url:baseUsl+'/api/rolelist',
        method:'get'
    })
}
// 删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUsl+'/api/roledelete',
        method:'post',
        data:qs.stringify({id:id})
    })
}

// 获取一条数据
export const reqRoleDetail=(id)=>{
    return axios({
        url:baseUsl+'/api/roleinfo',
        method:'get',
        params:{id}

    })
}
// 修改
export const reqRoleUpdate=(params)=>{
         return axios({
             url:baseUsl+'/api/roleedit',
             method:'post',
             data:qs.stringify(params)
         })
}

// 管理员管理

// 添加
export const reqManageAdd=(params)=>{
    return axios({
        url:baseUsl+'/api/useradd',
        method:'post',
        data:qs.stringify(params)
    })
}

// 管理员总数 （用于计算分页）
export const reqManageount=()=>{
    return axios({
        url:baseUsl+'/api/usercount',
        method:'get',
    })
}

// 管理员列表（分页）
  export const reqManagelist=(params)=>{
      return axios({
          url:baseUsl+'/api/userlist',
          method:'get',
          params:params
      })
  }

//   管理员获取（一条）
export const reqManageinfo=(uid)=>{
    return axios({
        url:baseUsl+'/api/userinfo',
        method:'get',
        params:{uid:uid}
    })
}

// 管理员修改
export const reqManagedit=(params)=>{
    return axios({
        url:baseUsl+"/api/useredit",
        method:'post',
        data:qs.stringify(params)
    })
}

// 管理员删除

export const reqManagelete=(uid)=>{
    return axios({
        url:baseUsl+'/api/userdelete',
        method:'post',
        data:qs.stringify({uid:uid})
    })
}

// 管理员登录
export const reqManagelogin=(params)=>{
    return axios({
        url:baseUsl+"/api/userlogin",
        method:'post',
        data:qs.stringify(params)
    })
}
/*=========商品分类============*/

// 添加
export const reqCateAdd=(params)=>{
       let data=new FormData()
       for(let i in params){
           data.append(i,params[i])
       }
    return axios({
        url:baseUsl+"/api/cateadd",
        method:'post',
        data:data
    })
}
// 商品分类列表  istree=true 否：不传
export const reqCatelist=(params)=>{
    return axios({
        url:baseUsl+'/api/catelist',
        method:'get',
        params:params
    })
}

// 商品分类获取一条
export const reqCateinfo=(id)=>{
    return axios({
        url:baseUsl+'/api/cateinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

// 修改商品
export const reqCatedit=(params)=>{
    let data=new FormData()
    for(let i in params){
        data.append(i,params[i])
    }
    return axios({
        url:baseUsl+'/api/cateedit',
        method:'post',
        data:data
    })
}
// 删除
export const reqCateDel=(id)=>{
    return axios({
        url:baseUsl+'/api/catedelete',
        method:'post',
        data:qs.stringify({id:id})
    })
}

/*========商品规格==========*/

// 添加
export const reqSpecsAdd=(params)=>{
    return axios({
        url:baseUsl+'/api/specsadd',
        method:'post',
        data:qs.stringify(params)
    })
}

// 商品规格总数
export const reqSpecsount=()=>{
    return axios({
        url:baseUsl+"/api/specscount",
        method:'get',
    })
}

// 商品规格列表分页
export const reqSpecsList=(params)=>{
    return axios({
        url:baseUsl+'/api/specslist',
        method:'get',
        params:params
    })
}

// 商品规格获取一条
export const reqSpecsinfo=(id)=>{
    return axios({
        url:baseUsl+'/api/specsinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

// 商品规格修改
export const reqSpecsDit=(params)=>{
    return axios({
        url:baseUsl+'/api/specsedit',
        method:'post',
        data:qs.stringify(params)
    })
}

// 商品规格删除
export const reqSpecsDel=(id)=>{
    return axios({
        url:baseUsl+'/api/specsdelete',
        method:'post',
        data:{id:id}
    })
}

// ==========商品管理================

// 添加
export const reqGoodsAdd=(form)=>{
    // 参数里面有文件需要用FormData进行传参
    let data=new FormData()
      for(let i in form){
          data.append(i,form[i])
      }
    return axios({
        url:baseUsl+'/api/goodsadd',
        method:'post',
        data:data, 
    })
}

// 总数
export const reqGoodsCount=()=>{
    return axios({
        url:baseUsl+'/api/goodscount',
        // 如果参数是get可以省略不写，应为浏览器默认是get
    })
}


// 列表数据
export const reqGoodsList=(params)=>{
    return axios({
        url:baseUsl+'/api/goodslist',
        method:'get',
        params:params
    })
}

// 商品详情

export const reqGoodsDetail=(params)=>{
    return axios({
        url:baseUsl+'/api/goodsinfo',
        method:'get',
        params:params
    })
}

// 修改
export const reqGoodsUpdate=(form)=>{
    let data=new FormData()
    for(let i in form){
        data.append(i,form[i])
    }
    return axios({
        url:baseUsl+'/api/goodsedit',
        method:'post',
        data:data
    })
}

// 删除
export const reqGoodsDel=(id)=>{
    return axios({
        url:baseUsl+'/api/goodsdelete',
        method:'post',
        data:qs.stringify({id:id})
    })
}

// ===========会员管理===========

// 添加

// 列表
export const reqMemberList=()=>{
    return axios({
        url:baseUsl+'/api/memberlist',
        method:'get',
    })
}

// 会员获取一条
export const reqMemberInfo=(uid)=>{
    return axios({
        url:baseUsl+'/api/memberinfo',
        method:'get',
        params:{uid}
    })
}

// 会员修改
export const reqMemberEdit=(params)=>{
    return axios({
        url:baseUsl+'/api/memberedit',
        method:'post',
        data:qs.stringify(params)
    })
}

// 轮播图管理==============

// 添加
 export const reqBannerAdd=(params)=>{
     let data=new FormData()
     for(let i in params){
        data.append(i,params[i])
    }
        return axios({
            url:baseUsl+'/api/banneradd',
            method:'post',
            data:data
        })
 }

//  列表
export const reqBannerList=()=>{
    return axios({
        url:baseUsl+'/api/bannerlist',
        method:'get'
    })
}

// 轮播图获取一条
export const reqBannerinfo=(id)=>{
    return axios({
        url:baseUsl+'/api/bannerinfo',
        method:'get',
        params:id
    })
}

// 轮播图修改
export const reqBanneredit=(params)=>{
    let data=new FormData()
    for(let i in params){
       data.append(i,params[i])
   }
    return axios({
        url:baseUsl+'/api/banneredit',
        method:'post',
        data:data
    })
}

// 轮播图删除
export const reqBannerDel=(id)=>{
    return axios({
        url:baseUsl+'/api/bannerdelete',
        method:'post',
        data:{id}
    })
}

// =======秒杀活动============
// 添加
 export const reqSeckAdd=(params)=>{
     return axios({
         url:baseUsl+'/api/seckadd',
         method:'post',
         data:qs.stringify({params})
     })
 }

//  列表
export const reqSeckList=()=>{
    return axios({
        url:baseUsl+'/api/secklist',
        method:'get',
    })
}

// 限时秒杀获取一条
export const reqSeckinfo=(id)=>{
    return axios({
        url:baseUsl+'/api/seckinfo',
        method:'get',
        params:id
    })
}

// 限时秒杀修改
export const reqSeckEdit=(params)=>{
    return axios({
        url:baseUsl+'/api/seckedit',
        method:'POST',
       data:qs.stringify({params})
    })
}

// 限时秒杀删除
export const reqSeckDel=(id)=>{
    return axios({
        url:baseUsl+'/api/seckdelete',
        method:'POST',
       data:id
    })
}