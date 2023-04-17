<template>
  <div class="login-box">
    
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { DefineComponent, reactive,ref } from 'vue';
import {LoginData} from '../type/login';
import type { FormInstance, FormRules } from 'element-plus'
import {login} from '../request/api'
import {useRouter} from 'vue-router'


const ruleForm = reactive<LoginData>({
  username: "",
  password: ""
})

//登录
const ruleFormRef = ref<FormInstance>()
const router = useRouter()  //相当于$router
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  //对表单的内容验证
  //vaild布尔类型，为true表示验证成功反之失败
  formEl.validate((valid) => {
    if (valid) {
      login(ruleForm).then((res)=>{
        console.log(res)
        //将token进行保存
        localStorage.setItem('token',res.data.token)
        //跳转页面
        router.push('/')
      })
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
//重置
const resetForm = ()=>{
  ruleForm.username=""
  ruleForm.password=""
}
const rules = reactive({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' },
  ]
})
</script>

<style lang='scss' scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
 // padding: 1px;  
  overflow: hidden; 
  text-align: center;
  .demo-ruleForm{
    width:500px;
    margin: 200px auto;  //margin塌陷 影响到父元素
    background-color: #fff;
   padding: 40px;
    border-radius: 20px; 
  }
  .loginBtn{
    width: 48%;
  }
  h2{
    margin-bottom: 10px;
  }
}

</style>