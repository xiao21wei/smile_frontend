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
                    <h3>报修工单</h3>
                    <el-form ref="repairForm" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="报修公司" prop="companyName">
                            <el-input v-model="form.companyName"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人" prop="username">
                            <el-input v-model="form.username" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                        <el-form-item label="房间号" prop="roomId">
                            <el-select v-model="form.roomId" clearable placeholder="请选择房间" style="width: 100%;">
                                <el-option v-for="item in room" :key="item.value" :label="item.value" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="上门时间" required>
                            <el-col :span="11">
                                <el-form-item prop="date">
                                    <el-select v-model="form.date" clearable placeholder="请选择日期" style="width: 100%;">
                                        <el-option v-for="item in workDate" :key="item" :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">:</el-col>
                            <el-col :span="11">
                                <el-form-item prop="time">
                                    <el-select v-model="form.time" clearable placeholder="请选择时间段" style="width: 100%;">
                                        <el-option v-for="item in workTime" :key="item" :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="问题描述" prop="desc">
                            <el-input placeholder="请描述房间问题" type="textarea" v-model="form.desc" maxlength="200"
                                show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
            callback(new Error('请输入合法手机'))
        }
        return {
            room: {
            },
            form: {
                user_id: '',
                username: '',
                phone: '',
                date: '',
                time: '',
                companyName: '',
                roomId: '',
                desc: ''
            },
            workDate:{},
            workTime: [
                 '08:00-10:00',
                 '10:00-12:00',
                 '14:00-16:00',
                 '16:00-18:00',
                 '19:00-21:00',
            ],
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系方式', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur' }
                ],
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                roomId: [
                    { required: true, message: '请输入房间号', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '请选择日期', trigger: 'change' }
                ],
                time: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请描述您的问题', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.initInfo()
        this.initDate()
    },
    methods: {
        async initInfo() {
            const initFormData = new FormData()
            // initFormData.append('user_id', 49)
            initFormData.append('user_id', localStorage.getItem('user_id'))
            const { data: res } = await this.$axios.post(this.$baseUrl + 'space/get_company_info', initFormData)
            this.form.companyName = res.company_name
            let roomName = res.room_data
            roomName = roomName.map(item => {
                return {
                    value: item.room_name
                }
            })
            this.room = roomName
        },
        async initDate(){
            const {data:res}=await this.$axios.get(this.$baseUrl+'user/date')
            this.workDate=res.data.date
            console.log(this.workDate)
        },
        onSubmit() {
            let loading = this.$loading({ fulltext: true, text: '拼命加载中...' })
            this.form.user_id = localStorage.getItem('user_id')
            const repairData = new FormData()
            repairData.append('user_id', this.form.user_id)
            repairData.append('username', this.form.username)
            repairData.append('phone', this.form.phone)
            repairData.append('time', this.form.date + ' ' + this.form.time)
            repairData.append('companyName', this.form.companyName)
            repairData.append('roomId', this.form.roomId)
            repairData.append('desc', this.form.desc)
            this.$refs.repairForm.validate(async (valid) => {
                if (!valid) {
                    this.$message.error('填写内容不合法，请修改')
                    loading.close()
                    return
                } else {
                    const { data: res } = await this.$axios.post(this.$baseUrl + 'maintain/report', repairData)
                    loading.close()
                    if (res.error != 0) return this.$message.error(res.msg)
                    // let comName = this.companyName
                    this.cancel()
                    // setTimeout(function(){
                    //     this.companyName=comName
                    // },100)

                    this.$message.success('提交完成')
                    this.$router.push('/UserRepairList')
                }
            })

        },
        cancel() {
            this.$refs.repairForm.resetFields();
        },

    }
}
</script>
