<template>
  <el-row class="tac" style="width: 15%; float: left; height: 99%; position: absolute">
    <el-col :span="12" style="width: 100%; height: 100%">
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="width: 100%; height: 99%">
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
</template>

<script>
export default {
  name: "NavigationPage" ,
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

</style>