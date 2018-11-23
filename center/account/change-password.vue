<!--修改密码 2018-11-23-->
<template>
    <div style="height: 100%;overflow: auto;">
        <div style="max-width:300px;margin-top: 40px;">
            <Form ref="formData"  :model="formData" :label-width="120" class="common-form">
                <FormItem label="旧密码:" style="width: 350px;">
                    <Input type="password" v-model="formData.oldPassword" placeholder="请输入旧密码"></Input>
                </FormItem>
                <FormItem label="新密码:"style="width: 350px;">
                    <Input type="password" v-model="formData.newPassword" placeholder="请输入新密码"></Input>
                </FormItem>
                <FormItem label="确认新密码:"style="width: 350px;">
                    <Input type="password" v-model="formData.confirmPassword" placeholder="请输入确认新密码"></Input>
                </FormItem>
                <FormItem :label-width="0">
                    <Button type="primary" @click="updatePassword" long style="width: 100px; margin-left: 120px;" v-if="">确认修改</Button>
                </FormItem>
                
            </Form>
        </div>
        

    </div>
</template>
<script>
    import {  getUser, deepClone } from '@/static/util'
    import funMixin from '~/components/fun-auth-mixim.js'
	export default {
	name: "change-password",
    mixins: [funMixin],
        data () {
            return {
                formData: {
                    "confirmPassword": "",
                    "newPassword": "",
                    "oldPassword": ""
                },
                mobileFlag:true,//定时开关
				description:'获取验证码',
				time: 60,
				timing: null,
                userInfo:null,
            }
        },
        mounted () {
            
        },
        methods:{
            //获取短信验证码----
			updatePassword(){
					this.$axios.post('/user/update/password', {
						"confirmPassword": this.formData.confirmPassword,
                        "newPassword": this.formData.newPassword,
                        "oldPassword": this.formData.oldPassword,
					}).then( (res) => {
						console.log(res)
						if(res.data.code==='0'){
							this.$Message.info('修改成功');
                           
						}else{
                            // this.$Message.error(res.data.status);
                        }
						
					})
				
				
			},
            
			
        },
	}
</script>

<style scoped>

</style>
