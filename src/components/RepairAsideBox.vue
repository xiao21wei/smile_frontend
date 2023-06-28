<template>
    <div class="">
        <el-card class="asideCard">
            <el-menu style="text-align:left"
                @select="handleSelect"
                :default-active="activeIndex"
                class="el-menu-vertical-demo">
                    <el-menu-item index="/RepairMessage">
                        <i class="el-icon-files"></i>
                        <span slot="title">当前工单</span>
                    </el-menu-item>
                    <el-menu-item index="/HistoryMessage">
                        <i class="el-icon-files"></i>
                        <span slot="title">历史工单</span>
                    </el-menu-item>
                    <el-menu-item index="/userInfo">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/',
        };
    },
    mounted() {
        this.handleRouteChange(this.$route.path);
    },
    methods: {
        handleRouteChange(path) {
            this.activeIndex = path;
        },
        handleSelect(index) {
            if (index === this.activeIndex) {
                return;
            }
            this.$router.push(index);
            this.activeIndex = index;
        },
    },
    watch: {
        '$route.path': function (newPath) {
            this.handleRouteChange(newPath);
        }
    }
}
</script>
<style>
.asideCard .el-card__body{
    padding: 0;
}
.asideCard{
    min-height: 80vh;
}
</style>