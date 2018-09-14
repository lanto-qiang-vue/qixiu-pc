package com.lanto.shqixiu.shwgweb.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.convert.JsonConverter;
import org.softbase.utils.CommonUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.lanto.shqixiu.shwgweb.util.HMACSHA1;
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
public class RemoteHandlerInterceptor extends HandlerInterceptorAdapter {
	
	private Logger logger = Logger.getLogger(RemoteHandlerInterceptor.class);// 日志
	
	private static final Long VALID_TIMES = 10 * 60 * 1000L; //有效时间为10分钟

	@Override
	public boolean preHandle(HttpServletRequest request,
							HttpServletResponse response, Object handler) throws Exception {
		
		String timeMillis = CommonUtils.checkNull(request.getParameter("time_millis"));
		String sign = CommonUtils.checkNull(request.getParameter("sign"));
		if(CommonUtils.checkIsNullStr(timeMillis) || CommonUtils.checkIsNullStr(sign)){
			response.setContentType("text/html;charset=utf-8");
            response.getWriter().write(getRestException("205","time_millis与sign参数错误！"));     
			return false;
		}
		String encodeSign = HMACSHA1.encode(timeMillis, HMACSHA1.KEY);
		if(!sign.equals(encodeSign)){
			response.setContentType("text/html;charset=utf-8");
            response.getWriter().write(getRestException("205","time_millis与sign参数错误！"));     
			return false;
		}
		long millis = Long.valueOf(timeMillis);
		if( (System.currentTimeMillis() - millis) > VALID_TIMES){
			response.setContentType("text/html;charset=utf-8");
            response.getWriter().write(getRestException("206","请求已超过有效期！"));     
			return false;
		}
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
