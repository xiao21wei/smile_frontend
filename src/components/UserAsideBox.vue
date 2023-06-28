<template>
    <div class="">
        <el-card class="asideCard">
            <el-menu style="text-align:left" class="el-menu-vertical-demo" :default-active="activeIndex"
                @select="handleSelect">
                <el-menu-item index="/lease">
                    <i class="el-icon-s-home"></i>
                    <span>我的租赁</span>
                </el-menu-item>
                <el-menu-item index="/proterty">
                    <i class="el-icon-coin"></i>
                    <span slot="title">我的物业费缴纳</span>
                </el-menu-item>
                <el-menu-item index="/writeRepair">
                    <i class="el-icon-document"></i>
                    <span slot="title">问题报修</span>
                </el-menu-item>
                <el-menu-item index="/visitorAppm">
                    <i class="el-icon-time"></i>
                    <span slot="title">访客预约</span>
                </el-menu-item>
                <el-menu-item index="/UserRepairList">
                        <i class="el-icon-files"></i>
                        <span slot="title">我的工单</span>
                </el-menu-item>
                <el-menu-item index="/clientmessage" @click="clearUnread">
                        <i class="el-icon-chat-line-round"></i>
                        <span>我的消息</span>
                        <el-badge v-if="UnreadList.length > 0" :is-dot="true"  class="item">
                  </el-badge>
                </el-menu-item>
                <el-menu-item index="/userInfo">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">个人信息</span>
                </el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/',
            UnreadList:[],
        };
    },
    created() {
      console.log('侧边栏被挂载');
      this.getUnreadMessage();
    },
    mounted() {
        this.handleRouteChange(this.$route.path);
        this.getUnreadMessage();
    },
    methods: {
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
      getUnreadMessage(){
          let user_id = localStorage.getItem('user_id')
          let load_message_formdata = new FormData();
          load_message_formdata.append('user_id', user_id);
          this.$axios.post(`${this.$baseUrl}message/message_list`, load_message_formdata)
              .then(response => {
                console.log(response)
                this.records = response.data.data
                let records_unread = [];
                for (let i = 0; i < this.records.length; i++) {
                  if (this.records[i].status == 'unread') {
                    records_unread.push(this.records[i]);
                  }
                }
                if(this.$route.path !== '/clientmessage')
                  this.UnreadList = records_unread;
                else
                  this.UnreadList = [];
                console.log('---------------------------');
                console.log(this.UnreadList);
              })
        },
      clearUnread(){
        setTimeout( function() {
          console.log('enter my message');
          this.UnreadList=[];
        }, 500 );

      }
    },
    watch: {
        '$route.path': function (newPath) {
            this.handleRouteChange(newPath);
        }
    }
}
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
    font-family: MyFont;
    font-weight: 500;
}
</style>
