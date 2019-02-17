<template>
    <div class="stock">

        <el-row>
            <div  style="float: right;">

                <el-button type="primary" plain>提交订单</el-button>
                <el-tooltip class="item" effect="dark" content="将列表中所有商品清空掉" placement="top">
                    <el-button type="danger" plain>清空列表</el-button>
                </el-tooltip>
            </div>
        </el-row>

        <el-row :gutter="20" class="main">
            <el-col :span="10"><div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-size: 20px;">添加进货商品信息</span>
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
                            <el-input v-model="form.price" autocomplete="off" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="分类" :label-width="formLabelWidth">
                            <el-select v-model="form.category" placeholder="请选择分类">
                                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进货数量" :label-width="formLabelWidth" prop="stock">
                            <el-input-number v-model="form.stock" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                        </el-form-item>
                        <el-form-item label="供应商" :label-width="formLabelWidth">
                            <el-input v-model="form.provide" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%; padding-left: 40%;">
                            <el-button type="primary" @click="" plain >加入订单列表</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

            </div>
            </el-col>





            <el-col :span="14">
                <div class="grid-content bg-purple">

                <!--Table-->
                <el-table
                        :data="tableData.slice((currentPage-1)*currentSize,currentPage*currentSize)"
                        style="width: 100%"
                        v-loading="loading"
                        ref="multipleTable"
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
                    <!--分页按钮-->
                    <el-container style="padding:25px 25%">
                        <el-pagination
                                background
                                :current-page="currentPage"
                                :page-sizes="[5, 8, 10, 15]"
                                :page-size="currentSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="tableData.length">
                        </el-pagination>
                    </el-container>
                </div>

            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "InStock",
        data(){
            return{
                formLabelWidth:"120px",
                tableData:[],
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
                    createTime: ''
                },
                categoryList:[]
            }
        },
        methods:{
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
                        this.tableData = response.data.products;
                        this.loading = false;
                    })
            },
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
</style>
