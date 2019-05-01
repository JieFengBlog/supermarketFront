<template>
    <div id="product">
        <el-col :span="24" class="toolbar" >

            <el-form :inline="true" style="margin-top:5px; ">
                <el-form-item>
                    <el-button type="primary" @click="addProductBtn">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchProduct">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="输入查询关键字" v-model="searchCondition"></el-input>
                </el-form-item>
                <!--批量删除按钮-->
                <el-form-item style="float:right">
                    <el-button  v-if="mulFlag" type="danger"  @click="batchDelete">批量删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--diglog-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="productRules">
                <el-form-item label="商品名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.productDesc" autocomplete="off"  type="textarea" :row="2"></el-input>
                </el-form-item>
                <el-form-item label="单价" :label-width="formLabelWidth" prop="price">
                    <el-input v-model="form.price" autocomplete="off" type="number"></el-input>
                </el-form-item>
                <el-form-item label="单位" :label-width="formLabelWidth" prop="unit">
                    <el-input v-model="form.unit" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" :label-width="formLabelWidth">
                    <el-select v-model="form.category.id" placeholder="请选择分类">
                        <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-button type="text" style="margin-left: 5px; color:#909399" @click="addCategoryBtn">添加分类</el-button>
                </el-form-item>
                <el-form-item label="库存" :label-width="formLabelWidth" prop="stock">
                    <el-input v-model="form.stock" autocomplete="off" type="number"></el-input>
                </el-form-item>
                <el-form-item label="供应商" :label-width="formLabelWidth">
                    <el-input v-model="form.provide" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrEditProduct" >确 定</el-button>
            </div>
        </el-dialog>

        <el-col :span="24">
            <!--选择已有的商品进货-->
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <span style="font-size: 20px;">订单列表</span>
                    <i class="el-icon-tickets" style="float: right; padding: 3px 0"></i>
                </div>
                <!--Table-->
                <el-table
                        :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                        style="width: 100%"
                        border
                        v-loading="loading"
                        ref="multipleTable"
                        @selection-change="handleSelectionChange"
                        :default-sort = "{prop: 'date', order: 'descending'}"
                >
                    <!--Table中的折叠页-->
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
                                <el-form-item label="单位">
                                    <span>{{ props.row.unit }}</span>
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

                    <!--Table中的显示行-->
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="商品名称"
                            sortable
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="price"
                            width="100"
                            label="单价">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="unit"
                            width="150"
                            label="单位">
                    </el-table-column>
                    <!--category.name-->
                    <el-table-column
                            align="center"
                            prop="category.name"
                            width="150"
                            label="分类">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="stock"
                            width="150"
                            label="库存">
                    </el-table-column>
                    <!--createTime-->
                    <el-table-column
                            align="center"
                            prop="createTime"
                            width="250"
                            sortable
                            label="创建时间"
                    >
                    </el-table-column>

                    <el-table-column label="上架状态" width="150" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="productStatus(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="EidtProductInfoBtn(scope.row)"
                            >编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="deleteProductItem(scope.$index,scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <!--分页按钮-->
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

            </el-card>
        </el-col>
    </div>
</template>

