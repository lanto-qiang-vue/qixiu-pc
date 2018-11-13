<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" @onRowClick="rowClick">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="企业编号:">
          <Input type="text" v-model="search.corp_num" placeholder="请输入企业编号"></Input>
        </FormItem>
        <FormItem label="企业名称:" prop="corp_name">
          <Input type="text" v-model="search.corp_name" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="所属辖区:" prop="corp_area">
          <Select v-model="search.corp_area" style="width:200px">
            <Option v-for="item in area" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
          </Select>
        </FormItem>
      <div style="clear:both;"></div>
        <FormItem label="道路经营许可证:">
          <Input type="text" v-model="search.business_num" placeholder="请输入道路经营许可证"></Input>
        </FormItem>
        <FormItem label="企业地址:">
          <Input type="text" v-model="search.corp_add" placeholder="请输入企业地址"></Input>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="" @click="add">新增</Button>
      <Button type="info" v-if="" :disabled="canDo" @click="edit">查看/修改</Button>
      <Button type="error" v-if="" :disabled="canDo" @click="del">删除</Button>
    </div>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      :title="title"
      width="70"
      :scrollable="true"
      @on-visible-change="visibleChange"
      :transfer="false"
      :transition-names="['', '']">
      <Form :model="formData" ref="formData" :rules="rules" :label-width="120" class="common-form">
        <FormItem label="企业编号:">
          <Input v-model="formData.corp_num" :disabled="true" type="text"> </Input>
        </FormItem>
        <FormItem label="企业名称:" prop="corp_name">
          <Input v-model="formData.corp_name" type="text"> </Input>
        </FormItem>
        <FormItem label="企业负责人:">
          <Input v-model="formData.charge_person" type="text"> </Input>
        </FormItem>
        <FormItem label="所属辖区:" prop="corp_area">
          <Select v-model="formData.corp_area">
            <Option v-for="item in area2" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="企业联系电话:">
          <Input v-model="formData.service_hotline" type="text"> </Input>
        </FormItem>
        <FormItem label="道路经营许可证号:" prop="business_num">
          <Input v-model="formData.business_num" type="text"> </Input>
        </FormItem>
        <FormItem label="发证日期:" prop="cert_date">
          <DatePicker type="date" v-model="formData.cert_date"></DatePicker>
        </FormItem>
        <FormItem label="有效开始日期:" prop="valid_start_date">
          <DatePicker type="date" v-model="formData.valid_start_date"></DatePicker>
        </FormItem>
        <FormItem label="有效结束日期:" prop="valid_end_date">
          <DatePicker type="date" v-model="formData.valid_end_date"></DatePicker>
        </FormItem>
        <FormItem label="电子邮箱:">
          <Input v-model="formData.email" type="text"> </Input>
        </FormItem>
        <FormItem label="联系人:" prop="contacts">
          <Input v-model="formData.contacts" type="text"> </Input>
        </FormItem>
        <FormItem label="联系人手机:" prop="contacts_tel">
          <Input v-model="formData.contacts_tel" type="text"> </Input>
        </FormItem>
        <FormItem label="企业地址:">
          <Input v-model="formData.corp_add" type="text"> </Input>
        </FormItem>
        <FormItem label="企业网址:">
          <Input v-model="formData.web_site" type="text"> </Input>
        </FormItem>
        <FormItem label="备注:">
          <Input v-model="formData.remark" type="text"> </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="success" @click="confirm('formData')">提交</Button>
        <Button @click="showModal=false">返回</Button>
      </div>
    </Modal>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import { deepClone } from '../../static/util'

  export default {
    name: 'transportationCompany-manage',
    components: { CommonTable },
    data() {
      const validateChange = (rule, value, callback) => {
        if (this.formData.corp_area == 0) {
          callback(new Error('请选择区域'))
        } else {
          callback()
        }
      }
      return {
        tableData: [],
        title: '',
        showTable: false,
        loading: false,
        showModal: false,
        page: 1,
        limit: 10,
        total: 0,
        clearTableSelect: false,
        columns: [{
          title: '企业编号', key: 'corp_num', sortable: true, minWidth: 110
        },
          { title: '企业名称', key: 'corp_name', sortable: true, minWidth: 150 },
          { title: '道路经营许可证号', key: 'business_num', sortable: true, minWidth: 160 },
          { title: '首次发证时间', key: 'cert_date', sortable: true, minWidth: 130 },
          { title: '有效开始日期', key: 'valid_start_date', sortable: true, minWidth: 130 },
          { title: '有效结束日期', key: 'valid_end_date', sortable: true, minWidth: 130 },
          { title: '所属辖区', key: 'corp_area', sortable: true, minWidth: 120 ,
            render: (h, params) => h('span', this.getName(this.area, params.row.corp_area))
          },
          { title: '企业负责人', key: 'charge_person', sortable: true, minWidth: 120 },
          { title: '企业地址', key: 'corp_add', sortable: true, minWidth: 170 }
        ],
        search: {
          business_num: '',
          corp_add: '',
          corp_area: '',
          corp_name: '',
          corp_num: ''
        },
        area: [],
        area2: [],
        list: '',
        formData: {
          'business_num': '',
          'cert_date': '',
          'charge_person': '',
          'contacts': '',
          'contacts_tel': '',
          'corp_add': '',
          'corp_area': '0',
          'corp_id': '',
          'corp_name': '',
          'corp_num': '',
          'email': '',
          'legal_tel': '',
          'remark': '',
          'service_hotline': '',
          'valid_end_date': '',
          'valid_start_date': '',
          'web_site': ''
        },
        rules: {
          corp_name: [
            { required: true, message: '必填项不能为空' }
          ],
          business_num: [
            { required: true, message: '必填项不能为空' }
          ],
          contacts: [
            { required: true, message: '必填项不能为空' }
          ],
          contacts_tel: [
            { required: true, message: '必填项不能为空' }
          ],
          cert_date: [
            { required: true, message: '必填项不能为空' }
          ],
          valid_start_date: [
            { required: true, message: '必填项不能为空' }
          ],
          valid_end_date: [
            { required: true, message: '必填项不能为空' }
          ],
          corp_area: [
            { required: true, message: '必填项不能为空' },
            { validator: validateChange, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      canDo() {
        return this.list == ''
      }
    },
    methods: {
      visibleChange(){
        this.clear();
      },
      del(){
        this.$Modal.confirm({title:'系统提示',content: '确认删除吗',onOk:()=>{
            this.$axios.post('/manage/transcorp/tccorpinfo/delete',{
              corpId:this.list.corp_id
            }).then((res) => {
              if (res.data.code == '0') {
                this.$Message.success('删除成功');
                this.getList()
              }
              // console.log(JSON.stringify(res.data));
            })
          }});
      },
      confirm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '系统提示',
              content: '确认提交吗?',
              onOk: () => {
                this.$axios.post('/manage/transcorp/tccorpinfo/save', this.formData).then((res) => {
                  if (res.data.code == '0') {
                    if(this.formData.corp_id == ''){
                      this.$Message.success('新增成功');
                    }else{

                    }
                    this.showModal = false
                    this.getList()
                  }
                  // console.log(JSON.stringify(res.data));
                })
              }
            })
          } else {
            this.$Message.error('请校对红框信息')
          }
        })
      },
      clear() {
        this.list = '';
        this.clearTableSelect = Math.random()
      },
      rowClick(row) {
        this.list = row
      },
      add() {
        for(let i in this.formData){
          this.formData[i] = "";
        }
        this.$refs.formData.resetFields();
        this.title = '新增运输企业';
        this.formData.corp_num = "系统自动生成";
        this.formData.corp_area = 0;
        this.showModal = true
      },
      edit() {
        this.$refs.formData.resetFields();
        this.title = '查看/修改运输企业';
      this.formData = deepClone(this.list);
      this.showModal = true;
      },
      getName(data, code) {
        let name = ''
        for (let i in data) {
          if (data[i].regionCode == code) {
            name = data[i].shortName
            break
          }
        }
        return name
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      getList() {
        this.loading = true
        this.clear()
        this.$axios.post('/manage/transcorp/tccorpinfo/info/list', {
          'business_num': this.search.business_num,
          'corp_add': this.search.corp_add,
          'corp_area': this.search.corp_area == 0 ? '' : this.search.corp_area,
          'corp_name': this.search.corp_name,
          'corp_num': this.search.corp_num,
          'pageNo': this.page,
          'pageSize': this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      },
      getAreaList() {
        this.$axios.post('/area/region/list', {
          areaName: 'shanghai'
        }).then((res) => {
          if (res.data.code == '0') {
            this.area = res.data.items
            this.area2 = deepClone(res.data.items)
            this.area.unshift({ regionCode: '0', shortName: '全部' })
            this.area2.unshift({ regionCode: '0', shortName: '请选择' })
          }
        })
      }
    },
    mounted() {
      this.search.corp_area = '0'
      this.getAreaList()
      this.getList()
    }
  }
</script>

