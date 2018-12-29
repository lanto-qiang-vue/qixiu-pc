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
        <FormItem label="手机号:">
          <Input type="text" v-model="search.mobileNo" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="身份证号:">
          <Input type="text" v-model="search.idNum" placeholder="请输入身份证号"></Input>
        </FormItem>
        <FormItem label="是否注册:">
          <Select v-model="search.regStatus" clearable>
            <Option value="true">是</Option>
            <Option value="false">否</Option>
          </Select>
        </FormItem>

        <FormItem :label-width="80" style="width: 100px;">
          <Button type="primary" v-if="accessBtn('list')" @click="page=1,getList()">搜索</Button>
        </FormItem>
      </Form>
    </div>
    <div slot="operate">
      <Button type="success" v-if="accessBtn('add')" @click="add">新增</Button>
      <Button type="primary" v-if="accessBtn('view')" :disabled="canDo" @click="edit">查看</Button>
      <Button type="error" v-if="accessBtn('delete')" @click="del" :disabled="canDo">删除</Button>
      <Button type="primary" v-if="accessBtn('look')" :disabled="canDo" @click="look">查看</Button>
      <Button type="primary"  @click="exportFun">导出</Button>


    </div>
  </common-table>
</template>
<script>
  import CommonTable from '~/components/common-table.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
  export default {
    name: 'staff-query',
    components: { CommonTable },
    mixins: [funMixin],
    props: ['showType'],
    watch: {
      showType() {
        this.showModal = true
      }
    },
    data() {
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
          'professionalTitle': '',
          idNum:'',
          regStatus:'',
          mobileNo:'',
        },
        total: 0,
        page: 1,
        limit: 10,
        tableData: [],
        showTable: false,
        area: [],
        loading: false,
        columns: []
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
      //导出表格数据------
      exportFun(){
        this.$axios({
          method: 'post',
          url: '/staff/repair/export',
          data:{
            'companyId': this.search.companyId,
            'companyName': this.search.companyName,
            'education': this.search.education == 0 ? '' : this.search.education,
            'name': this.search.name,
            'position': this.search.position == 0 ? '' : this.search.position,
            'professionalTitle': this.search.professionalTitle,
            'pageNo': this.page,
            'pageSize': this.limit,
            mobileNo:this.search.mobileNo,
            idNum:this.search.idNum,
            regStatus:this.search.regStatus,
          },
          responseType: 'arraybuffer'
        }).then( (res) => {
            console.log('res',res)

            let headerData=res.headers["content-disposition"].split(';')[1].split('=');
            let headerName=headerData[1].substring(1,(headerData[1].length)-1)
            console.log(headerData,headerName);


            let blob = new Blob([res.data], {type: 'application/octet-stream'});

            // console.log(blob);
            let a = document.createElement('a');
            a.download = headerName;

            a.href = window.URL.createObjectURL(blob);
            $("body").append(a);
            a.click();
            $(a).remove();

        })
      },
      clearSection(){
        this.list = "";
        this.clearTableSelect = Math.random();
      },
      rowClick(row){
        this.list = row;
      },
      add() {
        // window.location.href = '/center/staff-detail/?id=' + null
        this.$router.push('/center/staff-detail')
      },
      edit(){
        this.$router.push({path: '/center/staff-detail', query:{id: this.list.id}})
        // window.location.href = "/center/staff-detail/?id="+this.list.id;
      },
      look(){
        this.$router.push({path: '/center/employees-detail', query:{id: this.list.id}})
        // window.location.href = "/center/staff-detail/?id="+this.list.id;
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
          'pageSize': this.limit,
          mobileNo:this.search.mobileNo,
          idNum:this.search.idNum,
          regStatus:this.search.regStatus,
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
        this.columns=[
          {
            title: '序号', minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {
            title: '姓名', key: 'name', sortable: true, minWidth: 150,

            render: (h, params) => {
              if(params.row.regStatus){
                  return h('div', [
                    h('span',params.row.name),
                    h('Icon', {
                        props: {
                          type: "ios-checkmark-circle",
                        },
                        style: {
                            fontSize: "16px",
                            color:"#52C41A",
                            padding:"0 5px"
                        },
                      },
                    ),
                    h('span',{style: {
                            
                            color:"#52C41A",
                    }},'已注册'),
                  ]);
              }else{
                  return h('div', [
                    h('span',params.row.name)
                  ]);
              }

              
            }
          },
          {
            title: '性别', key: 'corpName', sortable: true, minWidth: 85,
            render: (h, params) => h('span', params.row.gender == 1 ? '男' : '女')
          },
          {
            title: '手机号', key: 'mobileNo', sortable: true, minWidth: 135,
            
          },
          {
            title: '身份证号', key: 'idNum', sortable: true, minWidth: 150,
            
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
            render: (h, params) => h('span',params.row.onDuty ? '是' : '否')
          },
          {
            title: '职称', key: 'professionalTitle', sortable: true, minWidth: 110
          },
          {
            title: '企业名称', key: 'companyName', sortable: true, minWidth: 140
          },
        ];
      }else if(this.$route.path == '/center/staff-query'){
        this.type = 3;
        this.columns=[
          {
            title: '序号', minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {
            title: '姓名', key: 'name', sortable: true, minWidth: 110,
          },
          {
            title: '性别', key: 'corpName', sortable: true, minWidth: 100,
            render: (h, params) => h('span', params.row.gender == 1 ? '男' : '女')
          },
          {
            title: '手机号', key: 'mobileNo', sortable: true, minWidth: 135,
            
          },
          {
            title: '身份证号', key: 'idNum', sortable: true, minWidth: 150,
            
          },
          {
            title: '是否注册', key: 'regStatus', sortable: true, minWidth: 120,
            render: (h, params) => h('span', params.row.regStatus? '是' : '否')
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
            render: (h, params) => h('span',params.row.onDuty ? '是' : '否')
          },
          {
            title: '职称', key: 'professionalTitle', sortable: true, minWidth: 110
          },
        ];
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
<style>

</style>