<template>
    <div class="order">
        <el-row :gutter="10" class="main">
            <el-col :span="24">
                <!--选择已有的商品进货-->
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <span style="font-size: 20px;">订单列表</span>
                        <i class="el-icon-tickets" style="float: right; padding: 3px 0"></i>
                    </div>

                    <div style="width: 100%;">
                        <div style="float: right;margin-bottom: 30px;margin-right: 50px;">
                        <el-button type="success" icon="el-icon-view" disabled circle></el-button>  详情
                        <el-button type="warning" icon="el-icon-edit" disabled circle></el-button>  编辑
                        <el-button type="danger" icon="el-icon-delete" disabled circle></el-button>  放入回收站
                        </div>
                    </div>
                    <!--Table-->
                    <el-table
                            :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                            style="width: 100%"
                            v-loading="loading"
                            empty-text="暂时没有订单"
                            border
                            ref="multipleTable"
                            :default-sort = "{prop: 'date', order: 'descending'}"
                    >
                        <el-table-column
                                align="center"
                                prop="orderType"
                                label="订单类型"
                                width="150"
                                :filters="[{ text: '进货订单', value: 0 }, { text: '出货订单', value: 1 }]"
                                :filter-method="filterTag"
                                filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                        :type="scope.row.orderType === 1 ? 'primary' : 'warning'"
                                        disable-transitions>
                                    {{judgeOrderType(scope.row.orderType)}}
                                </el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="orderNumber"
                                label="订单编号"
                                sortable
                                width="150">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                label="订单金额(￥)"
                                prop="orderPrice"
                                width="200">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="orderProvide"
                                label="供货商"
                                width="250">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="user.name"
                                label="消费者"
                                width="150">
                        </el-table-column>

                        <el-table-column
                                sortable
                                align="center"
                                prop="createTime"
                                label="订单生成时间"
                                width="250">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="success" icon="el-icon-view" circle @click="orderDetail(scope.row)"></el-button>
                                <el-button type="warning" icon="el-icon-edit" circle @click="updateOrderBtn(scope.row)"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="deleteOrder(scope.row)"></el-button>
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


            <!--当点击添加商品的按钮时弹出的diglog-->
            <el-dialog title="更新订单" :visible.sync="dialogFormVisible">
                <el-form :model="formUpdate">
                    <el-form-item label="订单金额(￥)" :label-width="formLabelWidth" prop="orderPrice">
                        <el-input v-model="formUpdate.orderPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" :label-width="formLabelWidth"><br>
                        <el-date-picker
                                v-model="formUpdate.createTime"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="消费者" :label-width="formLabelWidth" prop="user" v-if="consumerVisible">
                        <el-select v-model="userId" placeholder="请选择消费者">
                            <el-option
                                    v-for="item in userList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商" :label-width="formLabelWidth" prop="orderProvide" v-if="provideVisible">
                        <el-input v-model="formUpdate.orderProvide" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateOrder" >确 定</el-button>
                </div>
            </el-dialog>



            <el-col :span="24" style="margin-top: 50px;" v-if="orderTableVisible">
                <el-card class="box-card orderDetail" >
                    <div slot="header" class="clearfix">
                        <span style="font-size: 20px;">订单详情</span>
                        <el-button icon="el-icon-close" circle style="float: right;" @click="orderTableVisible = false"></el-button>
                    </div>
                    <div style="margin: 0 auto; font-size: 19px; padding: 10px" class="detailContainer">
                        <el-row style="padding: 10px;">
                            <el-col :span="12" >
                                <span>订单编号: &nbsp;&nbsp;</span>{{form.orderNumber}}
                            </el-col>
                            <el-col :span="12">
                                <span>订单金额(￥): &nbsp;&nbsp;</span>{{form.orderPrice}}
                            </el-col>
                        </el-row>
                        <el-row style="padding: 10px;">
                            <el-col :span="12" >
                                <div v-if="provideVisible"><span>供应商: &nbsp;&nbsp;</span>{{form.orderProvide}}</div>
                                <div v-if="userVisible"><span>消费者: &nbsp;&nbsp;</span>{{form.user}}</div>
                            </el-col>
                            <el-col :span="12">
                                <span>创建时间: &nbsp;&nbsp;</span>{{form.createTime}}
                            </el-col>
                        </el-row>
                        <div style="width: 100%;text-align: left;margin-top: 50px;">
                            <span style="color: #000; font-size: 18px; ">具体进货商品列表</span>
                            <el-table
                                    :data="orderDetailTable"
                                    border
                                    style="width: 100%;margin-top: 10px;">
                                <el-table-column
                                        align="center"
                                        prop="productName"
                                        label="商品名称"
                                        width="250">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="productDesc"
                                        label="商品描述"
                                        width="250">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="productAmount"
                                        width="250"
                                        label="进货数量">
                                </el-table-column>
                                <el-table-column
                                        align="center"
                                        prop="amountOfMoney"
                                        label="小计金额">
                                </el-table-column>

                            </el-table>
                        </div>
                    </div>
                </el-card>
            </el-col>

        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Order",
        data(){
            return {
                dialogFormVisible:false,
                provideVisible:false,
                consumerVisible:false,
                userId:null,
                loading:false,
                levelList: null,
                userList:[],
                tableData:[],
                formLabelWidth:'120px',
                orderDetailTable:[],
                currentPage:1,
                currentSize:8,
                provideVisible:false,
                userVisible:false,
                orderTypeTag:'',
                orderTableVisible:false,
                form:{
                    orderNumber:'',
                    orderPrice:0,
                    orderProvide:'',
                    user:null,
                    createTime:'',
                },
                formUpdate:{
                    id:null,
                    orderNumber:'',
                    orderPrice:0,
                    orderProvide:'',
                    createTime:'',
                    orderStatus:null,
                },
                statusUpdate:{
                    id:null,
                    orderStatus:null,
                }
            }
        },
        methods:{
            deleteOrder(data){
                this.statusUpdate.id = data.id;
                this.statusUpdate.orderStatus = 0;

                this.$axios({
                    method:'post',
                    url:'/api/back/order/updateorder',
                    data:{
                        orderUpdateForm:this.statusUpdate
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.getAllOrderList();
                        this.orderTableVisible = false;
                        this.$notify({
                            title: '成功',
                            message: '订单已被加入回收站，可以随时恢复',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '网络异常'
                        });
                    }
                })
            },

            updateOrderBtn(data){

                this.dialogFormVisible = true;
                if(data.orderType == 0){
                    this.provideVisible = true;
                    this.consumerVisible = false;
                    this.formUpdate.orderProvide = data.orderProvide;
                }else{
                    this.getAllUser();
                    this.provideVisible = false;
                    this.consumerVisible = true;
                    this.userId = data.user.id;
                }

                this.formUpdate.createTime = data.createTime;
                this.formUpdate.orderPrice = data.orderPrice;
                this.formUpdate.id = data.id;

            },
            updateOrder(){
                this.dialogFormVisible = false;
                //去请求具体商品列表
                this.$axios({
                    method:'post',
                    url:'/api/back/order/updateorder',
                    data:{
                        userId:this.userId,
                        orderUpdateForm:this.formUpdate
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.getAllOrderList();
                        this.$message({
                            type: 'success',
                            message: '更新成功'
                        });
                    }else{
                        this.$message({
                            type: 'error',
                            message: '网络异常'
                        });
                    }
                })
            },
            orderDetail(data){
                this.orderTableVisible = true;
                this.form.orderNumber = data.orderNumber;
                this.form.orderPrice = data.orderPrice;
                if(data.orderType == 0){
                    this.provideVisible = true;
                    this.userVisible = false;
                    this.form.orderProvide = data.orderProvide;
                }else{
                    this.provideVisible = false;
                    this.userVisible = true;
                    this.form.user = data.user.name;
                }
                this.form.createTime = data.createTime;

                //去请求具体商品列表
                this.$axios({
                    method:'post',
                    url:'/api/back/order/getorderdetail',
                    data:{
                        orderId:data.id
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.orderDetailTable = response.data.detailList;
                    }else{
                        this.$message({
                            type: 'error',
                            message: '网络异常'
                        });
                    }
                })

            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            judgeOrderType(type) {
                if(type == 0){
                    return "进货订单";
                }else{
                    return "出货订单";
                }
            },
            getAllUser(){
                this.$axios. get("/api/back/user/getalluser")
                    .then(response=>{
                        this.userList = response.data.userList;
                    })
            },
            getAllOrderList(){
                this.loading = true;
                this.$axios({
                    method:'post',
                    url:'/api/back/order/getallorder',
                    data:{
                        status:1
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.tableData = response.data.orderList;
                        console.log(this.tableData)
                    }else{
                        this.$message({
                            type: 'error',
                            message: '网络异常'
                        });
                    }
                })
                this.loading = false;
            },
        },
        created() {
            this.getAllOrderList();
        }
    }
</script>

<style scoped>
    .order{
        margin-top: 50px;
    }

    .orderDetail .detailContainer span{
        color: #99a999;
    }
</style>
