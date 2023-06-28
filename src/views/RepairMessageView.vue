<template>
  <div>
    <HeaderBox></HeaderBox>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="min-height: 20px;"></el-col>
      <el-col :span="4" style="min-height: 20px">
        <RepairAsideBox></RepairAsideBox>
      </el-col>
      <el-col :span="2" style="min-height: 20px;"></el-col>
      <el-col :span="12">
        <el-empty description="暂无未处理工单" v-if="items_undone.length===0"></el-empty>
        <el-row :gutter="15" style="margin: 0 auto" v-else>
          <el-col :span="24" v-for="(item, index) in items_undone" :key="index">
            <el-card
            :body-style="{ padding: '20px'}"
            class="undone">
              <div slot="header">{{ item.room_name }}</div>
              <el-descriptions direction="verticle" :column="2" border>
                <el-descriptions-item label="联系人">{{ item.contact_person }}</el-descriptions-item>
                <el-descriptions-item label="联系人公司">{{ item.company_name }}</el-descriptions-item>
                <el-descriptions-item label="联系电话">{{ item.contact_phone }}</el-descriptions-item>
                <el-descriptions-item label="维修时间">{{ item.maintain_time }}</el-descriptions-item>
                <el-descriptions-item label="问题">{{ item.problem }}</el-descriptions-item>
              </el-descriptions>
              <el-form
                ref="solutionform"
                :model="form"
                label-width="80px"
                style="margin-top: 20px;"
                label-position="left"
                :rules="rules">
                <el-row>
                  <el-col :span="16">
                    <el-form-item label="解决方案" prop="solution">
                      <el-input v-model="form.solution" type="textarea" :rows="2" placeholder="请输入解决方案"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">

                    <el-form-item label="解决日期" prop="date">
                      <el-date-picker
                        v-model="form.date"
                        type="date"
                        placeholder="选择日期"
                        style="float: left"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"/>
                    </el-form-item>
                  </el-col>
                  <el-col>

                    <el-form-item label="解决时间" prop="time">
                      <el-time-picker
                        v-model="form.time"
                        type="time"
                        placeholder="选择时间"
                        style="float: left"
                        value-format="HH:mm"
                        format="HH:mm"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>
                  <el-button type="primary" @click="submit_form">提交</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="min-height: 20px;"></el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        form: {
          solution: "",
          date: "",
          time: ""
        },
        rules: {
          solution: [
            { required: true, message: '请输入解决方案', trigger: 'blur' }
          ],
          date: [
            { required: true, message: '请输入日期', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入时间', trigger: 'blur' }
          ]
        },
        items_undone: [

        ],
      }
    },
    methods: {
      load_orders_undone() {
        let maintain_user_id = localStorage.getItem('user_id');
        let dispatched_formdata = new FormData();
        dispatched_formdata.append('maintain_user_id', maintain_user_id);
        dispatched_formdata.append('status', 'dispatched');
        this.$axios.post(`${this.$baseUrl}maintain/get_task`, dispatched_formdata)
        .then(response => {
          console.log(response)
          this.items_undone = response.data.data
          if (response.data.data !== undefined) {
            console.log('accept task')
            let maintenance_record_id = this.items_undone[0].maintenance_record_id;
            let accept_formdata = new FormData();
            accept_formdata.append('maintain_user_id', maintain_user_id);
            accept_formdata.append('maintenance_record_id', maintenance_record_id);
            console.log(maintenance_record_id)
            this.$axios.post(`${this.$baseUrl}maintain/accept_task`, accept_formdata)
            .then(
              response => console.log(response)
            )
          }
        })
      },
      submit_form() {
        let maintenance_record_id = this.items_undone[0].maintenance_record_id;
        let after_formdata = new FormData()
        console.log(`时间字符串：${this.form.date} ${this.form.time}`)
        after_formdata.append('maintenance_record_id', maintenance_record_id);
        after_formdata.append('solution', this.form.solution);
        after_formdata.append('solve_time', `${this.form.date} ${this.form.time}`);
        if (this.form.solution == "" && this.form.date == "" && this.form.time == "")
          this.$message.error("请填写表单")
        else {
          console.log(after_formdata)
          this.$axios.post(`${this.$baseUrl}maintain/after_task`, after_formdata)
          .then(response => {
            this.$router.go(0)
            console.log(response.data)
            this.$message.success("提交成功")
          })
        }
      },
    },
    mounted() {
      this.load_orders_undone()
    }
  }
</script>
<style scoped>
  .undone {
    margin-bottom: 20px;
  }
  .done {
    margin-bottom: 20px;
  }
  .done:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.5)
  }
  .done:active {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.7)
  }
  .el-card {
    border-radius: 10px;
    margin-top: 5px;
  }
</style>
