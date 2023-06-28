<template>
  <div class="change">
    <div style="margin: 50px;">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" >
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="form.phoneNo"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="form.password1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.password2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作类型">
          <el-select v-model="form.repair_type" placeholder="请选择修改后的类型">
            <el-option label="维修人员（水）" value="维修人员（水）"></el-option>
            <el-option label="维修人员（电）" value="维修人员（电）"></el-option>
            <el-option label="维修人员（机械）" value="维修人员（机械）"></el-option>
            <el-option label="清洁工" value="清洁工"></el-option>
            <el-option label="安保人员" value="安保人员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RepairInfoChange",
  created() {
    this.update();
  },
  data(){
    return {
      form: {
        username:'',
        name: '',
        phoneNo:'',
        type: '客户',
        legal_person:'',
        company_name:'',
        repair_type:'',
        password1:'',
        password2:'',
        email:'',
        identity:''
      },
      is_reload: 0,
    }
  },
  methods:{
    update(){
        this.form.name=localStorage.getItem("contact_person");
        this.form.phoneNo = localStorage.getItem("contact_phone");
        this.form.repair_type = localStorage.getItem("job_category");
        this.form.password1 = localStorage.getItem("password");
        this.form.password2 = this.form.password1;
        this.form.username = localStorage.getItem("user_name");
        this.form.email = localStorage.getItem("email");
    },
    onSubmit() {
      let _this = this;
      console.log(this.form);
      console.log('change!');
      let formData = new FormData();
      const repair_id = localStorage.getItem("repair_id");
      formData.append("user_id",repair_id);
      formData.append("username",this.form.username);
      formData.append("password_1",this.form.password1);
      formData.append("password_2",this.form.password2);
      formData.append("email",this.form.email);
      formData.append("contact_person",this.form.name);
      formData.append("contact_phone",this.form.phoneNo);
      formData.append("job_category",this.form.repair_type);

      if(this.form.username === ''){
        this.$message.error('请输入用户名');  return;
      } else if(this.form.name === ''){
        this.$message.error('请输入姓名');   return;
      } else if(this.form.phoneNo === ''){
        this.$message.error('请输入电话号码');   return;
      } else if(this.form.email === ''){
        this.$message.error('请输入邮箱');   return;
      } else if(this.form.password1 === ''){
        this.$message.error('请输入密码');   return;
      } else if(this.form.password2 === '' || this.form.password2 !== this.form.password1){
        this.$message.error('请正确输入确认密码');   return;
      }


      axios.post(`${this.$baseUrl}user/update_worker`, formData)
          .then(response => {
            if (response.data) {
              console.log(response.data);
              if(response.data.msg==='成功'){
                _this.is_reload = 1;
                _this.$message.success("修改成功");
              }
              else{
                _this.is_reload = 0;
                _this.$message.warning(response.data.msg);
              }

            }

          })
      //this.$router.go(-1);
      setTimeout( function() {
        if(_this.is_reload === 1)
          _this.$router.push('/repair');
      }, 500 );

    },
    cancel(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.change{
  box-shadow:
      2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
      6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
      22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
      100px 100px 80px rgba(0, 0, 0, 0.07);
  border: #2c3e50 solid 1px;
  text-align: center;
  background-color: rgba(250, 249, 248, 0.4);
  border-radius: 20px;
  width: 600px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s,transform .25s,filter .25s;
  backface-visibility: hidden;
}
</style>
