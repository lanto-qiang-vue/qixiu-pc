<template>

<div style="width:100%;height:100%;">
    <div class="login-content">
        <div class="login-wrap">
          <div class="login-con">

			<Card>
				<!--<p slot="title">

        </p>-->
				<Tabs value="name1">
					<TabPane label="手机验证登录" name="name1">
						<div class="login-con-in">


						<div class="form-con">
							<Form ref="formMobile" :rules="ruleValidate"  :model="formMobile">
								<FormItem prop="userMobile">
									<Input v-model="formMobile.userMobile" :maxlength="11" placeholder="请输入手机号">
									<span slot="prepend">
										<Icon :size="16" type="ios-person"></Icon>
									</span>

									</Input>
								</FormItem>
								<FormItem prop="captcha">
											<Input v-model="formMobile.captcha" placeholder="请输入验证码">
												<span slot="prepend">
													<Icon :size="14" type="md-lock"></Icon>
												</span>
												<span slot="append"><Button  type="primary" @click='getCaptcha'>{{description}}</Button></span>
											</Input>
								</FormItem>
								<FormItem>
									<div class="login-rember">
										<span style="font-weight: 400">新用户完成注册，代表同意</span>
										<a href="/phone/agreement" target="_blank" style="color: #1E9FFF">《上海汽修平台用户协议》</a>
									</div>
								</FormItem>
								<FormItem>
									<Button type="primary" long @click="handleCaptcha('formMobile')">验证并登录</Button>
								</FormItem>
							</Form>
						</div>
						</div>
					</TabPane>
					<TabPane label="账号密码登录" name="name2">
						<div class="login-con-in">
							<div class="form-con">
								<Form ref="loginForm" :model="form">
								<FormItem prop="userName">
									<Input v-model="form.userName" placeholder="请输入用户名">
									<span slot="prepend">
										<Icon :size="16" type="ios-person"></Icon>
										</span>
											</Input>
								</FormItem>
								<FormItem prop="password">
											<Input type="password" v-model="form.password" placeholder="请输入密码">
											<span slot="prepend">
										<Icon :size="14" type="md-lock"></Icon>
									</span>
									</Input>


								</FormItem>
								<FormItem>
									<div class="login-rember">
										<div class="login-rember-left">
											<Checkbox v-model="single">记住密码</Checkbox>
										</div>
										<div class="login-rember-right" title="请联系客服">
											<span>忘记密码?</span>
										</div>

									</div>
								</FormItem>
								<FormItem>
									<Button type="primary" long @click="handleSubmit">登录</Button>
								</FormItem>


								</Form>
							</div>
						</div>
					</TabPane>
				</Tabs>
				<div>
					<span>其他方式登录:</span>

					<img src="../assets/img/login_img/qq_logo.png" style="width: 20px;margin-right: 10px;cursor: pointer;">
					<img src="../assets/img/login_img/wx_logo.png" style="width: 28px;margin-right: 10px;cursor: pointer;">
					<img src="../assets/img/login_img/zhifu_logo.png" style="width: 25px;margin-right: 10px;cursor: pointer;">
				</div>
            </Card>

          </div>
      </div>
    </div>
  </div>


</template>

