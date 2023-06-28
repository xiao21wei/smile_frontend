<template>
    <div>
        <HeaderBox></HeaderBox>
        <el-divider></el-divider>
        <el-row>
            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="4" style="min-height: 20px">
                <AdminAsideBox ref="getUnreadMessage"></AdminAsideBox>
            </el-col>
            <el-col :span="2" style="min-height: 20px;"></el-col>
            <el-col :span="14">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="TabTitle">
                    <el-tab-pane label="未处理" name="first">
                      <el-empty v-if="NotprocessedTable.length === 0" description="暂无数据"></el-empty>
                      <AdminRepairDetail
                          @getNotprocessed="getNotprocessed"
                          @getInprogress="getInprogress"
                          @getCompleted="getCompleted"
                          @callAsideUnread="callAsideUnread"
                          v-else
                          v-for="(obj,index) in NotprocessedTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                          :key="index"
                          :form="obj"></AdminRepairDetail>
                    </el-tab-pane>
                    <el-tab-pane label="已指派" name="second">
                      <el-empty v-if="InprogressTable.length === 0" description="暂无数据"></el-empty>
                      <AdminRepairDetail
                          @getNotprocessed="getNotprocessed"
                          @getInprogress="getInprogress"
                          @getCompleted="getCompleted"
                          v-else
                          v-for="(obj,index) in InprogressTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                          :key="index"
                          :form="obj"></AdminRepairDetail>
                    </el-tab-pane>
                    <el-tab-pane label="已完成" name="third">
                      <el-empty v-if="CompletedTable.length === 0" description="暂无数据"></el-empty>
                      <AdminRepairDetail
                          @getNotprocessed="getNotprocessed"
                          @getInprogress="getInprogress"
                          @getCompleted="getCompleted"
                          v-else
                          v-for="(obj,index) in CompletedTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                          :key="index"
                          :form="obj"></AdminRepairDetail>
                    </el-tab-pane>
                </el-tabs>
              <template v-if="activeName === 'first'">
                <el-pagination align='center'
                               v-if="NotprocessedTable.length !== 0"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[2,5,7,10]"
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="NotprocessedTable.length">
                </el-pagination>
              </template>
              <template v-else-if="activeName === 'second'">
                <el-pagination align='center'
                               v-if="InprogressTable.length !== 0"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[2,5,7,10]"
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="InprogressTable.length">
                </el-pagination>
              </template>
              <template v-else>
                <el-pagination align='center'
                               v-if="CompletedTable.length !== 0"
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="[2,5,7,10]"
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="CompletedTable.length">
                </el-pagination>
              </template>
            </el-col>
            <el-col :span="2" style="min-height: 20px;"></el-col>
        </el-row>
    </div>
</template>
<script>
import AdminRepairDetail from '../components/AdminRepairDetail.vue'
import HeaderBox from "@/components/HeaderBox";
import AdminAsideBox from "@/components/AdminAsideBox";
import axios from "axios";
export default{
  components: {HeaderBox, AdminAsideBox,AdminRepairDetail},
  data() {
    return {
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 7, // 每页的数据条数

      activeName: 'first',
      NotprocessedTable:[
      ],
      //进行中
      InprogressTable: [
      ],
      //已完成
      CompletedTable: [
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
      this.pageSize = 7;
      this.currentPage = 1;
    },
    getNotprocessed(){
      let _this = this;
      let formData = new FormData();
      formData.append("status", "report")
      axios.post(this.$baseUrl+'maintain/get_report', formData).then(
          res =>{
            console.log(res.data);
            if(res.data.error === "0"){
              _this.NotprocessedTable=res.data.data;
              //_this.if_NotprocessedTable=true;
            }
            else {
              //this.$message.error(res.data.msg);
            }
          }
      )
    },
    getInprogress(){
      let _this = this;
      let formData = new FormData();
      formData.append("status", "dispatched")
      axios.post(this.$baseUrl+'maintain/get_report', formData).then(
          res =>{
            console.log(res.data);
            if(res.data.error === "0"){
              _this.InprogressTable=res.data.data;
              //_this.if_InprogressTable=true;
            }
            else {
              //this.$message.error(res.data.msg);
            }
          }
      )
    },
    getCompleted(){
      let _this = this;
      let formData = new FormData();
      formData.append("status", "repaired")
      axios.post(this.$baseUrl+'maintain/get_report', formData).then(
          res =>{
            console.log(res.data);
            if(res.data.error === "0"){
              _this.CompletedTable=res.data.data;
              //_this.if_CompletedTable=true;
            }
            else {
              //this.$message.error(res.data.msg);
            }
          }
      )
    },
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
    callAsideUnread(){
      console.log('父调用子');
      this.$refs.getUnreadMessage.getUnreadMessage();
    }
  },
}
</script>
<style>
.el-tabs__item{
    font-size: 16px;
    font-weight: bold;
}
</style>
