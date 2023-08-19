<template>
    <div class="user_header">
        <el-button type="primary" size="small" @click="dialogVisible = true;action='add'">+新增</el-button>
        <!-- 输入搜索 -->
        <el-form :inline="true" :model="formInline" class="serch">
            <el-form-item label="请输入">
            <el-input v-model="formInline.keyword" placeholder="请输入用户名" clearable size="small" />
            </el-form-item>
            <!-- 搜索按钮 -->
            <el-form-item>
                <el-button type="primary" @click="handleSerch"  size="small">查询</el-button>
            </el-form-item>            
        </el-form>
    </div>

    <div class="table">
        <el-table :data="list" style="width: 100%; height:600px" stripe>
            <el-table-column
            v-for="(item) in tableLabel" :key="item.prop"
            :prop="item.prop"
            :label="item.label" 
            :width="item.width? item.width : '125'"
            >
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="180"> 
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>      
        <br>  
        <el-pagination
            small
            background
            layout="prev, pager, next"
            :total="config.count"
            class="pager mt-4"
            :current-page="current_page"
            @current-change="changePage"
            />          
    </div>

<!-- 弹出表单 -->
    <el-dialog
        v-model="dialogVisible"
        :title="action == 'add' ? '新增用户' : '编辑用户'"
        width="40%"
        :before-close="handleClose"
    >
    <el-form :inline="true" :model="formUser" ref="userForm">
        <!-- 一行内 -->
        <el-row>
            <!-- 左边 一半-->
            <el-col :span="12"> 
                <el-form-item 
                label="姓名" 
                prop="name" 
                :rules="[{required:true,message:'名字不能为空'}]">
                    <el-input v-model="formUser.name" placeholder="请输入姓名" clearable />
                </el-form-item>
            </el-col>
            <!-- 右边  一半-->
            <el-col :span="12">
                <el-form-item label="年龄" prop="age"
                :rules="[{required:true,message:'年龄不能为空'},
                        {type:'number',message:'年龄必须是数字'}]"> 
                    <el-input v-model.number="formUser.age" placeholder="请输入年龄" clearable />
                </el-form-item>            
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="性别" style="width:238px" prop="sex" 
                :rules="[{required:true,message:'性别不能为空'}]">
                    <el-select
                        v-model="formUser.sex"
                        placeholder="请选择性别"
                        clearable
                    >
                        <el-option label="男" value=0 />
                        <el-option label="女" value=1 />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出生日期" prop="birth" 
                :rules="[{required:true,message:'出生日期不能为空'}]">
                    <el-date-picker
                        v-model="formUser.birth"
                        type="date"
                        placeholder="请选择出生日期"
                        clearable
                        value-format="YYYY-MM-DD"
                    />
                </el-form-item>                
            </el-col>
        </el-row>
        <el-form-item label="地址" prop="addr" :rules="[{required:true,message:'地址不能为空'}]">
            <el-input v-model="formUser.addr" placeholder="请输入地址" clearable />
        </el-form-item>          
    </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">
            确定
            </el-button>
        </span>
        </template>
    </el-dialog>

