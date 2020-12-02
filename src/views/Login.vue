<template>
  <div class="login-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="login-tabs" stretch>
      <el-tab-pane label="用户登陆" name="login">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm"  class="demo-loginForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username" autocomplete></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="用户注册" name="register">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="demo-registerForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="registerForm.username" autocomplete></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确定密码" prop="surePassword">
            <el-input type="password" v-model="registerForm.surePassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="registerForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import api from "../api";
import jwt from "jwt-decode";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data(){
    var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            }
            else if (value.length <= 3) {
                callback(new Error("长度不够"));
            }else{
               callback();
            }
           
        };
        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }else{
               callback();
            }
        };

        var validateSurePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }else if(value !== this.registerForm.password){
              callback(new Error('两次输入密码不一致!'));
            }else{
              callback();
            }
            
        };

        var validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱"));
            }else{
               callback();
            }
        };

    return{
      activeName:'login',
      loginForm:{
        username:'',
        password:''
      },
      rules: {
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }],
                surePassword: [
                    { validator: validateSurePassword, trigger: "blur" },
                ],
                email: [{ validator: validateEmail, trigger: "blur" }],
      },
      registerForm:{
        username:'',
        password:'',
        surePassword:'',
        email:''
      }
    }
  },
  methods:{
    ...mapMutations('loginModule',['setUser']),
    handleClick(){
      // console.log(tab, event);
    },
    submitForm(){
      // console.log(this.loginForm);

      // 登录和注册同一个按钮  根据tab的名字区分
      if(this.activeName=='login'){
        // 登录请求
        api.getLogin({
        username: this.loginForm.username,
        password: this.loginForm.password,
        })
        .then((res) => {
          if (res.status === 200) {
            this.setUser({
              username: jwt(res.data).username,
              token: res.data,
            });
            // 写入本地数据
            localStorage.setItem("ego",res.data);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.$message({
            message: error.data.errors,
            type: "error",
          });
        });
      }else{
        // 注册提交
        // 先清空历史记录
        this.registerForm={
                          username:'',
                          password:'',
                          surePassword:'',
                          email:''
                        }

        // 注册请求
        api.getRegister({
        username:this.registerForm.username,
        password:this.registerForm.password,
        surePassword:this.registerForm.surePassword,
        email:this.registerForm.email
        })
        .then((res) => {
          // console.log(res);
          if(res.status==200){
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            // 跳转到登录
            this.activeName='login'
          }
        })
        .catch(error=>{
          this.$message({
            message: error.data.errors,
            type: "error",
          });
        })
      }


      
     
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    .login-form {
        padding: 40px 40px;
    }
    h3 {
        margin-top: 20px;
    }
    .login-tabs {
        border-radius: 5px;
    }
}
</style>