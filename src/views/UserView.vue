<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">

          <el-select v-model="selectData.role" class="m-2" placeholder="请选择" size="large">
            
            <el-option 
            
            label="全部" 
            :value="0" />
         
            <el-option v-for="item in roleList" 
            :key="item.roleId" 
            :label="item.roleName" 
            :value="item.roleId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickName" label="姓名" width="180" />
        <el-table-column prop="role" label="角色" >
          <template #default="scope">
            <el-button
              v-for="item in scope.row.role"
              :key="item.role"
              link
              size="small"
            >
             {{item.roleName}}
            </el-button>
          </template>
        </el-table-column>

         <el-table-column prop="role" label="操作" >
          <template #default="scope">
            <el-button
              
              link
              type="primary"
              size="small"
              @click="changeUser(scope.row)"
            >
            编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
  <el-dialog v-model="isShow" title="编辑信息">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="active.role" placeholder=" 请选择角色">
          <el-option v-for="item in roleList" 
            :key="item.roleId" 
            :label="item.roleName" 
            :value="item.roleId" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUser" type="primary">更改</el-button>
        <el-button  @click="dialogFormVisible = false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, toRefs,watch } from 'vue'
import { getUserList, getRoleList } from '@/request/api';
import { InitData,ListInt } from '../type/user'

const data = reactive(new InitData())
onMounted(() => {
  getUser();
  getRole();
})

const getUser = () => {
  getUserList().then((res) => {
    console.log(res.data)
    data.list=res.data.data
  })
}

const getRole = () => {
  getRoleList().then((res) => {
    console.log(res.data)
    data.roleList=res.data.data
  })
}




//查询功能
const onSubmit=()=>{
  let arr:ListInt[] = [] // 定义数组，用来接受查询过后要展示的数据
  if(data.selectData.nickName || data.selectData.role){  //判断俩个是否其中一个值
    console.log(data.selectData.nickName )
      if(data.selectData.nickName){
        arr=data.list.filter((value)=>{
          return value.nickName.indexOf(data.selectData.nickName) !== -1
        })
      }
      console.log(arr)

      if(data.selectData.role){
        arr=(data.selectData.nickName ? arr:data.list).filter((value)=>{
          //将过滤后的数组赋值给arr
          return value.role.find((item)=>item.role===data.selectData.role)
        })
      }
     
     
  } else{
        arr=data.list
  }
      
  
  data.list=arr
}
//监听输入框的俩个属性
watch([()=>data.selectData.nickName,()=>data.selectData.role],()=>{
  if(data.selectData.nickName == "" && data.selectData.role == 0){
    getUser()
  }
})

//点击编辑事件
const changeUser = (row:ListInt)=>{ 
  console.log(row)
  data.active={
    id:row.id,
    nickName:row.nickName,
    role:row.role.map((value:any)=>value.role || value.roleId)
    //role:row.role.map((value:any)=>value.role )   //map返回新的数组
  }
  // console.log(data.active.role)
  data.isShow=true
}

//点击确认更改事件
const updateUser = ()=>{
   let obj:any = data.list.find((value)=>value.id==data.active.id)
   obj.nickName = data.active.nickName
   obj.role = data.roleList.filter(value=>data.active.role.indexOf(value.roleId) !== -1)
   data.list.forEach((item,i)=>{
      if(item.id==obj.id){
        data.list[i]=obj
      }
    })
  data.isShow=false
}

const { list, roleList, selectData,isShow,active } = toRefs(data)


</script>
<style scoped></style>