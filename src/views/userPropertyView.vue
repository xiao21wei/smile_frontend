<template>
    <div>
        <HeaderBox></HeaderBox>
        <el-divider></el-divider>

        <el-row>
            <el-col :span="2" style="min-height: 20px"></el-col>
            <el-col :span="4"><UserAsideBox></UserAsideBox></el-col>
            <el-col :span="2" style="min-height: 20px"></el-col>
            <el-col :span="12">
                <div>
                    <el-card class="propertyTable">
                        <el-table
                            :data="PropertyTable"
                            stripe
                            style="width: 100%">
                            <el-table-column
                            prop="order_id"
                            label="合同号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="payment_cycle"
                            label="缴费周期"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="is_pay"
                            label="是否缴纳物业费"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="pay_time"
                            label="具体缴费日期">
                            </el-table-column>
                        </el-table>
                    </el-card>
                    
                </div>
            </el-col>
            <el-col :span="4" style="min-height: 20px"></el-col>
        </el-row>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                PropertyTable: [
                    
                ]
            }
        },
        methods:{
            getUserPropertyInfo(){
                let user_id = localStorage.getItem("user_id")
                let userdata = new FormData();
                userdata.append("user_id", user_id)
                this.$axios.post(this.$baseUrl+"space/get_payment_record_by_user", userdata)
                .then(res => {
                    console.log(res)
                    this.PropertyTable = res.data.data
                })
            },
        },
        mounted:function(){
            this.getUserPropertyInfo();
        }
    }
</script>
<style>
.propertyTable .el-card__body{
    padding: 1px !important;
    padding-bottom: 0 !important;
}
</style>