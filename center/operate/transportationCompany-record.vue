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
      :transfer="false"
      :mask-closable="false"
      :footer-hide="false"
    >
      <Tabs type="card" v-model="indexName">
        <!--车辆基本情况-->
        <TabPane name="m1" label="车辆基本情况">
          <Form :model="formData" ref="formData" :label-width="120" class="common-form">
            <FormItem label="所属企业:">
              <Input v-model="formData.CORP_NAME" type="text"> </Input>
            </FormItem>
            <FormItem label="车牌号码:" prop="corp_name">
              <Input v-model="formData.PLATE_NUM" type="text"> </Input>
            </FormItem>
            <FormItem label="车牌颜色:">
              <Select v-model="formData.PLATE_COLOR">
                <Option v-for="item in colorList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车辆类型:" prop="corp_area">
              <Select v-model="formData.VEHICLE_TYPE">
                <Option v-for="item in cartList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="发证日期:">
              <DatePicker type="date" v-model="formData.CERT_DATE"></DatePicker>
            </FormItem>
            <FormItem label="厂家:">
              <Input v-model="formData.VENDER" type="text"> </Input>
            </FormItem>
            <FormItem label="品牌:" prop="cert_date">
              <Input v-model="formData.BRAND" type="text"> </Input>
            </FormItem>
            <FormItem label="车型:">
              <Input type="text" v-model="formData.XM"></Input>
            </FormItem>
            <FormItem label="道路运输许可证号:">
              <Input type="text" v-model="formData.LOAD_CERT_NUM"></Input>
            </FormItem>
            <FormItem label="营运状态:">
              <Select v-model="formData.STATUS">
                <Option v-for="item in manageList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="所属辖区:" prop="contacts">
              <Select v-model="formData.COUNTY">
                <Option v-for="item in area" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="燃料类型:" prop="contacts_tel">
              <Select v-model="formData.FUEL_TYPE">
                <Option v-for="item in fuelList" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车架号:">
              <Input v-model="formData.CHASSIS_NUM" type="text"> </Input>
            </FormItem>
            <FormItem label="发动机号:">
              <Input v-model="formData.ENGINE_NUM" type="text"> </Input>
            </FormItem>
            <FormItem label="使用类别:">
              <Input v-model="formData.USE_TYPE" type="text"> </Input>
            </FormItem>
            <FormItem label="车辆吨位:">
              <Input v-model="formData.TONNAGE" type="text"> </Input>
            </FormItem>
            <FormItem label="座位:">
              <Input v-model="formData.SEAT" type="text"> </Input>
            </FormItem>
            <FormItem label="建档里程:">
              <Input v-model="formData.FIRST_MILEAGE" type="text"> </Input>
            </FormItem>
            <FormItem label="年检日期:">
              <DatePicker type="date" v-model="formData.CHECK_DATE"></DatePicker>
            </FormItem>
            <FormItem label="上次维修日期:">
              <DatePicker type="date" v-model="formData.LAST_REPAIR_DATE"></DatePicker>
            </FormItem>
            <FormItem label="上次评定日期:">
              <DatePicker type="date" v-model="formData.LAST_CHECK_DATE"></DatePicker>
            </FormItem>
            <FormItem label="注册日期:">
              <DatePicker type="date" v-model="formData.REG_DATE"></DatePicker>
            </FormItem>
            <FormItem label="驾驶员:">
              <Input v-model="formData.UNIT_NAME" type="text"> </Input>
            </FormItem>
            <FormItem label="是否个体户:">
              <Select v-model="formData.IS_SINGLE">
                <Option v-for="item in unitList2" :value="item.code" :key="item.code">{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="车主姓名:">
              <Input v-model="formData.OWNER_NAME" type="text"> </Input>
            </FormItem>
            <FormItem label="车主电话:">
              <Input v-model="formData.OWNER_PHONE" type="text"> </Input>
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
        <TabPane name="m2" label="车辆技术参数">标签二的内容</TabPane>
        <TabPane name="m3" label="车辆变更登记">标签三的内容</TabPane>
        <TabPane name="m4" label="车辆使用登记">标签四的内容</TabPane>
        <TabPane name="m5" label="车辆交通事故登记">标签五的内容</TabPane>
        <TabPane name="m6" label="车辆驾驶员登记">标签六的内容</TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="success">提交</Button>
        <Button @click="showModal=false">返回</Button>
      </div>
    </Modal>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import uploadImg from '~/components/uploadImg.vue'

  export default {
    name: 'transportationCompany-record',
    components: { CommonTable, uploadImg },
    data() {
      return {
        loading: false,
        showTable: false,
        showModal: false,
        indexName: 'm1',
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
        formData: {
          'CORP_NAME': '12345678901234567890123456789012345678901234567890',
          'TRANS_CORP_ID': '6',
          'PLATE_NUM': '车牌号码',
          'PLATE_COLOR': '10061001',
          'VEHICLE_TYPE': '10071001',
          'VENDER': '厂家',
          'BRAND': '品牌',
          'XM': '车型',
          'LOAD_CERT_NUM': '道路运输许可证号',
          'CERT_DATE': '2018-10-01',
          'STATUS': '10081001',
          'COUNTY': '310116',
          'FUEL_TYPE': '10111002',
          'CHASSIS_NUM': '车架号',
          'ENGINE_NUM': '发动机号',
          'USE_TYPE': '使用类别',
          'TONNAGE': '车辆吨位',
          'SEAT': '座位',
          'CHECK_DATE': '2018-10-02',
          'FIRST_MILEAGE': '简单里程',
          'LAST_REPAIR_DATE': '2018-10-03',
          'LAST_CHECK_DATE': '2018-10-04',
          'UNIT_NAME': '驾驶员',
          'REG_DATE': '2018-10-05',
          'IS_SINGLE': '10041001',
          'OWNER_NAME': '车主姓名',
          'OWNER_PHONE': '车主电话',
          'DRIVING_LICENSE_PIC': '',
          'TRADING_CARD_PIC': '',
          'TRAFFIC_PERMIT_PIC': '',
          'GUARANTEE_SLIP_PIC': '',
          'VEHICLE_ID': ''
        },
        img1:[],
        img2:[],
        img3:[],
        img4:[],
      }
    },
    methods: {
      success1(res){
      this.img1 = res;
      },
      success2(res){
        this.img2 = res;
      },
      success3(res){
        this.img3 = res;
      },
      success4(res){
        this.img4 = res;
      },
      add() {
        this.showModal = true;
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
          PLATE_COLOR_eq: this.search.PLATE_COLOR_eq == 0 ? '' : this.search.PLATE_COLOR_eq,
          VEHICLE_TYPE_eq: this.search.VEHICLE_TYPE_eq == 0 ? '' : this.search.VEHICLE_TYPE_eq,
          WARN_TYPE_eq: this.search.WARN_TYPE_eq == 0 ? '' : this.search.WARN_TYPE_eq,
          STATUS_eq: this.search.STATUS_eq == 0 ? '' : this.search.STATUS_eq,
          PLATE_NUM_lk: this.search.PLATE_NUM_lk,
          RECORD_NO_lk: this.search.RECORD_NO_lk,
          IS_SINGLE_eq: this.search.IS_SINGLE_eq == 0 ? '' : this.search.IS_SINGLE_eq,
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
      }
    }
  }
</script>
