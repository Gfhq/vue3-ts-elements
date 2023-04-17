<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="datalist.comList" border style="width: 100%">
      <el-table-column prop="id" label="Date" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />

    </el-table>
    <el-pagination @current-change="currentChange" 
    @size-change="sizeChange" 
    layout="prev, pager, next"
      :total="selectData.count " 
      :page-size="selectData.pagesize"/>
      


  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, toRef, computed,watch,onMounted } from 'vue'
import { getGoodsList } from "../request/api"
import { InitData, ListData} from "../type/goods"

const data = reactive(new InitData())

//列表展示+分页 先显示页面再加载数据
onMounted(() => {
  getGoods()


});

const getGoods=()=>{

  getGoodsList().then(res => {
  // list = res.data.data
  //
  data.list = res.data.data    //自动加了proxy
  //console.log(data.list)
  data.selectData.count = res.data.data.length
  //console.log(data.list)

});
} 
getGoodsList().then(res => {
  // list = res.data.data
  //
  data.list = res.data.data    //自动加了proxy
  //console.log(data.list)
  data.selectData.count = res.data.data.length
  //console.log(data.list)

});

//对list数组进行分割得到对应的显示的数组数据
const datalist = reactive({
  comList: computed(() => {
    return data.list.slice((data.selectData.page - 1) * data.selectData.pagesize, (data.selectData.page) * data.selectData.pagesize)
  })
})
const currentChange = (page: number) => {
  data.selectData.page = page
}
const sizeChange = (pagesize: number) => {
  data.selectData.pagesize = pagesize
}
//let selectData = toRef(data,'selectData')
//let {list} = data  //es6解构


//let { selectData, list } = toRefs(data)  //es6解构
let { selectData, list } = toRefs(data)  //es6解构






//查询功能
const onSubmit=()=>{
  let arr:ListData[] = [] // 定义数组，用来接受查询过后要展示的数据
  if(data.selectData.title || data.selectData.introduce){  //判断俩个是否其中一个值
    console.log(data.selectData.title )
      if(data.selectData.title){
        arr=data.list.filter((value)=>{
          return value.title.indexOf(data.selectData.title) !== -1
        })
      }
      console.log(arr)

      if(data.selectData.introduce){
        arr=data.list.filter((value)=>{
          return value.title.indexOf(data.selectData.introduce) !== -1
        })
      }
     
     
  } else{
        arr=data.list
  }
      
  data.selectData.count= arr.length
  data.list=arr
}
//监听输入框的俩个属性
watch([()=>data.selectData.title,()=>data.selectData.introduce],()=>{
  if(data.selectData.title == "" && data.selectData.introduce == ""){
    getGoods()
  }
})


</script>
<style scoped></style>