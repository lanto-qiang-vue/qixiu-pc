package com.lanto.shqixiu.shcheck.interceptor;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.exception.ContextHolder;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.lanto.shqixiu.shcheck.util.Constant;
/**
 * 
 * 
 * Filename:    MyHandlerInterceptor.java  
 * Description:   拦截器
 * Copyright:   Copyright (c) 2012 刘新  
 * Company:    gzjr 
 * @author:     刘新  
 * @version:    1.0  
 * Create at:   2012-12-10 上午11:26:56 
 *  
 * Modification History:  
 * Date         Author      Version     Description  
 * ------------------------------------------------------------------  
 * 2012-12-10       刘新        1.0        1.0 Version
 */
public class HandlerInterceptor extends HandlerInterceptorAdapter {
	
	private Logger logger = Logger.getLogger(HandlerInterceptor.class);// 日志
	
	private String mappingURL;

	@Override
	public boolean preHandle(HttpServletRequest request,
							HttpServletResponse response, Object handler) throws Exception {
		String ctx = request.getContextPath();
		String url = request.getRequestURI();
		request.setAttribute("ctx", ctx);
//		logger.info("拦截URL成功……");
		String urREX = ctx + mappingURL;
		if(url.matches(urREX) && url.indexOf("/check/common/fileUpload/upload") == -1){
			String loginUser = getLoginUser(request);
			String userCode = getLoginUserCode(request);
			String loginCorpId = getLoginCorpId(request);
			String loginCorpName = getLoginCorpName(request);
			if(CommonUtils.checkIsNullStr(loginUser) || CommonUtils.checkIsNullStr(userCode) || CommonUtils.checkIsNullStr(loginCorpId) || CommonUtils.checkIsNullStr(loginCorpName)){
//				logger.info("拦截URL发现cookie已失效-----将跳转到登录页面--");
				response.setHeader("sessionstatus", "timeout");
				response.setStatus(808);
				return false;
			}else{
//				logger.info("cookie处于有效期状态");
				return true;
			}
		}else if(url.indexOf("/main.html") != -1){
			String loginUser = getLoginUser(request);
			String userCode = getLoginUserCode(request);
			String loginCorpId = getLoginCorpId(request);
			String loginCorpName = getLoginCorpName(request);
			if(CommonUtils.checkIsNullStr(loginUser) || CommonUtils.checkIsNullStr(userCode) || CommonUtils.checkIsNullStr(loginCorpId) || CommonUtils.checkIsNullStr(loginCorpName)){
//				logger.info("拦截URL发现cookie已失效-----将跳转到登录页面--");
				response.sendRedirect(request.getContextPath() + "/index" );
				return false;
			}
		}
		
		return true;	
	}
	
	

	public void setMappingURL(String mappingURL) {
		this.mappingURL = mappingURL;
	}

	public String getLoginUser(HttpServletRequest request) throws UnsupportedEncodingException{
		return CommonUtils.checkNull(getCookieValue(Constant.CHECK_LOGIN_USER_COOKIE_VALUE,request));
	}
	public String getLoginUserCode(HttpServletRequest request) throws UnsupportedEncodingException{
		return CommonUtils.checkNull(getCookieValue(Constant.CHECK_LOGIN_USERCODE_COOKIE_VALUE,request));
	}
	public String getLoginCorpId(HttpServletRequest request) throws UnsupportedEncodingException{
		return CommonUtils.checkNull(getCookieValue(Constant.CHECK_LOGIN_CORPID_COOKIE_VALUE,request));
	}
	public String getLoginCorpName(HttpServletRequest request) throws UnsupportedEncodingException{
		return CommonUtils.checkNull(getCookieValue(Constant.CHECK_LOGIN_CORPNAME_COOKIE_VALUE,request));
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
	
	private String encode(String str) throws UnsupportedEncodingException{
		if (str==null || str.equals(""))return "";
		return URLEncoder.encode(str,"UTF-8");
	}
	
	public boolean IsEmptyOrNull(String str) {
		if (str == null || "".equals(str.trim()))
			return true;
		return false;
	}
	
}
