 <template>
  <div class="main">
    <HeaderBox></HeaderBox>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="4" style="min-height: 20px">
        <AdminAsideBox></AdminAsideBox>
      </el-col>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="12">
        <el-row :gutter="20" style="margin: 0 auto; padding-top: 30px">
          <el-col :span="24" v-for="(record, index) in records" :key="index" class="display">
            <el-card
              :body-style="{ padding: '10px' }"
            >
              <el-row>
                <el-col :span="12">
                  <el-descriptions title="用户信息" direction="verticle" :column="2">
                    <el-descriptions-item label="用户名">{{ record.user.username }}</el-descriptions-item>
                    <el-descriptions-item label="用户邮箱">{{ record.user.email }}</el-descriptions-item>
                    <el-descriptions-item label="法人名">{{ record.user.legal_entity_name }}</el-descriptions-item>
                    <el-descriptions-item label="联系人姓名">{{ record.user.contact_person }}</el-descriptions-item>
                    <el-descriptions-item label="联系人电话">{{ record.user.contact_phone }}</el-descriptions-item>
                  </el-descriptions>
                </el-col>
                <el-col :span="12" style="border-left: 1px solid #C0C4CC">
                  <el-timeline>
                    <el-timeline-item :timestamp="record.sign_time">
                      签约时间
                    </el-timeline-item>
                    <el-timeline-item :timestamp="record.start_time">
                      起始时间
                    </el-timeline-item>
                    <el-timeline-item :timestamp="record.end_time">
                      结束时间
                    </el-timeline-item>
                  </el-timeline>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="min-height: 20px"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      records: [
          {
            order_id: "LCV3P1VGM5",
            user: {
              user_id: 2,
              username: "yyzzz",
              email: "234",
              legal_entity_name: "yyz",
              company_name: "buaa",
              contact_person: "yyz",
              contact_phone:  123,
            },
            start_time: "2023-06-16",
            end_time: "2025-06-16",
            sign_time: "2023-06-14",
            expire_time: "2025-06-16",
            is_pay: true
          }
        ]
    }
  },
  methods: {
    load_room_state() {
      let room_name = parseInt(this.$route.query.room_name);
      let load_room_formdata = new FormData();
      load_room_formdata.append('room_name', room_name);
      console.log(this.$route.query.room_name)
      console.log(room_name)
      console.log('send')
      this.$axios.post(`${this.$baseUrl}space/get_rent_info_by_room`, load_room_formdata)
      .then(response => {
        this.records = response.data.data
      })
    }
  },
  mounted() {
    this.load_room_state()
  }
}
</script>
<style scoped>
  p {
    margin-bottom: 1px;
    margin-top: 3px;
  }
  p {
    font-family: Helvetica;
  }
  .el-card {
    border-radius: 8px;
  }
  .display {
    margin-top: 20px;
  }
</style>
