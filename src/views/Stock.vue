<template>
    <div class="stock">
        <el-row :gutter="20" class="main">
            <el-col :span="10"><div class="grid-content bg-purple">
                <!--选择已有的商品进货-->
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <span style="font-size: 20px;">选择已有的商品添加库存</span>
                        <i class="el-icon-plus" style="float: right; padding: 3px 0"></i>
                    </div>
                    <!--穿梭框-->
                    <el-transfer v-model="otherTransferDataRight"
                                 :data="transferDataLift"
                                 :props="{
                                      key: 'id',
                                      label: 'name'
                                    }"
                                 filterable
                                 filter-placeholder="请输入商品名称"
                                 style=" padding-bottom: 40px;">

                    </el-transfer>
                    <el-button type="primary" plain style="margin-left: 60%;" @click="addSubmitList">加入待提交清单</el-button>
                </el-card>

                <!--添加新的商品库存-->
                <el-card class="box-card" style="margin-top: 20px;">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 20px;">添加新的商品库存</span>
                        <i class="el-icon-plus" style="float: right; padding: 3px 0"></i>
                    </div>

                    <el-form :model="form">
                        <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述" :label-width="formLabelWidth">
                            <el-input v-model="form.productDesc" autocomplete="off"  type="textarea" :row="2"></el-input>
                        </el-form-item>
                        <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
                            <el-input-number v-model="form.price" :min="1" :max="9999" label="描述文字"></el-input-number>
                        </el-form-item>
                        <el-form-item label="分类" :label-width="formLabelWidth">
                            <el-select v-model="form.category" placeholder="请选择分类">
                                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进货数量" :label-width="formLabelWidth" prop="stock">
                            <el-input-number v-model="form.stock" :min="1" :max="9999" label="描述文字"></el-input-number>
                        </el-form-item>
                        <el-form-item label="供应商" :label-width="formLabelWidth">
                            <el-input v-model="form.provide" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%; padding-left: 40%;">
                            <el-button type="primary" @click="addOrEditProduct" plain >添加新的商品</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

            </div>
            </el-col>





            <el-col :span="14">
                <el-card class="box-card">

                    <div style="width: 100%; margin-bottom: 60px">
                        <!--head-->
                        <span style="float:left;font-size: 19px;">待提交清单 <i class="el-icon-loading"></i></span>
                        <div  style="float: right; padding-bottom: 10px;">
                            <el-button type="primary" plain @click="submitData">提交订单</el-button>
                            <el-tooltip class="item" effect="dark" content="将列表中所有商品清空掉" placement="top">
                                <el-button type="danger" plain @click="showTableData">清空列表</el-button>
                            </el-tooltip>
                        </div>
                    </div>


                <div>
                    <el-form  status-icon  label-width="80px" class="demo-ruleForm">
                        <el-form-item label="供货商" prop="pass">
                            <el-input style="width: 50%;" v-model="supply"></el-input>
                        </el-form-item>
                    </el-form>

                <!--Table-->
                <el-table

                        :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                        style="width: 100%"
                        v-loading="loading"
                        empty-text="暂时没有提交的商品"
                        border
                        ref="multipleTable"
                        sum-text="合计"
                        show-summary
                        :default-sort = "{prop: 'date', order: 'descending'}"
                >

                    <el-table-column
                            prop="name"
                            label="商品名称"
                            sortable
                            width="150">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            label="进货数量"
                            prop="number"
                            width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.number" @change="saveListChage" type="number"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="金额( ￥ )"
                            prop="money"
                            width="150">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.money"  @change="saveListChage" type="number"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="unit"
                            label="单位"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        type="danger"
                                        plain
                                        @click="deleteListItem(scope.$index)"
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
                </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import {transferUtil} from "../commons/TranserUtil";

    export default {
        name: "InStock",
        data(){
            return{
                supply:'',//供货者
                otherTransferDataRight:[],//穿梭框右边
                transferDataLift: [],
                tableData:[],//表格数据
                formLabelWidth:"120px",
                loading:false,
                currentPage:1,
                currentSize:8,
                form: {
                    id:null,
                    name: '',
                    productDesc:'',
                    price: null,
                    category: '',
                    stock: 1,
                    provide: '',
                    status: '',
                    createTime: '',
                    number: 1,
                    money:1,
                },
                categoryList:[]
            }
        },
        methods:{
            showTableData(){
              this.tableData = [];
              localStorage.removeItem("tempTableData");
            },
            deleteListItem(index){
                this.tableData.splice(index,1);
                localStorage.setItem("tempTableData",JSON.stringify(this.tableData));
            },
            //提交订单
            submitData(){
                this.$axios({
                    method: 'post',
                    url: '/api/back/order/purchase',
                    data: {
                        product: this.tableData,
                        InOrOut: true,// true 进货, false 出货
                        supply:this.supply
                    }
                }).then((response) => {
                    if(response.data.success){
                        this.clearLocalStorage();
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
            addSubmitList(){
                console.log(this.otherTransferDataRight[0])
                this.tableData = transferUtil(this.transferDataLift,this.otherTransferDataRight);
                localStorage.setItem("tempTableData",JSON.stringify(this.tableData));
                localStorage.setItem("otherTransferDataRight",JSON.stringify(this.otherTransferDataRight));
                console.log(localStorage.getItem("tempTableData"))

            },
            saveListChage(){
                localStorage.setItem("tempTableData",JSON.stringify(this.tableData));
            },
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            //确定添加商品
            addOrEditProduct() {
                console.log(this.form)
                this.$axios({
                    method: 'post',
                    url: '/api/back/product/addoreditproduct',
                    data: {
                        product: this.form,
                        addOrEdit: true
                    }
                }).then((response) => {
                    if (response.data.success) {
                        this.getAllProductFromServer();
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            message: '操作失败'
                        });
                    }
                })
            },
            //获取分类列表
            getCategories(){
                this.$axios({
                    method: 'get',
                    url: '/api/back/category/getallcategory'
                }).then((response) => {
                    if (response.data.success) {
                        this.categoryList = response.data.categoryList;
                    } else {
                        this.$message({
                            type: 'success',
                            message: response.data.errMsg
                        });
                    }
                })
            },
            //从服务器上获取所有的商品信息
            getAllProductFromServer(){
                this.$axios. get("/api/back/product/getallproduct")
                    .then(response=>{
                        this.loading = true;
                        this.transferDataLift = response.data.products;
                        this.loading = false;
                    })
            },
            //清除缓存
            clearLocalStorage(){
                localStorage.removeItem("tempTableData");
                localStorage.removeItem("otherTransferDataRight");
            }
        },
        created() {
            if(localStorage.getItem("otherTransferDataRight") != null){
                this.otherTransferDataRight = JSON.parse(localStorage.getItem("otherTransferDataRight"));
            }

            this.getAllProductFromServer()
            if(localStorage.getItem("tempTableData") != null){
                this.tableData = JSON.parse(localStorage.getItem("tempTableData"));
            }
            this.getCategories();
        }
    }
</script>

<style scoped>
    .stock{
        margin-top: 50px;
    }
    .submit-btn-group{
        margin-top: 50px;
        padding-left: 40%;
    }
    .main{
        margin-top: 20px;
    }
    #stock .el-form-item__label{
        width: 90px;
        color: #99a9bf !important;
    }
    #stock .table-item-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

</style>
