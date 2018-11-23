<template>
  <common-table v-model="tableData" :columns="columns" :total="total"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :page="page" :loading="loading" @onRowClick="rowClick">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="标题">
          <Input v-model="search.title" placeholder="标题搜索"></Input>
        </FormItem>
        <FormItem label="终端类型:">
          <Select v-model="search.terminal">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="显示:">
          <Select v-model="search.show">
            <Option v-for="item in showList" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="success" @click="add">新增</Button>
      <Button type="primary" :disabled="canDo" @click="edit">修改</Button>
    </div>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      title="banner详情"
      width="70"
      :scrollable="true"
      :transfer="false"
      :footer-hide="false"
      :transition-names="['', '']">
      <Form :model="formData" ref="formData" :rules="rules" :label-width="120" class="common-form">
        <FormItem label="标题" prop="title">
          <Input v-model="formData.title" type="text"> </Input>
        </FormItem>
        <FormItem label="终端" prop="terminal">
          <Select v-model="formData.terminal">
            <Option v-for="item in typeList2" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="链接地址" prop="linkUrl">
          <Input type="text" v-model="formData.linkUrl"> </Input>
        </FormItem>
        <FormItem label="链接类型">
          <Input type="text" v-model="formData.linkTarget"> </Input>
        </FormItem>
        <FormItem label="显示位置">
          <InputNumber :min="0" type="text" v-model="formData.place"></InputNumber>
        </FormItem>
        <FormItem label="排序">
          <InputNumber :min="0" type="text" v-model="formData.seq"></InputNumber>
        </FormItem>
        <FormItem>
          <Upload
            multiple
            :headers="{token:this.$store.state.user.token}"
            :show-upload-list="false"
            :format="['jpg','jpeg','png']"
            accept="image/png,image/jpeg"
            :max-size="3072"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleBeforeUpload"
            :on-success="handleSuccess"
            action="/proxy/file/image/add">
            <Button icon="ios-cloud-upload-outline">上传图片</Button>
          </Upload>
        </FormItem>
        <div style="clear:both;"></div>
        <div style="width:100%;height:auto;">
          <img :src="formData.imageUrl" style="width:100%;"/>
        </div>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">取消</Button>
        <Button @click="addPost('formData')" type="primary">保存</Button>
      </div>
    </Modal>
  </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  import { deepClone } from '../../static/util'

  export default {
    name: 'banner-manage',
    components: { CommonTable },
    data() {
      const terminalRule = (rule, value, callback) => {
        if (value == "zero") {
          callback(new Error('请选择终端类型'))
        } else {
          callback()
        }
      }
      return {
        storeData: {
          'imageUrl': '',
          'linkTarget': '',
          'linkUrl': '',
          'place': 0,
          'seq': 0,
          'terminal': 'zero',
          'title': ''
        },
        formData: {},
        search: {
          show: '1',
          title: '',
          terminal: 'zero'
        },
        total: 0,
        page: 1,
        limit: 10,
        showModal: false,
        tableData: [],
        list: '',
        type:'',//1新增,2修改
        showTable: false,
        loading: false,
        rules: {
          title:{required:true,message:'标题必填'},
          linkUrl:{required:true,message:'连接地址必填'},
          terminal:[{required:true,message:'必选'},{ validator: terminalRule, trigger: 'blur' }],
        },
        columns: [
          {
            title: '序号', key: '', sortable: true, minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {
            title: '终端类型', key: 'terminal', sortable: true, minWidth: 150,
            render: (h, params) => h('span', this.getName(params.row.terminal))
          },
          { title: '标题', key: 'title', sortable: true, minWidth: 150 },
          {
            title: '排序值', key: 'seq', sortable: true, minWidth: 120
          },
          {
            title: '创建日期', key: 'createTime', sortable: true, minWidth: 120
          },
          {
            title: '是否显示', key: 'show', sortable: true, minWidth: 120,
            render: (h, params) => {
              let buttonContent = params.row.show ? '是' : '否'
              let buttonStatus = params.row.show ? 'primary' : 'error'
              return h('div', [
                h('Button', {
                  props: {
                    type: buttonStatus,
                    size: 'small'
                  },
                  style: {
                    width: '60px',
                    textAlign: 'center',
                    marginRight: '10px'

                  },
                  on: {
                    click: () => {
                      this.$axios.post('/banner/update/' + this.tableData[params.index].id + '/' + !this.tableData[params.index].show, {
                        id: this.tableData[params.index].id,
                        show: !this.tableData[params.index].show
                      }).then((res) => {
                        if (res.data.code == '0') {
                          this.tableData[params.index].show = !this.tableData[params.index].show
                        }
                      })
                    }
                  }
                }, buttonContent)
              ])
            }
          }
        ],
        typeList: [
          { id: 'zero', name: '全部' },
          { id: 'A', name: '安卓' },
          { id: 'I', name: '苹果' },
          { id: 'W', name: '微信' },
          { id: 'P', name: '电脑' }
        ],
        typeList2: [
          { id: 'zero', name: '请选择' },
          { id: 'A', name: '安卓' },
          { id: 'I', name: '苹果' },
          { id: 'W', name: '微信' },
          { id: 'P', name: '电脑' }
        ],
        showList: [
          { id: '1', name: '全部' },
          { id: '2', name: '是' },
          { id: '3', name: '否' }
        ]
      }
    },
    methods: {
      addPost(name) {
        let url;
        url = this.type == 1 ? '/banner/add' : '/banner/update';
        if(!this.formData.imageUrl){
          this.$Modal.info({
            title:'系统提示',
            content:'请上传图片',
          });
          return;
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Modal.confirm({
              title: '系统提示', content: '确认保存吗?', onOk: () => {
                this.$axios.post(url,this.formData).then((res) => {
                  if (res.data.code == '0') {
                     this.showModal = false;
                     this.getList();
                  }
                })
              }
            })
          } else {
            this.$Message.error("请校对红框字段");
          }
        })
      },
      rowClick(row) {
        this.list = row
      },
      handleBeforeUpload() {
        this.$Notice.warning({
          title: '错误提示',
          desc: '图片文件最大不超过3M'
        })
      },
      edit() {
        this.type = 2;
        this.formData = this.list
        this.showModal = true
      },
      handleFormatError() {
        this.$Notice.warning({
          title: '错误提示',
          desc: '只允许上传jpg,png图片'
        })
      },
      handleSuccess(res) {
        if (res.code == 0) {
          this.formData.imageUrl = res.item.path
        }
      },
      add() {
        this.type = 1;
        this.showModal = true
        this.formData = deepClone(this.storeData)
      },
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
      },
      getName(id) {
        for (let i in this.typeList) {
          if (this.typeList[i].id == id) {
            return this.typeList[i].name
            break
          }
        }
      },
      getList() {
        this.loading = true
        let show
        let terminal
        switch (parseInt(this.search.show)) {
          case 1:
            show = null
            break
          case 2:
            show = true
            break
          case 3:
            show = false
            break
        }
        if (this.search.terminal == 'zero') {
          terminal = ''
        } else {
          terminal = this.search.terminal
        }
        this.$axios.post('/banner/list', {
          'terminal': terminal,
          'show': show,
          'pageNo': this.page,
          'pageSize': this.limit,
          'title': this.search.title
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      }
    },
    computed: {
      canDo() {
        return this.list == ''
      }
    },
    mounted() {
      this.showTable = Math.random()
      this.getList()
    }
  }
</script>
