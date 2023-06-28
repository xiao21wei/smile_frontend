<template>
<div v-show="getPropertyTable" class="ClientDetail">
  <HeaderBox></HeaderBox>
  <el-divider></el-divider>
  <div>
    <el-row>
      <el-col :span="5" style="min-height: 20px;">

      </el-col>
      <el-col :span="14">
        <el-card>
          <el-row>
            <div style="font-size: 25px; height: 50px; font-weight: 550; text-align: left;">
              客户基本信息
            </div>
          </el-row>
          <div v-if="if_changing===0">
            <el-form ref="form">
              <el-form-item label="法人名称">
                <el-input v-model="this.client.legal_entity_name" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司名称">
                <el-input v-model="this.client.company_name" disabled></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名">
                <el-input v-model="this.client.contact_person" disabled></el-input>
              </el-form-item>
              <el-form-item label="联系人电话">
                <el-input v-model="this.client.contact_phone" disabled></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="change">修改</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
            <el-form ref="changeRef" :model="client" :rules="rules">
              <el-form-item label="法人名称" prop="legal">
                <el-input v-model="client.legal_entity_name"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="company">
                <el-input v-model="client.company_name"></el-input>
              </el-form-item>
              <el-form-item label="联系人姓名" prop="username">
                <el-input v-model="client.contact_person"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话" prop="phone">
                <el-input v-model="client.contact_phone"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="settle">确认修改</el-button>
                <el-button @click="cancel">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
         <el-divider></el-divider>
        <el-card>
          <div style="font-size: 25px; height: 50px; float: left; font-weight: 550">
            房间租赁状况
            <el-button type="text" style="font-size: 25px" icon="el-icon-circle-plus-outline" slot="reference" @click="ClearLease"></el-button>
            <el-dialog title="添加租赁信息" :visible.sync="if_addLease" width="30%" @close="DialogClosed" >
              <el-form ref="form" model="Lease"  style="text-align: left">
                <el-form-item label="租赁房间" >
                  <!--                <el-input v-model="Lease.rooms" ></el-input>-->
                  <el-cascader
                      v-model="Lease_roomlist"
                      style="width:160px"
                      size="medium"
                      :options="option"
                      :props="{ multiple: true }"
                      clearable
                      @change="handleChange"
                  />
                </el-form-item>
                <el-form-item label="开始时间">
                  <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="Lease.start_time"
                      type="date"
                      placeholder="开始时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                  <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="Lease.end_time"
                      type="date"
                      placeholder="结束时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="签约时间">
                  <el-date-picker
                      value-format="yyyy-MM-dd"
                      v-model="Lease.sign_time"
                      type="date"
                      placeholder="签约时间">
                  </el-date-picker>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="if_addLease = false">取 消</el-button>
                    <el-button type="primary" @click="add_lease">确 定</el-button>
              </span>
            </el-dialog>
          </div>
          <div>
            <el-table
                :data="userleaseTable"
                stripe
                border
                style="width: 100%;">
              <el-table-column
                  prop="order_id"
                  label="合同号"
                  width="140">
              </el-table-column>
              <el-table-column
                  prop="rooms"
                  label="租赁房间"
                  >
              </el-table-column>
              <el-table-column
                  prop="start_time"
                  label="开始时间"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="end_time"
                  label="结束时间"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="sign_time"
                  label="签约时间"
                  width="120"
                  >
              </el-table-column>
              <el-table-column
                  width="100">
                <template slot-scope="scope">
                  <el-button type="text" icon="el-icon-edit" @click="if_modify_lease = true;  Staging_lease(scope.row)">修改</el-button>
                  <el-dialog title="修改租赁信息" :visible.sync="if_modify_lease" width="30%" @close="DialogClosed" >
                    <el-form ref="form" model="Lease">
                      <el-form-item label="合同号" prop="order_id">
                        <el-input v-model="Lease.order_id" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="租赁房间" prop="rooms">
                        <el-input v-model="Lease.rooms" disabled></el-input>
                      </el-form-item>
                      <!--                    <el-form-item label="开始时间" prop="start_time">-->
                      <!--                      <el-input v-model="Lease.start_time"></el-input>-->
                      <!--                    </el-form-item>-->
                      <div style="height: 30px">开始时间</div>
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          v-model="Lease.start_time"
                          type="date"
                          placeholder="开始时间">
                      </el-date-picker>
                      <!--                    <el-form-item label="结束时间" prop="end_time">-->
                      <!--                      <el-input v-model="Lease.end_time"></el-input>-->
                      <!--                    </el-form-item>-->
                      <div style="height: 30px"><p></p>结束时间</div>
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          v-model="Lease.end_time"
                          type="date"
                          placeholder="结束时间">
                      </el-date-picker>
                      <!--                    <el-form-item label="签约时间" prop="sign_time">-->
                      <!--                      <el-input v-model="Lease.sign_time"></el-input>-->
                      <!--                    </el-form-item>-->
                      <div style="height: 30px"><p></p>签约时间</div>
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          v-model="Lease.sign_time"
                          type="date"
                          placeholder="签约时间">
                      </el-date-picker>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="if_modify_lease = false">取 消</el-button>
                    <el-button type="primary" @click="modify_lease">确 定</el-button>
                  </span>
                  </el-dialog>
                  &nbsp;
                  <el-button type="text" icon="el-icon-delete" slot="reference" @click="delete_lease(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
         <el-divider></el-divider>
        <el-card>
          <div style="font-size: 25px; height: 80px; float: left; font-weight: 550; text-align: center">
            <p></p>
            物业费缴纳状况
            <el-button type="text" style="font-size: 25px" icon="el-icon-circle-plus-outline" slot="reference" @click="ClearProperty"></el-button>
            <el-dialog title="添加缴费信息" :visible.sync="if_addProperty" width="30%" @close="DialogClosed" >
              <el-form ref="form" model="Property" style="text-align: left">
                <el-form-item label="合同号" prop="order_id">
