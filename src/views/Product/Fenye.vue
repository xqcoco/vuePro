<template>
  <div class="fenye">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next, jumper"
      :total="total"
      class="fenye-content"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from '../../api'

export default {
    name:'Fenye',
    methods: {
      handleSizeChange() {
      },
      handleCurrentChange(val){
        //  console.log('handleCurrentChange',val);
         this.$bus.$emit("page",val);
      }
    },
    data() {
      return {
        currentPage: 1,
        total:0
      };
    },
    mounted() {
      this.$bus.$on("FenyeqiFlag",value => {
        //接受list 传递请求  更新分页器
        if(value){
          api.getTotal().then((res) => {
            this.total = res.data.result[0]["count(*)"];
        });
        }
      })

        api.getTotal().then((res) => {
            this.total = res.data.result[0]["count(*)"];
        });
    },
}
</script>

<style scoped lang='less'>
.fenye{
    margin: 40px auto 20px;

    .fenye-content{
        text-align: center;
    }
}
</style>