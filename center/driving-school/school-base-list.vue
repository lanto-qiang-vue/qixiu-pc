<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" @onRowClick="rowClick">
    <div slot="search">
      <Form class="common-form">
        <FormItem :label-width="80" label="基地名称:">
          <Input type="text" v-model="search.name" placeholder="请输入基地名称/地址"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" v-if="accessBtn('query')" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="primary" v-if="accessBtn('add')" @click="add">新增</Button>
      <Button type="primary" @click="update" :disabled="canDo" v-if="accessBtn('edit')">查看&nbsp;|&nbsp;编辑</Button>
    </div>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      title="训练基地信息"
      width="700"
      :scrollable="true"
      :transfer="false"
      :transition-names="['', '']">
      <Form :model="formData" ref="formData" :rules="rules" :label-width="120" class="common-form">
        <FormItem label="基地名称:" prop="name">
          <Input v-model="formData.name" type="text"> </Input>
        </FormItem>
        <FormItem label="基地地址:" prop="address">
          <Input v-model="formData.address" type="text"> </Input>
        </FormItem>
        <FormItem label="地址经度:" prop="lon">
          <Input v-model="formData.lon" type="text" :min="0"> </Input>
        </FormItem>
        <FormItem label="地址纬度:" prop="lat">
          <Input v-model="formData.lat" type="text" :min="0"> </Input>
        </FormItem>
        <FormItem label="是否启用:" >
          <i-switch size="large" v-model="formData.available">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否自用:">
          <i-switch size="large" v-model="formData.self">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="submit('formData')">提交</Button>
      </div>
    </Modal>
    <upload-excel :type="showType"></upload-excel>
  </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  import UploadExcel from '~/components/upload-excel.vue'
  import { deepClone } from '../../static/util'
  import funMixin from '~/components/fun-auth-mixim.js'

  export default {
    name: 'school-base-list',
    components: { CommonTable, UploadExcel },
    mixins: [funMixin],
    data() {
      return {
        tableData: [],
        search:{
          name:'',
        },
        columns: [
          {
            title: '序号', key: '$A', sortable: true, minWidth: 110,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          { title: '基地名称', key: 'name', sortable: true, minWidth: 150 },
          { title: '是否启用', key: 'available', sortable: true, minWidth: 110,
            render: (h, params) => h('span', params.row.available?'是': '否')},
          { title: '是否自用', key: 'self', sortable: true, minWidth: 110,
            render: (h, params) => h('span',params.row.self?'是': '否')},
          { title: '基地地址', key: 'address', sortable: true, minWidth: 150 },
          { title: '经度', key: 'lon', sortable: true, minWidth: 160 },
          { title: '纬度', key: 'lat', sortable: true, minWidth: 130 },
          // { title: '进驻驾校数', key: '$M', sortable: true, minWidth: 130 }
        ],
        storeData: {
          id:0,
          name: '',
          address: '',
          lon: '',
          lat: '',
          available: false,
          self: false,
        },
        formData: {},
        rules: {
          name: [{ required: true, message: '基地名称必填' }],
          address: [{ required: true, message: '基地地址必填' }],
          lon: [{ required: true,message: '地址经度必填'}],
          lat: [{ required: true, message: '地址维度必填'}]
        },
        total: 0,
        clearTableSelect: false,
        showTable: false,
        page: 1,
        loading: false,
        limit: 10,
        showModal: false,
        showType: false,
        Row: ''
      }
    },
    computed: {
      canDo() {
        return this.Row == ''
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      submit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '系统提示',
              content: '确认提交吗?',
              onOk: () => {
                if(this.formData.id > 0){
                  //修改
                  this.$axios.put('/training/driving/base/'+this.formData.id,this.formData).then((res) => {
                      if(res.data.code == 0){
                        this.getList();
                        this.showModal = false;
                        this.$Message.success("修改成功");
                      }
                  })
                }else{
                  //新增
                  this.$axios.post('/training/driving/base',this.formData).then((res) => {
                     if(res.data.code == 0){
                       this.getList();
                       this.showModal = false;
                       this.$Message.success("新增成功");
                     }
                  })
                }
              }
            })
          } else {
            this.$Message.error('请校对红框信息')
          }
        })
      },
      clearSection() {
        this.clearTableSelect = Math.random()
        this.Row = ''
      },
      add() {
        this.$refs.formData.resetFields();
        this.showModal = true;
        this.formData = deepClone(this.storeData);
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      rowClick(row) {
        this.Row = row
      },
      update() {
        this.$refs.formData.resetFields();
        this.formData = deepClone(this.Row)
        this.clearSection()
        this.showModal = true;
      },
      getList() {
        this.$axios.get('/training/driving/base/query/?name='+this.search.name+"&page="+(this.page - 1)+"&size="+this.limit,{
        }).then((res) => {
          this.total = res.data.totalElements;
             this.tableData = res.data.content;
        })
        this.clearSection()
      }
    }
  }
</script>

<style scoped>

</style>
