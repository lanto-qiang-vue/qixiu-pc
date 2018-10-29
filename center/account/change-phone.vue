<template>
    <div style="height: 100%;overflow: auto;">
        <div style="max-width:300px;margin-top: 40px;">
            <Form ref="formData"  :model="formData" :label-width="120" class="common-form">
                <FormItem label="原手机号码:" style="width: 300px;">
                    <Input type="text" v-model="formData.oldTelphone" placeholder="请输入手机号码" disabled></Input>
                </FormItem>
                <FormItem label="图形验证码:"style="width: 300px;">
                    <Input type="text" v-model="formData.userImg" placeholder="请输入图形验证码"></Input>
                </FormItem>
                <FormItem label="新手机号码:"style="width: 300px;">
                    <Input type="text" v-model="formData.newTelphone" placeholder="请输入手机号码"></Input>
                </FormItem>
                <FormItem label="手机验证码:"style="width: 393px;">
                    <Input v-model="formData.randCode" placeholder="请输入手机验证码">
                        <span slot="append"><Button  type="primary" @click='getCaptcha'>{{description}}</Button></span>
                    </Input>
                </FormItem>
                <FormItem label="登录密码:"style="width: 300px;">
                    <Input type="text" v-model="formData.userPass" placeholder="请输入登录密码"></Input>
                </FormItem>
                <FormItem :label-width="0">
                    <Button type="primary" long style="width: 100px; margin-left: 120px;">确认修改</Button>
                </FormItem>
                
            </Form>
        </div>
        

    </div>
</template>
<script>
	export default {
		name: "change-phone",
    // layout: 'common',
        data () {
            return {
                formData: {
                    oldTelphone: '18100000001',
                    randCode: '',
                    userImg:'',
                    newTelphone:'',
                    userPass:'',


                },
                mobileFlag:true,//定时开关
				description:'获取验证码',
				time: 60,
				timing: null,
            }
        },
        methods:{
            //获取短信验证码----
			getCaptcha(){
				this.$refs['formMobile'].validateField('userMobile');
				var pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if (!pattern.test(this.formMobile.userMobile)) {
					return false;
				}
				if(this.mobileFlag){
					this.$axios.post('/message/sms/sendsmscaptcha', {
						"businessType":"10",
						"mobileNo": this.formMobile.userMobile,
						"captcha": this.formMobile.captcha
						
					}).then( (res) => {
						console.log(res)
						if(res.data.code==='0'){
							this.timing = setInterval(this.decrTime, 1000);
							this.mobileFlag = false;
							this.$Modal.info({title:'系统提示!',content:"短信已发送,请及时查收"});
						}
						
					})
				}else{

				}
				
			},
        },
	}
</script>

<style scoped>

</style>