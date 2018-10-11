<template>
  <div style="width: 100%; height: 100%; ">
      <!--<transition   :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass"  mode="out-in">-->
        <!--<router-view style="text-align: center; width:100%"> </router-view>-->
        <router-view> </router-view>
      <!--</transition>-->
  </div>
</template>

<script>
//import { ViewBox } from 'vux'
import FastClick  from 'fastclick'
import {LOGOUT} from "../../store/mutation-types"
import appConfig from "../../../resources/config/app/app.json"
import Cookies  from 'cookies-js'

export default {
//    components: {
//        ViewBox
//    },
    data () {
        return {
            enterActiveClass:'',
            leaveActiveClass:''
        }
    },
    mounted: function () {

        FastClick.attach(document.body);
        //添加主路由页面，以解决双层路由下，首层异步路由不加载，报错的问题

        //添加response拦截,处理token认证后页面踢出
        this.$http.interceptors.response.use(
            function (res) {
                //认证错误
                debugger;
                if(res.data.code=="401"||res.status==401){
                    this.$store.commit(LOGOUT)
                    this.$route.push("/login")
                    if(appConfig.saveTokenType==2){
                        Cookies.expire('authToken');
                    }else if (appConfig.saveTokenType==1) {}

                }
                return res;
            }
        )
    }

}
</script>

<style>

</style>
