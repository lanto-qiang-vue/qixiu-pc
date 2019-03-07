<template>
  <Modal
    v-model="showModal"
    :mask-closable="false"
    title="选择运输企业"
    width="60"
    :scrollable="true"
    :transfer="false"
    :footer-hide="true"
    :transition-names="['', '']">
    <common-table v-model="tableData" :columns="columns" :total="total"
                  @changePage="changePage" @changePageSize="changePageSize"
                  :show="showTable" :page="page" :loading="loading" :showOperate="false">
      <div slot="search">
        <Form :label-width="80" class="common-form">
          <FormItem label="企业编号:">
            <Input type="text" v-model="search.corp_num" placeholder="请输入企业编号"></Input>
          </FormItem>
          <FormItem label="企业名称:" prop="corp_name">
            <Input type="text" v-model="search.corp_name" placeholder="请输入企业名称"></Input>
          </FormItem>
          <FormItem label="所属辖区:" prop="corp_area">
            <Select v-model="search.corp_area">
              <Option v-for="item in area" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="80" style="width: 100px;">
            <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
          </FormItem>
        </Form>
      </div>
    </common-table>
  </Modal>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  export default{
    name:'select-company',
    components:{CommonTable},
    props:['showType'],
    watch:{
      showType(){
        this.showModal = true;
      }
    },
    data(){
      return {
        search:{},
        total:0,
        page:1,
        limit:10,
        showModal:false,
        tableData:[],
        showTable:false,
        area:[],
        loading:false,
        columns: [{
          title: '企业编号', key: 'corpNum', sortable: true, minWidth: 110
        },
          { title: '企业名称', key: 'corpName', sortable: true, minWidth: 150 },
          { title: '所属辖区', key: 'corpArea', sortable: true, minWidth: 120 ,
            render: (h, params) => h('span', this.getName(this.area, params.row.corpArea))
          },
          { title: '操作', key: 'chargePerson', sortable: true, minWidth: 120,
            render: (h, params) => {
              let buttonContent= '选择';
              let buttonStatus = 'primary';
              return h('div', [
                h('Button', {
                  props: {
                    type: buttonStatus,
                    size: 'small',
                  },
                  style: {
                    width:"60px",
                    textAlign: "center",
                    marginRight: '10px',
                  },
                  on: {
                    click: (index) => {
                      this.$emit('changeOk',params.row);
                      this.showModal = false;
                    }
                  }
                }, buttonContent),
              ]);
            }
          },
        ],
      }
    },
    methods:{
      changePage(page) {
        this.page = page
        this.getList()
      },
      changePageSize(size) {
        this.limit = size
        this.getList()
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
      getList() {
        this.loading = true
        this.$axios.post('/manage/transcorp/tccorpinfo/list', {
          'businessNum': this.search.business_num,
          'corpAdd': this.search.corp_add,
          'corpArea': this.search.corp_area == 0 ? '' : this.search.corp_area,
          'corpName': this.search.corp_name,
          'corpNum': this.search.corp_num,
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
          areaName: process.env.config.areaName
        }).then((res) => {
          if (res.data.code == '0') {
            this.area = res.data.items
            this.area.unshift({ regionCode: '0', shortName: '全部' })
          }
        })
      }
    },
    mounted(){
      this.search.corp_area = "0";
      this.getAreaList();
      this.getList();
    }
  }
</script>
