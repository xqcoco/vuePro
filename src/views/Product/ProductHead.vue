<template>
  <div class="head">
      <el-form :inline="true" :model="search" class="demo-form-inline" @submit.native.prevent>
      
        <el-form-item >
            
          <el-input 
           v-model="search.text" 
           placeholder="输入你想查询的" 
           autofocus
           @keyup.enter.native="onSubmitSearch"
          >
          </el-input>
           
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmitSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitAdd">添加</el-button>
        </el-form-item>
      
      </el-form>
  </div>
</template>

<script>
import api from '../../api'

export default {
    name:'ProductHead',
    data(){
      return{
        search:{
          text:''
        }
      }
    },
    methods:{
      /**
       * 点击查询事件
       */
      onSubmitSearch(){
        api.getSearch({
          search:this.search.text
        }).then(res =>{
          // console.log(res);
          if(res.status==200){
            // console.log(Array.isArray(res.data));
            if(Array.isArray(res.data)){
              this.$bus.$emit("searchData",res.data)
            }else{
              this.$bus.$emit("searchData",[])

            }
          }
          
        }).catch(error=>{
          // console.log(error);
          this.$bus.$emit("searchData",[])
        })
      },
      /**
       * 点击添加事件
       */
      onSubmitAdd(){
        this.$bus.$emit("ProductDialogVisible",true);
      }
    }
}
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1230px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>