<template>
  <div id="main">
    <HeaderBox></HeaderBox>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="min-height: 20px;"></el-col>
      <el-col :span="4" style="min-height: 20px">
        <RepairAsideBox></RepairAsideBox>
      </el-col>
      <el-col :span="2" style="min-height: 20px;"></el-col>
      <el-col :span="14">
        <el-empty description="暂无工单" v-if="items_done.length===0"/>
        <el-row :gutter="15" style="margin: 0 auto" v-else>
          <el-col :span="12" v-for="(item, index) in items_done" :key="index">
            <el-card 
            :body-style="{ padding: '10px'}" 
            class="done"
            @click.native="to_detail(item.room_name, item.problem, item.solution)">
              <div slot="header">{{ item.room_name }}</div>
              <el-descriptions direction="verticle" :column="1" size="medium">
                <el-descriptions-item label="联系人">{{ item.contact_person }}</el-descriptions-item>
                <el-descriptions-item label="联系电话">{{ item.contact_phone }}</el-descriptions-item>
                <el-descriptions-item label="维修时间">{{ item.maintain_time }}</el-descriptions-item>
                <el-descriptions-item label="解决时间">{{ item.solve_time }}</el-descriptions-item>
              </el-descriptions>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" style="min-height: 20px;"></el-col>
    </el-row>
    <el-drawer
    :visible.sync="drawer"
    size="30%"
    >
      <template slot="title">
        <p style="margin: 0 auto">房间{{ click_record }}的维修信息</p>
      </template>
      <el-descriptions direction="verticle" :column="1" size="medium" style="margin: 20px">
        <el-descriptions-item label="问题">{{ click_problem }}</el-descriptions-item>
        <el-descriptions-item label="解决方案">{{ click_solution }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items_done: [],
      drawer: false,
      click_record: "",
      click_problem: "",
      click_solution: "",
    }
  },
  methods: {
    load_orders_done() {
      let maintain_user_id = localStorage.getItem('user_id');
      let all_formdata = new FormData();
      all_formdata.append('maintain_user_id', maintain_user_id);
      all_formdata.append('status', 'all');
      this.$axios.post(`${this.$baseUrl}maintain/get_task`, all_formdata)
      .then(response => {
        this.items_done = response.data.data
        console.log(response.data)
      })
    },
    to_detail(str1, str2, str3) {
      console.log('clicked')
      this.click_record = str1;
      this.click_problem = str2;
      this.click_solution = str3;
      this.drawer = true;
    },
  },
  mounted() {
    this.load_orders_done()
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