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
        <div class="public-block">
            接收对象：
        </div>
        <div style="padding: 0 15px;">
            <div class="search-block" v-for="item in listData.roles">
                <span>{{item.receiverType}}</span><span v-if="item.secondaryType">:{{item.secondaryType}}</span>
            </div>
        </div>
        <div class="public-block">
            通知内容：
        </div>
        <div style="padding: 0 15px;">
            {{listData.content}}
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
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
            spinShow:false,
            showModal:false,
            listData:{
                content:"",
                title:"",
                url:'',
                roles:[],
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
            this.spinShow=true;
            this.$axios.get('/message/notify/getNotify/'+this.detailData.id, {
                    
                }).then( (res) => {
                  if(res.data.code=='0'){

                    // let jsonData=JSON.parse(res.data.item.content);
                    this.listData.title=res.data.item.title;
                    this.listData.url=res.data.item.url;
                    this.listData.roles=res.data.item.roles;
                    this.listData.content=res.data.item.content;

                  }
					this.spinShow=false;
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
  /*display: inline-block;
  width: 180px;
  margin-right: 10px;*/
  padding: 5px 0;
}
.public-block{
    padding: 15px 0;
    font-size: 14px;
    font-weight: bold;
}
</style>
