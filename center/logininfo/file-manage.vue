<!--文件管理 2018-10-29 -->
<template>

<common-table v-model="tableData" :columns="columns" :total="total" :clearSelect="clearTableSelect"
        @changePage="changePage" @changePageSize="changePageSize" @onRowClick="onRowClick"
            :show="showTable" :page="page" :loading="loading">
    <div  slot="search">
    <Form :label-width="80" class="common-form">
            <FormItem label="文件名:">
                <Input type="text" v-model="searchList.title" placeholder="请输入文件名"></Input>
            </FormItem>
            <FormItem :label-width="0" style="width: 70px;">
                <Button type="primary" v-if="" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="" @click="showModal=true;">上传文件</Button>
        <Button type="info" v-if="" @click="isDownFun" :disabled="!detailData">下载文件</Button>
        <Button type="error" v-if="" @click="delquestion" :disabled="!detailData">删除</Button>
    </div>

    <Modal
    v-model="showModal"
    title='文件上传'
    width="400"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    :transition-names="['', '']">

    <Upload
    ref="upload"
    :headers="token"
    :format="['doc','xls','xlsx']"
    accept=".doc, .xls, .xlsx"
    :on-format-error="handleFormatError"
    :before-upload="handleBeforeUpload"
    :on-success="handleSuccess"
    type="select"
<<<<<<< HEAD
    action="http://118.25.81.63:8888/file/add"
=======
    action="/proxy/file/add"
>>>>>>> a22a43725d47b59ea82f47165eb7933ba5a4bf71
    >
        <Button type="primary">上传文件</Button>
        <span>(仅支持doc, xls, xlsx)</span>
    </Upload>
    <div slot="footer">
        <Button  @click="uploadFile" size="large" type="success"  >确定</Button>
        <Button  size="large" type="default"  @click="showModal=false;">返回</Button>
    </div>
  </Modal>

</common-table>

</template>
<script>
  import CommonTable from '~/components/common-table.vue'
export default {
	name: "file-manage",
    components: {
              CommonTable,
    },
    data(){
		return{
            token: {token: ''},
            loading:false,
            columns: [
                {title: '序号',  minWidth: 80,
                    render: (h, params) => h('span', (this.page-1)*this.limit+params.index+1 )
                },
                {title: '文件名', key: 'filename', sortable: true, minWidth: 120,
                },


            ],
            tableData: [],
            page: 1,
            limit: 10,
            total: 0,

            searchList:{
                title:'',

            },
            showTable:false,
            showDetail: false,
            showOtherDetail:false,
            detailData: null,
            clearTableSelect: null,
            showList:null,//是否显示收件人
            showModal:false,//是否显示上传页
            uploadData:{
                info:null,
                fileUrl:null,
            }
        }
    },
    mounted () {
        this.token.token = this.$store.state.user.token;
        this.getList();

    },
    methods:{
        getList(){
            this.loading=true;
            this.$axios.post('/file/list', {
                    fileName:this.searchList.title||'',
                    pageSize:this.limit,
                    pageNo:this.page,
            }).then( (res) => {
                if(res.data.code=='0'){

                    this.tableData=res.data.items;
                    this.total=res.data.total;
                    this.loading=false;

                }else{
                    this.$Message.error(res.data.status);
                }
           })

        },

        changePage(page){
          this.page= page
          this.closeDetail();
        },
        changePageSize(size){
          this.limit= size
          this.closeDetail();
        },
        onRowClick( row, index){
            console.log('row：',row);
          this.detailData=row
        },
        closeDetail(){
          this.detailData= null
          this.page= 1;
          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.closeDetail();
        },
        //删除数据-------
        delquestion(){
          this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要删除吗？",
              onOk:this.delFun,
          })

        },
        delFun(){
            this.$axios.post('/file/delete/'+this.detailData.id,{
            }).then( (res) => {
                  if(res.data.code=='0'){
                      this.closeDetail();
                  }
            })
        },
        //下载文件-------
        isDownFun(){
          this.$Modal.confirm({
              title:"系统提示!",
              content:"确定要下载吗？",
              onOk:this.downFileFun,
          })

        },
        downFileFun(){
            window.location.href = this.detailData.url;
        },
        //新增文件接口-------
        uploadFile(){
            this.$axios.post('/file/upload', {
                    "fileName": this.uploadData.info,
                    "url": this.uploadData.fileUrl,
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.showModal=false;

                    this.$Message.info("提交成功");
                }else{
                    this.$Message.error(res.data.status);
                }
           })
        },
        //选择文件--------
        handleFormatError (file) {
            this.$Modal.confirm({
                title:"系统提示!",
                content:"该文件格式不正确,仅支持doc,xls,xlsx",

            })
        },
        handleBeforeUpload () {
            let fileList = this.$refs.upload.fileList;
            if(fileList.length>0){
                this.$refs.upload.fileList.splice(0, 1);

            }
            return true;
        },
        handleSuccess(res,file,fileList){
            // consolelog(res,file,fileList);
            if(res.code=="0"){
                // this.search.docPath=res.data.docPath;
                this.uploadData.info=res.data.info;
                this.uploadData.fileUrl=res.data.fileUrl;

                this.$Message.info("上传成功");
            }else{
                this.$Message.error(res.status);
            }
        },
        visibleChange(status){
          if(status === false){
            // this.$emit('closeDetail');
            let fileList = this.$refs.upload.fileList;
            if(fileList.length>0){
                this.$refs.upload.fileList.splice(0, 1);

            }
            this.closeDetail();
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
























