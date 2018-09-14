package com.lanto.shqixiu.shwgm.controller.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="",produces = "text/html;charset=UTF-8")
public class IndexController extends BaseCon {
	private Logger logger = Logger.getLogger(IndexController.class);// 日志
	
	
//	@RequestMapping(value = "index")
//	public String index(HttpServletRequest request,HttpServletResponse response) {
//		return "login";
//	}
	
	@RequestMapping(value = "manage")
	public String main(HttpServletRequest request,HttpServletResponse response) {
		return "main";
	}
	

}
