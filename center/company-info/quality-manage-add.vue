<!--新建考核内容 -->

<template>

<Modal
    v-model="showModal"
    title="新建考核内容"
    width="90"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    class="table-modal-detail"
    :transition-names="['', '']">
        <div style="height: 100%;overflow: auto;">

        <Form :label-width="80" ref="search" :rules="ruleValidate"  :model="search">
            <FormItem label="考核标题:" style="width: 80%;" prop="title">
                <Input type="text" v-model="search.title" placeholder=""></Input>
            </FormItem>
            <FormItem label="考核描述:" style="width: 80%;" prop="content">
                <Input type="textarea" :rows="6" v-model="search.content" placeholder=""></Input>
            </FormItem>
            <FormItem label="上传附件" style="width: 450px;">
                <Upload
                ref="upload"
                :headers="token"
                :format="['txt','zip','doc','docx','xls','xlsx','pdf']"
                accept=".txt, .zip, .doc,.docx,.xls,.xlsx,.pdf"
                :on-format-error="handleFormatError"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                type="select"
                action="/proxy/file/add"
                >
                    <Button icon="ios-cloud-upload-outline">添加附件</Button>
                    <span>（仅支持txt、zip、doc、docx、xls、xlsx、pdf）</span>
                </Upload>
            </FormItem>
        </Form>

        </div>
        <div slot="footer">
            <Button  @click="sendNotify('search')" size="large" type="success"  style="margin-right: 10px;">提交</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
        </div>

  </Modal>

</template>

<script>

export default {
	name: "quality-manage-add",
    props:['showDetail', 'detailData'],
    data(){
        return{

            showModal:false,
            search:{
                "content":"",
                "title":"",
                "docPath":'',
            },
            ruleValidate: {
                content:[
                    { required: true, message: '请填写数据', },
                ],
                title: [
                    { required: true,  message: '请填写数据',}
                ],

            },//规则验证

            token: {token: ''},

        }
    },
    watch:{
        showDetail(){

            this.showModal=true;
            this.token.token = this.$store.state.user.token;



        },
    },
    mounted () {

    },
    methods:{
        //监听界面变化--------
        visibleChange(status){
            if(status === false){
                this.handleReset("search");
                this.$emit('closeDetail');
            }
        },
        //清除规则验证-------------
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        //提交数据
        sendNotify(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$axios.post('/reputation-assessmant/add', {
                                "description": this.search.content,
                                "fileUrl": this.search.docPath,
                                "status": "1",
                                "title": this.search.title,
                        }).then( (res) => {
                            if(res.data.code=='0'){
                                this.$Message.info('提交成功');
                                this.showModal=false;

                            }else{
                                // this.$Message.error(res.data.status);
                            }
                    })


                }
            });

        },

        //选择文件--------
        handleFormatError (file) {

            this.$Modal.confirm({
                title:"系统提示!",
                content:"该文件格式不正确，仅支持txt、zip、doc、docx、xls、xlsx、pdf",

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
                this.search.docPath=res.item.path;
                this.$Message.info("上传成功");
            }else{
                // this.$Message.error(res.status);
            }
        }

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
