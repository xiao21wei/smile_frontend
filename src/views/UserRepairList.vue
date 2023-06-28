<template>
    <div>
        <HeaderBox></HeaderBox>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="4" style="min-height: 20px;">
                <UserAsideBox></UserAsideBox>
            </el-col>
            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="14">
                <div v-if="is_empty">
                    <el-empty description="还没有任何报修记录"></el-empty>
                </div>
                <div v-else>
                    <UserRepairDetail :repairInfo="repairList"></UserRepairDetail>
                </div>
            </el-col>
            <el-col :span="2" style="min-height: 20px;"></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            repairList: [],
            is_empty: false
        }
    },
    created() {
        this.getRepairList()
    },
    methods: {
        async getRepairList() {
            let id = localStorage.getItem('user_id');
            let form = new FormData();
            form.append('user_id', id);

            try {
                const { data: res } = await this.$axios.post(this.$baseUrl + 'maintain/get_report_by_user', form);
                if (res.error !== '0') {
                    return this.$message.error(res.msg);
                }

                if (res.data === undefined || res.data.length === 0) {
                    this.is_empty = true;
                    console.log(this.is_empty)
                } else {
                    this.repairList = res.data;
                    this.is_empty = false;
                    console.log(this.is_empty)
                }
                
            } catch (error) {
                console.error(error);
                this.$message.error('获取报修记录失败');
            }
           
        }
    }
}
</script>