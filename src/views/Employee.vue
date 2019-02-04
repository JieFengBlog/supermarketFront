<template>
    <div>
        <el-col :span="24" class="toolbar" >

            <el-form :inline="true" style="margin-top:5px;">
                <el-form-item>
                    <el-input placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table
                :data="tableData1.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                style="width: 100%"
                v-loading="loading"
                :default-sort = "{prop: 'date', order: 'descending'}"
        >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    type="index"
                    :index="0">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="编号"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
                    :filters="[{ text: '女' , value: 0 }, {text: '男', value: 1}]"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系方式"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="address"
                    width="180"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="start"
                    width="180"
                    label="注册时间">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="身份"
                    width="150"
                    :filters="[{ text: '技术员', value: '技术员' }, { text: '安保', value: '安保' },{ text: '销售', value: '销售' },{ text: '经理', value: '经理' }]"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.tag === '技术员' ? 'primary' : 'success'"
                            disable-transitions>
                        {{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column>



            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                    >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteItem"
                    >删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-container style="padding:25px 25%">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 8, 10, 15]"
                    :page-size="currentSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData1.length">
            </el-pagination>
        </el-container>

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                currentPage:1,
                currentSize:8,
                tableData1: [],
                multipleSelection: [],
                loading:true,
                dialogFormVisible: false,
                formLabelWidth:"120px",
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
            }
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            deleteItem(){
                this.$message({
                    message: '删除成功',
                    type: 'success',
                });
            },
            addEmployee(){

            }
        },
        created() {
            this.$axios. get(" https://www.easy-mock.com/mock/5c2a4deb56db174d47ce1849/o2o/employee")
                .then(response=>{
                    console.log(response.data)
                    this.tableData1 = response.data.employees;
                    this.loading = !this.loading;
                })
        }
    }
</script>

<style scoped>

</style>
