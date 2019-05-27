<!--通知发布！！！！！ -->

<template>

<Modal
    v-model="showModal"
    title="通知发布"
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
            <FormItem label="通知标题:" style="width: 100%;" prop="title">
                <Input type="text" v-model="search.title" placeholder=""></Input>
            </FormItem>
            <FormItem label="通知内容:" style="width: 100%;" prop="content">
                <Input type="textarea" :rows="6" v-model="search.content" placeholder=""></Input>
            </FormItem>
            <FormItem label="发送对象" style="width: 100%;">
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox :value="checkAll" @on-change="handleCheckAll">全选</Checkbox>
                </div>

                <div v-for="(item,index1) in newCheckList" >
                    <Checkbox  v-model="item.checked" @on-change="newTestChange" :label="item.name" :key="index1">{{item.name}}</Checkbox>
                    <div v-if="item.types" v-show="item.checked">
                        <Checkbox v-for="(item2,index) in item.types" v-model="item2.checked" @on-change="newTestChildren" :label="item2.name" :key="index">{{item2.name}}</Checkbox>
                    </div>
                </div>
            </FormItem>

            <FormItem label="发送对象" style="width: 450px;">
                <Upload
                ref="upload"
                :headers="token"
                :format="['txt','zip','doc','docx','xls','xlsx','pdf']"
                accept=".txt, .zip, .doc,.docx,.xls,.xlsx,.pdf"
                :on-format-error="handleFormatError"
                :on-remove="handleRemove"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                :max-size="3072"
                :on-exceeded-size="handleMaxSize"
                multiple
                type="select"
                action="/proxy/file/add"

                >
                    <Button icon="ios-cloud-upload-outline">添加附件</Button>
                    <span>（仅支持txt、zip、doc、docx、xls、xlsx、pdf）</span>
                </Upload>
            </FormItem>
        </Form>
<Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div slot="footer">
            <Button  @click="sendNotify('search')" size="large" type="success"  v-if="accessBtn('send')">发送</Button>
            <Button  size="large" type="default" style="margin-right: 10px;" @click="showModal=false;">返回</Button>
        </div>

  </Modal>

</template>

<script>
import funMixin from '~/components/fun-auth-mixim.js'
  import {   deepClone } from '@/static/util'
