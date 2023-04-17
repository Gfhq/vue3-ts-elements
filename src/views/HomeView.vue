<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><img src="../assets/logo.png" alt="" class="logo"></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>

          <el-col :span="4" class="col-btn"><el-button  @click="delToken">退出登录</el-button> </el-col>
        </el-row>
      </el-header>
      <el-container>
        
        <el-aside width="200px">
          <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        :default-active="route.path"
        text-color="#fff"
        router
      >
        <!-- 使用上面的router开启路由模式 通过el-menu-item index来进行跳转 -->
        <el-menu-item  :index="item.path" v-for="item in list" :key="item.path">
          
          {{item.meta.title}}
        </el-menu-item>
        
      </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
   import {useRouter,useRoute} from 'vue-router'
   const route = useRoute()
   const router = useRouter()
   const list =router.getRoutes().filter(v=>v.meta.isShow)
   const delToken=()=>{
     localStorage.removeItem('token') 
     router.push('/login')
   }
</script>

<style lang="scss" scoped>
  

  .el-header{
    background-color: #666;
    height: 80px;
    .logo,h2,.quit-login{
    text-align: center;  //水平居中显示
    height: 80px;
    line-height: 80px;  //垂直居中显示
    color: #fff;
    }
    .col-btn{
      height:80px;
      line-height:80px;
    }
  }

  .el-aside{
    
    .el-menu{
      height: calc(100vh - 80px);
    }
  }

  
 
</style>
