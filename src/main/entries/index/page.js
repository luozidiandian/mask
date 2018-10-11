/**
 * Created by wangtingshun
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import index from '../../common/app/app.vue';
import './globe.css';
import 'animate.css';
import store from '../../store'
import Axios from '../../config/axios'
import VueTouch from 'vue-touch';
import VueAxios from 'vue-axios'
import router from  '../../../resources/config/route'
import { loginEach } from  '../../../resources/config/route/beforeEach'
import { sync } from 'vuex-router-sync'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import VueLodash from 'vue-lodash'
import './globe.css'
import '../../../resources/assets/iconfont/font-awesome.css'
//添加路由
Vue.use(VueRouter)
//添加状态管理
Vue.use(Vuex)
//路由状态添加到vuex
sync(store, router)
//添加login守卫
loginEach(store, router,Axios)
//使用vueTOUCH last
Vue.use(VueTouch, {name: 'v-touch'})
//使用axios
Vue.use(VueAxios, Axios)
//使用手势库
Vue.use(AlloyFingerPlugin, {
    AlloyFinger
})
//使用lodash
const _options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, _options) // options is optional

//组件注册
import { Swiper } from 'vux'
Vue.component('swiper', Swiper)
import { Group } from 'vux'
Vue.component('group', Group)
import { Cell as vuxCell } from 'vux'
Vue.component('vuxCell', vuxCell)


import { Toast } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

import { NavBar } from 'vant';
Vue.use(NavBar);
import { Search } from 'vant';
Vue.use(Search);

import { Field } from 'vant';
Vue.use(Field);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);
import { AddressList } from 'vant';
Vue.use(AddressList);
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
new Vue({
    el: '#app',
     router,
     store,
    render: h => h(index)
})
