<template>
  <div class="AdminRepairDetail">
    <el-card class="UserRepairDetailCard" body-style="border-radius:10px">
      <el-form :model="form" :inline="true">
        <el-row>
          <el-col :span="5">
            <el-form-item label="房间号:">
              {{ form.room_name }}
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="时间:">
              {{ form.maintain_time }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系人:">
              {{ form.contact_person }}
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="">
              <el-button
                type="text"
                icon="el-icon-chat-dot-square"
                @click="feedback"
                >反馈</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label="">
              <el-button
                type="text"
                icon="el-icon-circle-plus-outline"
                @click="toDetail()"
                >详情</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        title="用户反馈"
        :visible.sync="if_feedback"
        width="40%"
        @close="DialogClosed"
      >
        <el-form>
          <el-form-item>
            <el-input
              v-model="message"
              type="textarea"
              :rows="3"
              placeholder="请输入反馈内容"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="if_feedback = false">取 消</el-button>
          <el-button type="primary" @click="push_feedback">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <el-drawer
      class="RepairDrawer"
      title="工单详细信息"
      size="35%"
      :visible.sync="drawerVisible"
      direction="rtl"
    >
      <el-form
        class="DrawerForm"
        label-position="right"
        label-width="100px"
        :model="form"
      >
        <el-form-item label="工单号:">
          {{ form.maintenance_record_id }}
        </el-form-item>
        <el-form-item label="房间号:">
          {{ form.room_name }}
        </el-form-item>
        <el-form-item label="联系人:">
          {{ form.contact_person }}
        </el-form-item>
        <el-form-item label="时间:">
          {{ form.maintain_time }}
        </el-form-item>
        <el-form-item label="报修公司:">
          {{ form.company_name }}
        </el-form-item>
        <el-form-item label="联系电话:">
          {{ form.contact_phone }}
        </el-form-item>
        <el-form-item label="问题描述:">
          {{ form.problem }}
        </el-form-item>
        <el-form-item
          label="维修人员:"
          v-if="this.$props.form.maintain_user_name === ''"
        >
          未指派 &nbsp;&nbsp;
          <el-button type="text" icon="el-icon-s-promotion " @click="assign()"
            >指派</el-button>
          <el-button type="text" icon="el-icon-s-promotion " @click="smart_assign()">智能指派</el-button>
          <el-dialog
            title="指派维修人员"
            :visible.sync="if_assign"
            width="40%"
            @close="DialogClosed"
          >
            <el-form
              ref="form"
              model="repairPersonList"
              style="text-align: left"
            >
              <el-form-item label="维修人员">
                <el-cascader
                  style="width: 40%"
                  v-model="repairPersonList"
                  size="primary"
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
        </el-form-item>
        <el-form-item label="维修人员:" v-else>
          {{ form.maintain_user_name }}
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      drawerVisible: false,
      if_assign: false,
      if_feedback: false,
      message: "",
      repairPersonList: [],
      option: [],
      Repair: {},
      order: {
        roomNumber: 405,
        contactPerson: "李大壮",
        contactNumber: 18346461980,
        companyName: "北航",
        repairTime: "2020-02-01",
        description: "asdadas dasd asd as das ",
      },
    };
  },
  props: ["form"],
  methods: {
    toDetail() {
      console.log(this.form);
      this.drawerVisible = true;
    },
    childMethod() {
      this.$parent.fatherMethod();
    },
    handleChange(value) {
      console.log(value);
    },
    DialogClosed() {},
    smart_assign(){
      let formData = new FormData();
      let _this = this;
      formData.append("maintenance_record_id", this.$props.form.maintenance_record_id);
      axios.post(this.$baseUrl+'maintain/smart_dispatch', formData).then(
          res=>{
            console.log(res);
            if(res.data.error === "0"){
              this.$alert('已派发给'+res.data.job_category+'/'+res.data.maintain_user_name, '派发成功', {
                confirmButtonText: '确定',
                // callback: action => {
                //   this.$message({
                //     type: 'info',
                //     message: `action: ${ action }`
                //   });
                // }
              });
              this.$emit("callAsideUnread");
              this.$emit("getNotprocessed");
              this.$emit("getInprogress");
              this.$emit("getCompleted");
              setTimeout(function () {
                //_this.if_assign = false;
                _this.drawerVisible = false;
                //_this.$router.go(0);
              }, 100);
            }
            else {
              this.$alert('缺乏相应的维修人员——维修人员('+res.data.type+')', '派发失败', {
                confirmButtonText: '确定',
                // callback: action => {
                //   this.$message({
                //     type: 'info',
                //     message: `action: ${ action }`
                //   });
                // }
              });
            }
          }
      )
    },
    success_assign(){
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    },
    assign() {
      this.if_assign = true;
      console.log(this.if_assign);
      this.getrepairPersonList();
    },
    push_assign() {
      let formData = new FormData();
      let _this = this;
      formData.append(
        "maintenance_record_id",
        this.$props.form.maintenance_record_id
      );
      formData.append("maintain_user_id", this.repairPersonList);
      if(this.repairPersonList.length === 0){
        this.$message.warning("维修人员不能为空！");
        return;
      }
      axios.post(this.$baseUrl + "maintain/dispatch", formData).then((res) => {
        console.log(res.data.msg);
        this.$message.success(res.data.msg);
        this.$emit("getNotprocessed");
        this.$emit("getInprogress");
        this.$emit("getCompleted");
        console.log('子调用父');
        this.$emit("callAsideUnread");
        // this.$parent.getCompleted();
        // this.$parent.getInprogress();
        // this.$parent.getNotprocessed();
        setTimeout(function () {
          _this.if_assign = false;
          _this.drawerVisible = false;
          //_this.$router.go(0);
        }, 100);
      });
    },
    getrepairPersonList() {
      axios
        .post(this.$baseUrl + "maintain/get_maintainer_by_type")
        .then((res) => {
          console.log(res);
          if (res.data.error === "0") {
            this.option = res.data.data;
          }
        });
    },
    feedback() {
      this.if_feedback = true;
    },
    push_feedback() {
      let formData = new FormData();
      let _this = this;
      formData.append("user_id", this.$props.form.user_id);
      formData.append(
        "info",
        "您收到了关于" +
          this.$props.form.room_name +
          "房间维修工单的管理员反馈消息：\n" +
          this.message
      );
      if(this.message === ""){
        this.$message.warning("反馈消息不能为空！");
        return;
      }
      axios.post(this.$baseUrl + "maintain/feedback", formData).then((res) => {
        console.log(res);
        this.$message.success("反馈成功");
        setTimeout(function () {
          _this.if_feedback = false;
          //_this.$router.go(0);
        }, 100);
      });
    },
    approveOrder() {
      // 处理批准工单的逻辑
      // 可以通过调用API或者触发自定义事件来进行后续操作
    },
    rejectOrder() {
      // 处理拒绝工单的逻辑
      // 可以通过调用API或者触发自定义事件来进行后续操作
    },
  },
};
</script>
<style>
.el-cascader-panel {
  height: 150px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  height: 100%;
}
.el-form-item__content {
  height: 100%;
}
.AdminRepairDetail {
  border-radius: 10px;
}
.UserRepairDetailCard {
  text-align: left;
  margin-bottom: 20px;
}
.UserRepairDetailCard .el-card__body {
  padding: 10px;
  border-radius: 10px !important;
}
.UserRepairDetailCard .el-form-item {
  margin-bottom: 0px;
}
.UserRepairDetailCard .el-form-item__content {
  font-size: 16px !important;
  /* font-weight: 540; */
}
.UserRepairDetailCard .el-form-item__label {
  font-size: 16px !important;
  color: #606266c4;
  /* font-weight: bold; */
}
.DrawerForm {
  padding: 30px;
  text-align: left;
}
.DrawerForm .el-form-item {
  margin-bottom: 0px;
}
.DrawerForm .el-form-item__content {
  font-size: 15px !important;
  /* font-weight: 540; */
}
.DrawerForm .el-form-item__label {
  font-size: 15px !important;
  color: #606266c4;
  /* font-weight: bold; */
}
.RepairDrawer #el-drawer__title {
  padding-top: 50px !important;
  margin-bottom: 15px;
}
.v-modal {
  z-index: 1010 !important ;
}
</style>
