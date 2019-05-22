
<template>
<div class="common-safe">
    <div class="safe-menu">
        <h2 class="s-header">机动车维修行业安全检查表</h2>
        <Form :label-width="100" class="common-form" >
              <FormItem label="检查年度:" style="width: 70%;margin: 0 30px;">
                  <span>{{listData.year}}年度</span>
              </FormItem>
              <FormItem label="被检查人:" style="width: 40%;margin: 0 30px;">
                  <span>{{listData.corpName}}</span>
              </FormItem>
              <FormItem label="许可证号:" style="width: 40%;margin: 0 30px;">
                  <span>{{listData.license}}</span>
              </FormItem>
              <FormItem label="被告知书编号:" style="width: 40%;margin: 0 30px;">
                  <span>{{listData.no}}</span>
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
            <tbody v-for="item in listData.results">
                <tr >
                <td :rowspan="(item.children.length+1)">{{item.name}}</td>
                <!--<td v-for="(itemChr,index) in item.chr">{{index}}</td>-->
                <tr v-for="(itemChr,index) in item.children">
                    <td>{{index+1}}</td>
                    <td>{{itemChr.name}}</td>
                    <td>
                        <RadioGroup v-model="itemChr.result">
                            <Radio label="true" :disabled="!isCompany">
                                <span>是</span>
                            </Radio>
                            <Radio label="false" :disabled="!isCompany">
                                <span>否</span>
                            </Radio>
                        </RadioGroup>
                    </td>
                    <td>
                        <Input v-model="itemChr.backup" :disabled="!isCompany" placeholder=""/>
                    </td>
                </tr>
            </tr>
            </tbody>
        </table>
        </div>
        <Form :label-width="80" class="common-form" style="margin-top: 15px;" >
              <FormItem label="总体评价:" style="width: 100%;" v-show="roleType&&!isCompany">
                  <Input v-model="review" type="textarea" :disabled="!isGuanlibumen" :autosize="{minRows: 2}" placeholder="请填写评价" />
              </FormItem>
              <FormItem label="总体评价:" style="width: 100%;" v-show="(zRole=='z-company')&&review">
                  <Input v-model="review" type="textarea" :disabled="!isGuanlibumen" :autosize="{minRows: 2}" placeholder="请填写评价" />
              </FormItem>
        </Form>
    </div>
        
        
</div>

</template>

<script>
 export default {
    name: "common-safe-table",
    props: ['roleType','zRole'],
    data(){
        return{
            listData:{},
            review:''
        }
    },
    mounted () {

    },
    computed:{
      isYunying(){
        return this.roleType=='yunying'
      },
      isCompany(){
          return this.roleType=="weixiuqiye"
      },
      isGuanlibumen(){
          return this.roleType=="guanlibumen"
      },
    },
    methods:{
        mergeData(datas){
            this.listData=datas;
            this.review=this.listData.review;
        },
        rulesData(){
            let temData={};
            let temList=this.listData.results;
            for(let i in temList){
                for(let j in temList[i].children){
                    if(temList[i].children[j]['result']){
                        if(temList[i].children[j]['result']=="false"&&!temList[i].children[j]['backup']){
                            this.$Message.success('请填写检查结果为否的情况说明')
                            return;
                        }
                    }else{
                        this.$Message.success('请填写表格信息')
                        return;
                    }
                }
            }
            temData={...this.listData}
            this.$emit('saveInfoFun',temData, 'insert');
        },
        rulesReview(){
            let temData={};
            temData['review']=this.review;
            this.$emit('saveInfoFun',temData, 'review');
        }
    }
}
</script>

<style scoped lang="less">
.common-form .ivu-form-item{
         margin: 0 0 20px 0; 
}
.common-safe{
    
    .safe-menu{
        
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
	background-color:#f8f8f9;
	color:#515a6e;
}
#customers tr.alt td 
{
	color:#000000;
	background-color:#EAF2D3;
}
</style>
