<!--通知审核详情2018-10-26-->
<template>
<Modal
    v-model="showModal"
    title="通知审核详情"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">

    <div style="height: 100%;overflow: auto;">
        <div id="content">
        </div>
    </div>
    <div slot="footer">
        <Button v-if="accessBtn('audit')"  @click="updateStatus" size="large" type="primary"   v-show="listButton.audit">审核</Button>
        <Button v-if="accessBtn('audit')"   @click="updateStatus1" size="large" type="primary"   v-show="listButton.out">驳回</Button>
        <Button  @click="exportFun" size="large" type="success"  >附件下载</Button>
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
import funMixin from '~/components/fun-auth-mixim.js'
export default {
	name: "note-audit-detail",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){
		return{
            showModal:false,
            listData:{
                content:"",
                mobile:null,
                nickName:null,
                notifyId:"",
                read:null,
                sendtime:"",
                title:"",
                url:'',
            },
            listButton:{
                audit:true,
                out:true,
            }
        
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            for(let i in this.listButton){
                this.listButton[i]=true;
            }
            this.getNotify();
            // this.updateStatus();
        },
    },
    methods:{
        getNotify(){
            this.$axios.get('/message/notify/getNotify/'+this.detailData.id, {
                    
                }).then( (res) => {
                  if(res.data.code=='0'){

                    // let jsonData=JSON.parse(res.data.item.content);
                    this.listData.title=res.data.item.title;
                    this.listData.url=res.data.item.url;

                    var obj = document.getElementById('content') ;
                    obj.innerHTML=res.data.item.content;

                  }else{
                    this.$Message.error(res.data.status);
                  }
					
				  })
          

        },
        //审核状态--------------
        updateStatus(){
            this.$axios.post('/message/notify/audit', {
                    "id": this.detailData.id,
                    status:'审核通过'
                }).then( (res) => {
                  if(res.data.code=='0'){
                      this.$Message.info("审核成功");
                      for(let i in this.listButton){
                            this.listButton[i]=false;
                        }
                  }else{
                    this.$Message.error(res.data.status);
                  }
					
				  })
        },
        //驳回状态--------------
        updateStatus1(){
            this.$axios.post('/message/notify/audit', {
                    "id": this.detailData.id,
                    status:'审核不通过'
                }).then( (res) => {
                  if(res.data.code=='0'){
                      this.$Message.info("驳回成功");
                      for(let i in this.listButton){
                            this.listButton[i]=false;
                        }
                  }else{
                    this.$Message.error(res.data.status);
                  }
					
				  })
        },
        exportFun(){
            if(this.listData.url){
                window.location.href = this.listData.url;
            }else{
                this.$Message.error('暂无附件下载');
            }
            
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
</style>
