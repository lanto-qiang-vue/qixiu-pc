package com.lanto.shqixiu.shwgweb.controller.front;

import java.sql.SQLException;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="assoinfo",produces = "text/html;charset=UTF-8")
public class AssoInfoController extends BaseCon {
	private Logger logger = Logger.getLogger(AssoInfoController.class);// 日志
	
	@Resource
	private InfoPublicService service;
	
	@RequestMapping(value = "summary", method = RequestMethod.GET )
	public String summary(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("typeName", "协会简介");
		request.setAttribute("type", "summary");
		Map info = service.getAssoInfo();
		if(info != null){
			request.setAttribute("content", info.get("SUMMARY"));
		}
		request.setAttribute("nav_menu_index", 5);
		return "infoPublic/assoInfo";
	}
	
	@RequestMapping(value = "function", method = RequestMethod.GET )
	public String function(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("typeName", "协会职能");
		request.setAttribute("type", "function");
		Map info = service.getAssoInfo();
		if(info != null){
			request.setAttribute("content", info.get("FUNCTION"));
		}
		request.setAttribute("nav_menu_index", 5);
		return "infoPublic/assoInfo";
	}
	
	@RequestMapping(value = "phone/summary", method = RequestMethod.GET )
	public String phoneSummary(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("typeName", "协会简介");
		request.setAttribute("type", "summary");
		Map info = service.getAssoInfo();
		if(info != null){
			request.setAttribute("content", info.get("SUMMARY"));
		}
		return "phone/assoInfo";
	}
	
	@RequestMapping(value = "phone/function", method = RequestMethod.GET )
	public String phoneFunction(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("typeName", "协会职能");
		request.setAttribute("type", "function");
		Map info = service.getAssoInfo();
		if(info != null){
			request.setAttribute("content", info.get("FUNCTION"));
		}
		return "phone/assoInfo";
	}
}
