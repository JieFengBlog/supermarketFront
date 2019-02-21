<template>
    <div style="width:100%; padding:30px 0px;margin-top: 10px;">
            <el-row type="flex" class="row-bg" justify="space-around" style="font-size: 20px;">
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            <el-card shadow="always" style="color:#33CCCC; text-align: center; ">
                                <span>用户人数</span><br>
                                <countTo :startVal='userStart' :endVal='count.user' :duration='3000' class="count"></countTo>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light">
                        <el-card shadow="always" style="color:#CC9933; text-align: center; ">
                            <span>商品种类</span><br>
                            <countTo :startVal='productStart' :endVal='count.product' :duration='3000' class="count"></countTo>
                        </el-card>
                    </div>

                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple">
                        <el-card shadow="always" style="color:#9999FF; text-align: center; ">
                            <span>员工人数</span><br>
                            <countTo :startVal='employeeStart' :endVal='count.employee' :duration='3000' class="count"></countTo>
                        </el-card>
                    </div>
                    </el-col>
            </el-row>

        <el-row style="margin-top: 100px;">
            <el-col :span="24">
                <el-card class="box-card" style="font-size: 20px;text-align: center;">
                    近些天订单走势
                    <div style="margin-top: 20px">
                        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
                    </div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import countTo from 'vue-count-to';
    export default {
        components:{
          countTo
        },
        name:'first',
        data () {
            this.chartSettings = {
                area: true
            }
            return {
                userStart:0,
                productStart:0,
                employeeStart:0,
                count:{
                    product:0,
                    user:0,
                    employee:0,
                },
                chartData: {
                    columns: ['日期', '进货订单', '出货订单'],
                    rows: [
                    ]
                }
            }
        },
        created() {
            this.$axios.get("/api/back/charts/count")
                .then(response=>{
                    if(response.data.success){
                        this.count.product = response.data.product
                        this.count.user = response.data.user
                        this.count.employee = response.data.employee
                    }
                })

            this.$axios.get("/api/back/charts/orderperday")
                .then(response=>{
                    this.chartData.rows = response.data.dayCount
                })
        }
    }
</script>

<style>
    .count{
        font-weight: bold;
        font-size: 19px;
    }
    .count .el-card__body{
        padding: 0 !important;
    }
</style>