export default {
	name: "note-issued",
    props:['showDetail', 'detailData'],
    mixins: [funMixin],
    data(){
        return{
            spinShow:false,
            showModal:false,
            showCaptcha:false,
            search:{
                "content":"",
                "title":"",
                "docPath":'',
                id:'',
                fileIds:[]
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
            checkAll: false,//发送人全选
            newCheckList:[],
            temFile:[]
        }
    },
    watch:{
        
        showDetail(){
            this.showModal=true;
            this.token.token = this.$store.state.user.token,
            this.checkAll=false;
            this.temFile=[];
            this.getRole();
            this.$refs.upload.fileList=[];
            if(this.detailData){
                this.getNotify();
                this.search.id=this.detailData.id;
            }else{
                this.search.id='';
            }
            // this.sendNotify();
        },
    },
    mounted () {

    },
    methods:{
        newTestChange(){
            for(let i in this.newCheckList){
                if(this.newCheckList[i].checked&&this.newCheckList[i].types){
                    let tem=this.newCheckList[i];
                    for(let j in tem.types){
                        tem.types[j].checked=true;
                    }
                    tem.full=true;
                    this.newCheckList.splice(i,1,tem);
                }else if(!this.newCheckList[i].checked&&this.newCheckList[i].types){
                    let tem=this.newCheckList[i];
                    for(let j in tem.types){
                        tem.types[j].checked=false;
                    }
                    tem.full=false;

                    this.newCheckList.splice(i,1,tem);
                }
            }

            // console.log('list1111',this.newCheckList);
        },
        newTestChildren(){
            for(let i in this.newCheckList){
                if(this.newCheckList[i].types.length>0){
                    let num=0;
                    for(let j in this.newCheckList[i].types){
                
                        if(this.newCheckList[i].types[j].checked){
                            num++;
                        }
                    }
                    if(num==0){
                        this.newCheckList[i].checked=false;
                    }
                    if(num==this.newCheckList[i].types.length){
                        this.newCheckList[i].full=true;
                    }else{
                        this.newCheckList[i].full=false;
                    }
                }
            }
            // console.log('222222',this.newCheckList);
        },
        getNotify(){
            this.$axios.get('/message/notify/getNotify/'+this.detailData.id, {

                }).then( (res) => {
                  if(res.data.code=='0'){
                    this.search=res.data.item;
                  }
			})


        },
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
        //获取发送对象数据------
        getRole(){
            this.newCheckList=[];
            this.spinShow=true;
            this.$axios.post('/message/notify/role/shanghai', {
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            for(let i in res.data.items){
                                this.newCheckList.push(res.data.items[i]);
                            }
                            
                            this.spinShow=false;
                        }
                })
        },
        //提交数据
        sendNotify(name){
            let sendData={content:'',items:'',title:'',url:'',id:'',fileIds:[]};
            sendData["content"]=this.search["content"];
            sendData["title"]=this.search["title"];
            sendData["id"]=this.search["id"];
            let fileArr=this.$refs.upload.fileList;
            for(let i in fileArr){
                if(fileArr[i].response.code=='0'){
                    sendData["fileIds"].push(fileArr[i].response.item.id);
                }
                
            }
            
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let num=0, data=[], list= deepClone(this.newCheckList);

                    // console.log('list1111',list);
                    for(let i in list){
                        if(list[i].full){
                           list[i].types=[{id: 0}]
                           num++
                        }else if(!list[i].full&&list[i].types){
                                // console.log(list[i].code,!list[i].full&&list[i].types);
                                let newTypes=[];
                                for(let j in list[i].types){
                                    
                                    if(list[i].types[j].checked){
                                        
                                        newTypes.push(list[i].types[j]);
                                    }
                                    
                                }

                                if(newTypes.length==0){
                                    list[i]=null;
                                }else{
                                    list[i].types=newTypes;
                                }
                            
                        }else{
                            list.splice(i,1,null);
                        }
                    }


                    if(num==list.length){
                        data=[{id: 0}];
                    }else{
                        for(let i in list){
                            if(list[i]){
                                data.push(list[i]);
                            }
                        }
                        
                    }

                    if(!data.length){
                        this.$Message.error("请选择发送对象");
                        return;
                    }

                    sendData['items']=data;

                    this.$axios.post('/message/notify/sendNotify', sendData).then( (res) => {
                            if(res.data.code=='0'){
                                this.$Message.info('提交成功')
                                this.showModal=false;
                            }else{
                                this.$Message.info(res.data.status)
                            }
                    })

                }
            });

        },
        //选择发送对象-----------------------
        handleCheckAll (flag) {
                if (flag) {
                    this.checkAll = true;
                    for(let i in this.newCheckList){
                        this.newCheckList[i].checked=true;
                         this.newCheckList[i].full=true;
                        if(this.newCheckList[i].checked&&this.newCheckList[i].types){
                            // alert('寄哪里了')
                            for(let j in this.newCheckList[i].types){
                                this.newCheckList[i].types[j].checked=true;
                            }
                        }
                    }
                }else {
                    this.checkAll = false;
                   for(let i in this.newCheckList){
                        this.newCheckList[i].checked=false;
                         this.newCheckList[i].full=false;
                        if(!this.newCheckList[i].checked&&this.newCheckList[i].types){
                            // alert('寄哪里了')
                            for(let j in this.newCheckList[i].types){
                                this.newCheckList[i].types[j].checked=false;
                            }
                        }
                    }
                }
        },
        //选择文件--------
        handleFormatError (file) {
            this.$Modal.confirm({
                title:"系统提示!",
                content:"该文件格式不正确，仅支持txt、zip、doc、docx、xls、xlsx、pdf",

            })
        },
        handleMaxSize (file) {
            this.$Message.error('上传文件过大,大小不超过3M!');
        },
        handleRemove(file, fileList){
            console.log(file, fileList);
            this.deleteFile(file.response.item.id);
        },
        handleBeforeUpload (file, fileList) {
            // let fileList = this.$refs.upload.fileList;

            
            
            return true;
        },
        handleSuccess(res,file,fileList){
            
            if(res.code=="0"){
                this.$Message.info("上传成功");
                this.temFile.push(file)
            }else{
                this.$Message.error(res.status);
                this.$refs.upload.fileList=deepClone(this.temFile);
            }
        },
        deleteFile(id){
            this.$axios.delete('/file/'+id).then( (res) => {})
        }

    },
}
</script>

<style scoped lang="less">
</style>
