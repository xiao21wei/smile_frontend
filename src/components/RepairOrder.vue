<template>
  <div>
    <button @click="childMethod">judge</button>
    <el-card class="box-card">
      <el-row slot="header">
        <el-col class="title" :span="10">
          <span>房间号: {{roomNumber}}</span>
        </el-col>
        <el-col class="text " style="float: right ; line-height: 24px ;color: grey" :span="10">
           {{repairTime}}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text item" :span="10">
          <span style="color: rgba(147,143,143,1)">联系人:</span>
           {{contactPerson}}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text item" :span="10">
          <span style="color: rgba(147,143,143,1)">联系电话:</span>
          {{contactNumber}}
        </el-col>
      </el-row>
      <el-row>
        <el-col class="text item" :span="22">
          <span style="color: rgba(147,143,143,1)">问题描述:</span>
          {{description}}
        </el-col>
      </el-row>
      <el-col :span="18" style="min-height: 20px"></el-col>
      <el-col :span="6" style="margin-bottom: 10px">
        <el-button style="float: right; padding: 3px 10px" type="text" @click="assign()">分配</el-button>
        <el-dialog title="指派维修人员" :visible.sync="if_assign" width="40%" @close="DialogClosed" >
          <el-form ref="form" model="repairPersonList" style="text-align: left">
            <el-form-item label="维修人员">
              <el-cascader
                  style="width: 40%"
                  v-model="repairPersonList"
                  size="medium"
                  :options="option"
                  clearable
                  @change="handleChange"
              />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
                      <el-button @click="if_assign = false">取 消</el-button>
                      <el-button type="primary" @click="push_assign">确 定</el-button>
            </span>
        </el-dialog>
        <el-button style="float: right; padding: 3px 0" type="text" @click="feedback">反馈</el-button>
        <el-dialog title="用户反馈" :visible.sync="if_feedback" width="40%" @close="DialogClosed" >
          <el-form ref="form" model="" style="text-align: left">
            <el-form-item label="房间号">
              <el-input v-model="this.$props.roomNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="this.$props.contactPerson" disabled></el-input>
            </el-form-item>
            <el-form-item label="反馈内容">
              <el-input
                  v-model="message"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入反馈内容">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
                      <el-button @click="if_feedback = false">取 消</el-button>
                      <el-button type="primary" @click="push_feedback">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'RepairOrder',
  data(){
    return{
      if_assign: false,
      if_feedback: false,
      message: '',
      repairPersonList:[],
      option:[],
      Repair:{

      },
      order:{
        roomNumber:405,
        contactPerson: '李大壮',
        contactNumber:18346461980,
        companyName:'北航',
        repairTime: '2020-02-01',
        description:'asdadas dasd asd as das ',
      }
    }
  },
  props:['roomNumber','contactPerson','contactNumber','repairTime','description','repair','companyName','user_id', 'maintenance_record_id'],
  methods: {
    childMethod() {
      //this.$parent.fatherMethod();
      this.$emit("fatherMethod");
    },
    handleChange(value) {
      console.log(value)
    },
    DialogClosed(){
    },
    assign(){
      this.if_assign=true;
      console.log(this.if_assign);
      this.getrepairPersonList();
    },
    push_assign(){
      let formData = new FormData();
      let _this = this;
      formData.append("maintenance_record_id", this.$props.maintenance_record_id);
      formData.append("maintain_user_id", this.repairPersonList);
      axios.post(this.$baseUrl + 'maintain/dispatch', formData).then(
          res=>{
            console.log(res.data.msg);
            this.$message.success(res.data.msg);
            this.$emit('getNotprocessed');
            this.$emit('getInprogress');
            this.$emit('getCompleted');
            // this.$parent.getCompleted();
            // this.$parent.getInprogress();
            // this.$parent.getNotprocessed();
            setTimeout( function() {
              _this.if_assign=false;
              //_this.$router.go(0);
            }, 100 );
          }
      )
    },
    getrepairPersonList(){
      axios.post(this.$baseUrl + 'maintain/get_maintainer_by_type').then(
          res=>{
            console.log(res);
            if(res.data.error === "0"){
              this.option=res.data.data;
            }
          }
      )
    },
    feedback(){
      this.if_feedback=true;
    },
    push_feedback(){
      let formData = new FormData();
      let _this = this;
      formData.append("user_id", this.$props.user_id);
      formData.append("info", "您收到了关于"+this.$props.roomNumber+"房间维修工单的管理员反馈消息：\n"+this.message);
      axios.post(this.$baseUrl+'maintain/feedback', formData).then(
          res=>{
            console.log(res);
            this.$message.success("反馈成功");
            setTimeout( function() {
              _this.if_feedback=false;
              //_this.$router.go(0);
            }, 100 );
          }
      )
    },
    approveOrder() {
      // 处理批准工单的逻辑
      // 可以通过调用API或者触发自定义事件来进行后续操作
    },
    rejectOrder() {
      // 处理拒绝工单的逻辑
      // 可以通过调用API或者触发自定义事件来进行后续操作
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}
.repair-order {
  border: #2c3e50 solid 1px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 25px 60px;
  box-shadow:
      0.3px 2.3px 8.6px -15px rgba(0, 0, 0, 0.041),
      0.6px 5.2px 17.2px -15px rgba(0, 0, 0, 0.053),
      1px 8.8px 26.9px -15px rgba(0, 0, 0, 0.058),
      1.7px 14.7px 39.8px -15px rgba(0, 0, 0, 0.062),
      3.4px 28.9px 60.4px -15px rgba(0, 0, 0, 0.065),
      4.2px 36.3px 98.7px -15px rgba(0, 0, 0, 0.067),
      4.7px 40.2px 184.4px -15px rgba(0, 0, 0, 0.068),
      5px 43px 500px -15px rgba(0, 0, 0, 0.07);
  background-color: rgba(70, 89, 175,0.3);
}

.order-info {
  margin-bottom: 10px;
}

.order-field {
  margin-bottom: 5px;
}
.room{
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: 30px;
}
.field-label {
  font-weight: bold;
}

.order-actions {
  text-align: right;
}

.action-button {
  margin-left: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3;
}

.text {
  font-size: 14px;
  text-align: left;
}

.item {
  margin-bottom: 18px;
}

.clearfix {
  font-size: 20px;
}

.box-card {
  width: 95%;
  margin: 15px auto;
}
.title{
  font-family: "Gill Sans", sans-serif;
  font-size: 20px;
  text-align: left;
}
</style>
