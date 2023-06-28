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
    <el-col :span="13">
      <el-row>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="未处理" name="first">
            <span  v-for="(obj,index) in NotprocessedTable"
                     :key="index">
              <el-col :span="12">
                <RepairOrder
                    @getNotprocessed="getNotprocessed"
                    @getInprogress="getInprogress"
                    @getCompleted="getCompleted"
                  :room-number="obj.room_name"
                  :description="obj.problem"
                  :contact-number="obj.contact_phone"
                  :contact-person="obj.contact_person"
                  :repair-time="obj.maintain_time"
                  :repair="obj.maintain_user_id"
                  :company-name="obj.company_name"
                  :user_id="obj.user_id"
                  :maintenance_record_id="obj.maintenance_record_id">
              </RepairOrder>
              </el-col>
            </span>
          </el-tab-pane>
          <el-tab-pane label="已指派" name="second">
            <span  v-for="(obj,index) in InprogressTable"
                     :key="index">
              <el-col :span="12">
              <RepairOrder
                  @getNotprocessed="getNotprocessed"
                  @getInprogress="getInprogress"
                  @getCompleted="getCompleted"
                  :room-number="obj.room_name"
                  :description="obj.problem"
                  :contact-number="obj.contact_phone"
                  :contact-person="obj.contact_person"
                  :repair-time="obj.maintain_time"
                  :repair="obj.maintain_user_id"
                  :company-name="obj.company_name"
                  :user_id="obj.user_id"
                  :maintenance_record_id="obj.maintenance_record_id">
              </RepairOrder>
              </el-col>
            </span>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="third">
            <span  v-for="(obj,index) in CompletedTable"
                     :key="index">
              <el-col :span="12">
              <RepairOrder
                  @getNotprocessed="getNotprocessed"
                  @getInprogress="getInprogress"
                  @getCompleted="getCompleted"
                  :room-number="obj.room_name"
                  :description="obj.problem"
                  :contact-number="obj.contact_phone"
                  :contact-person="obj.contact_person"
                  :repair-time="obj.maintain_time"
                  :repair="obj.maintain_user_id"
                  :company-name="obj.company_name"
                  :user_id="obj.user_id"
                  :maintenance_record_id="obj.maintenance_record_id">
              </RepairOrder>
              </el-col>
            </span>
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
import HeaderBox from "@/components/HeaderBox";
import AdminAsideBox from "@/components/AdminAsideBox";
import axios from "axios";
import RepairOrder from "@/components/RepairOrder";

export default {
  name: "RepairOrders",
  components: {RepairOrder, HeaderBox, AdminAsideBox},
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
    fatherMethod() {
      console.log('测试');
    },
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
      formData.append("status", "dispatched")
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

<style scoped>
*{
  padding: 0;
  margin: 0;
}
</style>
