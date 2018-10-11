<template>
    <div class="mainBox">
        <div class="dlbgBox">
            <div class="dlBackground">
            </div>
        </div>
        <div class="titleBox">
            <div class="titleText">
                <img src="../../../resources/assets/pageImage/logo.png" height="72px" width="86px" class="titleImg"/>
                <div>
                    <div class="titleTextOne">辽宁网上办理</div>
                    <div class="titleTextTwo">计划生育事项平台</div>
                </div>
            </div>
        </div>
        <div>
            <div class="dlTitle">登录</div>
            <div class="dlTitleTxt">输入必要的用户名及密码完成登陆</div>
        </div>
        <van-cell-group>
            <van-field
                    class="dlInputBox"
                    v-model="user.dl_phone"
                    label="账号"
                    placeholder="请输入用户名"
            />

            <van-field
                    class="dlInputBox"
                    v-on:input="changePassword"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
            />
        </van-cell-group>
        <van-switch-cell v-model="checked" title="自动登录" class="autoLogin"/>
        <van-button type="primary" size="large" @click="denglu" class="dlBtn">进入平台</van-button>
        <div class="link-area">
            <a id="zhuche" @click="linkZc" class="linkColor">注册账号</a>
            <span class="spliter">|</span>
            <a id='forgetPassword' @click="linkForget" class="linkColor">忘记密码</a>
        </div>
        <div class="dlFoot">系统数据由辽宁省卫计委数据中心提供</div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {Field} from 'vant';
    import {SwitchCell} from 'vant';
    import {Button} from 'vant';
    import {Toast} from 'vant';
    import {Base64} from  'js-base64';
    import appConfig from '../../../resources/config/app/app.json'
    import {LOGIN} from '../../store/mutation-types'
    Vue.use(SwitchCell);
    Vue.use(Field);
    Vue.use(Button);
    export default {
        data() {
            return {
                checked: false,
                user: {openid: '', dl_phone: '', dl_password: ''}
            }
        },
        methods: {
            changePassword:function(data){
                this.user.dl_password = Base64.encode(data);
            },
            denglu: function () {
                let that = this;
                //客户端校验
                if (that.user.dl_phone == "") {
                    Toast('账号不能为空');
                    return false;
                }
                if (that.user.dl_password == "") {
                    Toast('密码不能为空');
                }

                console.log(this.user)
                let req={
                    "loginHeader":{
                        "saveTokenType":appConfig.saveTokenType
                    },
                    "dl":this.user
                }
                this.$http.post('/login', req)
                    .then(function (response) {
                        let reqdata = response.data
                        if (reqdata&&reqdata.code>=200&&reqdata.code<400) {
                            if(appConfig.saveTokenType==="1"){
                                window.localStorage.setItem("authToken",reqdata.data['authToken'])
                            }
                            that.$store.commit(LOGIN);
                            that.$router.push(that.$store.state.toPath?that.$store.state.toPath:"/")
                        } else {
                            Toast('密码错误');
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            linkZc: function () {
                this.$router.push("/wxPage/register");
            },
            linkForget: function () {
                this.$router.push("/wxPage/forgetPassword");
            }
        }
    }
</script>
<style>
    .link-area {
        display: block;
        margin-top: 15px;
        text-align: center;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    }

    .mainBox {
        width: 100%;
        height: 100%;
        background-color: #F8F8F8;
    }

    .dlbgBox {
        width: 100%;
        height: 220px;
        overflow: hidden;
    }

    .dlBackground {
        width: 140%;
        margin-left: -25%;
        height: 210px;
        background: #1B6594;
        border-bottom-left-radius: 68%;
        border-bottom-right-radius: 50%;
    }

    .titleBox {
        width: 100%;
        height: 190px;
        overflow: hidden;
        position: absolute;
        z-index: 2;
        top: 0;
    }

    .titleText {
        width: 140%;
        margin-left: -25%;
        height: 190px;
        background: #30A6F0;
        border-bottom-left-radius: 160%;
        border-bottom-right-radius: 155%;
        text-align: center;
    }

    .titleImg {
        margin-top: 30px;
        margin-left: 5%;
    }

    .titleTextOne {
        margin-top: 20px;
        margin-bottom: 8px;
        font-size: 20px;
        color: white;
        margin-left: 5%;
    }

    .titleTextTwo {
        font-size: 20px;
        color: white;
        margin-left: 5%;
    }

    .dlTitle {
        color: #7B7B7B;
        font-size: 20px;
        margin-bottom: 10px;
        margin-left: 25px;
    }

    .dlTitleTxt {
        color: #878787;
        font-size: 12px;
        margin-bottom: 5px;
        margin-left: 25px;
        margin-bottom: 25px;
    }

    .dlInputBox {
        color: #7B7B7B;
        margin-left: 10px;
    }

    .autoLogin {
        margin-top: 20px;
        padding-left: 25px;
        padding-right: 8%;
        height: 40px;
        color: #7B7B7B;
    }

    .dlBtn {
        background-color: #41BC36;
        border-radius: 10px;
        width: 92%;
        margin-left: 5%;
        margin-top: 20px;
        height: 40px;
        text-align: center;
        line-height: 14px;
    }

    .linkColor {
        color: #8F8F8F;
        font-size: 12px;
    }

    .spliter {
        color: #8F8F8F;
    }

    .dlFoot {
        position: absolute;
        width: 100%;
        font-size: 12px;
        bottom: 10px;
        color: #C1C1C1;
        text-align: center;
    }
</style>
