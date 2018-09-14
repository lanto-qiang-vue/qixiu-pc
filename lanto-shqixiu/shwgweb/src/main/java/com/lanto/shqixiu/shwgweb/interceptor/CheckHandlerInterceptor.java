package com.lanto.shqixiu.shwgweb.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.model.WebLoginInfo;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.lanto.shqixiu.shwgweb.util.Constant;
/**
 * 
 * 
 * Filename:    MyHandlerInterceptor.java  
 * Description:   拦截器
 * Copyright:   Copyright (c) 2012 刘新  
 * Company:     
 * @author:     刘新  
 * @version:    1.0  
 * Create at:   2012-12-10 上午11:26:56 
 *  
 * Modification History:  
 * Date         Author      Version     Description  
 * ------------------------------------------------------------------  
 * 2012-12-10       刘新        1.0        1.0 Version
 */
public class CheckHandlerInterceptor extends HandlerInterceptorAdapter {
	
	private Logger logger = Logger.getLogger(CheckHandlerInterceptor.class);// 日志
	

	@Override
	public boolean preHandle(HttpServletRequest request,
							HttpServletResponse response, Object handler) throws Exception {
		String url = request.getRequestURI();
		logger.info("拦截URL成功……" + url);
		WebLoginInfo login = (WebLoginInfo)request.getSession().getAttribute(Constant.WEBSITE_LOGIN_USER_SESSION_VALUE);
		if(login == null || login.getUserId() == null){
			logger.info("拦截URL发现session已失效-----将跳转到登录页面--");
			response.setHeader("sessionstatus", "timeout");
			response.setStatus(808);
			return false;
		}
		return true;	
	}
	
	
	
}