</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import api from '../../api/api';
export default {
    setup(){
        const {proxy} = getCurrentInstance() //相当于Vue2的this
        let list = ref()

        let config = reactive({
            count:0,
            page:1,
            name:""
        })
        
        let tableLabel = reactive([
            {
                prop:"name",
                label:"姓名"
            },
            {
                prop:'age',
                label:"年龄"
            },
            {
                prop:'sex',
                label:"性别"
            },
            {
                prop:'birth',
                label:"出生日期",
                width:"200"
            },
            {
                prop:'addr',
                label:"地址",
                width:"300"
            },
        ])
       
        let formInline = reactive({
            keyword:""
        })
       
       // 查询
        const handleSerch = ()=>{
            // 获取关键字
            config.name = formInline.keyword
            getUserData(config)
        }       
        
        // 弹窗的状态 添加 还是编辑
        let action = ref('add')       
       // 弹窗是否展示
        let dialogVisible = ref(false)
        // 关闭之前调用的函数
        const handleClose = (done) => {
            dialogVisible.value = false
            proxy.$refs.userForm.resetFields()
            // ElMessageBox.confirm('确定关闭')
            //     .then(() => {
            //     done()
            //     })
            //     .catch(() => {
            //     // catch error
            //     })
            }
        // 取消
        const handleCancel = ()=>{
            dialogVisible.value = false
            proxy.$refs.userForm.resetFields()
        }
        // 获取用户信息
        const getUserData = async(config)=>{
           let res = await api.getUserData(config)
           list.value = res.list.map((item)=>{
            item.sex === 0 ? item.sex = '男' : item.sex = '女'
            return item
            })
            config.count = res.count
        }

        // 修改当前页数
        const changePage = (current_page)=>{
            config.page = current_page
            getUserData(config)
        }

        // 添加用户数据
        const formUser = reactive({
            name:'',//添加用户名
            age:'',
            sex:'',
            birth:'',
            addr:''
        })
        // 表单提交事件 添加用户 编辑用户
        const onSubmit = ()=>{
            // 整个表单进行校验
            proxy.$refs.userForm.validate(async(valid)=>{
                if(valid) {
                    // 如果是新增
                    if(action === 'add') {
                       const res = await api.addUser(formUser)
                        if(res) {
                            proxy.$refs.userForm.resetFields()//重置表单  element-plus 还需要设置prop属性才会生效
                            dialogVisible.value = false //关闭表单
                            ElMessage({
                                showClose:true,
                                message: "    "+res.message+"    ",
                                type: 'success',
                                center: true,
                            })
                            //重新请求 刷新页面
                            getUserData(config)                
                        }
                    }else { //编辑
                        let res = await api.editUser(formUser)
                        if(res) {
                            proxy.$refs.userForm.resetFields()//重置表单  element-plus 还需要设置prop属性才会生效
                            dialogVisible.value = false //关闭表单
                            getUserData(config)
                            ElMessage({
                                showClose:true,
                                message: "    "+res.message+"    ",
                                type: 'success',
                                center: true,
                            })
                        }else {
                            ElMessage.error('编辑失败')
                        }
                    }
                }
                else {
                    ElMessage.error('请输入正确内容!!!')
                }

            })
        }
        //编辑用户信息 触发表单
        const handleEdit = (index,row)=>{
            action.value = 'edit'
            dialogVisible.value = true
            // $nextTick dom渲染完在执行  (在取消的时候已经重置表单，row为空，等渲染完dom 在浅拷贝 userForm 就为空 防止表单再读取userForm 的值显示)
            proxy.$nextTick(()=>{
                // 浅拷贝 给formUser 以便表单可以读出
                Object.assign(formUser,row)                
            })

            // 对性别进行处理
        } 
        // 删除用户
        const handleDelete = (index,row)=>{
            ElMessageBox.confirm('您确定删除该用户信息吗?',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
            .then(async ()=>{
                let res = await api.deleteUser(row)
                getUserData(config) //刷新数据
                if(res) {
                    ElMessage({
                                showClose:true,
                                message: "    "+res.message+"    ",
                                type: 'success',
                                center: true,
                            })
                }
            })
        }

        onMounted(()=>{
            getUserData(config)
        })
        return{
            list,
            config,
            tableLabel,
            formInline,
            dialogVisible,     
            formUser,   
            action,    
            changePage,
            handleSerch,
            handleClose,
            onSubmit,
            handleCancel,
            handleEdit,
            handleDelete
        }
    }
};
</script>
<style lang="less" scoped>
    .user_header{
        margin: 10px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        .el-form{
            height: 30px;
            line-height: 30px;
        }
    }
    .table {
        position: relative;
        .pager{
            position: absolute;
            right:5%;
        }
    }
</style>