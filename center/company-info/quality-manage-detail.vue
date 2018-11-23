<!--质量考核管理  2018-10-30 -->
<template>
<Modal
    v-model="showModal"
    title="考核详情"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <Form slot="content" :label-width="120" class="common-form">
            <FormItem label="考核标题:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.title" placeholder=""> </Input>
            </FormItem>
            <FormItem label="考核状态:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.status.name" placeholder=""> </Input>
            </FormItem>
            <FormItem label="考核描述:" style="width: 80%;">
                <Input type="text" disabled v-model="listSearch.description" placeholder=""> </Input>
            </FormItem>
            <FormItem label="考核附件:" style="width: 80%;">
                <Button  size="large" type="default" style="margin-right: 10px;" @click="downFile" v-show="!isFile">附件下载</Button>
                <p v-show="isFile">无</p>
            </FormItem>
        </Form>
    </div>
    <div slot="footer">
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
export default {
	name: "quality-manage-detail",
    props:['showDetail', 'detailData'],
    data(){
		return{
            showModal:false,
            listSearch:{
                description:"",
                fileurl:"",
                id:"",
                status:{name:''},
                title:"",
            },
            isFile:true,
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getDetail();
        },
    },
    methods:{
        getDetail(){
            this.$axios.get('/reputation-assessmant/detail/'+this.detailData.id,{
                        
                }).then( (res) => {
                    if(res.data.code=='0'){
                        for(let i in res.data.item){
                            this.listSearch[i]=res.data.item[i];
                        }
                        if(this.listSearch['fileUrl']){
                            this.isFile=false;
                        }else{
                            this.isFile=true;
                        }
                    }else{
                        this.$Message.error(res.data.status);
                    }
            })
        },
        downFile(){
            window.location.href = this.listSearch.fileurl;
        },
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            
          }
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
  .r-list-search{
    width: 100%;
    padding: 10px 0;
    

  }
</style>