<!--                  <el-input v-model="Property.order_id" ></el-input>-->
                  <el-select v-model="value_property" placeholder="请选择合同号">
                    <el-option
                        v-for="item in option_property"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div style="height: 30px;" align="left">具体缴费日期</div>
                <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="Property.pay_time"
                    type="date"
                    placeholder="具体缴费日期"
                >
                </el-date-picker>
              </el-form>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="if_addProperty = false">取 消</el-button>
                    <el-button type="primary" @click="add_property">确 定</el-button>
                  </span>
            </el-dialog>
          </div>
          <div>
            <el-table
                :data="PropertyTable"
                stripe
                border
                style="width: 100%">
              <el-table-column
                  prop="order_id"
                  label="合同号"
                  width="140">
              </el-table-column>
              <el-table-column
                  prop="payment_cycle"
                  label="缴费周期"
                  width="170">
              </el-table-column>
              <el-table-column
                  prop="is_pay"
                  label="是否缴纳物业费">
              </el-table-column>
              <el-table-column
                  prop="pay_time"
                  label="具体缴费日期">
              </el-table-column>
              <el-table-column
                  width="140">
                <template slot-scope="scope">
                  <!--<el-button type="text" icon="el-icon-edit" @click="judgescope(scope.row)">加加</el-button>-->
                  <el-button type="text" icon="el-icon-edit" @click="if_modify_property = true;  Staging(scope.row)" >修改</el-button>
                  <el-dialog title="修改缴费信息" :visible.sync="if_modify_property" width="30%" @close="DialogClosed" >
                    <el-form ref="form" model="Property">
                      <el-form-item label="合同号" prop="order_id">
                        <el-input v-model="Property.order_id" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="缴费周期" prop="payment_cycle">
                        <el-input v-model="Property.payment_cycle" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="是否缴纳物业费" prop="is_pay">
                        <el-input v-model="Property.is_pay" disabled></el-input>
                      </el-form-item>
                      <!--                    <el-form-item label="具体缴费日期" prop="pay_time">-->
                      <!--                      <el-input v-model="Property.pay_time"></el-input>-->
                      <!--                    </el-form-item>-->
                      <div style="height: 30px">具体缴费日期</div>
                      <el-date-picker
                          value-format="yyyy-MM-dd"
                          v-model="Property.pay_time"
                          type="date"
                          placeholder="具体缴费日期">
                      </el-date-picker>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="if_modify_property = false">取 消</el-button>
                    <el-button type="primary" @click="modify_property">确 定</el-button>
                  </span>
                  </el-dialog>
                  <!--<el-dialog title="修改合同信息" :visible.sync="if_modify_property" width="50%" @close="DialogClosed" >
                    <el-form ref="form" >
                      <el-form-item label="合同号" prop="order_id">
                        <el-input v-model="scope.row.order_id"></el-input>
                      </el-form-item>
                      <el-form-item label="缴费周期" prop="payment_cycle">
                        <el-input v-model="scope.row.payment_cycle"></el-input>
                      </el-form-item>
                      <el-form-item label="是否缴纳物业费" prop="is_pay">
                        <el-input v-model="scope.row.is_pay"></el-input>
                      </el-form-item>
                      <el-form-item label="具体缴费日期" prop="pay_time">
                        <el-input v-model="scope.row.pay_time"></el-input>
                      </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="if_modify_property = false">取 消</el-button>
                      <el-button type="primary" @click="modify_property">确 定</el-button>
                    </span>
                  </el-dialog>-->
                  &nbsp;
                  <!--<el-button type="text" icon="el-icon-delete" slot="reference" @click="delete_property(scope.$index)">删除</el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <div style="height: 50px"></div>
      </el-col>
      <el-col :span="5" style="min-height: 20px;"></el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "clientDetail" ,
  data(){
    var checkMobile = (rule, value, callback) => {
      var regmobile = /^1([3-9]\d|5[0-35-9]|7[3678])\d{8}$/
      if (regmobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法手机'))
    }
    return{
      option_property: [],
      value_property: '',
      if_modify_property: false,
      if_modify_lease: false,
      if_addProperty: false,
      if_addLease: false,
      if_changing: 0,
      client: {
        user_id: '',
        legal_entity_name: '',
        company_name: '',
        contact_person: '',
        contact_phone: '',
      },
      client2: {
        user_id: '',
        legalName: '',
        companyName: '',
        contactName: '',
        phone: '',
      },
      clientList: {

      },
      Lease: {
        order_id: '',
        rooms: '',
        start_time: '',
        end_time: '',
        sign_time: '',
      },
      Lease_roomlist: [],
      option: [],
      /*client: {
        user_id:'',
        company: '软过2',
        juridical_person: '一个常见的名字',
        name: '李华',
        phone: '13273329706',
      },*/
      userleaseTable: [
/*
        {
          order_id: "",
          rooms:"101",
          start_time:"2023-4-12",
          end_time:"2024-4-11",
          sign_time:"2023-3-12",
        },
        {
          rooms:"102",
          start_time:"2023-4-12",
          end_time:"2024-4-11",
          sign_time:"2023-3-12",
        },
        {
          rooms:"103",
          start_time:"2023-4-12",
          end_time:"2024-4-11",
          sign_time:"2023-3-12",
        },
        {
          rooms:"104",
          start_time:"2023-4-12",
          end_time:"2024-4-11",
          sign_time:"2023-3-12",
        },*/
      ],
      Property: {
        order_id: "",
        payment_cycle:"",
        is_pay:"",
        pay_time:"",
      },
      Property_2: {
        order_id: "",
        payment_cycle:"",
        is_pay:"",
        pay_time:"",
      },
      PropertyTable: [
        /*{
          order_id: "",
          payment_cycle:"2023",
          is_pay:"是",
          pay_time:"2023-4-1",
        },
        {
          order_id: "",
          payment_cycle:"2022",
          is_pay:"是",
          pay_time:"2023-5-30",
        },
        {
          order_id: "",
          payment_cycle:"2021",
          is_pay:"是",
          pay_time:"2023-3-26",
        },
        {
          order_id: "",
          payment_cycle:"2020",
          is_pay:"否",
          pay_time:"",
        },
        {
          order_id: "",
          payment_cycle:"2019",
          is_pay:"是",
          pay_time:"2023-6-30",
        },
        {
          order_id: "",
          payment_cycle:"2018",
          is_pay:"是",
          pay_time:"2023-2-26",
        },
        {
          order_id: "",
          payment_cycle:"2017",
          is_pay:"否",
          pay_time:"",
        },*/
      ],
      rules: {
        legal:[
          { required: true, message: '请输入法人名称', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        company:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    // this.getclient();
    this.get_newclient();
    this.getRentalInformation(localStorage.getItem("client_user_id"));
    this.getPropertyTable(localStorage.getItem("client_user_id"));
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    getclient(){
      this.client.company_name=localStorage.getItem("client_company_name");

      // this.client.legal_entity_name=localStorage.getItem("client_legal_entity_name");
      this.client.contact_person=localStorage.getItem("client_contact_person");
      this.client.contact_phone=localStorage.getItem("client_contact_phone");
    },
    getRentalInformation(user_id){
      let formData = new FormData();
      formData.append("user_id", user_id);
      axios.post(this.$baseUrl+"user/user_lease_info",
          formData
      ).then(res => {
        console.log(res)
        if(res.data.errno=== 0){
          this.userleaseTable = res.data.data.rent_info
        }
        else if(res.data.errno===1){
          this.userleaseTable = []
        }
      })
    },
    getPropertyTable(user_id){
      let formData = new FormData();
      formData.append("user_id", user_id);
      axios.post(this.$baseUrl+"space/get_payment_record_by_user",
          formData
      ).then(
          res =>{
            console.log(res)
            this.PropertyTable= res.data.data;
            this.option_property=res.data.order_list;
          }
      )
    },
    toclientlist(){
      this.$router.push('/all_client');
    },
    change() {
      this.if_changing=1;
      //console.log(this.if_changing);
    },
    settle(){
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("client_user_id"));
      formData.append("legal_entity_name", this.client.legal_entity_name);
      formData.append("company_name", this.client.company_name);
      formData.append("contact_person", this.client.contact_person);
      formData.append("contact_phone", this.client.contact_phone);
      // debugger
      this.$refs.changeRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('填写内容不合法，请修改')
          //loading.close()
          return
        } else {
          const res = await this.$axios.post(this.$baseUrl + "user/update_user", formData)
          console.log(res);
          this.$message.success(res.data.msg);
          console.log(localStorage.getItem("client_user_id"));
          this.get_newclient();
          this.if_changing=0;
        }

        }
      )
    },
    cancel(){
      this.$router.go(0);
    },
    get_newclient(){
      //var i=0;
      let user_id=localStorage.getItem("client_user_id");
      console.log(user_id);
      console.log(this.if_changing);
      //let client2 ;
      let _this = this;
      let formData = new FormData();
      formData.append("user_id", user_id);
      axios.post(this.$baseUrl+'user/information', formData).then(
          res => {
            console.log(res)
            _this.client = res.data.data;
          }
      )
      console.log("第二个："+this.client.company_name);
      /*setTimeout( function() {
        _localStorage.getItem("client_user_id")= _this.client2.user_id;
        _this.client.contact_phone= _this.client2.phone;
        _this.client.contact_person= _this.client2.contactName;
        _this.client.company_name= _this.client2.companyName;
        _this.client.legal_entity_name= _this.client2.legalName;
        _this.$router.go(0);
      }, 500 );*/

    },
    get_emptyroom(){
      axios.post(this.$baseUrl + 'space/get_empty_room').then(
          res=>{
            console.log(res);
            if(res.data.error === "0"){
              this.option=res.data.data;
            }
          }
      )
    },
    modify_lease(){
      let loading = this.$loading({fullscreen:true, text:'拼命加载中...'})
      let formData = new FormData();
      let _this=this;
      formData.append("order_id", this.Lease.order_id);
      formData.append("start_time", this.Lease.start_time);
      formData.append("end_time", this.Lease.end_time);
      formData.append("sign_time", this.Lease.sign_time);
      if(this.Lease.start_time > this.Lease.end_time){
        this.$message.warning("结束时间不能早于开始时间！")
        loading.close();
        return;
      }
      axios.post(this.$baseUrl+'space/modify_rent_info', formData).then(
          res=>{
            console.log(res.data.msg);
            if(res.data.error === "0"){
              this.getRentalInformation(localStorage.getItem("client_user_id"));
              this.getPropertyTable(localStorage.getItem("client_user_id"));
              setTimeout( function() {
                _this.if_modify_lease=false;
                _this.$message.success(res.data.msg);
                //_this.$router.go(0);
              }, 100 );
            }
            else{
              this.$message.error(res.data.msg);
            }
            loading.close()
          }
      )
      //this.getRentalInformation(localStorage.getItem("client_user_id"));
    },
    DialogClosed(){
    },
      Staging_lease(Lease){
      this.Lease.rooms=Lease.rooms;
      this.Lease.order_id=Lease.order_id;
      this.Lease.start_time=Lease.start_time;
      this.Lease.end_time=Lease.end_time;
      this.Lease.sign_time=Lease.sign_time;
    },
    delete_lease(id){
      let loading = this.$loading({fullscreen:true, text:'拼命加载中...'})
      let formData = new FormData();
      //let _this = this;
      //let _this = this;
      formData.append("order_id", this.userleaseTable[id].order_id);
      axios.post(this.$baseUrl+'space/delete_rent_info', formData).then(
          res=>{
            console.log(res.data.msg);
            if(res.data.error === "0"){
              this.$message.success(res.data.msg);
              this.getRentalInformation(localStorage.getItem("client_user_id"));
              this.getPropertyTable(localStorage.getItem("client_user_id"));
              setTimeout( function() {
                //_this.$router.go(0);
                loading.close()
              }, 100 );
            }
            else{
              this.$message.error(res.data.msg);
              loading.close()
            }
          }
      )
    },
    add_lease(){
      let loading = this.$loading({fullscreen:true, text:'拼命加载中...'})
      let formData = new FormData();
      let _this=this;
      console.log(this.Lease_roomlist);
      console.log(this.Lease.start_time)
      formData.append("user_id", localStorage.getItem("client_user_id"));
      formData.append("room_names",   this.Lease_roomlist);
      formData.append("start_time", this.Lease.start_time);
      formData.append("end_time", this.Lease.end_time);
      formData.append("sign_time", this.Lease.sign_time);
      if(this.Lease_roomlist.length===0){
        this.$message.warning("房间号不能为空！")
        loading.close();
        return;
      }
      if(this.Lease.start_time===''||this.Lease.end_time===''||this.Lease.sign_time===''){
        this.$message.warning("时间不能为空！")
        loading.close();
        return;
      }
      if(this.Lease.start_time > this.Lease.end_time){
        this.$message.warning("结束时间不能早于开始时间！")
        loading.close();
        return;
      }
      axios.post(this.$baseUrl+'space/add_rent_record', formData).then(
          res=>{
            console.log(res.data.msg);
            if(res.data.error === "0"){
              this.$message.success(res.data.msg);
              this.getRentalInformation(localStorage.getItem("client_user_id"));
              this.getPropertyTable(localStorage.getItem("client_user_id"));
              setTimeout( function() {
                _this.if_addLease=false;
                //_this.$router.go(0);
                loading.close()
              }, 100 );
            }
            else{
              this.$message.error(res.data.msg);
            }
          }
      )
    },
    modify_property(){
      console.log(this.Property.order_id);
      let formData = new FormData();
      let _this = this;
      formData.append("order_id", this.Property.order_id);
      formData.append("payment_id", this.Property.payment_id);
      formData.append("pay_time", this.Property.pay_time);
      if(this.Property.pay_time===null && this.Property.is_pay === "是"){
        this.$message.warning("时间不能为空！")
        //loading.close();
        return;
      }
      let loading = this.$loading({fullscreen:true, text:'拼命加载中...'})
      axios.post(this.$baseUrl+'space/modify_payment_info', formData).then(
          res=>{
            console.log(res.data.msg);
            if(res.data.error === "0"){
              this.$message.success(res.data.msg);
              _this.if_modify_property = false;
              //this.getPropertyTable(localStorage.getItem("client_user_id"));
              setTimeout( function() {
                _this.getPropertyTable(localStorage.getItem("client_user_id"));
              }, 100 );
            }
            else{
              this.$message.error(res.data.msg);
            }
            loading.close()
          }
      )
      //this.ClearProperty();
    },
    add_property(){
      let _this=this;
      console.log(this.Property.order_id);
      let formData = new FormData();
      formData.append("order_id", this.value_property);
      formData.append("pay_time", this.Property.pay_time);
      if(this.value_property===''){
        this.$message.warning("合同号不能为空！")
        //loading.close();
        return;
      }
      if(this.Property.pay_time===''){
        this.$message.warning("时间不能为空！")
        //loading.close();
        return;
      }
      let loading = this.$loading({fullscreen:true, text:'拼命加载中...'})
      axios.post(this.$baseUrl+'space/add_payment_record', formData).then(
          res=>{
            console.log(res.data.msg);
            if(res.data.error === '0'){
              this.$message.success(res.data.msg);
              this.getPropertyTable(localStorage.getItem("client_user_id"));
              setTimeout( function() {
                _this.if_addProperty=false;
                //_this.$router.go(0);
              }, 100 );
            }
            else{
              this.$message.error(res.data.msg);
            }
            loading.close()
          }
      )
    },
    Staging(Property){
      this.Property.order_id=Property.order_id;
      this.Property.payment_cycle=Property.payment_cycle;
      this.Property.is_pay=Property.is_pay;
      this.Property.pay_time=Property.pay_time;
      if(Property.payment_id === ""){
        this.Property.payment_id = -1;
      }
      else {
        this.Property.payment_id=Property.payment_id;
      }
    },
    ClearProperty(){
      this.if_addProperty = true;
      console.log(this.Property.order_id);
      this.Property.order_id="";
      this.Property.payment_cycle="";
      this.Property.is_pay="";
      this.Property.pay_time="";
      this.Property.payment_id="";
      console.log(this.Property.order_id);
    },
    ClearLease(){
      this.get_emptyroom();
      this.if_addLease = true;
      this.Lease.order_id="";
      this.Lease.start_time="";
      this.Lease.end_time="";
      this.Lease.sign_time="";
      this.Lease.rooms="";
    },
    delete_property(id){
      console.log(this.PropertyTable[id].payment_id);
      let formData = new FormData();
      formData.append("payment_id", this.PropertyTable[id].payment_id);
      axios.post(this.$baseUrl+'space/delete_payment_info', formData).then(
          res=>{
            console.log(res.data.msg);
            this.getPropertyTable(localStorage.getItem("client_user_id"));
          }
      )
    },
  }
}
</script>

<style scoped>
.el-divider .el-divider--horizontal{
  min-height: 20px !important;
  border: 2px;
}
</style>
