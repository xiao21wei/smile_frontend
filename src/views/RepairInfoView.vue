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
          <el-col :span="8"><div style="min-height: 36px"></div></el-col>
          <el-col :span="12">
            <el-input  @keyup.enter.native="handleSearch"
                       @submit.native.prevent v-model="search"
                       placeholder="请输入想要查找人员的姓名"
                       clearable></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="handleSearch" icon="el-icon-search" circle></el-button>
          </el-col>
          <el-col :span="2">
            <AddUserButton/>
          </el-col>
        </el-row>
        <el-row>
          <el-table
              class="shadow"
              :data="worker.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :row-class-name="tableRowClassName">
            <el-table-column
                prop="contact_person"
                label="姓名"
                width="140">
            </el-table-column>
            <el-table-column
                prop="contact_phone"
                label="手机号码"
                width="180">
            </el-table-column>
            <el-table-column
                prop="job_category"
                label="类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="is_working"
                label="状态">
              <template slot-scope="scope">
                <el-button v-if="!scope.row.is_working" type="success" icon="el-icon-check" circle></el-button>
                <el-button v-else type="danger" icon="el-icon-close" circle></el-button>
              </template>
              <el-row icon="success" ></el-row>
            </el-table-column>
            <el-table-column
                align="middle"
                width="105">
              <template slot-scope="scope">
                <!--        <el-button-->
                <!--            size="mini"-->
                <!--            @click="handleDeal(scope.row)" :disabled="!scope.row.status">指派</el-button>-->
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleChange(scope.row)" >修改</el-button>
              </template>
            </el-table-column>
            <el-table-column
                align="middle"
                width="100">
              <template slot-scope="scope">
        <!--        <el-button-->
        <!--            size="mini"-->
        <!--            @click="handleDeal(scope.row)" :disabled="!scope.row.status">指派</el-button>-->
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination align='center'
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[2,5,7,10]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="worker.length">
          </el-pagination>
        </el-row>
      </el-col>
      <el-col :span="3" style="min-height: 20px"></el-col>
    </el-row>
    </div>
</template>

<script>
import axios from 'axios';
// import SideBar from "@/components/SideBar";
import HeaderBox from "@/components/HeaderBox";
import AdminAsideBox from "@/components/AdminAsideBox";
import AddUserButton from "@/components/AddUserButton";
export default {
  name: "RepairInfoView",
  components: {AddUserButton, HeaderBox,AdminAsideBox},
  created() {
    this.getRepair();
  },
  mounted() {
    this.getRepair();
  },
  data() {
    return {
      isAdd:0,
      search:'',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 7, // 每页的数据条数
      worker: []
    }
  },
  methods: {
    getRepair(){
      let _this = this;
      let formData = new FormData();
      axios.post(`${this.$baseUrl}user/get_repair_info`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              _this.worker = response.data.worker;
            }
          })
    }
    ,
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return 'success-row';
      }else if (rowIndex === 3) {
        return 'warning-row';
      }
      return '';
    },
    handleDeal(worker){
      console.log(worker);
    },
    handleDelete(worker){
      let _this = this;
      console.log(worker);
      console.log(worker.user_id);
      console.log("delete!");
      let formData = new FormData();
      formData.append("user_id",worker.user_id);
      axios.post(`${this.$baseUrl}user/delete_user`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              _this.$message.success(response.data.msg);
            }
          })
      setTimeout( function() {
        _this.$router.go(0);
      }, 500 );
    },
    handleSearch(){
      console.log(this.search);
      let _this = this;
      console.log("search!");
      let formData = new FormData();
      formData.append("contact_person",this.search);
      axios.post(`${this.$baseUrl}user/search_repair_info`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              if(response.data.errno === 0)
              {
                if(this.search !== '')
                  _this.$message.success(response.data.msg);
                _this.worker=response.data.worker;
                _this.currentPage = 1;
              }
              else{
                _this.$message.warning(response.data.msg);
                _this.worker=[];
                _this.currentPage = 1;
              }

            }
          })
    },
    handleAdd(){
        this.$router.push('/register');
    },
    handleChange(worker){
      console.log("change!");
      console.log(worker);
      this.msgStore(worker);
      this.$router.push('/repair_change');
    },
    msgStore(worker){
      console.log('保存信息');
      localStorage.setItem("repair_id",worker.user_id);
      localStorage.setItem("contact_person",worker.contact_person);
      localStorage.setItem("contact_phone",worker.contact_phone);
      localStorage.setItem("user_name",worker.username);
      localStorage.setItem("job_category",worker.job_category);
      localStorage.setItem("password",worker.password);
      localStorage.setItem("email",worker.email);
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
  watch:{
    search:{
      immediate:true,
      handler: function (newVal){
        if(newVal === ''){
          this.handleSearch();
        }
      }
    }
  }
}
</script>

<style scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.shadow{
  box-shadow:
      0px 0px 11.5px -45px rgba(0, 0, 0, 0.04),
      0px 0px 23.4px -45px rgba(0, 0, 0, 0.052),
      0px 0px 39.8px -45px rgba(0, 0, 0, 0.058),
      0px 0px 70.4px -45px rgba(0, 0, 0, 0.062),
      0px 0px 146.6px -45px rgba(0, 0, 0, 0.066),
      0px 0px 500px -45px rgba(0, 0, 0, 0.07);
  margin-bottom: 50px;
  margin-top: 20px;
}
</style>
