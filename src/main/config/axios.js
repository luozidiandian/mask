import Axios from 'axios'
import axiosConfig from '../../resources/config/app/axios.json'
import appConfig from '../../resources/config/app/app.json'
import Cookies  from 'cookies-js'
import stringRandom from 'string-random'
let axios = Axios.create({
    baseURL:axiosConfig.baseURL,
    timeout:axiosConfig.timeout,
    withCredentials:axiosConfig.withCredentials
});
//拦截器目前无使用目的，先log如果以后有，再添加
export  let reqLogInterceptors=axios.interceptors.request.use(function(config){
    //在请求发出之前进行一些操作
    // cookie
    debugger;
    if(appConfig.saveTokenType==2){
        let token =Cookies.get("authToken")
        let authStr="Bearer "+token;
        config.headers.common['Authorization']=authStr;

    }
    config.headers.common['appType']=appConfig.appType;
    config.headers.common['TimeStamp']=new Date().getTime();
    config.headers.common['nonce'] =stringRandom(16)
    console.log(config)
    return config;
},function(err){
    //Do something with request error
    return Promise.reject(error);
});
//添加一个响应拦截器
export let resLogInterceptors =axios.interceptors.response.use(function(res){
    //在这里对返回的数据进行处理
    console.log(res)
    return res;
},function(err){
    //Do something with response error
    return Promise.reject(error);
})

export default axios