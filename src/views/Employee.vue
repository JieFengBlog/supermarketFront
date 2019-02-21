<template>
    <div id="user">
        <el-col :span="24" class="toolbar" >
            <el-form :inline="true" style="margin-top:5px; ">
                <el-form-item>
                    <el-button type="primary" @click="addEmployeeBtn">添加用户</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchEmployee">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="编号  姓名" v-model="searchCondition"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-card>
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px;">员工列表</span>
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
                            prop="number"
                            label="编号"
                            sortable
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            sortable
                            align="center"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="gender"
                            label="性别"
                            :formatter="genderFormatter"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="role"
                            width="100"
                            label="职位">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="phone"
                            width="150"
                            label="联系方式">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            width="250"
                            label="地址">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="startTime"
                            width="250"
                            label="注册时间">
                    </el-table-column>


                    <el-table-column
                            align="center"
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="editEmployeeInfoBtn(scope.row)"
                            >编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteEmployee(scope.row.id)"
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
            <el-form :model="employee" >
                <el-form-item label="编号" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="employee.number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="employee.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="name">
                    <el-select v-model="employee.gender" placeholder="请选择">
                        <el-option
                                v-for="item in genders"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="employee.role" autocomplete="off"   :row="2"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="employee.phone" autocomplete="off"  :row="2"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="employee.address" autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditEmployee" >确 定</el-button>
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
                searchCondition:'',
                tableData: [],
                genders:[
                    {id:1,value:'男'},
                    {id:0,value:'女'}
                ],
                multipleSelection: [],
                loading:false,
                formLabelWidth:'120px',
                employee:{
                    id:null,
                    name:'',
                    gender:null,
                    number:'',
                    phone:'',
                    address:'',
                    startTime:null,
                    role:'',
                },
            }
        },
        methods:{
            searchEmployee(){
                this.$axios({
                    method:'post',
                    url:'/api/back/employee/selectcondition',
                    data:{
                        searchCondition:this.searchCondition
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.tableData = response.data.searchEmployeeList
                    }else{
                        this.$message({
                            type: 'error',
                            message: '查询失败!'
                        });
                    }
                })
            },
            genderFormatter:function(row){
                return row.gender === 1 ? '男': row.gender === 0 ? '女' : '未知'
            },
            deleteEmployee(id){
                this.$confirm('此操作将永久删除此员工, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$axios({
                        method:'post',
                        url:'/api/back/employee/deleteemployee',
                        data:{
                            employeeId:id
                        }
                    }).then(response =>{
                        if(response.data.success){
                            this.getAllEmployee();
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
            addEmployeeBtn(){
                //如果是添加商品的话
                this.dialogTitle = "添加用户"
                this.dialogFormVisible = true;

                this.employee.name = "";
                this.employee.number = "";
                this.employee.address = "";
                this.employee.gender = null;
                this.employee.role = "";
                this.employee.phone = "";
                //添加用户
                this.addOrEdit = true;
            },
            editEmployeeInfoBtn(data){
                this.dialogTitle = "编辑用户信息";
                //dialog是编辑商品信息
                this.addOrEdit = false;

                this.employee.id = data.id;
                this.employee.name = data.name;
                this.employee.number = data.number;
                this.employee.address = data.address;
                this.employee.gender = data.gender;
                this.employee.role = data.role;
                this.employee.phone = data.phone;
                //显示dialog控件
                this.dialogFormVisible = true;
            },
            addOrEditEmployee(){
                console.log(this.employee)
                this.dialogFormVisible = false;
                this.$axios({
                    method:'post',
                    url:'/api/back/employee/addoreditemployee',
                    data:{
                        employee:this.employee,
                        addOrEdit:this.addOrEdit
                    }
                }).then(response =>{
                    if(response.data.success){
                        this.getAllEmployee();
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '操作失败'
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
            getAllEmployee(){
                this.$axios. get("/api/back/employee/getallemployee")
                    .then(response=>{
                        console.log(response.data)
                        this.loading = true;
                        this.tableData = response.data.employeeList;
                        this.loading = false;
                    })
            }

        },
        created() {
            this.getAllEmployee()
        },
        watch:{
            searchCondition(){
                if(this.searchCondition == null || this.searchCondition == ''){
                    this.  getAllEmployee();
                }
            }
        }
    }
</script>

<style scoped>
    #user{
        margin-top: 30px;
    }
</style>
