<template>
<basic-container>
<div class="login-page">
  <div class="login-box">
    <Card>
      <Tabs value="name1">
        <TabPane label="验证码登录" name="name1">
          <Form ref="phone" :rules="rulePhone"  :model="formPhone"  @keydown.enter.native="toLogin('phone')">
            <FormItem prop="userMobile">
              <Input v-model="formPhone.userMobile" :maxlength="11" size="large" placeholder="请输入手机号">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="captcha">
                  <Input v-model="formPhone.captcha" placeholder="请输入验证码" size="large">
                    <span slot="prepend">
                      <Icon :size="14" type="md-lock"></Icon>
                    </span>
                    <span slot="append"><Button  type="primary" @click='getCaptcha(false)'>
                      {{description}}</Button></span>
                  </Input>
            </FormItem>
            <FormItem style="margin-bottom: 10px">
              <Button type="primary" long size="large" @click="toLogin('phone')">验证并登录</Button>
            </FormItem>
            <div class="deal">
              <p>新用户完成注册，代表同意</p>
              <a href="/article/protocol" target="_blank">《上海汽修平台用户协议》</a>
            </div>
            </Form>
        </TabPane>
        <TabPane label="密码登录" name="name2">
          <Form ref="pass" :model="formPass" @keydown.enter.native="toLogin('pass')">
            <FormItem prop="userName">
              <Input v-model="formPass.userName" size="large" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="formPass.password" size="large" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem style="margin-bottom: 10px">
              <Button type="primary" long size="large" @click="toLogin('pass')">登录</Button>
            </FormItem>
            <div class="deal">
              <a style="float: right" @click="showFind= true">忘记密码?</a>
            </div>

          </Form>
        </TabPane>
      </Tabs>
      <div class="other-way">
        <span>使用其他方式登录:</span>
        <img src="../assets/img/login_img/qq_logo.png" @click="uniteLogin('qq')" style="width: 20px">
        <img src="../assets/img/login_img/wx_logo.png" @click="uniteLogin('wx')" style="width: 27px">
        <img src="../assets/img/login_img/zhifu_logo.png" @click="uniteLogin('zfb')" style="width: 24px">
      </div>
    </Card>
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
        <FormItem style="margin-bottom: 10px">
          <Button type="primary" long @click="toLogin(bindParam.type, bindParam.openId, true)">绑定并登录</Button>
        </FormItem>
        <div class="deal">
          <p>新用户完成注册，代表同意</p>
          <a>《上海汽修平台用户协议》</a>
        </div>
      </Form>
  </Modal>

  <Modal
    v-model="showFind"
    title="重置密码"
    width="350px"
    @on-visible-change=""
    :footer-hide="true"
    class=""
    :mask-closable="false"
  >
    <Form ref="reset" :rules="ruleReset" :model="formReset">
      <FormItem prop="mobileNo">
        <Input v-model="formReset.mobileNo" :maxlength="11" placeholder="请输入手机号">
        <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>

        </Input>
      </FormItem>
      <FormItem prop="smsCode">
        <Input v-model="formReset.smsCode" placeholder="请输入验证码">
        <span slot="prepend">
                        <Icon :size="14" type="md-lock"></Icon>
                      </span>
        <span slot="append"><Button  type="primary" @click='getResetCaptcha'>{{description}}</Button></span>
        </Input>
      </FormItem>
      <FormItem prop="pass">
        <Input type="password" v-model="formReset.pass" size="large" placeholder="请输入密码">
        <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
        </Input>
      </FormItem>
      <FormItem prop="confirmPass">
        <Input type="password" v-model="formReset.confirmPass" size="large" placeholder="请确认密码">
        <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
        </Input>
      </FormItem>
      <FormItem style="margin-bottom: 10px">
        <Button type="primary" long @click="toReset">重置密码</Button>
      </FormItem>
    </Form>
  </Modal>
</div>
</basic-container>
</template>

<script>
import config from '../config.js'
import BasicContainer from '~/components/basic-container.vue'
export default {
		name: "login",
    layout: 'layout-root',
  components: {
    BasicContainer
  },
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

        showBind: false,
        bindParam:{
          type: '',
          openId: ''
        },

        showFind: false,
        formReset:{
          mobileNo:'',
          smsCode:'',
          pass:'',
          confirmPass:'',
        },
        ruleReset: {
          mobileNo:[
            { required: true, message: '请输入正确的号码', },
            { validator: validatePass, trigger: 'blur'},
          ],
          smsCode:[{ required: true,  message: '请填写验证码',}],
          pass:[{ required: true,  message: '请输入密码',}],
          confirmPass:[{ required: true,  message: '请输入密码',}],
        }
			}
		},
    mounted(){
		  // console.log('this',this)
      if(this.$route.query.redirect) this.$Message.info('请登录')
      this.getOpenId()
      console.log('baseUrl:', config.apiUrl)
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
      getResetCaptcha(){
			  let pass= true
        this.$refs.reset.validateField('mobileNo',(res)=>{
          if(res) pass=false
        });
        if(pass && this.mobileFlag){
          this.$axios.post('/user/pass/reset/'+ this.formReset.mobileNo, {}).then( (res) => {
            if(res.data.code==='0'){
              this.timing = setInterval(this.decrTime, 1000);
              this.mobileFlag = false;
              this.$Message.success('短信发送成功')
            }
          })
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
      },
      toReset(){
        this.$refs.reset.validate((valid)=>{
          if(valid){
            this.$axios.$post('/user/pass/reset', this.formReset).then( (res) => {
              if(res.code==='0'){
                this.$Message.success('重置成功')
                this.showFind= false
              }
            })
          }
        })
      }
		}
	}
</script>

<style scoped lang="less">
.login-page{
  min-height: 600px;
  height: 70vh;
  position: relative;
  .login-box{
    width: 360px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    .other-way{
      text-align: center;
      font-size: 12px;
      img{
        cursor: pointer;
      }
    }
    .other-way>*{
      vertical-align: middle;
      margin: 0 5px;
    }
  }
  .deal{
    height: 40px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 12px;
  }
}
</style>
<style lang="less">
.login-page{
  .login-box{
    .ivu-card-body{
      padding: 15px 40px;
      height: 334px;
      .ivu-tabs-bar{
        border: 0;
        .ivu-tabs-nav-container{
          font-size: 16px;
          .ivu-tabs-nav-wrap{
            margin: 0;
            .ivu-tabs-nav-scroll{
              text-align: center;
              .ivu-tabs-nav{
                display: inline-block;
                float: none;
              }
            }
          }

        }
      }
    }
  }
}
</style>

