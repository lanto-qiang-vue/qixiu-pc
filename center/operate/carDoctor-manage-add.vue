<!--车大夫管理增加弹出层  2018-11-02  -->
<template>
<Modal
    v-model="showModal"
    title="车大夫添加"
    width="90"
    @on-visible-change="visibleChange"
    :scrollable="true"
    :transfer= "true"
    :footer-hide="false"
    :mask-closable="false"
    class="table-modal-detail"
    :transition-names="['', '']">
    <div style="height: 100%;overflow: auto;">
        <Form ref="listSearch" :rules="ruleValidate"  :model="listSearch" :label-width="120" class="common-form">
            <FormItem label="姓名:" style="width: 45%;" prop="name">
                <Input type="text" v-model="listSearch.name" placeholder="请输入姓名"></Input>
            </FormItem>
            <FormItem label="性别:" style="width: 45%;" prop="sex">
                <RadioGroup v-model="listSearch.sex">
                    <Radio label="男"></Radio>
                    <Radio label="女"></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="身份证号:" style="width: 45%;">
                <Input v-model="listSearch.idNum" type="text" placeholder="请输入身份证号" />
            </FormItem>
            <FormItem label="手机号:" style="width: 45%;">
                <Input type="text" v-model="listSearch.telPhone" placeholder="请输入手机号码"></Input>
            </FormItem>
            <FormItem label="出生日期:" style="width: 45%;">
                <DatePicker type="date" placeholder="请选择" style="width: 100%;" v-model="listSearch.birthDate"></DatePicker>
            </FormItem>
            <FormItem label="学历:" style="width: 45%;">
                <Select v-model="listSearch.degree">
                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.codeDesc }}</Option>
                </Select>
            </FormItem>
            <FormItem label="籍贯:" style="width: 45%;">
                <Input type="text"  v-model="listSearch.nativePlace" placeholder="请输入籍贯"></Input>
            </FormItem>
            <FormItem label="就职企业:" style="width: 45%;" prop="empUnit">
                <Input type="text"  v-model="listSearch.empUnit" placeholder="请输入就职企业"></Input>
            </FormItem>
            <FormItem label="职称:" style="width: 45%;" prop="professor">
                <Input type="text" v-model="listSearch.professor" placeholder="请输入职称"></Input>
            </FormItem>
            <FormItem label="荣誉:" style="width: 92%;">
                <Input type="textarea" :rows="4" v-model="listSearch.honor" placeholder=""></Input>
            </FormItem>
            <FormItem label="擅长:" style="width: 92%;">
                <Input type="textarea" :rows="4"  v-model="listSearch.goodAt" placeholder=""></Input>
            </FormItem>
            <FormItem label="头像:" style="width: 80%;" prop="photo">
                <Card class="pic-card" >
                    <div class="pic-body">
                        <img  class="pic" :src="listSearch.photo"
                            @click="showImg(listSearch.photo)"/>
                    </div>
                </Card>
                
                <Upload 
                ref="upload"
                :show-upload-list="false"
                :headers="token"
                :format="['PNG','JPG','JPEG','BMP']"
                accept=".PNG, .JPG, .JPEG,.BMP"
                :on-format-error="handleFormatError"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                type="select"
                action="http://192.168.169.190:8888/file/image/add"
                >
                    <Button icon="ios-cloud-upload-outline">上传头像</Button>
                    <span>仅支持PNG、JPG、JPEG、BMP</span>
                </Upload>
            </FormItem>
            
        </Form>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div slot="footer">
        <Button size="large" type="primary" @click="saveFun('listSearch')">提交</Button>
        <Button  size="large" type="default" @click="showModal=false;">返回</Button>
    </div>
  </Modal>
</template>

<script>
import {  imgToBase64,getName } from '@/static/util.js'
  import { formatDate } from '@/static/tools'
