
<template>
<div class="common-safe">
    <div class="safe-menu">
        <h2 class="s-header">机动车维修行业安全检查表</h2>
        <div style="margin-left: 30px;">2018年度</div>
        <Form :label-width="100" class="common-form" label-position="left">
              <FormItem label="被告知人:" style="width: 40%;margin: 0 30px;">
                  <span>XXXXXXXXXXXXXXXXXXXXXXX</span>
              </FormItem>
              <FormItem label="许可证号:" style="width: 40%;margin: 0 30px;">
                  <span>XXXXXXXXXXXXXXXXXXXXXXX</span>
              </FormItem>
              <FormItem label="被告知书编号:" style="width: 40%;margin: 0 30px;">
                  <span>XXXXXXXXXXXXXXXXXXXXXXX</span>
              </FormItem>
        </Form>
        <div>
        <table id="customers">
            <thead>
            <tr>
                <th>项目</th>
                <th>分序号</th>
                <th>交通行政现场检查内容</th>
                <th>检查结果</th>
                <th>情况说明</th>
            </tr>
            </thead>
            <tbody v-for="item in columns">
                <tr >
                <td :rowspan="(item.chr.length+1)">{{item.pro}}</td>
                <!--<td v-for="(itemChr,index) in item.chr">{{index}}</td>-->
                <tr v-for="(itemChr,index) in item.chr">
                    <td>{{index+1}}</td>
                    <td>{{itemChr.c}}</td>
                    <td>
                        <RadioGroup v-model="itemChr.check">
                            <Radio label="true" :disabled=true>
                                <span>是</span>
                            </Radio>
                            <Radio label="false">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </td>
                    <td>{{itemChr.base}}</td>
                </tr>
            </tr>
            </tbody>
            
            
            
            </table>
        </div>
        <Form :label-width="80" class="common-form" >
              <FormItem label="总体评价:" style="width: 100%;">
                  <Input v-model="value5" type="textarea" placeholder="请输入评价" />
              </FormItem>
        </Form>
    </div>
        
        
</div>

</template>

<script>
  import CommonTable from '~/components/common-table.vue'
  
  import funMixin from '~/components/fun-auth-mixim.js'
  export default {
	name: "common-safe-table",
    components: {
      CommonTable,
      
    },
    mixins: [funMixin],
    data(){
		  return{
              value5:'',
        loading:false,
        columns: [
          {pro:'测试一',chr:[{'c':'很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美',check:"true",base:'很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美很完美'},{'c':'xx',check:"true",base:'很完美'}]},
          {pro:'测试二',chr:[{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'}]},
          {pro:'测试三',chr:[{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'}]},
          {pro:'测试四',chr:[{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'}]},
          {pro:'测试五',chr:[{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'},{'c':'xx',check:"true",base:'很完美'}]},
        ],
        tableData: [],
        rescueArea:[],//救援区域----
        search:{
          name:'',
          professor: '',
          empUnit: '',
        },
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
        setTimeout(()=>{
            console.log(this.columns);
        },15000)

        
    },
    methods:{

    }
}
</script>

<style scoped lang="less">
.common-safe{
    
    .safe-menu{
        max-width: 1000px;
        margin: 0 auto;
        .s-header{
            text-align: center;
        }
    }
    
}

#customers
{
	font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
	width:100%;
    max-width: 1000px;
	border-collapse:collapse;
}
#customers td, #customers th 
{   width: 20%;
	font-size:1em;
	border:1px solid #e8eaec;
    text-align: center;
	padding:3px 7px 2px 7px;
}
#customers th 
{
	font-size:1.1em;
	text-align:center;
	padding-top:5px;
	padding-bottom:4px;
	background-color:#CCC;
	color:#515a6e;
}
#customers tr.alt td 
{
	color:#000000;
	background-color:#EAF2D3;
}
</style>
