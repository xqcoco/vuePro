<template>
  <div>
    <el-dialog
         title="添加商品"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose"
    >
        <el-form 
            :model="addForm" 
            label-width="100px" 
            :label-position="labelPosition"
        >
            <el-form-item label="商品类目">
                <el-button class="category" type="primary" @click="dialogSelectVisible = true">类目选择</el-button>
                <span class="category">{{treeData.name}}</span>
                <el-dialog
                    title="类目选择"
                    :visible.sync="dialogSelectVisible"
                    width="50%"
                    append-to-body
                >
                    
                    <LeimuSelect @treeData='getTreeData'/>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogSelectVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
             <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="addForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="addForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-button class="category" type="primary" @click="dialogUploadVisible = true">图片上传</el-button>
                <span class="category">{{imgData.url}}</span>
                <el-dialog
                    width="50%"
                    title="上传图片"
                    :visible.sync="dialogUploadVisible"
                    append-to-body
                >
                    <UpImage @upload="receiveDate"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <WangText @onEditor="getWangText"/>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureSubmit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import BaiduText from './BaiduText'
import WangText from './WangText'
import UpImage from './UpImage'
import LeimuSelect from './LeimuSelect'

import api from '../../api'

import {mapMutations} from 'vuex'

export default {
    name:'Huihuakuang',
    data(){
        return{
            dialogVisible:false,
            addForm:{
                name:'',
                sellPoint:'',
                price:'',
                num:'',
            },
            labelPosition:'left',
            dialogUploadVisible:false,
            dialogSelectVisible:false,
            treeData:'',
            imgData:'',
            wangText:''
        }
    },
    components: {
        BaiduText,
        WangText,
        UpImage,
        LeimuSelect
    },
    mounted(){
         this.$bus.$on("ProductDialogVisible",flag=>{
             this.dialogVisible = true
         });
    },
    methods:{

        handleClose(){},
        /**
         * 添加产品事件
         */
        sureSubmit(){
            api.insertTbItem({
                title: this.addForm.name,
                cid: this.treeData.cid,
                sellPoint: this.addForm.sellPoint,
                price: this.addForm.price,
                num: this.addForm.num,
                desc: this.wangText,
                image: this.imgData.url,
            })
            .then((res) => {
                 if (res.data.status === 200){
                    this.dialogVisible = false
                    // 发送刷新命令
                    this.$bus.$emit("ifOk", true);
                    /**
                     * 初始化
                     */
                    this.clearHistory();

                 }else{
                    this.$message.error('添加失败');
                 }
            })


            

        },
        /**
         * 接收图片的参数，并隐藏二级框
         */
         receiveDate(data){
            // console.log(data);
            this.imgData=data;
            this.dialogUploadVisible = false;
        },
        /**
         * 接受类目选择传递的数据
         */
        getTreeData(data){
            this.treeData = data;
        },
        /**
         * 接受王-富文本信息 
         */
        getWangText(data){
            this.wangText = data
        },
        //清理历史记录
        clearHistory(){
            // 清空历史记录
            this.treeData = '';
            this.imgData='';
            this.wangText='';
            this.addForm={
                name:'',
                sellPoint:'',
                price:'',
                num:'',
            }
        }
    }
}
</script>

<style scoped lang="less">
.category {
    float: left;
    margin-right: 20px;
}
.upload-img {
    width: 400px;
    float: left;
}
</style>