export default {
	name: "carDoctor-manage-add",
    props:['showDetail', 'detailData'],
    data(){
		return{
            loadImg:false,
            spinShow:false,
            showModal:false,
            collapse: '1',
            listSearch:{
                "birthDate": "",
                "degree": "",
                "empUnit": "",
                "goodAt": "",
                "honor": "",
                "idNum": "",
                "name": "",
                "nativePlace": "",
                "photo": "",
                "professor": "",
                "sex": "",
                "telPhone": ""
            },
            answerDetail:{
                answerdata:'',
            },
            //规则验证-------
            ruleValidate: {
                name: [
                    { required: true,  message: '必填',  }
                ],
                sex: [
                    { required: true,  message: '必填', },
                    
                ],
                empUnit: [
                    { required: true,  message: '必填',  }
                ],
                professor: [
                    { required: true,  message: '必填', }
                ],
                photo: [
                    { required: true,  message: '必填',  }
                ],
                
            
            },
            typeList:[],//学历类别数据------
            infoDriverData:{
                imageData:'',
            },
            token: {token: ''},
            sexType:[
                {code:"男",name:"10031001"},
                {code:"女",name:"10031002"},
            ],
            editFlag:false,
        }
    },
    watch:{
        showDetail(){
            this.showModal=true;
            this.token.token = this.$store.state.user.token;
            for(let i in this.listSearch){
                this.listSearch[i]='';
            }
            this.editFlag=false;
            this.getType();


            if(this.detailData){
                this.getDetail();
                this.editFlag=true;
            }
        },
    },
    methods:{
        //获取详情
        getDetail(){
            this.spinShow=true;
            this.$axios.post('/expert/detail/'+this.detailData.id,{
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.spinShow=false;
                    this.listSearch=res.data.item;

                    // this.listSearch['birthDate']='';

                    if(this.listSearch['sex']=='10031001'){
                        this.listSearch['sex']='男';
                    }else if(this.listSearch['sex']=='10031002'){
                        this.listSearch['sex']='女';
                    }

                }else{
                    this.$Message.error(res.data.status);
                }
            })
        },
        getType(){
            this.$axios.post('/category/list/1036', {
            }).then( (res) => {
                if(res.data.code=='0'){
                    this.typeList=res.data.items;
                }
           })
        },
        showImg(img){
            this.$Modal.info({
            width: 50,
            title: '查看',
            closable: true,
            content: '<img src="'+img+'" style="width: 100%"/>'
            })
        },
        
        //提交回答------
        saveFun(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                        this.$Modal.confirm({
                            title:"系统提示!",
                            content:"确定要提交吗？",
                            onOk:this.saveAdd,
                        })
                }
            });
        },
        saveAdd(){
            if(this.editFlag){
                this.$axios.post('/expert/update',{
                            "birthDate": formatDate(this.listSearch.birthDate),
                            "degree": this.listSearch.degree,
                            "empUnit": this.listSearch.empUnit,
                            "goodAt": this.listSearch.goodAt,
                            "honor": this.listSearch.honor,
                            "idNum": this.listSearch.idNum,
                            "name": this.listSearch.name,
                            "nativePlace": this.listSearch.nativePlace,
                            "photo": this.listSearch.photo,
                            "professor": this.listSearch.professor,
                            "sex": getName(this.sexType,this.listSearch.sex)||'',

                            "telPhone": this.listSearch.telPhone,
                            expertId:this.listSearch.id,
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.$Message.info('提交成功');
                            this.showModal=false;
                        }else{
                            this.$Message.error(res.data.status);
                        }
                })
            }else{
                
                this.$axios.post('/expert/add',{
                            "birthDate": formatDate(this.listSearch.birthDate),
                            "degree": this.listSearch.degree,
                            "empUnit": this.listSearch.empUnit,
                            "goodAt": this.listSearch.goodAt,
                            "honor": this.listSearch.honor,
                            "idNum": this.listSearch.idNum,
                            "name": this.listSearch.name,
                            "nativePlace": this.listSearch.nativePlace,
                            "photo": this.listSearch.photo,
                            "professor": this.listSearch.professor,
                            "sex": getName(this.sexType,this.listSearch.sex)||'',

                            "telPhone": this.listSearch.telPhone,
                    }).then( (res) => {
                        if(res.data.code=='0'){
                            this.$Message.info('提交成功');
                            this.showModal=false;
                        }else{
                            this.$Message.error(res.data.status);
                        }
                })
            }
            
        },
        
        visibleChange(status){
          if(status === false){
            this.$emit('closeDetail');
            this.$refs['listSearch'].resetFields();
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
                this.listSearch.photo=res.item.path;
                this.$Message.info("上传成功");
            }else{
                this.$Message.error(res.status);
            }
        }
    },
}
</script>

<style scoped lang="less">
.content-list{
    width: 100%;
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    img{
        width:40px;
        height:40px;
        border:1px solid #ccc;
        float: left;
    }
    h3{
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 10px;
    }
    span{
        float: right;
    }
    
}
.content-p{
    padding-left: 55px;
}
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

  .pic-card{
      display: inline-block;
      margin: 0 10px 10px 0;
      width: 200px;
      min-width: 200px;
      
      .red{
        color: red;
      }
      .pic-body{
        width: 100%;
        height: 150px;
        /*border: 1px solid #dcdee2;*/
        position: relative;
        .no-pic{
          width: 250px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
        }
        .pic{
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50% , -50%);
          cursor: pointer;
        }
        .button{
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
          > *{
            margin: 0 5px;
            vertical-align: top;
          }
          .up-img{
            display: inline-block;
            overflow: hidden;
            position: relative;
            .input{
              width: 100%;
              height: 100%;
              position: absolute;
              left: 0;
              top: 0;
              opacity: 0;
              font-size: 0;
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
