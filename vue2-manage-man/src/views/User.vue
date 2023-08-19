<template>
    <div class="mange">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <!-- 用户表单信息 -->
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm" :inline="true">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生年月" prop="birth">
                    <el-date-picker type="date" placeholder="请选择日期" v-model="form.birth" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>                 
            </el-form>
     
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd" size="small">
                + 新增
            </el-button>
            <!-- 搜索区域 -->
            <!-- <input type="text"> -->
            <el-form :inline="true" :model="userForm" class="search" size="small">
                <el-form-item>
                    <el-input placeholder="输入查询名字" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <div class="common-table">
            <!-- table -->
            <el-table
                :data="tableData"
                style="width: 100%"
                height="96%"
                stripe >
                <el-table-column
                    label="姓名"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="性别"
                    prop="sex">
                    <!-- 自定义插槽 该插槽将替代默认的显示prop的值-->
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex == 0 ? '女' : '男' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="年龄"
                    prop="age">
                </el-table-column>             
                <el-table-column
                    label="出生日期"
                    prop="birth"
                    >
                </el-table-column> 
                <el-table-column
                    label="地址"
                    prop="addr">
                </el-table-column>    
                <el-table-column
                    label="操作"
                    prop="sex">
                    <!-- 自定义插槽 该插槽将替代默认的显示prop的值-->
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>                              
            </el-table>
            <!-- 分页 -->
            <div class="pager">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
import { getUser,addUser, editUser,deltUser } from '../api'
    export default {
        name:'User',
        data() {
            return {
                dialogVisible:false,
                form:{
                    name:'',
                    age:'',
                    sex:'',
                    birth:'',
                    addr:''
                },
                rules:{
                        /* 
                        1.required：是否必填
                        2.message：提示信息
                        3.trigger：触发事件   'blur' 失焦点
                        */                    
                    name:[

                        {required:true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    age:[
                        {required:true, message: '请输入年龄', trigger: 'blur'},
                    ],
                    sex:[
                        {required:true, message: '请选择性别', trigger: 'blur'}
                    ],                    
                    birth:[
                        {required:true, message: '请选择出生日期', trigger: 'blur'}
                    ],
                    addr:[
                        {required:true, message: '请输入地址', trigger: 'blur'}
                    ]
                },
                tableData:[],
                modalType:0, // 0 表示新增  1 表示编辑
                total:0, //当前数据条数
                pageData:{
                    page:1,
                    limit: 10
                },
                userForm:{
                    name:''
                }
            }
        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    this.$refs.form.resetFields()
                })
                .catch(_ => {});
            },
            handleAdd(){
                // 清空
                this.form = {}
                this.dialogVisible = true
                this.modalType = 0
            },
            submit(){
                // validate
                /* 
                对整个表单进行校验的方法，参数为一个回调函数。
                该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。
                若不传入回调函数，则会返回一个 promise
                */
                this.$refs.form.validate((valid)=>{
                    // console.log(valid);
                    // 通过校验
                    if (valid) {
                        // console.log(this.form);
                        if (this.modalType === 0) {
                            // 新增
                            addUser(this.form).then(res=>{
                                // 消息提示
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                    });
                                // 刷新页面
                                this.getList()
                            },err=>{
                                this.$message.error('添加失败!');                              
                            })
                        }
                        else {
                            // 编辑
                            editUser(this.form).then(res=>{
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                    });  
                                // 刷新数据
                                this.getList()                             
                            })
                        }
                        // 关闭弹窗
                        this.dialogVisible = false
                        // 清空表单
                        this.$refs.form.resetFields()
                    }
                }) 
            },
            // 编辑
            handleEdit(index,row){
                this.modalType = 1
                // 对当前数据进行深拷贝
                this.form = JSON.parse(JSON.stringify(row))
                //开启弹窗
                this.dialogVisible = true                
            },
            // 删除
            handleDelete(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // 删除
                    deltUser(row).then(res=>{
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                    this.getList()
                    },err=>{
                        this.$message.error(err.message);
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });                
            },

            // 封装获取用户数据函数
            getList(){
                // 获取数据
                getUser({params:{...this.userForm,...this.pageData}}).then(({data})=>{
                    // console.log(data);
                    this.tableData = data.list
                    this.total = data.count || 0
                },err=>{
                    console.log(err);
                })                
            },

            // 选择页码时 
            handlePage(page) {
                console.log(page);
                this.pageData.page = page
                this.getList()
            },
            // 搜索查询
            onSubmit(){
                this.getList()
            }

        },
        mounted() {
            this.getList()
        },
    }
</script>

<style lang="less" >

    .mange {
        height: 95%;
        margin-top: -20px;
       .manage-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
       
        .common-table {
            position: relative;
            // 根据父盒子计算
            height: calc(100% - 10px);
            .pager {
                position: absolute;
                bottom: -15px;
                right: 20px;
            }
        }
    }
</style>