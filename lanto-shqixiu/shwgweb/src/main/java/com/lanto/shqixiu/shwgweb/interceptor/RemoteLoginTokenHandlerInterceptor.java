package com.lanto.shqixiu.shwgweb.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.convert.JsonConverter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.service.remote.AccessTokenService;
/**
 * 
 * 
 * Filename:    RemoteLoginTokenHandlerInterceptor.java  
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
public class RemoteLoginTokenHandlerInterceptor extends HandlerInterceptorAdapter {
	
	private Logger logger = Logger.getLogger(RemoteLoginTokenHandlerInterceptor.class);// 日志
	
	@Resource
	private AccessTokenService service;

	@Override
	public boolean preHandle(HttpServletRequest request,
							HttpServletResponse response, Object handler) throws Exception {
		String accessToken = request.getParameter("access_token");
		CallResult result = service.checkAccessToken(accessToken);
		if(!result.isSuccess()){
			response.setContentType("text/html;charset=utf-8");
			String errorCode = (String)result.get("error_code");
            response.getWriter().write(getRestException(errorCode,result.getTip()));     
			return false;
		}
		TbAppLoginToken logintoken = (TbAppLoginToken)result.get("loginToken");
		request.setAttribute("applogintoken", logintoken);
		return true;	
	}
	
	/**
	 * 		
	 * 作用:用于输出数据到客户端(用于接口返回异常信息的json转换)
	 * @return void  
	 * @throws Exception 
	 * @Exception 异常对象
	 */
	@SuppressWarnings("unchecked")
	public String getRestException(String error_code,String message){
		try {
			JsonConverter jc = new JsonConverter();
			Map out = new HashMap();
			out.put("error_code", error_code);
			out.put("error_message", message);
			byte[] bt = jc.sourceToDest(out);
			return new String(bt,"UTF-8");
		} catch (Exception e1) {
			e1.printStackTrace();
			return "[{\"error_message\":\"操作失败\",\"error_code\":" + error_code + "}]";
		}
	}
	
}
