<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" @onRowClick="rowClick">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="档案号:">
          <Input type="text" v-model="search.RECORD_NO_lk	"></Input>
        </FormItem>
        <FormItem label="车牌号:">
          <Input type="text" v-model="search.PLATE_NUM_lk"></Input>
        </FormItem>
        <FormItem label="车牌颜色:">
          <Select v-model="search.PLATE_COLOR_eq">
            <Option v-for="item in colorList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="车辆类型:">
          <Select v-model="search.VEHICLE_TYPE_eq">
            <Option v-for="item in cartList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="预警状态:">
          <Select v-model="search.WARN_TYPE_eq">
            <Option v-for="item in warnList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="营运状态:">
          <Select v-model="search.STATUS_eq">
            <Option v-for="item in manageList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否个体户:">
          <Select v-model="search.IS_SINGLE_eq">
            <Option v-for="item in unitList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="add">新增</Button>
      <!--<Button type="info" v-if="" :disabled="canDo" @click="edit">查看/修改</Button>-->
      <Button type="error" v-if="" :disabled="canDo" @click="del">删除</Button>
    </div>
    <!--添加-->
    <Modal
      :transition-names="['', '']"
      v-model="showModal"
      :title="title"
      width="90"
      :scrollable="true"
      @on-visible-change="visibleChange"
      :transfer="false"
      :mask-closable="false"
      :footer-hide="false"
    >
      <Tabs type="card" v-model="indexName">
        <!--车辆基本情况-->
        <TabPane name="m1" label="车辆基本情况">
          <Form v-show="indexName == 'm1'"  :model="formData" ref="formData" :rules="rule1" :label-width="120" class="common-form">
            <FormItem label="所属企业:" prop="corp_name">
              <Input v-model="formData.corp_name" :readonly="true" type="text" @on-focus="showType=Math.random()"> </Input>
            </FormItem>
            <FormItem label="车牌号码:" prop="plateNum">
              <Input v-model="formData.plateNum" type="text"> </Input>
            </FormItem>
            <FormItem label="车牌颜色:" prop="plateColor">
              <Select v-model="formData.plateColor">
                <Option v-for="item in colorList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车辆类型:" prop="vehicleType">
              <Select v-model="formData.vehicleType">
                <Option v-for="item in cartList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="发证日期:" prop="certDate">
              <DatePicker type="date" v-model="formData.certDate"></DatePicker>
            </FormItem>
            <FormItem label="厂家:">
              <Input v-model="formData.vender" type="text"> </Input>
            </FormItem>
            <FormItem label="品牌:" prop="cert_date">
              <Input v-model="formData.brand" type="text"> </Input>
            </FormItem>
            <FormItem label="车型:">
              <Input type="text" v-model="formData.xm"></Input>
            </FormItem>
            <FormItem label="道路运输许可证号:">
              <Input type="text" v-model="formData.loadCertNum"></Input>
            </FormItem>
            <FormItem label="营运状态:">
              <Select v-model="formData.status">
                <Option v-for="item in manageList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="所属辖区:" prop="contacts">
              <Select v-model="formData.county">
                <Option v-for="item in area" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="燃料类型:" prop="contacts_tel">
              <Select v-model="formData.fuelType">
                <Option v-for="item in fuelList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车架号:">
              <Input v-model="formData.chassisNum" type="text"> </Input>
            </FormItem>
            <FormItem label="发动机号:">
              <Input v-model="formData.engineNum" type="text"> </Input>
            </FormItem>
            <FormItem label="使用类别:">
              <Input v-model="formData.useType" type="text"> </Input>
            </FormItem>
            <FormItem label="车辆吨位:">
              <Input v-model="formData.tonnage" type="text"> </Input>
            </FormItem>
            <FormItem label="座位:">
              <Input v-model="formData.seat" type="text"> </Input>
            </FormItem>
            <FormItem label="建档里程:">
              <InputNumber :min="0" v-model="formData.firstMileage"> </InputNumber>
            </FormItem>
            <FormItem label="年检日期:">
              <DatePicker type="date" v-model="formData.checkDate"></DatePicker>
            </FormItem>
            <FormItem label="上次维修日期:">
              <DatePicker type="date" v-model="formData.lastRepairDate"></DatePicker>
            </FormItem>
            <FormItem label="上次评定日期:">
              <DatePicker type="date" v-model="formData.lastCheckDate"></DatePicker>
            </FormItem>
            <FormItem label="注册日期:">
              <DatePicker type="date" v-model="formData.regDate"></DatePicker>
            </FormItem>
            <FormItem label="驾驶员:">
              <Input v-model="formData.unitName" type="text"> </Input>
            </FormItem>
            <FormItem label="是否个体户:">
              <Select v-model="formData.isSingle">
                <Option v-for="item in unitList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车主姓名:">
              <Input v-model="formData.ownerName" type="text"> </Input>
            </FormItem>
            <FormItem label="车主电话:">
              <Input v-model="formData.ownerPhone" type="text"> </Input>
            </FormItem>
            <div style="clear: both;"></div>
            <FormItem :label-width="0">
              <upload-img :description="'上传行驶证'" :callback="'success'" @success="success1"></upload-img>
            </FormItem>
            <FormItem :label-width="0">
              <upload-img :description="'上传营运证'" :callback="'success'" @success="success2"></upload-img>
            </FormItem>
            <FormItem :label-width="0">
              <upload-img :description="'上传通行证'" :callback="'success'" @success="success3"></upload-img>
            </FormItem>
            <FormItem :label-width="0">
              <upload-img :description="'上传保单(带具体日期)'" :callback="'success'" @success="success4"></upload-img>
            </FormItem>
          </Form>
        </TabPane>
        <!--车辆技术参数-->
        <TabPane name="m2" :disabled="canEdit" label="车辆技术参数">
          <Form :model="formData2" ref="formData2" :label-width="120" class="common-form">
            <FormItem label="出厂日期:" prop="productionDate">
              <DatePicker type="date" v-model="formData2.productionDate"></DatePicker>
            </FormItem>
            <FormItem label="出厂场地:" prop="plateNum">
              <Input v-model="formData2.productionPlace" type="text"> </Input>
            </FormItem>
            <FormItem label="底盘厂牌型号:" prop="plateColor">
              <Input v-model="formData2.engineBrand" type="text"> </Input>
            </FormItem>
            <FormItem label="客车类型等级:" prop="vehicleType">
              <Input v-model="formData2.busLevel" type="text"> </Input>
            </FormItem>
            <FormItem label="车辆外廓尺寸:" prop="certDate">
              <Input v-model="formData2.vehicleDimensions"></Input>
            </FormItem>
            <FormItem label="总质量:">
              <Input v-model="formData2.totalMass" type="text"> </Input>
            </FormItem>
            <FormItem label="作为排列:" prop="cert_date">
              <!--<Input v-model="formData2.seatArrangement" type="text"> </Input>-->
              <Select v-model="formData2.seatArrangement">
                <Option v-for="item in arrangeList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="核定乘员数:">
              <Input type="text" v-model="formData2.occupantNumber"></Input>
            </FormItem>
            <FormItem label="核定牵引总质量:">
              <Input type="text" v-model="formData2.tractionMass"></Input>
            </FormItem>
            <FormItem label="车轴数/驱动轴数:">
              <Input type="text" v-model="formData2.axleNumber"></Input>
            </FormItem>
            <FormItem label="发动机厂牌型号:" prop="contacts">
              <Input type="text" v-model="formData2.engineBrand"></Input>
            </FormItem>
            <FormItem label="发动机功率:" prop="contacts_tel">
              <Input type="text" v-model="formData2.enginePower"></Input>
            </FormItem>
            <FormItem label="发动机排量:">
              <Input v-model="formData2.engineDisplacement" type="text"> </Input>
            </FormItem>
            <FormItem label="排放标准:">
              <!--<Input v-model="formData2.emissionStandard" type="text"> </Input>-->
              <Select v-model="formData2.emissionStandard">
                <Option v-for="item in letList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="驱动形式:">
              <Input v-model="formData2.driveType" type="text"> </Input>
            </FormItem>
            <FormItem label="轮胎数/规格:">
              <Input v-model="formData2.tyreNumber" type="text"> </Input>
            </FormItem>
            <FormItem label="前照灯制式:">
              <Input v-model="formData2.headlightType" type="text"> </Input>
            </FormItem>
            <FormItem label="变速器形式:">
              <Input v-model="formData2.transmissionType" :min="0"> </Input>
            </FormItem>
            <FormItem label="缓速器:">
              <Input v-model="formData2.retarder"> </Input>
            </FormItem>
            <FormItem label="转向器:">
              <Input  v-model="formData2.steeringGear"></Input>
            </FormItem>
            <FormItem label="行车制动形式:">
              <Input v-model="formData2.brakeType"></Input>
            </FormItem>
            <FormItem label="悬挂形式:">
              <Input v-model="formData2.suspensionType"></Input>
            </FormItem>
            <FormItem label="其他配置:">
              <Input v-model="formData2.qtpz" type="text"> </Input>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane name="m3" :disabled="canEdit" label="车辆变更登记">标签三的内容</TabPane>
        <TabPane name="m4" :disabled="canEdit" label="车辆使用登记">标签四的内容</TabPane>
        <TabPane name="m5" :disabled="canEdit" label="车辆交通事故登记">标签五的内容</TabPane>
        <TabPane name="m6" :disabled="canEdit" label="车辆驾驶员登记">标签六的内容</TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="success" v-show="indexName == 'm1'" @click="addPost('formData',1)">提交</Button>
        <Button @click="showModal=false">返回</Button>
      </div>
    </Modal>
    <select-company :showType="showType" @changeOk="changeOk"></select-company>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import uploadImg from '~/components/uploadImg.vue'
  import SelectCompany from '~/components/select-company.vue'
  import { deepClone } from '../../static/util'
  export default {
    name: 'transportationCompany-record',
    components: { CommonTable, uploadImg,SelectCompany},
    data() {
      const validateColor = (rule, value, callback) => {
        if (this.formData.plateColor == 0) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      const validateType = (rule, value, callback) => {
        if (this.formData.vehicleType == 0) {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      return {
        showType:false,
        rule1: {
          corp_name: [{ required: true, message: '请选择维修企业' }],
          plateNum: [{ required: true, message: '必填项不能为空' }],
          plateColor: [{ required: true, message: '必填项不能为空' },
            { validator: validateColor, trigger: 'blur' }
          ],
          vehicleType: [{ required: true, message: '必填项不能为空' },
            { validator: validateType, trigger: 'blur' }],
          certDate: [{ required: true, message: '必填项不能为空' }]
        },
        loading: false,
        showTable: false,
        showModal: true,
        indexName: 'm2',
        title: '新增技术档案',
        page: 1,
        limit: 10,
        total: 0,
        tableData: [],
        area: [],
        list: '',
        clearTableSelect: false,
        columns: [{
          title: '档案号', key: 'record_no', sortable: true, minWidth: 100
        },
          { title: '车牌号', key: 'plate_num', sortable: true, minWidth: 100 },
          {
            title: '车牌颜色', key: 'plate_color', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.colorList, params.row.plate_color))
          },
          { title: '所属运输企业', key: 'corp_name', sortable: true, minWidth: 130 },
          {
            title: '车辆类型', key: 'vehicle_type', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.cartList, params.row.vehicle_type))
          },
          { title: '驾驶员', key: 'unit_name', sortable: true, minWidth: 105 },
          {
            title: '预警状态', key: 'warn_type', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.warnList, params.row.warn_type))
          },
          { title: '发证日期', key: 'cert_date', sortable: true, minWidth: 110 },
          { title: '上次维修时间', key: 'last_repair_date', sortable: true, minWidth: 130 },
          { title: '上次评定时间', key: 'last_check_date', sortable: true, minWidth: 130 },
          {
            title: '营运状态', key: 'status', sortable: true, minWidth: 105,
            render: (h, params) => h('span', this.getName(this.manageList, params.row.status))
          }
        ],
        search: {
          PLATE_COLOR_eq: '0',
          VEHICLE_TYPE_eq: '0',
          WARN_TYPE_eq: '0',
          STATUS_eq: '0',
          PLATE_NUM_lk: '',
          RECORD_NO_lk: '',
          IS_SINGLE_eq: '0'
        },
        colorList: [
          { code: '0', name: '全部' },
          { code: '10061001', name: '黄' },
          { code: '10061002', name: '蓝' },
          { code: '10061003', name: '白' },
          { code: '10061004', name: '黑' }
        ],
        colorList2: [
          { code: '0', name: '请选择' },
          { code: '10061001', name: '黄' },
          { code: '10061002', name: '蓝' },
          { code: '10061003', name: '白' },
          { code: '10061004', name: '黑' }
        ],
        cartList: [
          { code: '0', name: '全部' },
          { code: '10071001', name: '出租车' },
          { code: '10071002', name: '普通货运' },
          { code: '10071003', name: '危险货运' },
          { code: '10071004', name: '客运班车' },
          { code: '10071005', name: '旅游包车' },
          { code: '10071006', name: '教练车' }
        ],
        cartList2: [
          { code: '0', name: '请选择' },
          { code: '10071001', name: '出租车' },
          { code: '10071002', name: '普通货运' },
          { code: '10071003', name: '危险货运' },
          { code: '10071004', name: '客运班车' },
          { code: '10071005', name: '旅游包车' },
          { code: '10071006', name: '教练车' }
        ],
        warnList: [
          { code: '0', name: '全部' },
          { code: '10171001', name: '已逾期' },
          { code: '10171002', name: '即将逾期' },
          { code: '10171003', name: '未提交维护计划' },
          { code: '10171004', name: '不存在维修记录' },
          { code: '10171005', name: '正在维修' }
        ],
        manageList: [
          { code: '0', name: '全部' },
          { code: '10081001', name: '营运' },
          { code: '10081002', name: '停运' }
        ],
        manageList2: [
          { code: '0', name: '请选择' },
          { code: '10081001', name: '营运' },
          { code: '10081002', name: '停运' }
        ],
        unitList: [
          { code: '0', name: '全部' },
          { code: '10041001', name: '是' },
          { code: '10041002', name: '否' }
        ],
        unitList2: [
          { code: '0', name: '请选择' },
          { code: '10041001', name: '是' },
          { code: '10041002', name: '否' }
        ],
        fuelList: [
          { code: '0', name: '请选择' },
          { code: '10111001', name: '汽油' },
          { code: '10111002', name: '柴油' },
          { code: '10111003', name: '天然气' },
          { code: '10111004', name: '电力' },
          { code: '10111005', name: '混合动力' }
        ],
        arrangeList:[
          {code:'0',name:'请选择'},
          {code:'2+2',name:'2+2'},
          {code:'2+1',name:'2+1'},
          {code:'1+1+1',name:'1+1+1'},
          {code:'1+1',name:'1+1'},
        ],
        letList:[
          {code:'0',name:'请选择'},
          {code:'国II',name:'国II'},
          {code:'国III',name:'国III'},
        ],
        //变速器选项...
        shiftingList:[
          {code:'0',name:'请选择'},
          {code:'自动',name:'自动'},
          {code:'手动',name:'手动'},
          {code:'手自动一体化',name:'手自动一体化'},
        ],
        //缓速器...
        slowList:[
          {code:'0',name:'请选择'},
          {code:'自动',name:'电磁式'},
          {code:'手动',name:'液力式'},
        ],
        //转向器...
        turnList:[
          {code:'0',name:'请选择'},
          {code:'动力转向',name:'动力转向'},
          {code:'非动力转向',name:'非动力转向'},
        ],
        //车辆基本信息...
        formData:{},
        storeData: {
          'corp_name': '',
          'transCorpId': '',
          'plateNum': '',
          'plateColor': '0',
          'vehicleType': '0',
          'vender': '',
          'brand': '',
          'xm': '',
          'loadCertNum': '',
          'certDate': '',
          'status': '0',
          'county': '0',
          'fuelType': '0',
          'chassisNum': '',
          'engineNum': '',
          'useType': '',
          'tonnage': '',
          'seat': '',
          'checkDate': '',
          'firstMileage': 0,
          'lastRepairDate': '',
          'lastCheckDate': '',
          'unitName': '',
          'regDate': '',
          'isSingle': '0',
          'ownerName': '',
          'ownerPhone': '',
          'drivingLicensePic': '',
          'tradingCardPic': '',
          'trafficPermitPic': '',
          'guaranteeSlipPic': '',
          'vehicleId': '290'
        },
        formData2:{
          "axleNumber": "车轴数/驱动轴数",
          "brakeType": "气-液",
          "brandModel": "底盘厂牌型号",
          "busLevel": "客车类型等级",
          "driveType": "驱动形式",
          "emissionStandard": "国II",
          "engineBrand": "发动机厂牌型号",
          "engineDisplacement": "发动机排量",
          "enginePower": "发动机功率",
          "headlightType": "前照灯制式",
          "occupantNumber": "核定乘员数",
          "productionDate": "2018-10-01",
          "productionPlace": "出厂场地",
          "qtpz": "其他配置",
          "retarder": "电磁式",
          "seatArrangement": "0",
          "steeringGear": "动力转向",
          "suspensionType": "悬挂形式",
          "totalMass": "总质量",
          "tractionMass": "核定牵引总质量",
          "transmissionType": "手动",
          "tyreNumber": "轮胎数/规格",
          "vehicleDimensions": "车辆外廓尺寸",
          "vehicleId":290,
        },
        //车辆技术参数......
        img1: [],
        img2: [],
        img3: [],
        img4: []

      }
    },
    methods: {
      changeOk(res){
         this.formData.corp_name = res.corp_name;
         this.formData.transCorpId = res.corp_id;
      },
      visibleChange(){
        this.clear();
      },
      addPost(name, code) {
        switch (code) {
          case 1:
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.$Modal.confirm({
                  title: '系统提示', content: '确认保存吗?', onOk: () => {
                    this.formData.drivingLicensePic = this.pjUrl(this.img1);
                    this.formData.firstMileage = this.formData.firstMileage || 0;
                    this.formData.tradingCardPic = this.pjUrl(this.img2);
                    this.formData.trafficPermitPic = this.pjUrl(this.img3);
                    this.formData.guaranteeSlipPic = this.pjUrl(this.img4);
                    //0转空....
                    this.formData.plateColor = this.formData.plateColor == 0 ? '' : this.formData.plateColor;
                    this.formData.vehicleType = this.formData.vehicleType == 0 ? '' : this.formData.vehicleType;
                    this.formData.status = this.formData.status == 0 ? '' : this.formData.status;
                    this.formData.county = this.formData.county == 0 ? '' : this.formData.county;
                    this.formData.fuelType = this.formData.fuelType == 0 ? '' : this.formData.fuelType;
                    this.formData.isSingle = this.formData.isSingle == 0 ? '' : this.formData.isSingle;
                    this.$axios.post('/manage/vehicle/vehiclebase/save', this.formData).then((res) => {
                      if (res.data.code == '0') {
                        if(this.formData.vehicleId == ''){
                          this.$Message.success("新增成功");
                        }else{
                          this.$Message.success("修改成功");
                        }
                        this.formData.vehicleId = res.id;
                        this.getList();
                      }
                    })
                  }
                })
              } else {
                this.$Message.error('请校对红框信息')
              }
            })
            break
        }
      },
      pjUrl(data) {
        let store = []
        for (let i in data) {
          store.push(data[i].url)
        }
        return store.join(';')
      },
      success1(res) {
        this.img1 = res
      },
      success2(res) {
        this.img2 = res
      },
      success3(res) {
        this.img3 = res
      },
      success4(res) {
        this.img4 = res
      },
      add() {
        this.formData = deepClone(this.storeData);
        this.$refs.formData.resetFields();
        this.showModal = true
      },
      del() {
        this.$Modal.confirm({
          title: '系统提示', content: '确认删除吗', onOk: () => {
            this.$axios.post('/manage/vehicle/vehiclebase/delete', [this.list.vehicle_id]).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('删除成功')
                this.getList()
              }
            })
          }
        })
      },
      clear() {
        this.list = ''
        this.clearTableSelect = Math.random()
      },
      rowClick(row) {
        this.list = row
      },
      getList() {
        this.loading = true
        this.clear()
        this.$axios.post('/manage/vehicle/vehiclebase/list', {
          plate_color_eq: this.search.PLATE_COLOR_eq == 0 ? '' : this.search.PLATE_COLOR_eq,
          vehicle_type_eq: this.search.VEHICLE_TYPE_eq == 0 ? '' : this.search.VEHICLE_TYPE_eq,
          warn_type_eq: this.search.WARN_TYPE_eq == 0 ? '' : this.search.WARN_TYPE_eq,
          status_eq: this.search.STATUS_eq == 0 ? '' : this.search.STATUS_eq,
          plate_num_lk: this.search.PLATE_NUM_lk,
          record_no_lk: this.search.RECORD_NO_lk,
          is_single_eq: this.search.IS_SINGLE_eq == 0 ? '' : this.search.IS_SINGLE_eq,
          pageNo: this.page,
          pageSize: this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      getName(data, code) {
        let name = ''
        for (let i in data) {
          if (data[i].code == code) {
            name = data[i].name
            break
          }
        }
        return name
      },
      getAreaList() {
        this.$axios.post('/area/region/list', {
          areaName: 'shanghai'
        }).then((res) => {
          if (res.data.code == '0') {
            this.area = res.data.items
            this.area.unshift({ regionCode: '0', shortName: '请选择' })
          }
        })
      }
    },
    mounted() {
      this.getList()
      this.getAreaList()
    },
    computed: {
      canDo() {
        return this.list == ''
      },
      canEdit(){
        return this.formData.vehicleId == '';
      }
    }
  }
</script>
