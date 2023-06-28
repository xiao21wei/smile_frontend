<template>
  <div class="">
    <el-card class="asideCard">
      <el-menu
        style="text-align: left"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @select="handleSelect"
        :default-active="activeIndex"
        @close="handleClose"
      >
        <el-menu-item index="/rentstate" @click="fetchData">
          <i class="el-icon-s-home"></i>
          <span>房间状态总览</span>
        </el-menu-item>
        <el-menu-item index="/all_client" @click="fetchData">
          <i class="el-icon-user-solid"></i>
          <span slot="title">客户列表</span>
        </el-menu-item>
        <el-menu-item index="/repair" @click="fetchData">
          <i class="el-icon-document"></i>
          <span slot="title">管理人员列表</span>
        </el-menu-item>
        <el-menu-item index="/AdminRepair" @click="deleteData">
          <i class="el-icon-chat-line-round"></i>
          <span>维修工单</span>
          <el-badge
            v-if="UnreadList.length > 0"
            :value="UnreadList.length"
            :max="10"
            class="item"
          ></el-badge>
        </el-menu-item>
        <el-menu-item index="/userInfo" @click="fetchData">
          <i class="el-icon-s-custom"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/Graph">
          <i class="el-icon-chat-line-round"></i>
          <span slot="title">统计图表</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminAsideBox",
  data() {
    return {
      username: localStorage.getItem("username"),
      activeIndex: "/",
      hasUnreadMessages: false,
      UnreadList: [],
      UnreadNum: 0,
    };
  },
  created() {
    this.handleRouteChange(this.$route.path);
    console.log("侧边栏被挂载");
    this.getUnreadMessage();
  },
  mounted() {
    this.handleRouteChange(this.$route.path);
    console.log("侧边栏被挂载");
    this.getUnreadMessage();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleRouteChange(path) {
      this.activeIndex = path;
    },
    handleSelect(index) {
      if (index === this.activeIndex) {
        return;
      }
      this.$router.push(index);
      this.activeIndex = index;
    },
    getUnreadMessage() {
      let _this = this;
      let formData = new FormData();
      formData.append("status", "report");
      axios
        .post(this.$baseUrl + "maintain/get_report", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.error !== "1001") {
            _this.UnreadList = res.data.data;
            console.log(_this.UnreadList.length);
            _this.hasUnreadMessages = _this.UnreadList.length !== 0;
          } else {
            _this.UnreadList = [];
            _this.hasUnreadMessages = false;
          }
        });
    },
    fetchData() {
      console.log("页面切换");
    },
    deleteData() {
      console.log("取消红点");
    },
  },
  watch: {
    "$route.path": function (newPath) {
      this.handleRouteChange(newPath);
      console.log("切换路由");
    },
    UnreadList: {
      handler(newList) {
        this.hasUnreadMessages = newList.length !== 0;
      },
      immediate: true, // 在侦听器被添加时立即调用处理函数，以确保初始值的正确设置
    },
  },
};
</script>
<style>
@font-face {
  font-family: "MyFont";
  src: url("../assets/阿里妈妈方圆体/AlimamaFangYuanTiVF-Thin.ttf");
}

.asideCard .el-card__body {
  padding: 0;
}

.asideCard {
  min-height: 80vh;
}

.el-menu-item span {
  font-size: 18px;
  font-family: "MyFont";
  font-weight: 500;
}
.unread-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
.badge-number {
  display: inline; /* 将 display 值改为 inline */
  font-size: 10px; /* 调整字体大小为更小的值 */
  background-color: red;
  color: white;
  padding: 2px 4px;
  border-radius: 8px; /* 调整边框半径为更小的值 */
  max-width: 20px; /* 调整数字部分的最大宽度 */
  text-overflow: ellipsis; /* 如果数字部分过长，使用省略号显示 */
  white-space: nowrap; /* 防止数字换行显示 */
  overflow: hidden; /* 隐藏溢出部分 */
}
.item {
  margin-top: -10px;
  margin-left: 3px;
}
</style>
