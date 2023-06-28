<template>
    <div class="HeaderBox">
        <img src="../assets/logo.gif" alt="" class="logo_smile" @click="toHome">
        <div class="SystemTitle" @click="toHome">Smile大厦管理系统</div>
        <div class="userInfo">
            <el-dropdown @command="handleCommand">
                <span style="font-size:17px">
                    <!-- 王景伟 -->
                    {{this.username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            username: localStorage.getItem("username")
        }
    },
    methods:{
        handleCommand(command){
            if(command == "logout"){
                localStorage.removeItem("username")
                localStorage.removeItem("user_id")
                localStorage.removeItem("identity")
                this.$router.push("/login")
            }else{
                this.$router.push("/message")
            }
        },
        toHome(){
            let identity = localStorage.getItem('identity')
            if(identity==='user'){
                if(this.$router.history.current.path!=='/lease'){
                    this.$router.replace('/lease')
                }
            }else if(identity==='admin'){
                if(this.$router.history.current.path!=='/rentstate') {
                    this.$router.replace('/rentstate')
                }
            }else if(identity==='worker'){
                if(this.$router.history.current.path!=='/RepairMessage') {
                    this.$router.replace('/RepairMessage')
                }
            }else {
                this.$router.replace('/')
            }
        }
    },
}
</script>
<style>
@font-face {
    font-family: "MyFont";
    src: url("../assets/阿里妈妈方圆体/AlimamaFangYuanTiVF-Thin.ttf");
}

.HeaderBox{
    position: fixed;
    top: 0;
    height: 75px;
    width: 100%;
    /* margin-bottom: -23px; */
    background-color: white;
    /* display: flex; */
    overflow-y: auto;
    z-index: 1000;
}
.logo_smile{
    width: 75px; 
    height: 75px; 
    float: left; 
    margin-left: 40px;
    cursor: pointer;
}
.SystemTitle {
  float: left;
  font-size: 30px;
  padding-left: 10px;
  padding-top: 20px;
  font-family: "MyFont";
  font-weight: 700;
  border-radius: 60px;
  cursor: pointer;
}
.userInfo{
    float: right;
    font-size: 20px;
    padding-right: 50px;
    padding-top: 20px;
}
</style>