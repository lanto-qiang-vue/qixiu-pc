<template>

<div style="width:100%;height:100%;">
    <div class="login-content">
        <div class="login-wrap">
          <div class="login-con">

			<Card>
				<Tabs value="name1">
					<TabPane label="手机注册登录" name="name1">
						<div class="login-con-in">


						<div class="form-con">

							<Form ref="phone" :rules="rulePhone"  :model="formPhone"  @keydown.enter.native="toLogin('phone')">
								<FormItem prop="userMobile">
									<Input v-model="formPhone.userMobile" :maxlength="11" placeholder="请输入手机号">
                    <span slot="prepend">
                      <Icon :size="16" type="ios-person"></Icon>
                    </span>
									</Input>
								</FormItem>
								<FormItem prop="captcha">
											<Input v-model="formPhone.captcha" placeholder="请输入验证码">
												<span slot="prepend">
													<Icon :size="14" type="md-lock"></Icon>
												</span>
												<span slot="append"><Button  type="primary" @click='getCaptcha(false)'>
                          {{description}}</Button></span>
											</Input>
								</FormItem>
								<FormItem>
									<div class="login-rember">
										<span style="font-weight: 400">新用户完成注册，代表同意</span>
										<a href="/phone/agreement" target="_blank" style="color: #1E9FFF">《上海汽修平台用户协议》</a>
									</div>
								</FormItem>
								<FormItem>
									<Button type="primary" long @click="toLogin('phone')">验证并登录</Button>
								</FormItem>
							</Form>
						</div>
						</div>
					</TabPane>
					<TabPane label="账号密码登录" name="name2">
						<div class="login-con-in">
							<div class="form-con">

								<Form ref="pass" :model="formPass" @keydown.enter.native="toLogin('pass')">
								<FormItem prop="userName">
									<Input v-model="formPass.userName" placeholder="请输入用户名">
									  <span slot="prepend">
										  <Icon :size="16" type="ios-person"></Icon>
										</span>
                  </Input>
								</FormItem>
								<FormItem prop="password">
                  <Input type="password" v-model="formPass.password" placeholder="请输入密码">
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
									<Button type="primary" long @click="toLogin('pass')">登录</Button>
								</FormItem>


								</Form>
							</div>
						</div>
					</TabPane>
				</Tabs>
				<div>
					<span>其他方式登录:</span>

					<img src="../assets/img/login_img/qq_logo.png" @click="uniteLogin('qq')" style="width: 20px;margin-right: 10px;cursor: pointer;">
					<img src="../assets/img/login_img/wx_logo.png" @click="uniteLogin('wx')" style="width: 28px;margin-right: 10px;cursor: pointer;">
					<img src="../assets/img/login_img/zhifu_logo.png" @click="uniteLogin('zfb')" style="width: 25px;margin-right: 10px;cursor: pointer;">
				</div>
            </Card>

          </div>
      </div>
    </div>

  <Modal
    v-model="showBind"
    title="请绑定手机号"
    width="350px"
    @on-visible-change=""
    :footer-hide="true"
    class=""
    :mask-closable="false"
  >
    <div class="login-con-in">


      <div class="form-con">
        <Form ref="bind" :rules="rulePhone"  :model="formBind">
          <FormItem prop="userMobile">
            <Input v-model="formBind.userMobile" :maxlength="11" placeholder="请输入手机号">
            <span slot="prepend">
										<Icon :size="16" type="ios-person"></Icon>
									</span>

            </Input>
          </FormItem>
          <FormItem prop="captcha">
            <Input v-model="formBind.captcha" placeholder="请输入验证码">
            <span slot="prepend">
													<Icon :size="14" type="md-lock"></Icon>
												</span>
            <span slot="append"><Button  type="primary" @click='getCaptcha(true)'>{{description}}</Button></span>
            </Input>
          </FormItem>
          <FormItem>
            <div class="login-rember">
              <span style="font-weight: 400">新用户完成注册，代表同意</span>
              <a href="/phone/agreement" target="_blank" style="color: #1E9FFF">《上海汽修平台用户协议》</a>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="toLogin(bindParam.type, bindParam.openId, true)">绑定并登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </Modal>
</div>


</template>

