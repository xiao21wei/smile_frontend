<template>
  <div>
    <div class="repairMain" v-for="(item, index) in displayItems" :key="index">
      <el-card class="UserRepairDetailCard">
        <el-form label-position="right" label-width="100px">
          <el-form-item label="房间号：">
            {{ item.room_name }}
          </el-form-item>
          <el-form-item label="时间：">
            {{ item.maintain_time }}
          </el-form-item>
          <el-form-item label="问题描述：">
            {{ item.problem }}
          </el-form-item>
        </el-form>
        <!-- <el-divider></el-divider> -->
        <br>
        <div>
          <el-steps :active="status(item.status)" align-center>
            <el-step title="待处理" description="等待管理员审核中"></el-step>
            <el-step title="已派发" description="等待工作人员上门"></el-step>
            <el-step title="维修中" description="工作人员正工作中"></el-step>
            <el-step title="已完成" description="该工单已服务完毕"></el-step>
          </el-steps>
        </div>
      </el-card>
    </div>
    <br>
    <br>
    <el-pagination :current-page="currentPage" :page-size="pageSize" :total="totalItems"
        @current-change="handlePageChange" />
  </div>
</template>
<script>
export default {
  props: {
    repairInfo: {
      default: []
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
    }
  },
  computed:{
    totalItems() {
      return this.repairInfo.length
    },
    displayItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.repairInfo.slice(startIndex, endIndex);
    },
  },
  methods: {
    status(str) {
      if (str === 'report') return 1
      else if (str === 'dispatched') return 2
      else if (str === 'repairing') return 3
      else return 4
    },
    handlePageChange(page) { 
      this.currentPage = page;
    },
  }
}
</script>
<style>
.UserRepairDetailCard {
  text-align: left;
  margin-bottom: 20px;
}

.UserRepairDetailCard .el-card__body {
  padding: 10px 20px 10px 12px;
}

.UserRepairDetailCard .el-form-item {
  margin-bottom: 0px;
}

.UserRepairDetailCard .el-form-item__content {
  font-size: 15px !important;
  word-wrap: break-word;
}

.UserRepairDetailCard .el-form-item__label {
  font-size: 15px !important;
}
</style>