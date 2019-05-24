<template>
<Modal
    v-model="showModal"
    :title=listData.title
    width="90"
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
        <div style="padding: 0 15px;">{{listData.content}}</div>
        <div class="public-block">
        附件：
        </div>
        <div style="padding: 0 15px;">
            <div class="fileList" v-if="listData.attachments&&listData.attachments.length>0" v-for="item in listData.attachments"><span class="file-left">{{item.info}}</span><a class="file-right" :href="item.path"><Icon type="md-download" /></a></div>
            <div v-else>暂无附件下载</div>
        </div>

        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
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
                attachments:[],
                content:''
                
            }
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.getNotify();
        },
    },
    methods:{
        getNotify(){
            this.spinShow=true;
            this.$axios.get('/message/notify/getNotify/'+this.detailData.id, {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.listData=res.data.item;
                }
				this.spinShow=false;
			})
        }
    },
}
</script>

<style scoped lang="less">

.search-block{
  padding: 5px 0;
}
.public-block{
    padding: 15px 0;
    font-size: 14px;
    font-weight: bold;
}
.fileList{
font-size: 16px;
overflow: hidden;
.file-left{
display: inline-block;line-height: 30px;width: 250px;overflow:hidden;
text-overflow:ellipsis;white-space:nowrap;
float: left;
padding-right:10px;
}
.file-right{
line-height: 30px;
float: left;
}
}
</style>
