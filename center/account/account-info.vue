<!--  修改用户信息   -->
<template>
    <div style="height: 100%;overflow: auto;">
        <div style="margin-top: 40px;">
            <Form ref="formData" :rules="ruleUser"  :model="formData" :label-width="120" class="common-form">
                <FormItem label="用户账号:" style="width: 100%">
                    <Input type="text" v-model="formData.userAccount" placeholder="请输入用户账号" disabled style="width: 250px;"></Input>
                </FormItem>
                <FormItem label="用户昵称:" prop="userName" style="width: 100%">
                    <Input type="text" v-model="formData.userName" placeholder="请输入昵称" style="width: 250px;"></Input>
                </FormItem>
                <FormItem label="电子邮箱:" prop="userEmail" style="width: 100%">
                    <Input type="text" v-model="formData.userEmail" placeholder="请使用常用邮箱" style="width: 250px;"></Input>
                </FormItem>
                <FormItem :label-width="0" style="width: 100%">
                    <Button type="primary" long style="width: 100px; margin-left: 120px;" @click="handleSubmit('formData')" v-if="accessBtn('edit')">确认修改</Button>
                </FormItem>
                <FormItem label="头像:"   style="width: 100%">
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
                    :max-size="3072"
                    :on-exceeded-size="handleMaxSize"
                    :format="['PNG','JPG','JPEG','BMP']"
                    accept=".PNG, .JPG, .JPEG,.BMP"
                    :on-format-error="handleFormatError"
                    :before-upload="handleBeforeUpload"
                    :on-success="handleSuccess"
                    type="select"
                    action="/proxy/file/image/add"
                    v-if="accessBtn('uploadImage')"
                    >
                        <Button icon="ios-cloud-upload-outline">上传头像</Button>
                        <span>仅支持PNG、JPG、JPEG、BMP</span>
                    </Upload>
                </FormItem>
            </Form>
        </div>

    </div>
</template>
<script>

  import {  getUser, deepClone } from '@/static/util'
  import funMixin from '~/components/fun-auth-mixim.js'
	export default {
		name: "account-info",
        // layout: 'common',
        mixins: [funMixin],
        data () {
            return {
                formData: {
                    userAccount: '',
                    userName: '',
                    userEmail:''
                },
                listSearch:{
                    "photo": "",
                },
                ruleUser:{
                    userName:[
                        { required: true, message: '请填写信息', },
                    ],
                    userEmail: [
                        { required: true, message: '请填写信息', },
                        { type:'string',pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, message:'请输入正确的邮箱', trigger:'blur'}
                    ],
                },

                userInfo:null,
                token: {token: ''},
            }
        },
        mounted () {
            this.token.token = this.$store.state.user.token;
            this.userInfo=getUser();
            console.log(this.userInfo);
            this.formData.userAccount=this.userInfo.mobileNo;
            this.formData.userName=this.userInfo.nickname;
            this.formData.userEmail=this.userInfo.email;
            this.listSearch.photo=this.userInfo.photo;
        },
        methods: {
			//提交数据--------
			handleSubmit(name){
                 this.$refs[name].validate((valid) => {
                    if (valid) {
                            this.$Modal.confirm({
                                title:"系统提示!",
                                content:"确定要提交吗？",
                                onOk:this.saveData,

                            })
                    }
                });


			},
            saveData(){
                this.$axios.post('/user/update', {
                    "email": this.formData.userEmail,
                    "nickName": this.formData.userName,
                }).then( (res) => {
                    console.log(res)
                    if(res.data.code==='0'){
                        this.$Message.info('修改成功');

                        this.userInfo.mobileNo=this.formData.userAccount;
                        this.userInfo.nickname=this.formData.userName;
                        this.userInfo.email=this.formData.userEmail;

                        localStorage.setItem('USERINFO', JSON.stringify(this.userInfo))
                        this.$store.commit('user/setUser', deepClone(this.userInfo))

                    }else{
                        this.$Message.error(res.data.status);
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
            //选择文件--------
            handleFormatError (file) {

                this.$Modal.confirm({
                    title:"系统提示!",
                    content:"该文件格式不正确，仅支持PNG、JPG、JPEG、BMP",

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
                    // this.$Message.info("上传成功");
                    this.addPhoto();
                }else{
                    // this.$Message.error(res.status);
                }
            },
            handleMaxSize (file) {
                this.$Message.error('图片过大,最大3M!');
            },
            //增加头像------------
            addPhoto(){
                this.$axios.post('/user/photo', {
                    "url": this.listSearch.photo,

                }).then( (res) => {
                    console.log(res)
                    if(res.data.code==='0'){
                        this.$Message.info('上传成功');

                        this.userInfo.photo=this.listSearch.photo;
                        localStorage.setItem('USERINFO', JSON.stringify(this.userInfo))
                        console.log(this.userInfo)
                        this.$store.commit('user/setUser', deepClone(this.userInfo) )

                    }else{
                        this.$Message.error(res.data.status);
                    }
                })
            }
        }
	}
</script>

<style scoped lang="less">
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
