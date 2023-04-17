<template>

 <div>
   <el-tree
   ref="treeRef"
    :data="list"
    show-checkbox
    node-key="roleId"
    :check-strictly="true"
    :default-checked-keys="authority"  
    :props="{
      children: 'roleList',
      label: 'name',
}"
  />
  <el-button  @click="changeAuthority">确认修改</el-button>
 </div>
<!-- default-checked-keys默认选中的数组 -->
</template>

<script setup lang='ts'>
import {ref,reactive,toRefs,onMounted} from 'vue'
import {useRoute} from  'vue-router'
import {InitData} from '../type/authority'
import {getAuthorityList} from '../request/api'
const route = useRoute() //表示获取当前活跃的路由
console.log(route)
const params:any = route.params
const data = reactive(new InitData(params.id,params.authority))


//获取权限数据
onMounted(() => {
   getAuthorityList().then(res=>{
      console.log(res)
      data.list=res.data.data
   })
});
const changeAuthority = ()=>{
   console.log(data.treeRef.getCheckedKeys().sort(function(a:number,b:number){return a-b}))
}
const {id,authority,list,treeRef} = toRefs(data)
</script>
<style scoped>

</style>