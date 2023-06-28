<template>
    <div>
        <HeaderBox></HeaderBox>
            <el-divider></el-divider>
        <el-row>
            

            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="4" style="min-height: 20px;">
                <UserAsideBox></UserAsideBox>
            </el-col>
            <el-col :span="2" style="min-height: 20px"></el-col>
            <el-col :span="12">
                <el-card>
                    <h3>访客预约</h3>
                    <el-form ref="appointForm" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="客户公司" prop="companyName" required>
                            <el-input v-model="form.companyName"></el-input>
                        </el-form-item>
                        <el-form-item label="邀请人" prop="username">
                            <el-input v-model="form.username" placeholder="请输入邀请人"></el-input>
                        </el-form-item>
                        <el-form-item label="访客姓名" prop="visitorname">
                            <el-input v-model="form.visitorname" placeholder="请输入访客人员姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入访客联系方式"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="identity">
                            <el-input v-model="form.identity" placeholder="请输入访客身份证号"></el-input>
                        </el-form-item>
                        <el-form-item label="到访时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date">
                                    <el-select v-model="form.date" clearable placeholder="请选择日期" style="width: 100%;">
                                        <el-option v-for="item in appDate" :key="item" :label="item" :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">:</el-col>
                            <el-col :span="11">
                                <el-form-item prop="time">
                                    <el-select v-model="form.time" clearable placeholder="请选择时间" style="width: 100%;">
                                        <el-option v-for="item in appTime" :key="item" :label="item" :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="申请理由" prop="desc">
                            <el-input placeholder="请填写访客到访理由" type="textarea" v-model="form.desc" maxlength="200"
                                show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即申请</el-button>
                            <el-button @click="cancel">重置</el-button>
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
    data() {
        var checkMobile = (rule, value, callback) => {
            var regmobile = /^1([3-9]\d|5[0-35-9]|7[3678])\d{8}$/
            if (regmobile.test(value)) {
                return callback()
            }
            callback(new Error('请输入合法手机号码'))
        }
        var checkIdentity = (rule, value, callback) => {
            var regidentity = /^([1-9]\d{5}(18|19|([23]\d))\d{2}(0\d|1[0-2])([0-2]\d|3[0-1])\d{3}[0-9Xx])|([1-9]\d{14})$/
            if (regidentity.test(value)) {
                return callback()
            }
            callback(new Error('请输入合法身份证号码'))
        }
        return {
            form: {
                user_id:'',
                companyName:'',
                username:'',
                visitorname: '',
                phone:'',
                identity:'',
                date:'',
                time:'',
            },
            appDate:'',
            appTime:[
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',

            ],
            rules: {
                username: [
                    { required: true, message: '请输入邀请人姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                visitorname: [
                    { required: true, message: '请输入访客姓名', trigger: 'blur' },
                ],
                identity: [
                    { required: true, message: '请输入访客身份证', trigger: 'blur' },
                    { validator: checkIdentity, trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                time: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                

            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        async init() {
            const initFormData = new FormData()
            initFormData.append('user_id', localStorage.getItem('user_id'))
            const { data: res1 } = await this.$axios.post(this.$baseUrl + 'space/get_company_info', initFormData)
            this.form.companyName = res1.company_name

            const {data:res2}=await this.$axios.get(this.$baseUrl+'user/date')
            this.appDate=res2.data.date
        },
        async onSubmit(){
            let loading = this.$loading({ fulltext: true, text: '拼命加载中...' })
            this.form.user_id = localStorage.getItem('user_id')
            const appointData = new FormData()
            appointData.append('user_id', this.form.user_id)
            appointData.append('visitor_name', this.form.visitorname)
            appointData.append('phone_number', this.form.phone)
            appointData.append('visit_time', this.form.date + ' ' + this.form.time)
            appointData.append('company_name', this.form.companyName)
            appointData.append('visitor_identity', this.form.identity)

            this.$refs.appointForm.validate(async(valid)=>{
                if(!valid){
                    this.$message.error('填写内容不合法，请修改')
                    loading.close()
                    return
                }else{
                    const { data: res } = await this.$axios.post(this.$baseUrl + 'message/make_appointment', appointData)
                    loading.close()
                    console.log(res)
                    if (res.errno != 0) return this.$message.error(res.msg)
                    this.cancel()
                    this.$message.success('预约成功')
                    this.$router.push('/clientmessage')
                }
            })
        },  
        cancel() {
            this.$refs.appointForm.resetFields();
        },
    }
}
</script>