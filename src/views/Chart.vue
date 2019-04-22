<template>
    <div class="chart">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    近些天订单走势
                    <div style="margin-top: 20px">
                        <ve-line :data="chartData3" :settings="chartSettings"></ve-line>
                    </div>

                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 40px">
            <el-col :span="12">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    产品销售量最高
                    <div style="margin-top: 50px;">
                        <ve-histogram :data="chartData4"></ve-histogram>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    产品销售量最低
                    <div style="margin-top: 50px;">
                        <ve-histogram :data="lowData"></ve-histogram>
                    </div>

                </el-card>

            </el-col>
        </el-row>



        <el-row :gutter="20" style="margin-top: 40px">
            <el-col :span="12">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    历史订单统计
                    <div style="margin-top: 50px;">
                        <ve-waterfall :data="chartData"></ve-waterfall>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    注册用户统计
                    <div style="margin-top: 50px;">
                        <ve-ring :data="chartData2"></ve-ring>
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
            this.chartSettings = {
                area: true
            }
            return {
                chartData: {
                    columns: ['订单类型', '订单数'],
                    rows: [
                    ]
                },
                chartData2: {
                    columns: ['日期', '注册数'],
                    rows: [
                    ]
                },
                chartData3: {
                    columns: ['日期', '进货订单', '出货订单'],
                    rows: [
                    ]
                },
                chartData4: {
                    columns: ['商品', '销售量', '销售额'],
                    rows: []
                },
                lowData:{
                    columns: ['商品', '销售量', '销售额'],
                    rows: []
                }
            }
        },
        methods:{
        },
        created() {
            this.$axios.get("/api/back/charts/userperday")
                .then(response=>{
                    this.chartData2.rows = response.data.userDayCount
                })

            this.$axios.get("/api/back/charts/getordercount")
                .then(response=>{
                    this.chartData.rows = response.data.orderList
                })


            this.$axios.get("/api/back/charts/orderperday")
                .then(response=>{
                    this.chartData3.rows = response.data.dayCount
                })


            this.$axios.get("/api/back/product/getProductCount/1")
                .then(response=>{
                    this.chartData4.rows = response.data
                })

            this.$axios.get("/api/back/product/getProductCount/0")
                .then(response=>{
                    this.lowData.rows = response.data
                })


        }
    }
</script>

<style scoped>
    .chart{
        margin-top: 50px;
    }

</style>


