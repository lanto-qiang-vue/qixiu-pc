<template>
  <common-table v-model="tableData" :columns="columns" :total="total"
                @changePage="changePage" @changePageSize="changePageSize"
                :show="showTable" :clearSelect="clearTableSelect" :page="page" @onRowClick="rowClick" :loading="loading">
    <div slot="search">
      <Form :label-width="80" class="common-form">
        <FormItem label="企业名称:" v-show="type == 1">
          <Input type="text" v-model="search.companyName" placeholder="请输入企业名称"></Input>
        </FormItem>
        <FormItem label="姓名:">
          <Input type="text" v-model="search.name" placeholder="请输入姓名"></Input>
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
          <Input type="text" v-model="search.professionalTitle" placeholder="请输入职称"></Input>
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
      <Button type="primary" :disabled="canDo" @click="edit">修改</Button>
      <Button type="error"  @click="del" :disabled="canDo">删除</Button>
    </div>
  </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'

  export default {
    name: 'staff-query',
    components: { CommonTable },
    props: ['showType'],
    watch: {
      showType() {
        this.showModal = true
      }
    },
    data: function() {
      return {
        educationList: [
          { id: 0, name: '请选择' },
          { id: 1, name: '小学' },
          { id: 2, name: '初中' },
          { id: 3, name: '高中' },
          { id: 7, name: '技校' },
          { id: 8, name: '中专' },
          { id: 9, name: '高职' },
          { id: 5, name: '本科' },
          { id: 6, name: '硕士' },
          { id: 10, name: '博士' }
        ],
        positionList: [
          { id: 0, name: '请选择' },
          { id: 1, name: '技术负责人' },
          { id: 2, name: '质量检验员' },
          { id: 3, name: '汽车维修机工' },
          { id: 4, name: '汽车维修电工' },
          { id: 5, name: '汽车维修钣金工' },
          { id: 6, name: '汽车维修漆工' },
          { id: 7, name: '焊工' },
          { id: 8, name: '轮胎维修工' },
          { id: 9, name: '气缸镗磨工' },
          { id: 10, name: '曲轴修磨工' },
          { id: 11, name: '汽车美容装潢工' },
          { id: 12, name: '摩托车修理工' },
          { id: 13, name: '车身清洁工' }
        ],
        type:'',
        list:'',
        clearTableSelect:false,
        search: {
          'companyId': null,
          'companyName': '',
          'education': 0,
          'name': '',
          'position': 0,
          'professionalTitle': ''
        },
        total: 0,
        page: 1,
        limit: 10,
        tableData: [],
        showTable: false,
        area: [],
        loading: false,
        columns: [
          {
            title: '序号', minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {
            title: '姓名', key: 'name', sortable: true, minWidth: 110
          },
          {
            title: '性别', key: 'corpName', sortable: true, minWidth: 150,
            render: (h, params) => h('span', params.row.gender == 1 ? '男' : '女')
          },
          {
            title: '学历', key: 'education', sortable: true, minWidth: 110,
            render: (h, params) => h('span', this.getName(this.educationList,params.row.education))
          },
          {
            title: '岗位', key: 'position', sortable: true, minWidth: 110,
            render: (h, params) => h('span', this.getName(this.positionList,params.row.position))
          },
          {
            title: '是否在岗', key: 'position', sortable: true, minWidth: 110,
            render: (h, params) => h('span',params.row.position == true ? '是' : '否')
          },
          {
            title: '职称', key: 'professionalTitle', sortable: true, minWidth: 110
          },
        ]
      }
    },
    methods: {
      del(){
        this.$Modal.confirm({
          title:'系统提示',
          content:'确认要删除吗',
          onOk:()=>{
            this.$axios.post('/staff/delete/'+this.list.id, {
            }).then((res) => {
              console.log(JSON.stringify(res));
              if (res.data.code == '0') {
               this.$Message.success("删除成功");
               this.getList();
              }
            })
          }
        });
      },
      clearSection(){
        this.list = "";
        this.clearTableSelect = Math.random();
      },
      rowClick(row){
        this.list = row;
      },
      add() {
        window.location.href = '/center/staff-detail/?id=' + null
      },
      edit(){
        window.location.href = "/center/staff-detail/?id="+this.list.id;
      },
      getName(list,id){
       let data = "";
       for(let i in list){
         if(list[i].id == id){
           data = list[i].name;
           break;
         }
       }
       return data;
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
        this.clearSection();
        this.loading = true
        this.$axios.post('/staff/list', {
          'companyId': this.search.companyId,
          'companyName': this.search.companyName,
          'education': this.search.education == 0 ? '' : this.search.education,
          'name': this.search.name,
          'position': this.search.position == 0 ? '' : this.search.position,
          'professionalTitle': this.search.professionalTitle,
          'pageNo': this.page,
          'pageSize': this.limit
        }).then((res) => {
          if (res.data.code == '0') {
            this.total = res.data.total
            this.tableData = res.data.items
            this.loading = false
          }
        })
      }
    },
    computed:{
      canDo(){
        return this.list == "";
      }
    },
    mounted() {
      if(this.$route.query.id > 0){
        this.search.companyId = this.$route.query.id ;
      }
      let roles= this.$store.state.user.userInfo.roles;
      if(this.$route.path == '/center/employees-query'){
        this.type = 1;
      }
      if(roles[0].code == 'weixiuqiye'){
        this.type = 3;
        // let nickname = this.$store.state.user.userInfo.nickname;
        // this.search.companyName = nickname;
      }
      this.showTable = Math.random()
      this.getList()
    }
  }
</script>
