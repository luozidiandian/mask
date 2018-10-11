/**
 * Created by wangtingshun on 2017/4/24.
 */
let path = require('path');
let moduleExports = {};

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../../../../'); // 项目根目录
moduleExports.srcRootDir = path.resolve(moduleExports.staticRootDir, './src'); // 项目业务代码根目录
moduleExports.vendorDir = path.resolve(moduleExports.staticRootDir, './vendor'); // 存放所有不能用npm管理的第三方库
moduleExports.mainDir = path.resolve(moduleExports.srcRootDir, './main'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.resourceDir = path.resolve(moduleExports.srcRootDir, './resources'); // 存放各个页面使用到的公共资源
moduleExports.entriesDir = path.resolve(moduleExports.mainDir, './entries'); // 存放入口文件webpack会根据该目录生成多入口（如果需要的话）
moduleExports.commonDir = path.resolve(moduleExports.mainDir, './common'); // 存放公用的业务逻辑,一次性的业务vue组件
moduleExports.storeDir = path.resolve(moduleExports.mainDir, './store'); // 存放vuex,即业务数据
moduleExports.libsDir = path.resolve(moduleExports.resourceDir, './libs');  // 与业务逻辑无关的库都可以放到这里
moduleExports.configDir = path.resolve(moduleExports.resourceDir, './config'); // 存放各种配置文件
moduleExports.componentsDir = path.resolve(moduleExports.mainDir, './components'); // 存放vue组件
moduleExports.layoutDir = path.resolve(moduleExports.resourceDir, './layouts'); // 存放UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路

// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './build'); // 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
moduleExports.dllDir = path.resolve(moduleExports.buildDir, './dll'); // 存放由各种不常改变的js/css打包而来的dll

module.exports = moduleExports;
