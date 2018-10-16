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
							<Form ref="loginForm" :model="form">

								<FormItem prop="userName">
									<Input v-model="form.userName" placeholder="请输入手机号">
									<span slot="prepend">
										<Icon :size="16" type="ios-person"></Icon>
									</span>

									</Input>
								</FormItem>

								<FormItem prop="password">
											<Input v-model="form.password" placeholder="请输入验证码">
												<span slot="prepend">
													<Icon :size="14" type="md-lock"></Icon>
												</span>
												<span slot="append"><Button type="primary">获取验证码</Button></span>
											</Input>
								</FormItem>

								<FormItem>
									<div class="login-rember">
										<span style="font-weight: 400">新用户完成注册，代表同意</span>
										<a href="/phone/agreement" target="_blank" style="color: #1E9FFF">《上海汽修平台用户协议》</a>
									</div>
								</FormItem>

								<FormItem>
									<Button type="primary" long >验证并登录</Button>
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
			return {
				form: {
					userName: '18100000001',
					password: '123456'
				},
				single: false

			}
		},
		methods: {
			handleSubmit(){
				// this.$axios.request({
				// 	url: '/user/useraccount/login',
				// 	method: 'post',
				// 	data: {
				// 		"code": "",
				// 		"loginaccount": "18100000001",
				// 		"systemToken": "",
				// 		"userpassword": "123456"
				// 	}
				// }).then(res => {
				// 	console.log(res);
				// 	if (res.success === true) {

				// 	}
				// })
				this.$axios.post('/user/useraccount/login', {
          "system":"pcqixiu",
          "loginaccount": this.form.userName,
          "userpassword": this.form.password

				}).then( (res) => {
					console.log(res)
          if(res.data.code==='0'){
            localStorage.setItem('ACCESSTOKEN', res.data.accessToken)
            localStorage.setItem('ACCESSMENU', JSON.stringify(res.data.menus))
            localStorage.setItem('USERINFO', JSON.stringify(res.data))
            this.$store.commit('user/setToken', res.data.accessToken)
            this.$store.commit('user/setMenu', res.data.menus)
            this.$store.commit('user/setUser', res.data)
            this.$router.push('/center/my-car-record')
          }
				})
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
