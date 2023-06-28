<template>
  <div class="main">
    <HeaderBox></HeaderBox>
    <el-divider></el-divider>
    <el-cow>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="4" style="min-height: 20px">
        <UserAsideBox></UserAsideBox>
      </el-col>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="14">
        <el-tabs v-model="active_panel" @tab-click="handel_click">
          <el-tab-pane label="未读" name="first">
            <el-empty description="暂无未读消息" v-if="records_unread.length==0"></el-empty>
            <el-row :gutter="20" style="margin: 0 auto" v-else>
              <el-col :span="24" v-for="(record, index) in records_unread" :key="index" class="display">
                <el-card
                  class="ClientMessageCard"
                >
                  <div slot="header" style="font-weight: bold">{{ record.title }}</div>
                  <el-row>
                    <el-descriptions direction="verticle" :column="1" >
                      <el-descriptions-item label="发送人" label-class-name="labelClass" content-class-name="contentClass">
                        <pre>{{ record.sender_name }}</pre>
                      </el-descriptions-item>
                      <el-descriptions-item label="消息内容"><pre>{{ record.description }}</pre></el-descriptions-item>
                    </el-descriptions>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="已读" name="second">
            <el-empty description="暂无消息" v-if="records_read.length==0"/>
            <el-row :gutter="20" style="margin: 0 auto" v-else>
              <el-col :span="24" v-for="(record, index) in records_read.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="index" class="display">
                <el-card
                  class="ClientMessageCard"
                >
                  <div slot="header" style="font-weight: bold">{{ record.title }}</div>
                  <el-row>
                    <el-descriptions direction="verticle" :column="1" >
                      <el-descriptions-item label="发送人" label-class-name="labelClass" content-class-name="contentClass">
                        <pre>{{ record.sender_name }}</pre>
                      </el-descriptions-item>
                      <el-descriptions-item label="消息内容"><pre>{{ record.description }}</pre></el-descriptions-item>
                    </el-descriptions>
                  </el-row>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <template v-if="active_panel === 'second'">
          <el-pagination align='center'
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[2,5,7,10]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="records_read.length">
          </el-pagination>
        </template>
      </el-col>
      <el-col :span="2" style="min-height: 20px"></el-col>
    </el-cow>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 2, // 每页的数据条数
      active_panel: 'first',
      records: [
        ],
      records_unread: [],
      records_read: []
    }
  },
  methods: {
    load_client_message() {
      let user_id = localStorage.getItem('user_id')
      let load_message_formdata = new FormData();
      load_message_formdata.append('user_id', user_id);
      this.$axios.post(`${this.$baseUrl}message/message_list`, load_message_formdata)
      .then(response => {
        console.log(response)
        this.records = response.data.data
        let records_unread = [], records_read = [];
        for (let i = 0; i < this.records.length; i++) {
          if (this.records[i].status == 'unread') {
            records_unread.push(this.records[i]);
          } else {
            records_read.push(this.records[i]);
          }
        }
        this.records_read = records_read;
        this.records_unread = records_unread;
      })
      let feedback_formdata = new FormData();
      feedback_formdata.append('user_id', user_id);
      feedback_formdata.append('read_type', "all");
      this.$axios.post(`${this.$baseUrl}message/read_message`, feedback_formdata)
    },
    handel_click(tab, event) {
      console.log(`tab: ${tab}\n event: ${event}`)
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
  mounted() {
    this.load_client_message()
  }
}
</script>
<style>
/* p {
  margin-bottom: 1px;
  margin-top: 3px;
}
p {
  font-family: Helvetica;
}
.el-card {
  border-radius: 8px;
}
*/
.display {
  margin-bottom: 20px;
}
pre{
  margin: 0;
}
span.el-descriptions-item__content{
  /* font-weight: bold !important; */
  font-size: 13px !important;
}
</style>
