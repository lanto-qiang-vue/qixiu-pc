package com.lanto.shqixiu.shwgweb.controller.remote;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.service.SendMessageService;
import com.lanto.shqixiu.shwgweb.service.remote.LoginRemoteService;

/**
 * @user : liuxin
 * @date : 2014-10-11
 */

@RestController()
@RequestMapping(value = "remote", produces = "text/html;charset=UTF-8")
public class LoginRemoteController extends BaseCon {
    private Logger logger = Logger.getLogger(LoginRemoteController.class);// 日志

    @Resource
    private LoginRemoteService service;

    @Resource
    private SendMessageService sendMessageService;

    @RequestMapping(value = "login")
    public Object login(HttpServletRequest request, HttpServletResponse response) {
        try {
            String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
            String userPass = CommonUtils.checkNull(request.getParameter("password"));
            String userType = CommonUtils.checkNull(request.getParameter("userType"));
            String deviceId = CommonUtils.checkNull(request.getParameter("deviceId"));
            WebLoginInfo login = new WebLoginInfo();
            Map out = new HashMap();
            if ("0".equals(userType)) {
                CallResult result = service.updateGeneLogin(telphone, userPass, userType, deviceId);
                if (!result.isSuccess()) {
                    return super.getRestException(result.getTip());
                }
                String token = (String) result.get("tokenStr");
                TgSysUser user = (TgSysUser) result.get("user");
                Map data = new HashMap();

                data.put("userId", user.getUserId());
                //	out.put("userCode", user.getUserCode());
                data.put("userName", user.getUserName());
                data.put("userType", userType);
                data.put("telphone", user.getTelphone());
                data.put("photo", user.getPhoto());
                data.put("access_token", token);
                out.put("data", data);
                out.put("error_code", "0");
                out.put("error_message", "");
            } else if ("1".equals(userType)) {
                CallResult result = service.updateCompanyLogin(telphone, userPass, userType, deviceId);
                if (!result.isSuccess()) {
                    return super.getRestException(result.getTip());
                }
                String token = (String) result.get("tokenStr");
                TgSysUser user = (TgSysUser) result.get("user");
                Map data = new HashMap();

                data.put("userId", user.getUserId());
                //	out.put("userCode", user.getUserCode());
                data.put("userName", user.getUserName());
                data.put("userType", userType);
                data.put("telphone", user.getTelphone());
                data.put("photo", user.getPhoto());
                data.put("access_token", token);
                out.put("data", data);
                out.put("error_code", "0");
                out.put("error_message", "");
            } else {
                CallResult result = service.updateGovermentLogin(telphone, userPass, userType, deviceId);
                if (!result.isSuccess()) {
                    return super.getRestException(result.getTip());
                }
                String token = (String) result.get("tokenStr");
                TgSysUser user = (TgSysUser) result.get("user");
                Map data = new HashMap();

                data.put("userId", user.getUserId());
                //	out.put("userCode", user.getUserCode());
                data.put("userName", user.getUserName());
                data.put("userType", userType);
                data.put("telphone", user.getTelphone());
                data.put("photo", user.getPhoto());
                data.put("access_token", token);
                out.put("data", data);
                out.put("error_code", "0");
                out.put("error_message", "");
            }

			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("登录出错");
		}
	}

	@RequestMapping(value = "getRandCode")
	public Object getRandCode(HttpServletRequest request,HttpServletResponse response) {
		try{
			String telphone = request.getParameter("telphone");
			if(CommonUtils.checkIsNullStr(telphone)){
				return super.getRestException("手机号码不能为空");
			}
			if(!telphone.matches("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$")){
				return super.getRestException("手机号码格式不正确！");
			}
			TgSysUser user = service.getUserByTelphone(telphone);
			if(user != null){
				return super.getRestException("该手机号已经注册过了!");
			}
			String randNum = getRandNum(6);
			String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内填写";
			request.getSession().setAttribute("rand_code_session", telphone + randNum);
			String ret = sendMessageService.send(message, telphone);
			if(ret != null){
				return super.getRestException( "短信发送失败!" + ret);
			}
			return super.getRestData("发送成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("获取验证码出错");
		}
	}


	@RequestMapping(value = "getForgetRandCode")
	public Object getForgetRandCode(HttpServletRequest request,HttpServletResponse response) {
		try{
			String telphone = request.getParameter("telphone");
			if(CommonUtils.checkIsNullStr(telphone)){
				return super.getRestException("手机号码不能为空");
			}
			if(!telphone.matches("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$")){
				return super.getRestException("手机号码格式不正确！");
			}
			TgSysUser user = service.getUserByTelphone(telphone);
			if(user == null){
				return super.getRestException("该手机号不存在!");
			}
			String randNum = getRandNum(6);
			String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内修改密码";
			request.getSession().setAttribute("rand_forget_code_session", telphone + randNum);
			String ret = sendMessageService.send(message, telphone);
			if(ret != null){
				return super.getRestException("短信发送失败!" + ret);
			}

			return super.getRestData("发送成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("获取验证码出错");
		}
	}


	//用户注册
	@RequestMapping(value = "submitForget")
	public Object submitForget(HttpServletRequest request,HttpServletResponse response) {
		try{
			String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
			String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
			String password = CommonUtils.checkNull(request.getParameter("password"));
			String randNum = CommonUtils.checkNull(request.getSession().getAttribute("rand_forget_code_session"));
			if(CommonUtils.checkIsNullStr(randNum)){
				return super.getRestException("手机短信验证码已失效！");
			}
			if(!(telphone + randCode).equals(randNum)){
				return super.getRestException("手机短信验证码错误！");
			}
			service.submitForget(telphone, password);

			return super.getRestData("修改密码成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("修改密码出错");
		}
	}


	//用户注册
	@RequestMapping(value = "register")
	public Object register(HttpServletRequest request,HttpServletResponse response) {
		try{
			String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
			String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
			String userType = CommonUtils.checkNull(request.getParameter("userType"));
			String randNum = CommonUtils.checkNull(request.getSession().getAttribute("rand_code_session"));
			if(CommonUtils.checkIsNullStr(randNum)){
				return super.getRestException("手机短信验证码已失效！");
			}
			if(!(telphone + randCode).equals(randNum)){
				return super.getRestException("手机短信验证码错误！");
			}
			if("0".equals(userType)){
				TgSysUser po =  super.getPoByParam(TgSysUser.class);
				CallResult result = service.updateGeneRegister(po,userType);
				if(!result.isSuccess()){
					return super.getRestException(result.getTip());
				}
			}else{
				return super.getRestException("暂时只支持个人用户注册!");
			}

			return super.getRestData("注册成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("注册出错");
		}
	}


	@RequestMapping(value = "logout")
	public Object logout(HttpServletRequest request,HttpServletResponse response) {
		try{
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			service.updateLogout(token);
			return super.getRestData("退出成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("注销出错");
		}
	}

	private String getRandNum(int charCount) {
        String charValue = "";
        for (int i = 0; i < charCount; i++) {
            char c = (char) (randomInt(0, 10) + '0');
            charValue += String.valueOf(c);
        }
        return charValue;
    }

    private int randomInt(int from, int to) {
        Random r = new Random();
        return from + r.nextInt(to - from);
    }
}
