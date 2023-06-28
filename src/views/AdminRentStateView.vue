
<template>
  <div>
    <HeaderBox></HeaderBox>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="4" style="min-height: 20px">
        <AdminAsideBox></AdminAsideBox>
      </el-col>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="12">
        <el-row :gutter="20" style="margin: 0 auto; margin-top: 20px">
          <el-col :span="4" v-for="(room, index) in rooms" :key="index">
            <el-card
              :body-style="{ padding: '0px' }"
              class="rented"
              v-if="room.is_empty==false"
              @click.native="toDetail(room.room_name, false)">
              <div style="padding: 14px;">
                <h3>{{ room.room_name }}</h3>
                <p>已租赁</p>
              </div>
            </el-card>
            <el-card
              :body-style="{ padding: '0px' }"
              class="unrented"
              v-else
              @click.native="toDetail(room.room_name, true)">
              <div style="padding: 14px;">
                <h3>{{ room.room_name }}</h3>
                <p>未租赁</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :page-size="1"
          :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="4" style="min-height: 20px"></el-col>
    </el-row>
    <el-drawer
    :direction="rtl"
    :visible.sync="drawer"
    size="50%"
    >
      <template slot="title">
        <p style="margin: 0 auto">
          房间{{ room_name_visited }}（{{ visited_rented? '未租赁' : '已租赁' }}）的租赁信息
        </p>
      </template>
      <el-row :gutter="20" style="margin: 0 auto; padding-top: 10px; width: 80%;">
        <el-col :span="24" v-for="(record, index) in records" :key="index" class="display">
          <el-card
            :body-style="{ padding: '10px' }"
          >
            <el-row>
              <el-col :span="12" style="flex:1; margin: 10px 0;">
                <el-descriptions title="用户信息" direction="verticle" :column="1">
                  <el-descriptions-item label="用户名">{{ record.user.username }}</el-descriptions-item>
                  <el-descriptions-item label="用户邮箱">{{ record.user.email }}</el-descriptions-item>
                  <el-descriptions-item label="法人名">{{ record.user.legal_entity_name }}</el-descriptions-item>
                  <el-descriptions-item label="联系人姓名">{{ record.user.contact_person }}</el-descriptions-item>
                  <el-descriptions-item label="联系人电话">{{ record.user.contact_phone }}</el-descriptions-item>
                </el-descriptions>
              </el-col>
              <el-col :span="12" style="border-left: 1px solid #C0C4CC; height:100%; margin: 10px 0; " >
                <el-timeline>
                  <el-timeline-item center :timestamp="record.sign_time" style="vertical-align: top">
                    签约时间
                  </el-timeline-item>
                  <el-timeline-item center :timestamp="record.start_time" style="vertical-align: top">
                    起始时间
                  </el-timeline-item>
                  <el-timeline-item center :timestamp="record.end_time" style="vertical-align: top">
                    结束时间
                  </el-timeline-item>
                </el-timeline>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      total: 50,
      drawer: false,
      room_name_visited: '',
      visited_rented: false,
      rooms: [
          // {room_id: 1, room_name: 'Room 1', is_empty: true},
          // {room_id: 2, room_name: 'Room 2', is_empty: false},
          // {room_id: 3, room_name: 'Room 3', is_empty: true},
          // {room_id: 4, room_name: 'Room 4', is_empty: false},
          // {room_id: 5, room_name: 'Room 5', is_empty: true},
          // {room_id: 6, room_name: 'Room 6', is_empty: false},
          // {room_id: 7, room_name: 'Room 7', is_empty: true},
          // {room_id: 8, room_name: 'Room 8', is_empty: false},
          // {room_id: 9, room_name: 'Room 9', is_empty: true},
          // {room_id: 10, room_name: 'Room 10', is_empty: false}
        ],
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
      handleCurrentChange(val) {
        console.log(`current page is ${val}`)
      },
      toDetail(room_name, is_empty) {
        let load_room_formdata = new FormData();
        load_room_formdata.append('room_name', room_name);
        this.room_name_visited = room_name;
        this.visited_rented = is_empty;
        this.$axios.post(`${this.$baseUrl}space/get_rent_info_by_room`, load_room_formdata)
        .then(response => {
          this.records = response.data.data;
          this.drawer = true;
        })
      },
      load_total_floor() {
        this.$axios.get(`${this.$baseUrl}space/get_floor_count`)
        .then(response => {
          this.total = response.data.floor_count;
          console.log(`this building has ${this.total} floors`);
        })
      },
      load_room_status_by_floor(page) {
        let room_status_formdata = new FormData()
        room_status_formdata.append('floor', page)
        this.$axios.post(`${this.$baseUrl}space/get_room_status_by_floor`, room_status_formdata)
        .then(response => {
          this.rooms = response.data.data;
          console.log(this.rooms);
        })
      },
    },
    watch: {
      currentPage: {
        handler(nval, oval) {
          console.log(`switch from page${oval} to page${nval}`)
          this.load_room_status_by_floor(nval)
        }
      }
    },
    mounted() {
      this.load_total_floor()
      this.load_room_status_by_floor(this.currentPage)
    }
  }
</script>
<style scoped>
  .el-col {
    margin-bottom: 20px;
  }
  .rented {
    background-color: #f56c6c31;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.2);
  }
  .unrented {
    background-color: #67c23a31;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.2);
  }
  .el-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5), 0 0 6px rgba(0, 0, 0, 0.5)
  }
  .el-card:active {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.7)
  }
  .el-card {
    border-radius: 10px;
  }
  .el-pagination__wrapper {
    background-color: transparent;
  }

  .el-timeline {
    margin-top: 15px;
  }

</style>
