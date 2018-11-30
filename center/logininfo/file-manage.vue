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
                <Button type="primary" v-if="accessBtn('list')" @click="searchFun">搜索</Button>
            </FormItem>
        </Form>
    </div>
    <div slot="operate">
        <Button type="primary" v-if="accessBtn('upload')" @click="addFun">上传文件</Button>
        <Button type="info" v-if="" @click="isDownFun" :disabled="!detailData">下载文件</Button>
        <Button type="error" v-if="accessBtn('delete')" @click="delquestion" :disabled="!detailData">删除</Button>
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
      <Form :model="uploadData" ref="uploadData" :label-width="60">
        <FormItem label="文件">
          <Upload
            ref="upload"
            :headers="token"
            :format="['doc','xls','xlsx']"
            accept=".doc, .xls, .xlsx"
            :on-format-error="handleFormatError"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            type="select"
            action="/proxy/file/add"

            v-if="accessBtn('upload')">
            <Button type="primary">上传文件</Button>
            <span>(仅支持doc, xls, xlsx)</span>
          </Upload>
        </FormItem>
        <FormItem label="文件名" :required="true" prop="fileName">
          <Input v-model="uploadData.fileName"></Input>
        </FormItem>
      </Form>

    <div slot="footer">
        <Button  @click="uploadFile" size="large" type="success"  >确定</Button>
        <Button  size="large" type="default"  @click="showModal=false;">返回</Button>
    </div>
  </Modal>

</common-table>

</template>
<script>
import funMixin from '~/components/fun-auth-mixim.js'
  import CommonTable from '~/components/common-table.vue'
export default {
	name: "file-manage",
    components: {
              CommonTable,
    },
    mixins: [funMixin],
    data(){
		return{
            token: {token: ''},
            loading:false,
            columns: [
                {title: 'id',  key: 'id',width: 60,},
                {title: '文件名', key: 'fileName',  minWidth: 120,},
                {title: '分类', key: 'category',  width: 80,},
                {title: '地址', key: 'url',  minWidth: 300,},


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
              fileName:'',
              url: ''
            }
        }
    },
    mounted () {
        this.token.token = this.$store.state.user.token;
        this.getList();

    },
    methods:{
        addFun(){
            this.showModal=true;
            this.handleBeforeUpload();
            this.$refs["uploadData"].resetFields();
            // this.$refs['uploadData'].validateField('fileName');
        },
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
                    // this.$Message.error(res.data.status);
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

          this.clearTableSelect= Math.random();
          this.getList();
        },
        //搜索按钮----
        searchFun(){
            this.page= 1;
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
            this.$axios.delete('/file/delete/'+this.detailData.id,{
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
            this.$axios.post('/file/upload',this.uploadData).then( (res) => {
                if(res.data.code=='0'){
                    this.showModal=false;

                    this.$Message.info("提交成功");
                }else{
                    // this.$Message.error(res.data.status);
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
            console.log(res,file,fileList);
            if(res.code=="0"){
               this.uploadData.fileName= res.item.info
               this.uploadData.url= res.item.path
                this.$Message.info("上传成功");
            }else{
                // this.$Message.error(res.status);
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
























