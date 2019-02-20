<template>
    <div class="orderRestore">
        <el-row :gutter="10" class="main">
            <el-col :span="24">
                <!--选择已有的商品进货-->
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <span style="font-size: 20px;">订单回收站</span>
                        <i class="el-icon-tickets" style="float: right; padding: 3px 0"></i>
                    </div>

                    <div style="width: 100%;">
                        <div style="float: right;margin-bottom: 30px;margin-right: 50px;">
                            <el-button type="success" icon="el-icon-refresh" disabled circle></el-button>  恢复
                            <el-button type="danger" icon="el-icon-delete" disabled circle></el-button>  永久删除
                        </div>
                    </div>
                    <!--Table-->
                    <el-table
                            :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                            style="width: 100%"
                            v-loading="loading"
                            empty-text="暂时没有恢复的订单"
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
                                <el-button type="success" icon="el-icon-refresh" circle @click="restoreOrder(scope.row)"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="deleteOrder(scope.row.id)"></el-button>
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

        </el-row>
    </div>

</template>

<script>
    export default {
        name: "Order",
        data(){
            return {
                loading:false,
                tableData:[],
                formLabelWidth:'120px',
                currentPage:1,
                currentSize:8,
                orderTypeTag:'',
                orderTableVisible:false,
                statusUpdate:{
                    id:null,
                    orderStatus:0
                }
            }
        },
        methods:{
            deleteOrder(id){
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method:'post',
                        url:'/api/back/order/deleteorder',
                        data:{
                            id:id
                        }
                    }).then((response)=>{
                        if(response.data.success){
                            this.getAllOrderList();
                            this.$message({
                                type: 'success',
                                message: '成功删除'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '网络异常'
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
            restoreOrder(data){
                this.statusUpdate.id = data.id;
                this.statusUpdate.orderStatus = 1;
                this.$axios({
                    method:'post',
                    url:'/api/back/order/updateorder',
                    data:{
                        orderUpdateForm:this.statusUpdate
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.getAllOrderList();
                        this.$message({
                            type: 'success',
                            message: '订单已经恢复'
                        });
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
            getAllOrderList(){
                this.loading = true;
                this.$axios({
                    method:'post',
                    url:'/api/back/order/getallorder',
                    data:{
                        status:0
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.tableData = response.data.orderList;
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
    .orderRestore{
        margin-top: 50px;
    }

    .orderDetail .detailContainer span{
        color: #99a999;
    }
</style>

