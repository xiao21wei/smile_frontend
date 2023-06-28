<template>
    <div>
        <HeaderBox></HeaderBox>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="4" style="min-height: 20px" v-if="identity === 'user'">
                <UserAsideBox></UserAsideBox>
            </el-col>
            <el-col :span="4" style="min-height: 20px" v-else-if="identity === 'admin'">
                <AdminAsideBox></AdminAsideBox>
            </el-col>
            <el-col :span="4" style="min-height: 20px" v-else>
                <RepairAsideBox></RepairAsideBox>
            </el-col>
            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="12">
                <el-card>
                    <h3>个人信息详情</h3>
                    <el-form>
                        <el-form-item label="法人名称" v-if="identity === 'user'">
                            <el-input v-model="info.legal_entity_name" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称" v-if="identity === 'user'">
                            <el-input v-model="info.company_name" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="联系人姓名">
                            <el-input v-model="info.contact_person" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="联系人电话">
                            <el-input v-model="info.contact_phone" disabled></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span="4" style="min-height: 20px;"></el-col>
        </el-row>
    </div>
</template>
  
<script>
export default {
    name: "UserInfo",
    props: {},

    data() {
        return {
            position: 'right',
            identity: localStorage.getItem('identity'),
            info: {
                company_name:"",
                contact_person:"",
                contact_phone:"",
                legal_entity_name:"",
            }
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const infoData = new FormData();
            let id = localStorage.getItem("user_id");
            infoData.append("user_id", id);
            const { data: res } = await this.$axios.post(this.$baseUrl+"user/information", infoData);
            console.log(res)
            if (res.errno != 0)
                return this.$message.error(res.mag);
            this.info = res.data;
        }
    },

}
</script>
