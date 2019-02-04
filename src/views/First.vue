<template>
    <div style="width:100%; padding:30px 0px;margin-top: 10px;">
        <el-row type="flex" class="row-bg" justify="space-around" style="font-size: 20px;">
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-row>
                    <el-card shadow="always" style="text-align: center; color:#009999">
                        <span>注册人数</span><br>
                        <span style="font-weight: bold">350</span>
                    </el-card>
                </el-row>

            </div>
            </el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <el-card shadow="always" style="color:#CC9933; text-align: center; ">
                    <span>商品种类</span><br>
                    <span style="font-weight: bold">120</span>
                </el-card>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <el-card shadow="always" style="color:#9999FF; text-align: center; ">
                    <span>员工人数</span><br>
                    <span style="font-weight: bold">350</span>
                </el-card>
            </div></el-col>
        </el-row>

        <el-row style="margin-top:60px; margin-bottom: 20px;">
            <el-col :span="12" style="font-weight: bold; text-align: center;color: teal;">注册人数走势</el-col>
            <el-col :span="12" style="font-weight: bold; text-align: center;color: teal;">商品销售走势</el-col>
        </el-row>
        <el-row gutter="12">
            <el-col :span="12">
                <el-card shadow="always" style="text-align: center; color:#009999">
                <ve-line :data="chartData" :settings="chartSettings"></ve-line>
                </el-card>
            </el-col>
            <el-col :span="12" >
                <el-card shadow="always" style="text-align: center; color:#009999">
                <ve-histogram :data="chartData"></ve-histogram>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:'first',
        data () {
            this.chartSettings = {
                metrics: ['访问用户', '下单用户'],
                dimension: ['日期']
            }
            return {
                chartData: {
                    columns: ['日期', '访问用户', '下单用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                        { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                        { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                        { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                        { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                        { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
