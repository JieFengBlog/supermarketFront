<template>
    <div id="product">
        <el-col :span="24" class="toolbar" >

            <el-button type="danger" size="mini" style="margin-top: 10px;" @click="open2">批量删除</el-button>
            <el-form :inline="true" style="margin-top:5px; float:right">
                <el-form-item>
                    <el-input placeholder="输入查询关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table
                :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                style="width: 100%"
                v-loading="loading"
                :default-sort = "{prop: 'date', order: 'descending'}"
        >

            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-item-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.productDesc }}</span>
                        </el-form-item>
                        <el-form-item label="单价">
                            <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="库存">
                            <span>{{ props.row.stock }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category.name }}</span>
                        </el-form-item>
                        <el-form-item label="供货商">
                            <span>{{ props.row.provide }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>



            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名称"
                    sortable
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="price"
                    width="100"
                    label="单价">
            </el-table-column>
            <!--category.name-->
            <el-table-column
                    prop="category.name"
                    width="150"
                    label="分类">
            </el-table-column>
            <el-table-column
                    prop="stock"
                    width="100"
                    label="库存">
            </el-table-column>
            <!--createTime-->
            <el-table-column
                    prop="createTime"
                    width="250"
                    sortable
                    label="创建时间"
            >
            </el-table-column>

            <el-table-column label="上架状态" width="150">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
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
                            @click="deleteProductItem(scope.$index,scope.row)"
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
                    :total="tableData.length">
            </el-pagination>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                currentPage:1,
                currentSize:8,
                tableData: [],
                multipleSelection: [],
                loading:true,
                putAway:true
            }
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            dateFormater(row,column,cellValue){
                let unixTimestamp = new Date( row.createTime ) ;
                return unixTimestamp.toLocaleString();
            },
            deleteProductItem(index,row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    //先删除数据库中的商品再删除前端填充的数据
                    this.$axios({
                        method:'POST',
                        url:'/api/back/product/deleteproductbyid',
                        headers:{
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        params:{
                            'id':row.id
                        }
                    }).then((response)=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!' + response.data.success
                        });
                    })
                    //删除前端列表的数据
                    this.tableData.splice(index,1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            open2() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        created() {
            //     /api/back/product/getallproduct
            this.$axios. get("/api/back/product/getallproduct")
                .then(response=>{
                    console.log(response.data)
                    this.tableData = response.data.products;
                    this.loading = !this.loading;
                })
        }
    }
    Date.prototype.toLocaleString = function() {
        return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
    };
</script>

<style>
    #product{
        margin-top: 30px;
    }

    #product .el-form-item__label{
        width: 90px;
        color: #99a9bf !important;
    }
    #product .table-item-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
