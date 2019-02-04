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
                prop="date"
                label="日期"
                sortable
                width="150">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                sortable
                width="150">
        </el-table-column>
        <el-table-column
                prop="address"
                width="300"
                label="地址">
        </el-table-column>

        <el-table-column
                prop="tag"
                label="标签"
                width="150"
                :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.tag === '家' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
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
                loading:true
            }
        },
        methods:{
            handleSizeChange(val) {
                this.currentSize = val
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
        },
        created() {
            this.$axios. get("https://www.easy-mock.com/mock/5c2a4deb56db174d47ce1849/o2o/user")
                .then(response=>{
                    console.log(response.data)
                    this.tableData = response.data.user;
                    this.loading = !this.loading;
                })
        }
    }
</script>

<style scoped>

</style>
