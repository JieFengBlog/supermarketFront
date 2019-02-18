<template>
    <el-form :model="credentials" :rules="rules2" ref="credentials" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="username">
            <el-input type="text" v-model="credentials.username" auto-complete="off" placeholder="账号" prefix-icon=" iconfont sa--gerenzhanghu"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="credentials.password" auto-complete="off" placeholder="密码" prefix-icon="iconfont sa--mima"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked"  class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {conversion} from './commons/BooleanUtil'

    export default {
        data() {
            return {
                logining: false,
                credentials: {
                    username: '',
                    password: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: false
            };
        },
        methods: {
              handleSubmit2(ev) {
                this.logining = true;
                this.$axios({
                    method:'post',
                    url:'/api/back/login/validation',
                    data:{
                        userInfo:this.credentials
                    }
                }).then((response =>{
                    if(response.data.success){
                        sessionStorage.setItem("loginStatus","true");
                        console.log("登陆成功后是否将loginStatus设置成true: " + sessionStorage.getItem("loginStatus"))
                        if(this.checked){
                            sessionStorage.setItem("checked","true");
                            sessionStorage.setItem("username",this.credentials.username);
                            sessionStorage.setItem("password",this.credentials.password);
                        }else{
                            //这里不能使用sessionStorage.clear()会把登录状态设置为false，从而导致无法登录
                            sessionStorage.setItem("checked","false");
                            sessionStorage.setItem("username","");
                            sessionStorage.setItem("password","");
                        }
                        this.$router.push('/home');
                    }else{
                        this.$message.error(response.data.errMsg);
                    }
                    this.logining = false;
                }))
            }
        },
        created() {
            //每次打开login页面都从vuex中取出checked的状态
            this.checked = conversion(sessionStorage.getItem("checked"));
            console.log("login conversion checked: " + conversion(sessionStorage.getItem("checked")))

            //如果取出来的状态为真，则证明session中存在username，password，赋值到input控件中去
            if(this.checked){
                this.credentials.username = sessionStorage.getItem("username");
                this.credentials.password = sessionStorage.getItem("password");
                console.log("checked: " + this.checked)
            }
        }
    }
</script>

<style scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 35px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>
