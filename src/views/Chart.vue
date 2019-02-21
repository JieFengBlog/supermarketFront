<template>
    <div class="chart">

        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    订单统计
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
        }
    }
</script>

<style scoped>
    .chart{
        margin-top: 100px;
    }

</style>


