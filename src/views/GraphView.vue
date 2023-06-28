<template>
  <div>
    <HeaderBox/>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="4" style="min-height: 20px">
        <div style="">
          <AdminAsideBox></AdminAsideBox>
        </div>
      </el-col>
      <el-col :span="2" style="min-height: 20px"></el-col>
      <el-col :span="12">
        <el-row>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="访客统计" name="first">
              <div>
                <!-- 其他内容 -->
                <echarts-component v-if="activeName === 'first'"></echarts-component>
              </div>
            </el-tab-pane>
            <el-tab-pane label="维修统计" name="second">
              <div>
                <!-- 其他内容 -->
                <echarts-component-repair v-if="activeName === 'second'"></echarts-component-repair>
              </div>
            </el-tab-pane>
            <!--<el-tab-pane label="统计" name="fourth"></el-tab-pane>-->
          </el-tabs>
        </el-row>
      </el-col>
      <el-col :span="3" style="min-height: 20px"></el-col>
    </el-row>
  </div>
</template>

<script>
// import HeaderBox from "@/components/HeaderBox";
// import AdminAsideBox from "@/components/AdminAsideBox";
import axios from "axios";
// import RepairOrder from "@/components/RepairOrder";
import EchartsComponent from '@/components/EchartsComponent.vue';
import EchartsComponentRepair from "@/components/EchartsComponentRepair.vue";
export default {
  name: "RepairOrders",
  // components: {RepairOrder, HeaderBox, AdminAsideBox, EchartsComponent},
  components: {EchartsComponent, EchartsComponentRepair},
  data() {
    return {
      activeName: 'first',
      //未处理
      NotprocessedTable:[
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        },
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        },
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        },
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        },
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        },
      ],
      //进行中
      InprogressTable: [
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        }
      ],
      //已完成
      CompletedTable: [
        {
          "maintenance_record_id": 1,
          "problem": "g",
          "commit_time": "2023-06-16T16:43:23.643361",
          "room_id": 1,
          "user_id": 2,
          "room_name": "101",
          "company_name": "buaa",
          "contact_person": "yyz",
          "contact_phone": "12344",
          "maintain_time": "2023-06-06 13:15:57.000000",
          "maintain_user_id": -1,
          "solution": "",
          "solve_time": null,
          "status": "已报修",
          "is_delete": false
        }
      ],
    };
  },
  created() {
    this.getNotprocessed();
    this.getInprogress();
    this.getCompleted();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getNotprocessed(){
      let _this = this;
      let formData = new FormData();
      formData.append("status", "report")
      axios.post(this.$baseUrl+'maintain/get_report', formData).then(
          res =>{
            console.log(res.data.msg);
            _this.NotprocessedTable=res.data.data;
          }
      )
    },
    getInprogress(){
      let _this = this;
      let formData = new FormData();
      formData.append("status ", "dispatched ")
      axios.post(this.$baseUrl+'maintain/get_report', formData).then(
          res =>{
            console.log(res.data.msg);
            _this.InprogressTable=res.data.data;
          }
      )
    },
    getCompleted(){
      let _this = this;
      let formData = new FormData();
      formData.append("status", "repaired")
      axios.post(this.$baseUrl+'maintain/get_report', formData).then(
          res =>{
            console.log(res.data.msg);
            _this.CompletedTable=res.data.data;
          }
      )
    },
  },
}
</script>

<style>
@font-face {
  font-family: "MyFont";
  src: url("../assets/阿里妈妈方圆体/AlimamaFangYuanTiVF-Thin.ttf");
}
.el-tabs__item{
  font-family: MyFont;
  font-size: 15px;
  font-weight: 500;
}
</style>