<script>
	export default {
		name: "login",
    	layout: 'common',
		data () {
			// 联系电话验证
            const validatePass = (rule, value, callback) => {
                var p1 = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
                var p2=/0\d{2,3}-\d{7,8}/;
                if (p2.test(value)||p1.test(value)||!value) {

                    callback();
                }else{

                    callback(new Error('请输入正确的号码'));
                }
            };
			return {
				form: {
					userName: '18400000001',
					password: '123456'
				},
				formMobile:{
					userMobile:'',
					captcha:'',
				},
				ruleValidate: {
					userMobile:[
						{ required: true, message: '请输入正确的号码', },
						{ validator: validatePass, trigger: 'blur'},
					],
					captcha: [
						{ required: true,  message: '请填写验证码',}
					],

				},//规则验证

				single: false,
				mobileFlag:true,//定时开关
				description:'获取验证码',
				time: 60,
				timing: null,

			}
		},
		methods: {
			//账号密码登录--------
			handleSubmit(){
				this.$axios.post('/user/useraccount/login', {
					"system":"pcqixiu",
					"loginaccount": this.form.userName,
					"userpassword": this.form.password,
					"mobile":'',

				}).then( (res) => {
					console.log(res)
					if(res.data.code==='0'){
						localStorage.setItem('ACCESSTOKEN', res.data.item.accessToken)
						// localStorage.setItem('ACCESSMENU', JSON.stringify(res.data.item.menus))
            // localStorage.setItem('ACCESSMENU',JSON.stringify([{
            //   "id": 701,
            //   "name": "运输管理",
            //   "uri": null,
            //   "leaf": false,
            //   "extInfo": null,
            //   "children": [{
            //     "id": 702,
            //     "name": "企业签到信息",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 1
            //   }, {
            //     "id": 703,
            //     "name": "管理部门登录信息",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 704,
            //     "name": "通知管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 705,
            //     "name": "通知审核",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 706,
            //     "name": "文件管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 707,
            //     "name": "根据维修企业查找",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 708,
            //     "name": "根据维修记录查找",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 709,
            //     "name": "维修企业信息管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 710,
            //     "name": "质量信誉考核管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 711,
            //     "name": "企业合格证使用信息管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }],
            //   "functions": [],
            //   "parentId": 0,
            //   "sortValue": 8
            // }]))
			// localStorage.setItem('ACCESSMENU',JSON.stringify([{
            //   "id": 501,
            //   "name": "车大夫管理",
            //   "uri": null,
            //   "leaf": false,
            //   "extInfo": null,
            //   "children": [{
            //     "id": 502,
            //     "name": "车大夫问题管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 1
            //   }],
            //   "functions": [],
            //   "parentId": 0,
            //   "sortValue": 8
            // }]))
			localStorage.setItem('ACCESSMENU',JSON.stringify([{
              "id": 401,
              "name": "车大夫管理",
              "uri": null,
              "leaf": false,
              "extInfo": null,
              "children": [{
                "id": 402,
                "name": "运输企业信息管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 403,
                "name": "运输车辆技术档案",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 404,
                "name": "车大夫管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 405,
                "name": "车大夫问题管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 406,
                "name": "车大夫回答管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 407,
                "name": "绑定车辆审核",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 408,
                "name": "维修企业信息管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 409,
                "name": "用户行为日志列表",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 410,
                "name": "为您服务管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              }],
              "functions": [],
              "parentId": 0,
              "sortValue": 8
            }]))
						localStorage.setItem('USERINFO', JSON.stringify(res.data.item))
						this.$store.commit('user/setToken', res.data.item.accessToken)
						// this.$store.commit('user/setMenu', res.data.item.menus)
            // this.$store.commit('user/setToken',[{
            //   "id": 701,
            //   "name": "运输管理",
            //   "uri": null,
            //   "leaf": false,
            //   "extInfo": null,
            //   "children": [{
            //     "id": 702,
            //     "name": "企业签到信息",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 1
            //   }, {
            //     "id": 703,
            //     "name": "管理部门登录信息",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 704,
            //     "name": "通知管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 705,
            //     "name": "通知审核",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 706,
            //     "name": "文件管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 707,
            //     "name": "根据维修企业查找",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 708,
            //     "name": "根据维修记录查找",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 709,
            //     "name": "维修企业信息管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 710,
            //     "name": "质量信誉考核管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }, {
            //     "id": 711,
            //     "name": "企业合格证使用信息管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 2
            //   }],
            //   "functions": [],
            //   "parentId": 0,
            //   "sortValue": 8
            // }]);
			// this.$store.commit('user/setToken',[{
            //   "id": 501,
            //   "name": "车大夫管理",
            //   "uri": null,
            //   "leaf": false,
            //   "extInfo": null,
            //   "children": [{
            //     "id": 502,
            //     "name": "车大夫问题管理",
            //     "uri": "/center/userInfo",
            //     "leaf": true,
            //     "extInfo": null,
            //     "children": [],
            //     "functions": [],
            //     "parentId": 0,
            //     "sortValue": 1
            //   }],
            //   "functions": [],
            //   "parentId": 0,
            //   "sortValue": 8
            // }]);
			this.$store.commit('user/setToken',[{
              "id": 401,
              "name": "车大夫管理",
              "uri": null,
              "leaf": false,
              "extInfo": null,
              "children": [{
                "id": 402,
                "name": "运输企业信息管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 403,
                "name": "运输车辆技术档案",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 404,
                "name": "车大夫管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 405,
                "name": "车大夫问题管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 406,
                "name": "车大夫回答管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 407,
                "name": "绑定车辆审核",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 408,
                "name": "维修企业信息管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 409,
                "name": "用户行为日志列表",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              },{
                "id": 410,
                "name": "为您服务管理",
                "uri": "/center/userInfo",
                "leaf": true,
                "extInfo": null,
                "children": [],
                "functions": [],
                "parentId": 0,
                "sortValue": 1
              }],
              "functions": [],
              "parentId": 0,
              "sortValue": 8
            }]);
						this.$store.commit('user/setUser', res.data.item)
						this.$router.push('/center/car-doctor-manage')
					}

					// this.$axios.get('/user/useraccount/getUserInfo/{'+res.data.menus[0]['id']+'}')
					// .then(function (response) {
					// 	console.log(response);
					// })

				})
			},
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
						}else{
							this.$Message.info(res.data.status)
						}

					})
				}else{

				}

			},
			handleCaptcha(name){
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.$axios.post('/user/useraccount/login', {
							"system": "pcqixiu",
							"loginaccount": '',
							"userpassword": '',
							"loginMethod":'手机',
							"captureCode": this.formMobile.captcha,
							"ip": "",
							"mobile": this.formMobile.userMobile,
							"openid": "",
						}).then( (res) => {
							console.log(res)
							if(res.data.code==='0'){
								localStorage.setItem('ACCESSTOKEN', res.data.item.accessToken)
								localStorage.setItem('ACCESSMENU', JSON.stringify(res.data.item.menus))
								localStorage.setItem('USERINFO', JSON.stringify(res.data.item))
								this.$store.commit('user/setToken', res.data.item.accessToken)
								this.$store.commit('user/setMenu', res.data.item.menus)
								this.$store.commit('user/setUser', res.data.item)
								this.$router.push('/center/my-car-record')
							}else{
								this.$Message.info(res.data.status)
							}
						})
					}
				});
			},
			//短信倒计时
			decrTime() {
				if (this.time > 0) {
					this.description = this.time - 1 + "s";
					this.time--;
				} else {
					clearInterval(this.timing);
					this.description = "获取验证码";
					this.time = 60;
					this.mobileFlag = true;
				}
			},

		}
	}
</script>

<style scoped lang="less">
.login-content{
	width: 100%;
	height: 600px;
	background: #055fe8;
	.login-wrap{
		width: 100%;
		height:600px;
		margin:0 auto;
		position: relative;
		.login-con{
			position: absolute;
			right: 10%;
			top: 50%;
			transform: translateY(-50%);
			width: 350px;

			.login-con-in{
				width: 300px;
				margin:0 auto;
				.form-con{
					padding: 10px 0 0;
				}
				.login-tip{
					font-size: 10px;
					text-align: center;
					color: #c3c3c3;
				}
				.login-rember{
					width: 100%;
					overflow: hidden;


					.login-rember-left{
						float: left;
					}
					.login-rember-right{
						float: right;
					}
				}
			}
		}
	}


}




</style>
<style lang="less">
  .login-content {
    .ivu-tabs-nav-scroll {
      text-align: center;
    }
    .ivu-tabs-nav {
      float: none;
      display: inline-block;
    }
	.ivu-card{

      font-size: 16px;

    }
  }
</style>