<script>
  import config from '../config.js'
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
				formPass: {
					userName: '18700000001',
					password: '123456'
				},
				formPhone:{
					userMobile:'',
					captcha:'',
				},
        formBind:{
          userMobile:'',
          captcha:'',
        },
				rulePhone: {
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

        showBind:false,
        bindParam:{
          type: '',
          openId: ''
        }
			}
		},
    mounted(){
		  // console.log('this',this)
      if(this.$route.query.redirect) this.$Message.info('请登录')
      this.getOpenId()
      console.log('config.apiUrl=', config.apiUrl)
    },
		methods: {
			//获取短信验证码----
			getCaptcha(isBind){
				this.$refs[isBind?'bind':'phone'].validateField('userMobile');
				var pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if (!pattern.test(this[isBind?'formBind':'formPhone'].userMobile)) {
					return false;
				}
				if(this.mobileFlag){
					this.$axios.post('/message/sms/sendsmscaptcha', {
						"businessType":"10",
						"mobileNo": this[isBind?'formBind':'formPhone'].userMobile,
						"captcha": this[isBind?'formBind':'formPhone'].captcha
					}).then( (res) => {
						console.log(res)
						if(res.data.code==='0'){
							this.timing = setInterval(this.decrTime, 1000);
							this.mobileFlag = false;
              this.$Message.success('短信发送成功')
						}else{
							// this.$Message.error(res.data.status)
						}
					})
				}else{

				}

			},
      toLogin(type, openId, toBind){
			  let param= {}
        switch (type){
          case 'phone':{
            param={
              "system": "pcqixiu",
              "loginMethod":'手机',
              "captureCode": this.formPhone.captcha,
              "mobile": this.formPhone.userMobile,
            }
            this.$refs.phone.validate((valid) => {
              if (valid) {
                this.toRequest(param)
              }
            })
            return
          }
          case 'pass':{
            param={
              "loginaccount": this.formPass.userName,
              "userpassword": this.formPass.password,
            }
            break
          }
          case 'qq':{
            param={
              "loginMethod": "QQ",
              "openid": openId,
            }
            break
          }
          case 'wx':{
            param={
              "loginMethod": "微信",
              "openid": openId,
            }
            break
          }
          case 'zfb':{
            param={
              "loginMethod": "支付宝",
              "openid": openId,
            }
            break
          }
        }
        param.system= "pcqixiu"
        if(toBind){
          param.captureCode= this.formBind.captcha
          param.mobile= this.formBind.userMobile
          this.$refs.bind.validate((valid) => {
            if (valid) {
              this.toRequest(param)
            }
          })
        }else{
          this.toRequest(param)
        }
      },
      toRequest(param){
        this.$axios.post('/user/useraccount/login', param).then( (res) => {
          if(res.data.code==='0'){
            this.showBind=false
            localStorage.setItem('ACCESSTOKEN', res.data.item.accessToken)
            localStorage.setItem('ACCESSMENU', JSON.stringify(res.data.item.menus))
            localStorage.setItem('USERINFO', JSON.stringify(res.data.item))
            this.$store.commit('user/setToken', res.data.item.accessToken)
            this.$store.commit('user/setMenu', res.data.item.menus)
            this.$store.commit('user/setUser', res.data.item)
            this.redirect()
          }else if(res.data.code==='141010'){
            this.showBind= true
          }
        })
      },
      redirect(){
        if(this.$route.query.redirect){
          this.$router.replace({
            path: this.$route.query.redirect
          })
        }else{
          this.$router.push({path: '/'})
        }
        this.$Message.success('登录成功')
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

			handleFun(name){
				if(name=="tel"){

					this.handleCaptcha('formMobile');
				}else if(name=="tenant"){
					this.handleSubmit();
				}
			},
      uniteLogin(type){
			  let url='', location= encodeURIComponent(window.location.href)
			  switch (type){
          case 'qq':{
            url= 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101467137&redirect_uri='+
              location+'&state=qq'
            break
          }
          case 'wx':{
            url= 'https://open.weixin.qq.com/connect/qrconnect?appid=wx9ae88a5a9e1b4cd1&redirect_uri='+ location+'&response_type=code&scope=snsapi_login&state=wx#wechat_redirect'
            break
          }
          case 'zfb':{
            url= 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2018042002584289&scope=auth_user&redirect_uri='+location+'&state=zfb'
            break

          }
        }
        window.location.href= url
      },
      getOpenId(){
        let state= this.$route.query.state, href= window.location.origin + window.location.pathname
        let param={
          redirectUri: encodeURIComponent(href),
        }
        if(state){
          param.code= this.$route.query.code
          switch (state){
            case 'qq':{
              param.platform= 'QQ'
              param.state= 'qq'
              break
            }
            case 'wx':{
              param.platform= 'WX'
              param.state= 'wx'
              break
            }
            case 'zfb':{
              param.platform= 'ALI'
              param.state= 'ali'
              break
            }
          }
          this.$axios.$post('/user/useraccount/access/openid', param).then( (res) => {
            if(res.code==='0'){
              this.bindParam.type= state
              this.bindParam.openId= res.item.openId
              this.toLogin(state, res.item.openId)
            }
          })
          history.replaceState(null, null, window.location.origin + window.location.pathname)
        }
      }
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
