<template>
    <div style="height: 100%;overflow: auto;">
        <div style="max-width:300px;margin-top: 40px;">
            <Form ref="formData" :rules="ruleUser"  :model="formData" :label-width="120" class="common-form">
                <FormItem label="用户账号:">
                    <Input type="text" v-model="formData.userAccount" placeholder="请输入用户账号" disabled></Input>
                </FormItem>
                <FormItem label="用户昵称:" prop="userName">
                    <Input type="text" v-model="formData.userName" placeholder="请输入昵称"></Input>
                </FormItem>
                <FormItem label="电子邮箱:" prop="userEmail">
                    <Input type="text" v-model="formData.userEmail" placeholder="请使用常用邮箱"></Input>
                </FormItem>
                <FormItem :label-width="0">
                    <Button type="primary" long style="width: 100px; margin-left: 120px;" @click="handleSubmit('formData')">确认修改</Button>
                </FormItem>
                
            </Form>
        </div>
        <Form  :label-width="120">
            <FormItem label="上传头像:">
                <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">添加图片</Button>
                        <span>(仅支持jpg、png、bmp)</span>
                </Upload>
                
            </FormItem>
        </Form>

    </div>
</template>
<script>
  
  import {  getUser } from '@/static/util'
	export default {
		name: "account-info",
        // layout: 'common',
        data () {
            return {
                formData: {
                    userAccount: '',
                    userName: '',
                    userEmail:''
                },
                ruleUser:{
                    userName:[
                        { required: true, message: '请填写信息', },
                    ],
                    userEmail: [
                        { required: true, message: '请填写信息', },
                        { type:'string',pattern:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message:'请输入正确的邮箱', trigger:'blur'}
                    ],
                },

                userInfo:null,
            }
        },
        mounted () {
            this.userInfo=getUser();
            console.log(this.userInfo);
            this.formData.userAccount=this.userInfo.mobileNo;
            this.formData.userName=this.userInfo.nickname;
            this.formData.userEmail=this.userInfo.email;
            
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
                            "nickname": this.formData.userName,
                        }).then( (res) => {
                            console.log(res)
                            if(res.data.code==='0'){
                                this.$Message.info('修改成功');

                                this.userInfo.mobileNo=this.formData.userAccount;
                                this.userInfo.nickname=this.formData.userName;
                                this.userInfo.email=this.formData.userEmail;

                                localStorage.setItem('USERINFO', JSON.stringify(this.userInfo))
                                this.$store.commit('user/setUser', this.userInfo)
                                
                            }else{
                                this.$Message.error(res.data.status);
                            }
                        })
                    
                
            },
        },
	}
</script>

<style scoped>

</style>