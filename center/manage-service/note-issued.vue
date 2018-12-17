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

                <div v-for="item in newCheckList" >
                    <Checkbox  v-model="item.checked" @on-change="newTestChange" :label="item.name" :key="item.name">{{item.name}}</Checkbox>
                    <div v-if="item.types" v-show="item.checked">
                        <Checkbox v-for="item2 in item.types" v-model="item2.checked" @on-change="newTestChildren" :label="item2.name" :key="item2.name">{{item2.name}}</Checkbox>
                    </div>
                </div>
                

                <!--<CheckboxGroup v-model="checkAllGroup"  @on-change="checkAllGroupChange" >
                    <Checkbox v-for="item in checkList" :label="item.name" :key="item.name"></Checkbox>

                </CheckboxGroup>-->

            </FormItem>
            <!--<FormItem label="类别" style="width: 100%;">
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox :value="checkTypeAll" @on-change="handleCheckType">全选</Checkbox>
                </div>
                <CheckboxGroup v-model="checkRepairGroup"  @on-change="checkRepairGroupChange" >
                    <Checkbox v-for="item in checkRepair" :label="item.name" :key="item.name"></Checkbox>
                </CheckboxGroup>
                <CheckboxGroup v-model="checkTypeGroup"  @on-change="checkTypeGroupChange" >
                    <Checkbox v-for="item in checkmanage" :label="item.name" :key="item.name"></Checkbox>
                </CheckboxGroup>
            </FormItem>-->
            <FormItem label="发送对象" style="width: 450px;">
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
<Spin size="large" fix v-if="spinShow"></Spin>
        </div>
        <div slot="footer">
            <Button  @click="sendNotify('search')" size="large" type="success"  style="margin-right: 10px;" v-if="accessBtn('send')">发送</Button>
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
            checkAllGroup: [],

            checkAll: false,//发送人全选
            checkTypeAll:false,//类别全选

            newCheckList:[],

            checkList:[],
            checkRepairGroup:[],//类别数据选择--------
            checkTypeGroup: [],
            repairData:[],//维修企业数据------
            manageData:[],//管理部门数据-------------
            checkRepair:[],
            checkmanage:[],

            checkListName:[],//发送对象数据名称列表------
            repairDataName:[],//维修数据名称列表---------
            manageDataName:[],//管理数据名称列表----------
        }
    },
    watch:{
        
        showDetail(){

            this.showModal=true;
            this.token.token = this.$store.state.user.token,
            this.checkAll=false;
            this.checkTypeAll=false;

            this.checkAllGroup = [];
            this.checkRepair=[];
            this.checkmanage=[];
            this.checkTypeGroup=[];
                this.checkRepairGroup=[];

            this.getRole();
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
            console.log('dfsf',this.newCheckList);

            for(let i in this.newCheckList){
                if(this.newCheckList[i].checked){

                    this.newCheckList[i].full=true;
                }else{
                    this.newCheckList[i].full=false;
                }

                if(this.newCheckList[i].checked&&this.newCheckList[i].types){
                    // alert('寄哪里了')
                    for(let j in this.newCheckList[i].types){
                        this.newCheckList[i].types[j].checked=true;
                    }
                    this.newCheckList[i].full=true;
                }else if(!this.newCheckList[i].checked&&this.newCheckList[i].types){
                    for(let j in this.newCheckList[i].types){
                        this.newCheckList[i].types[j].checked=false;
                    }
                    this.newCheckList[i].full=false;
                }
            }
        },
        newTestChildren(){
            for(let i in this.newCheckList){
                if(this.newCheckList[i].types){
                    // alert('寄哪里了')
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
        },
        getNotify(){
            this.$axios.get('/message/notify/getNotify/'+this.detailData.id, {

                }).then( (res) => {
                  if(res.data.code=='0'){
                      var jsonContent=JSON.parse(res.data.item.content);
                    this.search.content=jsonContent.content;
                    this.search.title=res.data.item.title;


                  }else{
                    this.$Message.error(res.data.status);
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
            this.checkList=[];
            this.checkListName=[];
            this.repairData=[];
            this.repairDataName=[];
            this.manageData=[];
            this.manageDataName=[];
            this.spinShow=true;
            this.$axios.post('/message/notify/role/shanghai', {
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            let resData=res.data.items;
                            this.newCheckList=res.data.items;
                            // for(let i in resData){
                            //     this.checkList.push(resData[i]);
                            //     this.checkListName.push(resData[i].name);

                            //     if(resData[i].name=="维修企业"){
                            //         for(let j in resData[i].types){
                            //             this.repairData.push(resData[i].types[j]);
                            //             this.repairDataName.push(resData[i].types[j].name);
                            //         }


                            //     }else if(resData[i].name=="管理"){
                            //         for(let j in resData[i].types){
                            //             this.manageData.push(resData[i].types[j]);
                            //             this.manageDataName.push(resData[i].types[j].name);
                            //         }
                            //     }
                            // }
                            this.spinShow=false;
                        }else{
                            this.$Message.info(res.data.status)
                        }
                })
        },
        //提交数据
        sendNotify(name){
            let sendData={content:'',items:'',title:'',url:[],id:''};
            sendData["content"]=this.search["content"];
            sendData["title"]=this.search["title"];
            sendData["id"]=this.search["id"];
            sendData["url"].push(this.search["docPath"]);

            // let objTem=[];
            // console.log(this.checkAllGroup);
            // for(let i in this.checkAllGroup){

            // if(this.checkAllGroup[i]=="维修企业"){
            //         let objWX=this.checkList[this.checkListName.indexOf(this.checkAllGroup[i])];
            //         objWX.types=[];
            //         for(let j in this.checkRepairGroup){
            //             objWX.types.push(this.repairData[this.repairDataName.indexOf(this.checkRepairGroup[j])]);
            //         }
            //         objTem.push(objWX);
            //     }else if(this.checkAllGroup[i]=="管理部门"){
            //         let objBM=this.checkList[this.checkListName.indexOf(this.checkAllGroup[i])];
            //         objBM.types=[];

            //         for(let j in this.checkTypeGroup){
            //             objBM.types.push(this.manageData[this.manageDataName.indexOf(this.checkTypeGroup[j])]);
            //         }
            //         objTem.push(objBM);
            //     }else{
            //         let objOther=this.checkList[this.checkListName.indexOf(this.checkAllGroup[i])];
            //         objTem.push(objOther);
            //     }
            // }

            // for(let i in this.newCheckList){
            //     if(this.newCheckList[i].checked){
            //         let objWX=this.newCheckList[i];
            //         objWX.types=[];
            //         if(this.newCheckList[i].checked&&this.newCheckList[i].types){
            //             for(let j in this.newCheckList[i].types){
            //                 if(this.newCheckList[i].types[j].checked){
            //                     objWX.types.push(this.newCheckList[i].types[j]);
            //                 }
                            
            //             }
            //         }
                    
            //     }

            //     objTem.push(objBM);
                
            // }
            // sendData['items']=objTem;


            this.$refs[name].validate((valid) => {
                if (valid) {
                    let num=0, data=[], list= deepClone(this.newCheckList);
                    for(let i in list){
                        if(list[i].full){
                           list[i].types=[{id: 0}]
                           num++
                        }else{
                            if(list[i].types){
                                for(let j in list[i].types){
                                    if(!list[i].types[j].checked){
                                        list[i].types.splice(j,1);
                                    }
                                    
                                }
                            }
                            

                        }
                    }

                    if(num==list.length){
                        data=[{id: 0}];
                    }else{
                        data=list;
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

                    // if(this.checkAllGroup.length>0){
                    //     if(this.checkAllGroup.indexOf('维修企业')!=-1&&this.checkAllGroup.indexOf('管理部门')!=-1){
                    //         if(this.checkRepairGroup.length>0&&this.checkTypeGroup.length>0){
                    //             this.$axios.post('/message/notify/sendNotify', sendData).then( (res) => {
                    //                     if(res.data.code=='0'){
                    //                         this.$Message.info('提交成功')
                    //                         this.showModal=false;
                    //                     }else{
                    //                         this.$Message.info(res.data.status)
                    //                     }
                    //             })
                    //         }else{
                    //             this.$Message.error("请选择类别");
                    //         }
                    //     }else if(this.checkAllGroup.indexOf('维修企业')!=-1){
                    //         if(this.checkRepairGroup.length>0){
                    //             this.$axios.post('/message/notify/sendNotify', sendData).then( (res) => {
                    //                     if(res.data.code=='0'){
                    //                         this.$Message.info('提交成功')
                    //                         this.showModal=false;
                    //                     }else{
                    //                         this.$Message.info(res.data.status)
                    //                     }
                    //             })
                    //         }else{
                    //             this.$Message.error("请选择类别");
                    //         }
                    //     }else if(this.checkAllGroup.indexOf('管理部门')!=-1){
                    //         if(this.checkTypeGroup.length>0){
                    //             this.$axios.post('/message/notify/sendNotify', sendData).then( (res) => {
                    //                     if(res.data.code=='0'){
                    //                         this.$Message.info('提交成功')
                    //                         this.showModal=false;
                    //                     }else{
                    //                         this.$Message.info(res.data.status)
                    //                     }
                    //             })
                    //         }else{
                    //             this.$Message.error("请选择类别");
                    //         }
                    //     }else{
                    //         this.$axios.post('/message/notify/sendNotify', sendData).then( (res) => {
                    //                     if(res.data.code=='0'){
                    //                         this.$Message.info('提交成功')
                    //                         this.showModal=false;
                    //                     }else{
                    //                         this.$Message.info(res.data.status)
                    //                     }
                    //             })
                    //     }

                    // }else{
                    //     this.$Message.error("请选择发送对象");
                    // }

                }
            });

        },
        //选择发送对象-----------------------
        handleCheckAll (flag) {
            // this.checkAllGroup = [];
            //         this.checkRepair=[];
            //         this.checkmanage=[];
            //     if (flag) {
            //         for(let i in this.checkList){
            //             this.checkAllGroup.push(this.checkList[i]["name"]);
            //         }
            //         for(let i in this.repairData){
            //             this.checkRepair.push(this.repairData[i]);
            //         }
            //         for(let i in this.manageData){
            //             this.checkmanage.push(this.manageData[i]);
            //         }
            //         this.checkAll = true;
            //     } else {
            //         this.checkAllGroup = [];
            //         this.checkRepair=[];
            //         this.checkmanage=[];
            //         this.checkAll = false;
            //     }


            //      console.log(flag,this.checkAllGroup);
                if (flag) {
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
                    
                    this.checkAll = true;
                }else {
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
                    this.checkAll = false;
                }

        },
        checkAllGroupChange (data) {
            if(data.indexOf('维修企业')!=-1){
                this.checkRepair=[];
                for(let i in this.repairData){
                    this.checkRepair.push(this.repairData[i]);
                }
            }else{
                this.checkRepair=[];
            }

            if(data.indexOf('管理部门')!=-1){
                this.checkmanage=[];
                for(let i in this.manageData){
                    this.checkmanage.push(this.manageData[i]);
                }

            }else{
                this.checkmanage=[];
            }

            if (data.length === this.checkList.length) {
                this.checkAll = true;
            }else {
                this.checkAll = false;
            }
            console.log(this.checkAll);

        },

        //选择发送类型--------------------
        handleCheckType (flag) {
            this.checkTypeGroup=[];
                this.checkRepairGroup=[];
            if (flag) {
                for(let i in this.manageData){
                    this.checkTypeGroup.push(this.manageData[i]["name"]);
                }
                for(let i in this.repairData){
                    this.checkRepairGroup.push(this.repairData[i]["name"]);
                }
                this.checkTypeAll = true;
            } else {
                this.checkTypeGroup=[];
                this.checkRepairGroup=[];
                this.checkTypeAll = false;
            }
        },
        checkRepairGroupChange (data) {
            console.log("选择的数据",data);

            if (data.length === this.repairData.length&&this.checkTypeGroup.length===this.manageData.length) {
                this.checkTypeAll = true;
            }else {
                this.checkTypeAll = false;
            }
        },
        checkTypeGroupChange (data) {
            console.log("选择的数据",data);

            if (data.length === this.manageData.length&&this.checkRepairGroup.length===this.repairData.length) {
                this.checkTypeAll = true;
            }else {
                this.checkTypeAll = false;
            }
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
                this.$Message.error(res.status);
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

.check-block{
        display: inline-block;
    vertical-align: top;

}
</style>
