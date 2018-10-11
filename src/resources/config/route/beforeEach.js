import {CHANGETOPATH, LOGIN} from "../../../main/store/mutation-types";
import appConfig from "../../../resources/config/app/app.json"
import anon from "../../../resources/config/app/anon.json"
import Cookies from 'cookies-js'
function getToken(){
    if (appConfig.saveTokenType == 2){
        return Cookies.get("authToken")
    }else if(appConfig.saveTokenType == 1){
        return window.localStorage['authToken']
    }else {
        return null;
    }
}

function isAuth(path){
    debugger;
    for(let key in anon){
        if (path===anon[key]){
            return false
        }
    }

    return true

}
exports.loginEach = function (store, router, Axios) {
    router.beforeEach((to, from, next) => {
        // if (to.path !== "/login") {
        if (isAuth(to.path)) {
            if (store.state.logined) {
                // 有登录状态即可正常访问页面
                //注意vuex的状态是存储在内存中的，所以每当刷新一次，其值为空，在这里使用的目的是在单页面访问时，减少频繁验证token的次数，当然每次请求后端其实都会验证token
                //next(store.state.toPath!=""?store.state.toPath:"/")
                next();
            } else {
                    // 获取token
                    let token = getToken();
                    if (!token) {
                        store.commit(CHANGETOPATH, to.path)
                        //无token踢到登录页面
                        next({path: "/login"});
                    } else {
                        //进行token认证
                        Axios.post("/validateToken").then(function (res) {
                            debugger;
                                if (res.data.code == 200) {
                                    //认证成功
                                    store.commit(LOGIN)
                                    //next(store.state.toPath!=""?store.state.toPath:"/")
                                    next();
                                }else{
                                    store.commit(CHANGETOPATH, to.path)
                                    next({path: "/login"});
                                }
                            }
                        ).catch(function (error) {
                            store.commit(CHANGETOPATH, to.path)
                            next({path: "/login"});
                        })
                    }

            }


        } else {
            //直接请求login 默认跳到首页
            next();
        }
        // console.log(store.state.logined)
    })

}