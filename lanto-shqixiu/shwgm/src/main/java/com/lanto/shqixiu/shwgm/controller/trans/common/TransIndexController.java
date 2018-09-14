package com.lanto.shqixiu.shwgm.controller.trans.common;

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
public class TransIndexController extends BaseCon {
	private Logger logger = Logger.getLogger(TransIndexController.class);// 日志
	
	
	@RequestMapping(value = "trans")
	public String index(HttpServletRequest request,HttpServletResponse response) {
		request.setAttribute("trans", "trans");
		return "main";
	}
	
//	@RequestMapping(value = "transmain.html")
//	public String main(HttpServletRequest request,HttpServletResponse response) {
//		request.setAttribute("trans", "trans");
//		return "main";
//	}
//	

}