<script>

    export default {
        name: "User",
        data(){
            return {
                dialogTitle:'',
                addOrEdit:true,// true是添加  false是编辑
                mulFlag:true,
                currentPage:1,
                currentSize:8,
                tableData: [],
                mulId:[],
                mul: [],
                category:{
                  id:null,
                  name:''
                },
                dialogFormVisible: false,
                formLabelWidth: '120px',
                loading:true,
                putAway:true,
                categoryList:[],
                searchCondition:'',
                form: {
                    id:null,
                    name: '',
                    productDesc:'',
                    unit:'',
                    price: 0.0,
                    category:{
                      id:null,
                      name:''
                    },
                    stock: null,
                    provide: '',
                    status: '',
                    createTime: ''
                },
                productRules:{
                        name:[
                            {required:true,message:'请输入商品名称',trigger:'blur'}
                        ],
                        price:[
                            {required:true,message:'请输入商品价格',trigger:'blur'}
                        ],
                        stock:[
                            {required:true,message:'请输入商品库存',trigger:'blur'}
                        ],
                        unit:[
                            {required:true,message:'请输入单位',trigger:'blur'}
                        ]
                }
            }
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            handleSelectionChange(val){
                this.mul = val;
            },
            //Switch滑块改变的回调函数
            productStatus(data){
                this.$axios({
                    method:'post',
                    url:'/api/back/product/changestatus',
                    data:{
                        id:data.id,
                        status:data.status
                    }
                })
            },
            //将批量选中的数据的i读取出来
            handlerBatchData(){
                this.mulId.splice(0,this.mulId.length);
                for(let i = 0; i < this.mul.length; i++){
                    this.mulId.push(this.mul[i].id)
                }
            },


            //点击添加商品按钮
            addProductBtn(){
                //清空
                this.form.id = null;
                this.form.name = '';
                this.form.productDesc = '';
                this.form.price = null;
                this.form.category.id = '';
                this.form.stock = null;
                this.form.status = '';
                this.form.provide = '';
                //如果是添加商品的话
                this.dialogTitle = "添加商品"
                this.dialogFormVisible = true;
                this.getCategories();

                //dialog的作用是添加商品
                this.addOrEdit = true;
            },



            //确定添加商品
            addOrEditProduct(){
                this.dialogFormVisible = false;
                this.$axios({
                    method:'post',
                    url:'/api/back/product/addoreditproduct',
                    data:{
                        product:this.form,
                        addOrEdit:this.addOrEdit
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.getAllProductFromServer();
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


            //编辑商品信息
            EidtProductInfoBtn(data){
                this.dialogTitle = "编辑商品信息";
                //dialog是编辑商品信息
                this.addOrEdit = false;
                //填充信息
                this.form.id = data.id;
                this.form.name = data.name;
                this.form.productDesc = data.productDesc;
                this.form.price = data.price;
                this.form.unit = data.unit;
                this.form.category.id = data.category.id;
                this.form.stock = data.stock;
                this.form.status = data.status;
                this.form.provide = data.provide;
                this.getCategories();
                //显示dialog控件
                this.dialogFormVisible = true;

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


            //删除单个商品时执行的
            deleteProductItem(index,row){
                this.$confirm('此操作将永久删除该商品信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //根据ID删除商品，然后重新请求服务器填充
                    this.$axios({
                        method:'POST',
                        url:'/api/back/product/deleteproductbyid',
                        data:{
                            id:row.id
                        }
                    }).then((response)=>{
                        this.getAllProductFromServer();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //从服务器上获取所有的商品信息
            getAllProductFromServer(){
                this.$axios({
                    url:"/api/back/product/getallproduct",
                    method:'post',
                    data:{
                        status:0
                    }
                })
                    .then(response=>{
                        this.loading = true;
                        this.tableData = response.data.products;
                        this.loading = false;
                    })
            },

            addCategory(name){
                this.category.name = name;
                this.$axios({
                    method: 'post',
                    url: '/api/back/category/addcategory',
                    data: {
                        category:this.category
                    }
                }).then((response) => {
                    if(response.data.success){
                        this.getCategories();
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
            addCategoryBtn(){
                this.$prompt('请输入分类名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.addCategory(value);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //模糊查询
            searchProduct(){
                console.log(this.searchCondition)
                this.$axios({
                    method:'post',
                    url:'/api/back/product/selectcondition',
                    data:{
                        searchCondition:this.searchCondition
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.tableData = response.data.list
                    }else{
                        this.$message({
                            type: 'error',
                            message: '查询失败!'
                        });
                    }
                })
            },


            //批量删除按钮
            batchDelete() {
                if(this.mul.length == 0){
                    this.$message({
                        type: 'error',
                        message: '选择不能为空'
                    });
                    return;
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                   this.handlerBatchData();
                    this.$axios({
                        method:'POST',
                        url:'/api/back/product/batchdeleteproduct',
                        data:{
                            batchID:JSON.stringify(this.mulId)
                        }
                    }).then((response)=>{
                        this.getAllProductFromServer();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        created() {
            this.getAllProductFromServer();
        },
        watch:{
            searchCondition(){
                if(this.searchCondition == null || this.searchCondition == ''){
                    this.getAllProductFromServer();
                }
            }
        }
    }
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
