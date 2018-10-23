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
          <Input type="text" v-model="search.business_num" placeholder="请输入道路经营许可证"></Input>
        </FormItem>
        <FormItem label="预警状态:">
          <Input type="text" v-model="search.corp_add" placeholder="请输入企业地址"></Input>
        </FormItem>
        <FormItem label="营运状态:">
          <Input type="text" v-model="search.corp_add" placeholder="请输入企业地址"></Input>
        </FormItem>
        <FormItem label="是否个体户:">
          <Input type="text" v-model="search.corp_add" placeholder="请输入企业地址"></Input>
        </FormItem>
        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <!--<Button type="primary" v-if="" @click="add">新增</Button>-->
      <!--<Button type="info" v-if="" :disabled="canDo" @click="edit">查看/修改</Button>-->
      <!--<Button type="error" v-if="" :disabled="canDo" @click="del">删除</Button>-->
    </div>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  export default {
    name: 'transportationCompany-record',
    components:{CommonTable},
    data(){
      return{
        loading:false,
        showTable:false,
        page:1,
        limit:10,
        total:0,
        search:{},
        clearTableSelect:false,
        columns: [{
          title: '企业编号', key: 'corp_num', sortable: true, minWidth: 110
        },
          { title: '企业名称', key: 'corp_name', sortable: true, minWidth: 150 },
          { title: '道路经营许可证号', key: 'business_num', sortable: true, minWidth: 160 },
          { title: '首次发证时间', key: 'cert_date', sortable: true, minWidth: 130 },
          { title: '有效开始日期', key: 'valid_start_date', sortable: true, minWidth: 130 },
          { title: '有效结束日期', key: 'valid_end_date', sortable: true, minWidth: 130 },
          { title: '所属辖区', key: 'corp_area', sortable: true, minWidth: 120 },
          { title: '企业负责人', key: 'charge_person', sortable: true, minWidth: 120 },
          { title: '企业地址', key: 'corp_add', sortable: true, minWidth: 170 }
        ],
        search:{
          PLATE_COLOR_eq:'0',
          PLATE_NUM_lk:'',
          RECORD_NO_lk:'',
        },
        colorList:[
          {code:'0',name:'全部'},
          {code:'10061001',name:'黄'},
          {code:'10061002',name:'蓝'},
          {code:'10061003',name:'白'},
          {code:'10061004',name:'黑'},
        ],
      }
    },
    methods:{
      changePageSize(size){
        this.limit = size;
        this.getList();
      },
      changePage(page){
        this.page = page;
        this.getList();
      }
    }
  }
</script>

<style scoped>

</style>
