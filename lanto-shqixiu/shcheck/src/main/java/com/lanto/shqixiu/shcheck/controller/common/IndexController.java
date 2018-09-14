package com.lanto.shqixiu.shcheck.controller.common;

import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lanto.shqixiu.shcheck.model.po.TjSysOperateLog;
import com.lanto.shqixiu.shcheck.service.sys.LoginService;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;
import com.lanto.shqixiu.shcheck.util.Constant;
import com.lanto.shqixiu.shcheck.util.DES;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="",produces = "text/html;charset=UTF-8")
public class IndexController extends BaseCon {
	private Logger logger = Logger.getLogger(IndexController.class);// 日志
	@Resource
	private LoginService loginService;
	@Resource
	private TjSysOperateLogService logService;
	
	@RequestMapping(value = "index")
	public String index(HttpServletRequest request,HttpServletResponse response) {
		return "main";
	}
	
	@RequestMapping(value = "main.html")
	public String main(HttpServletRequest request,HttpServletResponse response) {
		return "main";
	}
	
	@RequestMapping("gzjtLogin")
	public String gzjtLogin(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			//b142af8a4900b301b6d94f51290cef46
			String acceptToken = CommonUtils.checkNull(request.getParameter("accept_token"));
			String userCode = CommonUtils.checkNull(request.getParameter("user"));
			String userPW = CommonUtils.checkNull(request.getParameter("pwd"));
			acceptToken = SecurityEncode.decoderByDES(acceptToken, SecurityEncode.DES_KEY);
			if(!"gzjr*&&##&**".equals(acceptToken)){
				request.setAttribute("errMsg", "accept_token错误！");
				return "login";
			}
			if (super.IsEmptyOrNull(userCode)){
				request.setAttribute("errMsg", "用户名不能为空！");
				return "login";
			}
			if (super.IsEmptyOrNull(userPW)){
				request.setAttribute("errMsg", "用户密码不能为空！");
				return "login";
			}
			
			boolean b = loginService.gzjrLogin(userCode,userPW);
			if (b){
				Map userInfo = loginService.getLoginUserInfo(userCode);
				if(userInfo == null){
					request.setAttribute("errMsg", "该用户不属于任何企业，无法登录!");
					return "login";
				}
				if(!"10011001".equals(CommonUtils.checkNull(userInfo.get("IS_VALID")))){
					request.setAttribute("errMsg", "该用户状态为无效，请联系企业管理员修改用户状态!");
					return "login";
				}
				setCookie(Constant.CLINET_LOGIN_USER_COOKIE_VALUE,userInfo.get("USER_ID").toString());
				setCookie(Constant.CLINET_LOGIN_USERCODE_COOKIE_VALUE,userCode);
				setCookie(Constant.CLINET_LOGIN_USERNAME_COOKIE_VALUE,userInfo.get("USER_NAME").toString());
				setCookie(Constant.CLINET_LOGIN_CORPID_COOKIE_VALUE,userInfo.get("CORP_ID").toString());
				setCookie(Constant.CLINET_LOGIN_CORPNAME_COOKIE_VALUE,userInfo.get("CORP_NAME").toString());
				setCookie(Constant.CLINET_LOGIN_AREA_COOKIE_VALUE,userInfo.get("CORP_AREA").toString());
				
				TjSysOperateLog log = new TjSysOperateLog();
				String remoteAddr = request.getRemoteAddr();
//				UdpGetClientMacAddr mac = new UdpGetClientMacAddr(remoteAddr);
				log.setMachineId(remoteAddr);
				log.setModuleName("用户登录");
				log.setOperateTime(new Date());
				log.setOperatorId(userCode);
				log.setOperateContent(userInfo.get("USER_NAME").toString() + " 登录系统！");
				logService.save(log);
				
				return "redirect:/main.html";
			}else{
				request.setAttribute("errMsg", "用户或密码错误!");
				return "login";
			}
			
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			request.setAttribute("errMsg", "登录出错!");
			return "login";
		}
	}
	
	@RequestMapping("ryacLogin")
	public String ryacLogin(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			//b142af8a4900b301b6d94f51290cef46
			String acceptToken = CommonUtils.checkNull(request.getParameter("accept_token"));
			acceptToken = SecurityEncode.decoderByDES(acceptToken, SecurityEncode.DES_KEY);
			String enterPriseid = CommonUtils.checkNull(request.getParameter("enterpriseid"));
			String orderNo= CommonUtils.checkNull(request.getParameter("orderno"));
			String userCode="";
			if(!"gzjr*&&##&**".equals(acceptToken)){
				request.setAttribute("errMsg", "accept_token错误！");
				return "login";
			}
			
			//des解密
			DES des =  new DES();
			String key = "jtjrryac";     
			enterPriseid =java.net.URLDecoder.decode(des.decrypt(enterPriseid,key), "utf-8") ;
			
			Map userCorp = loginService.getLoginUserByCorpID(enterPriseid); 
			if(userCorp == null){
				request.setAttribute("errMsg", "该企业没有任何用户，无法登录!");
				return "login";
			}
			if(!"10011001".equals(CommonUtils.checkNull(userCorp.get("IS_VALID")))){
				request.setAttribute("errMsg", "该用户状态为无效，请联系企业管理员修改用户状态!");
				return "login";
			}			
		
			userCode = userCorp.get("USER_CODE").toString();
			Map userInfo = loginService.getLoginUserInfo(userCode);
			if(userInfo == null){
					request.setAttribute("errMsg", "该用户不属于任何企业，无法登录!");
					return "login";
			}

			setCookie(Constant.CLINET_LOGIN_USER_COOKIE_VALUE,userInfo.get("USER_ID").toString());
			setCookie(Constant.CLINET_LOGIN_USERCODE_COOKIE_VALUE,userCode);
			setCookie(Constant.CLINET_LOGIN_USERNAME_COOKIE_VALUE,userInfo.get("USER_NAME").toString());
			setCookie(Constant.CLINET_LOGIN_CORPID_COOKIE_VALUE,userInfo.get("CORP_ID").toString());
			setCookie(Constant.CLINET_LOGIN_CORPNAME_COOKIE_VALUE,userInfo.get("CORP_NAME").toString());
			setCookie(Constant.CLINET_LOGIN_AREA_COOKIE_VALUE,userInfo.get("CORP_AREA").toString());
				
			TjSysOperateLog log = new TjSysOperateLog();
			String remoteAddr = request.getRemoteAddr();
			log.setMachineId(remoteAddr);
			log.setModuleName("用户登录");
			log.setOperateTime(new Date());
			log.setOperatorId(userCode);
			log.setOperateContent(userInfo.get("USER_NAME").toString() + " 登录系统！");
			logService.save(log);
			request.setAttribute("loginFlag", "ryac");
			request.setAttribute("orderNo", orderNo);
				
			return "main";

		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			request.setAttribute("errMsg", "登录出错!");
			return "login";
		}
	}
}
