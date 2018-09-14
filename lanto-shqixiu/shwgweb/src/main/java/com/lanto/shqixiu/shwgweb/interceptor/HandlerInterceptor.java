package com.lanto.shqixiu.shwgweb.interceptor;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lanto.shqixiu.shwgweb.service.UtilService;
import org.apache.log4j.Logger;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lanto.shqixiu.shwgweb.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.model.po.TpSysUser;
import com.lanto.shqixiu.shwgweb.service.ArchivesService;
import com.lanto.shqixiu.shwgweb.service.LoginService;
import com.lanto.shqixiu.shwgweb.util.Constant;
/**
 * 
 * 
 * Filename:    MyHandlerInterceptor.java  
 * Description:   拦截器
 * Copyright:   Copyright (c) 2017 刘新  
 * Company:     
 * @author:     刘新  
 * @version:    1.0  
 * Create at:   2012-12-10 上午11:26:56 
 *  
 * Modification History:  
 * Date         Author      Version     Description  
 * ------------------------------------------------------------------  
 * 2017-05-10       刘新        1.0        1.0 Version
 */
public class HandlerInterceptor extends HandlerInterceptorAdapter {
	
	private Logger logger = Logger.getLogger(HandlerInterceptor.class);// 日志
	
	private static Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();
	
	@Resource
	private ArchivesService service;
	
	@Resource
	private LoginService loginService;

	@Resource
	private UtilService utilService;

	@Override
	public boolean preHandle(HttpServletRequest request,
							HttpServletResponse response, Object handler) throws Exception {
		String url = request.getRequestURI() + "?" + request.getQueryString();
		String ctx = request.getContextPath();
		request.setAttribute("ctx", ctx);
		request.setAttribute("memberUri",url);
		String reUrl = utilService.transform(request.getParameter("reUrl"));
		request.setAttribute("reUrl", reUrl);
		WebLoginInfo login = (WebLoginInfo)request.getSession().getAttribute(Constant.WEBSITE_LOGIN_USER_SESSION_VALUE);
		if(login == null || login.getUserId() == null){
			String remberLogin = getCookieValue(Constant.WEBSITE_REMBER_LOGIN,request);
			String remberLogin7d = getCookieValue(Constant.WEBSITE_REMBER_LOGIN_7DAY,request);
			String remberStr = null;
			if(!CommonUtils.checkIsNullStr(remberLogin)){
				remberStr = remberLogin;
			}else{
				if(!CommonUtils.checkIsNullStr(remberLogin7d)){
					remberStr = remberLogin7d;
				}
			}
			if(!CommonUtils.checkIsNullStr(remberStr)){
				Map r = gson.fromJson(remberStr, Map.class);
				if(r != null){
					if("0".equals(r.get("ut"))){
						TgSysUser user = loginService.getUserByTelphone(CommonUtils.checkNull(r.get("u")));
						if(user != null){
							login = new WebLoginInfo();
							login.setUserId(user.getUserId());
							login.setUserName(user.getUserName());
							login.setUserCode(user.getTelphone());
							login.setUserType(r.get("ut").toString());
						}else{
							request.setAttribute("loginFlag", 0);
							return true;
						}
					}else if("1".equals(r.get("ut"))){
						TpSysUser user = loginService.getExpertUserByUserCode(CommonUtils.checkNull(r.get("u")));
						if(user != null){
							login = new WebLoginInfo();
							login.setUserId(user.getExpertId());
							login.setUserName(user.getUserName());
							login.setUserCode(user.getUserCode());
							login.setUserType(r.get("ut").toString());
						}else{
							request.setAttribute("loginFlag", 0);
							return true;
						}
					}else{
						request.setAttribute("loginFlag", 0);
						return true;
					}
//					logger.info("session过期，正在重新注册...");
					request.getSession().setAttribute(Constant.WEBSITE_LOGIN_USER_SESSION_VALUE, login);
				}else{
					request.setAttribute("loginFlag", 0);
					return true;
				}
			}else{
				request.setAttribute("loginFlag", 0);
				return true;
			}
		}
		request.setAttribute("loginFlag", 1);
		request.setAttribute("loginInfo", login);
		TbPrivateVehicle veh = service.getSelctVeh(login);
		request.setAttribute("selectvehicle", veh);
		return true;	
	}
	
	
	public String getCookieValue(String key,HttpServletRequest request) throws UnsupportedEncodingException {
		Cookie[] cookies = request.getCookies();
		if (cookies==null)return null;
		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(key))
				return SecurityEncode.decoderByDES(decode(cookie.getValue()), SecurityEncode.DES_KEY);
		}
		return null;
	}
	
	public String decode(String str) throws UnsupportedEncodingException{
		if (str==null || str.equals(""))return "";
		return URLDecoder.decode(str,"UTF-8");
	}
	
}
