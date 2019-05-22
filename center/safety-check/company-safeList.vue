
<template>
<div class="common-table" ref="commonTable">
  <Collapse v-model="collapse"  class="table-search" >
    <Panel name="1">查询
      <div slot="content" >
         <Form :label-width="140" class="common-form ">
              <FormItem label="已填写年度安全检查表:">
                  <Select v-model="selectYear">
                    <Option v-for="item in yearList" :value="item.id" :key="item.id">{{ item.year+'年度' }}</Option>
                  </Select>
              </FormItem>
              <FormItem :label-width="0" style="width: 80px;">
                  <Button type="primary" v-if="" :disabled="!(yearList.length>0)" @click="page=1,getCheckDetail()">搜索</Button>
              </FormItem>
        </Form>
      </div>
    </Panel>
  </Collapse>

  <div class="operate" >
    <Button type="info" v-if="" @click="showDetail=Math.random();">新增年度检查表</Button>
  </div>

  <div class="table-bottom">
      <common-safe-table v-if="yearList.length>0" ref="safetable" :zRole="'z-company'"></common-safe-table>
      <div v-else style="text-align: center;">暂无年度检查表数据</div>
  </div>
  <company-safe-detail :showDetail="showDetail" :detailData="detailData" @closeDetail="closeDetail" :roleType="'weixiuqiye'"></company-safe-detail>
  <Spin size="large" fix v-if="spinShow"></Spin>
</div>
</template>

<script>
import funMixin from '~/components/fun-auth-mixim.js'
import companySafeDetail from './company-safe-detail.vue'
import commonSafeTable from './common-safe-table.vue'
export default {
	name: "company-safeList",
    components: {
      companySafeDetail,
      commonSafeTable
    },
    mixins: [funMixin],
    data(){
        return{
            collapse:"1",
            showDetail: false,
            yearList:[],
            selectYear:'',
            detailData:null,
            spinShow:false,
        }
    },
    mounted () {
      this.getList();
    },
    methods:{
        getList(){
          this.$axios.get('/security/check/list', {
          }).then( (res) => {
            if(res.data.code=='0'){
                this.yearList=res.data.items;
                if(this.yearList.length>0){
                    this.selectYear=this.yearList[0].id;
                    this.getCheckDetail();
                }
            }
          })
        },
        getCheckDetail(){
            this.spinShow=true;
            this.$axios.get('/security/check/detail/'+this.selectYear, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    for(let i in res.data.item.results){
                        for(let j in res.data.item.results[i].children){
                            res.data.item.results[i].children[j]['result']=res.data.item.results[i].children[j]['result']+'';
                        }
                    }
                    this.$refs.safetable.mergeData(res.data.item);
                }
                this.spinShow=false;
            })
        },
        closeDetail(){
            this.getList();
        },
    }
}
</script>

<style scoped lang="less">

.common-table{
  padding: 10px;
  background-color: white;
  /*height: 100%;*/
  overflow: auto;
  position: relative;
  /*opacity: 0;*/
  transition: opacity .2s;
  .table-search{
    margin-bottom: 10px;
  }
  .operate{
    margin-bottom: 10px;
    padding: 15px 15px 10px 15px;
    border: 1px solid #dcdee2;
    border-radius: 3px;
  }
  .operate button{
    margin: 0 5px 5px 0;
  }
  .table-bottom{
    padding: 10px;
    width: 100%;
    background-color: white;
    border: 1px solid #dcdee2;
  }
}
</style>
</style>
