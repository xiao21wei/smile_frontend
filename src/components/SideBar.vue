<template>
  <div class="tac">
  <el-row class="tac" style="width: 15%; float: left; height: 600px; position: absolute; margin-top: 65px;">
    <el-col :span="12" style="width: 270px; height: 600px">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ffffff"
          text-color="#000"
          style="text-align: left;width: 100%; height: 650px"
          active-text-color="#ffd04b">
        <router-link to="/all_client" style="text-decoration-line: none">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>客户信息</span>
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/repair" style="text-decoration-line: none">
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">维修人员信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/repair" style="text-decoration-line: none">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">房间状态</span>
          </el-menu-item>
        </router-link>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">消息</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>

<style scoped>
.tac{
  margin-left: 80px;
  box-shadow:
      6.5px 7.1px 2px -45px rgba(0, 0, 0, 0.033),
      15.7px 17px 4.2px -45px rgba(0, 0, 0, 0.047),
      32.7px 35.4px 7.1px -45px rgba(0, 0, 0, 0.055),
      48px 51.9px 12.5px -45px rgba(0, 0, 0, 0.06),
      55.7px 60.2px 26.1px -45px rgba(0, 0, 0, 0.065),
      61px 66px 89px -45px rgba(0, 0, 0, 0.07)
;
}
</style>
