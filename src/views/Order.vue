<template>
    <div>
        <el-button @click="getBreadcrumb">get</el-button>
        <ul>
            <li v-for="item in levelList">{{item.path}}</li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "Order",
        data(){
            return {
                levelList: null
            }
        },
        methods:{
            getBreadcrumb() {
                this.levelList = this.$route.matched.filter(item => item.name);
            }
        }
    }
</script>

<style scoped>

</style>
