<template>
    <div id="user">
    <el-col :span="24" class="toolbar" >
        <el-form :inline="true" style="margin-top:5px; ">
            <el-form-item>
                <el-button type="primary" @click="addUserBtn">添加用户</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="输入查询关键字" ></el-input>
            </el-form-item>
        </el-form>
    </el-col>
        <el-col :span="24">
            <el-card>
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px;">用户列表</span>
                    <i class="el-icon-tickets" style="float: right; padding: 3px 0"></i>
                </div>
                <el-table
                        :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                        style="width: 100%"
                        v-loading="loading"
                        border
                        :default-sort = "{prop: 'date', order: 'descending'}"
                >
                    <el-table-column
                            prop="name"
                            label="姓名"
                            sortable
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="phone"
                            label="手机号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="email"
                            width="250"
                            label="邮箱">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            width="250"
                            label="地址">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="registerTime"
                            width="250"
                            label="注册时间">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="editUserInfoBtn(scope.row)"
                            >编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteUser(scope.row.id)"
                            >删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <!--分页按钮-->
                <el-container style="margin-top: 30px;" >
                    <el-pagination
                            style="margin: 0 auto;"
                            background
                            :current-page="currentPage"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[5, 8, 10, 15]"
                            :page-size="currentSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">
                    </el-pagination>
                </el-container>
            </el-card>
        </el-col>
        <!--当点击添加用户的按钮时弹出的diglog-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="user" :rules="userRules">
                <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="user.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="user.phone" autocomplete="off"  type="number" :row="2"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="user.email" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="user.address" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditUser" >确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                dialogFormVisible:false,
                addOrEdit:true,// true是添加  false是编辑
                dialogTitle:'',
                currentPage:1,
                currentSize:8,
                tableData: [],
                multipleSelection: [],
                loading:false,
                formLabelWidth:'120px',
                user:{
                    id:null,
                    name:'',
                    phone:'',
                    email:'',
                    address:'',
                    userStatus:1,
                    registerTime:null,
                },
                userRules:{
                    name:[
                        {required:true,message:'请输入用户姓名',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            deleteUser(id){
                this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$axios({
                        method:'post',
                        url:'/api/back/user/deleteuser',
                        data:{
                            userId:id
                        }
                    }).then(response =>{
                        if(response.data.success){
                            this.getAllUser()
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addUserBtn(){
                //如果是添加商品的话
                this.dialogTitle = "添加用户"
                this.dialogFormVisible = true;

                this.user.name = "";
                this.user.address = "";
                this.user.email = "";
                this.user.phone = "";
                //添加用户
                this.addOrEdit = true;
            },
            editUserInfoBtn(data){
                this.dialogTitle = "编辑用户信息";
                //dialog是编辑商品信息
                this.addOrEdit = false;

                this.user.id = data.id;
                this.user.phone = data.phone;
                this.user.address = data.address;
                this.user.email = data.email;
                this.user.name = data.name;
                //显示dialog控件
                this.dialogFormVisible = true;
            },
            addOrEditUser(){
                this.dialogFormVisible = false;
                this.$axios({
                    method:'post',
                    url:'/api/back/user/registeroredituser',
                    data:{
                        user:this.user,
                        addOrEdit:this.addOrEdit
                    }
                }).then(response =>{
                    if(response.data.success){
                        this.getAllUser()
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                    }
                })
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            getAllUser(){
                this.$axios. get("/api/back/user/getalluser")
                    .then(response=>{
                        console.log(response.data)
                        this.loading = true;
                        this.tableData = response.data.userList;
                        this.loading = false;
                    })
            }

        },
        created() {
            this.getAllUser()
        }
    }
</script>

<style scoped>
    #user{
        margin-top: 30px;
    }
</style>
