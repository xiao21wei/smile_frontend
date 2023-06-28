<template>
    <div>
        <HeaderBox></HeaderBox>
        <el-divider></el-divider>
        
        <el-row>
            <el-col :span="2" style="min-height: 20px"></el-col>
            <el-col :span="4" style="min-height: 20px">
                <UserAsideBox></UserAsideBox>
            </el-col>
            <el-col :span="2" style="min-height: 20px"></el-col>
            <el-col :span="13">
                <el-card class="leaseTable">
                <div>
                    <el-table 
                        :data="userleaseTable"
                        stripe
                        style="width: 100%">
                        <el-table-column
                        prop="order_id"
                        label="合同号"
                        width="158">
                        </el-table-column>
                        <el-table-column
                        prop="room_ids"
                        label="房间列表"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="start_time"
                        label="开始时间"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="end_time"
                        label="结束时间"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="sign_time"
                        label="签约时间"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="expire_time"
                        label="到期时间"
                        width="120">
                        </el-table-column>
                    </el-table>
                </div>
                </el-card>
            </el-col>
            <el-col :span="3" style="min-height: 20px"></el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                userleaseTable: []
            }
        },
        methods:{
            getUserLeaseInfo(){
                // let loading = this.$loading({fullscreen: true, text: '拼命加载中...'});
                let user_id = localStorage.getItem("user_id")
                console.log(user_id)
                let userdata = new FormData();
                userdata.append("user_id", user_id)
                this.$axios.post(this.$baseUrl+"user/user_lease_info", userdata)
                .then(res => {
                    console.log(res)
                    if(res.data.errno===0){
                        this.userleaseTable = res.data.data.rent_info
                    }
                    else if(res.data.errno===1){
                        this.userleaseTable = []
                    }
                    // loading.close()
                })
            }
        },
        mounted: function(){
            this.getUserLeaseInfo();
        }
    }
</script>
<style>
.leaseTable .el-card__body{
    padding: 1px !important;
    padding-bottom: 0 !important;
}
.leaseTable{
    margin-bottom: 40px;
}
</style>