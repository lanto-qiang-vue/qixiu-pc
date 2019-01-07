<template>
<Modal
    v-model="showModal"
    :title=listData.title
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
            {{testContent}}
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button  @click="exportFun" size="large" type="success"  style="margin-right: 10px;">附件下载</Button>
        <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import { formatDate } from '@/static/tools.js'
export default {
	name: "common-notes-detail",
    props:['showDetail', 'detailData'],
    data(){
		return{
            spinShow:false,
            showModal:false,
            listData:{
                title:"",
                url:'',
                roles:[],
            },
            testContent:'',
            
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            
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
                    // console.log(jsonData.content);
                    this.testContent=res.data.item.content;
                    // var obj = document.getElementById('content1') ;
                    // obj.innerHTML=jsonData.content;

                  }
					this.spinShow=false;
			})
          

        },
        // updateStatus(){
        //     this.$axios.post('/message/notify/update', {
        //             "notifyId ": this.detailData.id,
        //         }).then( (res) => {
        //           if(res.data.code=='0'){
                    
        //           }else{
        //             this.$Message.error(res.data.status);
        //           }
					
		// 		  })
        // },
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
