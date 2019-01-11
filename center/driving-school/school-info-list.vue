<!--驾校信息管理 2019-01-07 -->

<template>
  <common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
      @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
                :show="showTable" :page="page"  :loading="loading" >

    <div  slot="search"  >
        <Form :label-width="95" class="common-form">
                <FormItem label="驾校名称:">
                    <Input type="text" v-model="searchList.name" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="许可证号:">
                    <Input type="text" v-model="searchList.licenseNo" placeholder="请输入许可证号"></Input>
                </FormItem>
                <FormItem label="训练基地:">
                    
                    <Select v-model="searchList.drivingBase" clearable>
                        <Option v-for="item in drivingBaseArr" :value="item.name" :key="item.name">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="驾校等级:">
                    <Select v-model="searchList.creditLevel" clearable>
                        <Option v-for="item in creditLevelArr" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="培训驾照类型:"  >
                    <!--<CheckboxGroup v-model="searchList.trainingScope"  @on-change="checkAllGroupChange" >
                        <Checkbox v-for="item in checkList" :label="item.name" :key="item.name"></Checkbox>

                    </CheckboxGroup>-->
					<Select v-model="searchList.trainingScope" multiple clearable>
                        <Option v-for="item in checkList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                
                <FormItem :label-width="0" style="width: 60px;">
                    <Button type="primary" v-if="accessBtn('query')" @click="page=1,closeDetail()">搜索</Button>
                </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="accessBtn('add')" @click="showDetail=Math.random();detailData=null;">新增</Button>
        <Button type="info" v-if="accessBtn('update')" @click="showDetail=Math.random();" :disabled="!detailData">查看|编辑</Button>
    </div>
	<school-info-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail" ></school-info-detail>
  </common-table>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import schoolInfoDetail from './school-info-detail.vue'
  import funMixin from '~/components/fun-auth-mixim.js'
  import { formatDate } from '@/static/tools.js'
  import { getName } from '@/static/util.js'
	export default {
		name: "school-info-list",
    components: {
      CommonTable,
	  schoolInfoDetail
    },
    mixins: [funMixin],
    data(){
	return{
        loading:false,
        checkList:[
            {'name':'A1'},
            {'name':'A2'},
            {'name':'B1'},
            {'name':'B2'},
            {'name':'C1'},
            {'name':'C2'},
            {'name':'D'},
            {'name':'E'},
            {'name':'F'},

        ],
        checkAllGroup: [],
        columns: [
          {title: '序号', minWidth: 80,
            render: (h, params) => h('span', (this.page - 1) * this.limit + params.index + 1)
          },
          {title: '驾校名称', key: 'name', sortable: true, minWidth: 160,
          },
          {title: '驾校简称', key: 'simpleName', sortable: true, minWidth: 120},
          {title: '许可证号', key: 'licenseNo', sortable: true, minWidth: 160,
          },
          {title: '报名地址', key: 'address', sortable: true, minWidth: 160},
          {title: '报名电话', key: 'phoneNo', sortable: true, minWidth: 120,
            render: (h, params) => {
				let temPhone='';
				if(params.row.phoneNo){
					temPhone=params.row.phoneNo.split('/');
				}
              return h('div', [
                h('span', 
                  temPhone[0]
                )
              ]);
            }
          },
          {title: '报名电话2', key: 'phoneNo', sortable: true, minWidth: 120,
            render: (h, params) => {
				let temPhone='';
				if(params.row.phoneNo){
					temPhone=params.row.phoneNo.split('/');
				}
              return h('div', [
                h('span', 
                  temPhone[1]
                )
              ]);
            }
          },
          {title: '培训驾照类型', key: 'trainingScope', sortable: true, minWidth: 130,},
		  {title: '训练基地', key: 'drivingBase', sortable: true, minWidth: 130,},
		  {title: '驾校等级', key: 'creditLevel', sortable: true, minWidth: 120,
			render: (h, params) => {
				let temPhone='';
				if(params.row.creditLevel=='N'){

					temPhone='未评级';
				}else{
					temPhone=params.row.creditLevel;
				}
              return h('div', [
                h('span', 
                  temPhone
                )
              ]);
            }
			},
          
        ],
        tableData: [],
        searchList:{
            name:'',
            licenseNo:'',
            drivingBase:'',
            creditLevel:'',
            trainingScope:[],
            
        },
		creditLevelArr:[
			{name:'未评级',code:'N'},
			{name:'B',code:'B'},
			{name:'A',code:'A'},
			{name:'AA',code:'AA'},
			{name:'AAA',code:'AAA'},
		],
		drivingBaseArr:[],
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,

      }
    },
    mounted () {
      this.showTable= Math.random();
	  this.getList();
	  this.getNameList();
    },

    methods:{
        getList(){
            this.loading=true;
            let page=this.page-1;
            
            let strUrl="";

            for(let i in this.searchList){
				if(i=="trainingScope"){
					if(this.searchList[i].length>0){
						strUrl+='&'+i+'='+this.searchList[i];
					}
				}else if(this.searchList[i]){
                    strUrl+='&'+i+'='+this.searchList[i];
                }
            }

            
            this.$axios.get('/training/driving/school/query?size='+this.limit+'&page='+page+strUrl, {
            }).then( (res) => {
            //   console.log(res);
              if(res.status===200){
                  this.tableData=res.data.content;
                  this.total=res.data.totalElements;
                  this.loading=false;
              }else{
                this.loading=false;
                // this.$Message.error(res.statusText);
              }
              
            })
        },
		getNameList(){
			let page=this.page-1;
			this.$axios.get('/training/driving/base/query', {
            }).then( (res) => {
            //   console.log(res);
              if(res.status===200){
                
				this.drivingBaseArr=res.data.content;

              }
              
            })
		},
        changePage(page){
          this.page= page
          this.getList()
        },
        changePageSize(size){
          this.limit= size
          this.getList()
        },
        onRowClick( row, index){
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null
          this.clearTableSelect= Math.random()
          
          this.getList();
        },

        checkAllGroupChange (data) {

			// this.searchList.trainingScope='';

            // for(let i in data){
			// 	if(i==(data.length-1)){
			// 		this.searchList.trainingScope+=data[i];
			// 	}else{
			// 		this.searchList.trainingScope+=data[i]+',';
			// 	}
			// }

			console.log(this.searchList.trainingScope)
        },
    },
	}
</script>

<style scoped lang="less">
.menu-manage{

}
.search-block{
  display: inline-block;
  width: 200px;
  margin-right: 10px;
}
</style>





























































































