<template>
    <common-table v-model="tableData" :columns="columns" :total="total"
                  @changePage="changePage" @changePageSize="changePageSize"
                  :show="showTable" :page="page" :loading="loading">
      <div slot="search">
        <Form :label-width="80" class="common-form">
          <FormItem label="姓名:">
            <Input type="text" v-model="search.name" placeholder="请输入企业编号"></Input>
          </FormItem>
          <FormItem label="学历:">
          <Select v-model="search.education">
          <Option v-for="item in educationList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          </FormItem>
          <FormItem label="岗位:">
            <Select v-model="search.position">
              <Option v-for="item in positionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="职称:">
            <Input type="text" v-model="search.professionalTitle" :readonly="true" placeholder="请输入企业名称"></Input>
          </FormItem>
          <!--<FormItem label="所属辖区:" prop="corp_area">-->
            <!--<Select v-model="search.corp_area">-->
              <!--<Option v-for="item in area" :value="item.regionCode" :key="item.regionCode">{{ item.shortName }}</Option>-->
            <!--</Select>-->
          <!--</FormItem>-->
          <FormItem :label-width="80" style="width: 100px;">
            <Button type="primary" v-if="" @click="page=1,getList()">搜索</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="operate">
        <Button type="success" @click="add">新增</Button>
      </div>
    </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  export default{
    name:'staff-query',
    components:{CommonTable},
    props:['showType'],
    watch:{
      showType(){
        this.showModal = true;
      }
    },
    data(){
      return {
        educationList:[
          {id:0,name:'全部'},
          {id:1,name:'小学'},
          {id:2,name:'初中'},
          {id:3,name:'高中'},
          {id:7,name:'技校'},
          {id:8,name:'中专'},
          {id:9,name:'高职'},
          {id:5,name:'本科'},
          {id:6,name:'硕士'},
          {id:10,name:'博士'},
        ],
        positionList:[
          {id:0,name:'全部'},
          {id:1,name:'技术负责人'},
          {id:2,name:'质量检验员'},
          {id:3,name:'汽车维修机工'},
          {id:4,name:'汽车维修电工'},
          {id:5,name:'汽车维修钣金工'},
          {id:6,name:'汽车维修漆工'},
          {id:7,name:'焊工'},
          {id:8,name:'轮胎维修工'},
          {id:9,name:'气缸镗磨工'},
          {id:10,name:'曲轴修磨工'},
          {id:11,name:'汽车美容装潢工'},
          {id:12,name:'摩托车修理工'},
          {id:13,name:'车身清洁工'}
        ],
        search:{
          "companyId": null,
          "companyName": "",
          "education": 0,
          "name": "姓名",
          "position": 0,
          "professionalTitle": "职称"
        },
        total:0,
        page:1,
        limit:10,
        tableData:[],
        showTable:false,
        area:[],
        loading:false,
        columns: [{
          title: '企业编号', key: 'corpNum', sortable: true, minWidth: 110
        },
          { title: '企业名称', key: 'corpName', sortable: true, minWidth: 150 },
          { title: '所属辖区', key: 'corpArea', sortable: true, minWidth: 120 ,
            // render: (h, params) => h('span', this.getName(this.area, params.row.corpArea))
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
      add(){
        window.location.href = "/center/staff-detail/?id="+null;
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
        this.$axios.post('/staff/list', {
          "companyId": null,
          "companyName": "",
          "education": this.search.education == 0 ? '' : this.search.education,
          "name": this.search.name,
          "position": this.search.position == 0 ? '' : this.search.position,
          "professionalTitle": this.search.professionalTitle,
          "pageNo":this.page,
          "pageSize":this.pageSize,
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total;
          }
        })
      },
    },
    mounted(){
      this.showTable = Math.random();
      this.getList();
    }
  }
</script>
