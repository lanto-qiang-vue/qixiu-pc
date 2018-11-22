<!--车主中心 我的反馈 2018-11-16-->
<template>
<div class="menu-manage">

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
                @changePage="changePage" @changePageSize="changePageSize" 
                :show="showTable" :page="page" :showOperate=false>
    <div  slot="search"  >
      <Form :label-width="80" class="common-form">
            <FormItem label="反馈类型:">
                <Select v-model="searchList.type" clearable>
                    <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem style="width: 80px;" :label-width="0">
                <Button type="primary" v-if="" @click="page=1,getList()">查询</Button>
            </FormItem>
        </Form>
    </div>
  </common-table>
</div>
</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  import { formatDate } from '@/static/tools.js'
	export default {
		name: "my-complaint",
    components: {
      CommonTable,
    },
    data(){
		  return{
        columns: [
          {title: '反馈企业', key: 'companyName', sortable: true, minWidth: 120,
            // render: (h, params) => h('span', getName(this.$store.state.app.dict, params.row.ORDER_TYPE))
          },
          {title: '反馈原因', key: 'type', sortable: true, minWidth: 120,
            render: (h, params) => {
                  if(params.row.type==1){
                    return h('div', [
                        h('span', '维修记录不正确')
                    ]);
                  }else if(params.row.type==0){
                    return h('div', [
                        h('span', '维修记录未上传')
                    ]);
                  }

              }
        },
          {title: '反馈日期', key: 'createDate', sortable: true, minWidth: 135,
            render: (h, params) => h('span', formatDate(params.row.createDate))
          },
          {title: '车牌号', key: 'vehicleNum', sortable: true, minWidth: 120},
          {title: '凭据', key: 'photoUrl', sortable: true, minWidth: 120,
              render: (h, params) => {
                  if(params.row.photoUrl){
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.showImg(params.row.photoUrl);
                                }
                            }
                        }, '查看凭证')
                    ]);
                  }else{
                    return h('div', [
                        h('span', '暂无凭证')
                    ]);
                  }

              }
          },
        ],
        tableData: [],
        searchList:{
          type: '',
        },
        page: 1,
        limit: 10,
        total: 0,
        showTable:false,
        showDetail: false,
        detailData: null,
        clearTableSelect: null,
        typeList:[
            {code:0,name:"维修记录未上传"},
            {code:1,name:"维修记录不正确"},
        ],
      }
    },
    mounted () {
      this.showTable= Math.random();
      this.getList();
    
    },
    methods:{
        getList(){
            this.loading=true;
            let page=this.page-1;
            let strUrl="";
            for(let i in this.searchList){
                if(i=="type"&&this.searchList[i]==0){
                    strUrl+='&'+i+'='+this.searchList[i];
                }else if(this.searchList[i]){
                    strUrl+='&'+i+'='+this.searchList[i];
                }
            }

            this.$axios.get('/comment/complaint/maintain/query/userId?size='+this.limit+'&page='+page+strUrl, {
            }).then( (res) => {
              if(res.status===200){
                  this.tableData=res.data.content;
                  this.total=res.data.totalElements;
                  this.loading=false;
              }else{
                this.loading=false;
                this.$Message.error(res.statusText);
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
        showImg(img){
                this.$Modal.info({
                width: 50,
                title: '查看',
                closable: true,
                content: '<img src="'+img+'" style="width: 100%"/>'
                })
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
