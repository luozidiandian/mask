/**
 * Created by wangtingshun on 2018/5/8.
 */
import VueRouter from 'vue-router'
import routerBase from '../../../main/components/router/router.vue'
const dirVars = require('../webpack/base/dir-structure.config.js');
let path = require('path');
let router =new VueRouter({
    // routes:router
})
router.base="/index/";
//此处会扫描该包下所有文件，对应生成文件 20180524 修改读取文件方法
const components = require.context('../../../main/common', true, /.vue$/)

const routeConfig = []
const routeArray= []
const baseRoute ="loading"

// let routeObject ={}

// function searchVue(commonPath){
//     fs.readdir(commonPath,function(err,files){
//         if(err){
//             console.warn(err)
//         }else{
//             files.forEach(function(filename){
//                 debugger;
//                 let filedir = path.join(filePath,filename);
//                 //根据文件路径获取文件信息，返回一个fs.Stats对象
//                 fs.stat(filedir,function(error,stats){
//                     if(error){
//                         console.warn('获取文件stats失败');
//                     }else{
//                         let isFile = stats.isFile();//是文件
//                         let isDir = stats.isDirectory();//是文件夹
//                         if(isFile){
//                             //只处理vue结尾的
//                             if(path.extname(filedir)==="vue"){
//                                 let relativePath = path.relative(dirVars.commonDir,filedir)
//                             }
//                         }
//                         if(isDir){
//                             searchVue(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
//                         }
//                     }
//                 })
//             })
//         }
//     })
//
// }
//
// searchVue(dirVars.commonDir);
// routeConfig.push(createRouteConfig("/",  "/baseHome/baseHome.vue"))
components.keys().forEach((n) => {
    let first = n.indexOf("/");
    let second = n.lastIndexOf("/");
    const path =n.slice(first,second);

    // const dir ='../../../main/common'+path;
    // let childRoutes=[]
    // const childComponents =require.context(dir, true, /.vue$/)
    //     childComponents.keys().forEach((j) => {
    //         let first = j.indexOf("/");
    //         let second = j.lastIndexOf("/");
    //         childRoutes.push(createRouteConfig(j.slice(first,second),  j.slice(1),[]))
    // })

    //只加载首层
    //其他层按children加载
    let deep =n.split("/");
    // if(n==='./baseHome/baseHome.vue'){
    const basePath ='/'+baseRoute+'/'+baseRoute+'.vue'
    if(n==='.'+basePath){
        //默认首页
        routeConfig["/"]=createRouteConfig("/",  basePath,[]);
        routeConfig["/"+baseRoute]=createRouteConfig("/"+baseRoute,  basePath,[]);
    }else if(deep.length<=3)
        {

        // routeObject[path]=createRouteConfig(path,  n.slice(1),[]);
        // routeConfig[path]=createRouteConfig(path,  n.slice(1),[]);
        routeConfig[path] = {
            path :path,
            component:routerBase,
            children:[ {
                path: '',
                component: function(resolve) {
                    const handler = require('bundle-loader?name=[name]!../../../main/common' + n.slice(1))
                    handler(module => resolve(module))
                }
            },]
        }
        // routeConfig.push(createRouteConfig(path,  n.slice(1),[]))
    }
    // else {
    //     const space =deep[0]+"/"+deep[1]+"/";
    //     const start = n.indexOf(space)+space.length
    //     const key ="/"+deep[1]
    //     routeConfig[key]["children"].push(createRouteConfig(n.slice(start,second),  n.slice(1),[]));
    // }


})

components.keys().forEach((n) => {
    let first = n.indexOf("/");
    let second = n.lastIndexOf("/");
    const path =n.slice(first,second);
    let deep =n.split("/");
    const basePath ='/'+baseRoute+'/'+baseRoute+'.vue'
    if(deep.length>3){
        const space =deep[0]+"/"+deep[1]+"/";
        const start = n.indexOf(space)+space.length
        const key ="/"+deep[1]
        routeConfig[key]["children"].push(createRouteConfig(n.slice(start,second),  n.slice(1),[]));
    }
})
function createRouteConfig (path, view ,children) {

    return {
        path:path,
        component: function(resolve) {
            const handler = require('bundle-loader?name=[name]!../../../main/common' + view)
            handler(module => resolve(module))
        },
        children:children
    }
}
for (let index in routeConfig){
    routeArray.push(routeConfig[index])
}

router.addRoutes(routeArray);


export default router
