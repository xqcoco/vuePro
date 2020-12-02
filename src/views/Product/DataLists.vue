<template>
  <div>
      <el-table :data="tableData" :header-cell-style="{'backgroundColor':'#545C64',color:'#303133'}">
        <el-table-column prop="id" label="商品ID"  show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="title" label="商品名称"  show-overflow-tooltip width="200"></el-table-column>
        <el-table-column prop="image" label="商品图片"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点"  show-overflow-tooltip width="300"></el-table-column>
        <el-table-column prop="price" label="商品价格"  show-overflow-tooltip width="100"></el-table-column>
        <el-table-column prop="num" label="商品数量"  show-overflow-tooltip width="100"></el-table-column>
        <el-table-column show-overflow-tooltip prop="descs" label="商品描述" width="300">
            <template slot-scope="scope">
                <div v-html="scope.row.descs"></div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import api from '../../api'

export default {
    name:'DataLists',
    data(){
        return{
            tableData:[]
        }
    },
    mounted(){
        this.http(1);

        this.$bus.$on("page", (val) => {
            this.http(val);
        });

        this.$bus.$on("searchData",list=>{
             this.tableData = list
         });

        this.$bus.$on("ifOk",flag=>{
             if(flag){
                 this.http(1);

                //  让分页器重新渲染
                this.$bus.$emit("FenyeqiFlag",true);
             }
         });
        
    },
    methods: {
        http(page) {
            // 启动loading
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
            });
            api.getSelectTbItemAllByPage({
                page,
            }).then((res) => {
                // console.log(res);
                //关闭Loading
                 loading.close();
                this.tableData = res.data;
            })
            .catch(error=>{
                //关闭Loading
                loading.close();
            })
        },
        /**
         * 编辑
         */
        handleEdit(index, row){
            // console.log(index, row);
            this.$bus.$emit("onEdito", row);
        },
        /**
         * 删除
         */
        handleDelete(index, row){
            // console.log(index, row);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                    api.deleteItemById({
                        id: row.id,
                    }).then((res) => {
                        if (res.data.status === 200) {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });

                             // eventBus  让分页器重新渲染
                              this.$bus.$emit("FenyeqiFlag",true);
                            

                            this.http(1); // 刷新页面

                           
                        } else {
                            this.$message({
                                type: "error",
                                message: "删除失败!",
                            });
                        }
                    });
            })

            .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        }
    },
    
}
</script>

<style>

</style>