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
                    prop="desc"
                    width="350"
                    label="描述">
            </el-table-column>
            <el-table-column
                    prop="price"
                    width="100"
                    label="单价">
            </el-table-column>
            <!--category.name-->
            <el-table-column
                    prop="category"
                    width="150"
                    label="分类">
            </el-table-column>
            <el-table-column
                    prop="stock"
                    width="100"
                    label="库存">
            </el-table-column>
            <el-table-column
                    prop="provide"
                    width="250"
                    label="提供商">
            </el-table-column>
            <el-table-column
                    prop="date"
                    width="180"
                    label="创建时间"
            ><!--:formatter="dateFormater"-->
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
        },
        created() {
            ///api/back/product/getallproduct
            this.$axios. get(" https://www.easy-mock.com/mock/5c2a4deb56db174d47ce1849/o2o/product")
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

<style scoped>

</style>
