package com.lanto.shqixiu.shwgweb.controller.front;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="industry",produces = "text/html;charset=UTF-8")
public class IndustryController extends BaseCon {
	private Logger logger = Logger.getLogger(IndustryController.class);// 日志
	
	@Resource
	private InfoPublicService service;
	
	@RequestMapping(value = "{type}", method = RequestMethod.GET )
	public String topage(@PathVariable("type") String type,HttpServletRequest request,HttpServletResponse response) throws SQLException {
		String typeName = WebCache.getDictDescById(type);
		if(StringUtils.isEmpty(typeName) || typeName.equals(type)) {
			return "redirect:/";
		}
		request.setAttribute("typeName", typeName);
		request.setAttribute("type", type);
		request.setAttribute("nav_menu_index", 5);
		return "infoPublic/industry";
	}
	
	@RequestMapping(value = "getIndustryPageList")
	@ResponseBody
	public Object getIndustryPageList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getIndustryPageList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"分页查询行业信息出错");
		}
	}
	
	
	@RequestMapping(value = "detail/{id}", method = RequestMethod.GET )
	public String detail(@PathVariable("id") String id,HttpServletRequest request,HttpServletResponse response)  {
		TbInfoPublic info = service.getInfoDetail(id);
		String type = info.getInfoType();
		request.setAttribute("typeName", WebCache.getDictDescById(type));
		request.setAttribute("type", type);
		if(info.getPublishTime() != null){
			request.setAttribute("time", CommonUtils.printDateTime(info.getPublishTime()));
		}
		request.setAttribute("info", info);
		request.setAttribute("nav_menu_index", 5);
		return "infoPublic/industryDetail";
	}
	
	@RequestMapping(value = "phone/detail/{id}", method = RequestMethod.GET )
	public String phoneDetail(@PathVariable("id") String id,HttpServletRequest request,HttpServletResponse response)  {
		TbInfoPublic info = service.getInfoDetail(id);
		String type = info.getInfoType();
		request.setAttribute("typeName", WebCache.getDictDescById(type));
		request.setAttribute("type", type);
		if(info.getPublishTime() != null){
			request.setAttribute("time", CommonUtils.printDateTime(info.getPublishTime()));
		}
		request.setAttribute("info", info);
		return "phone/industryDetail";
	}
	

	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("PUBLISH_STATUS", "", "10311001"));
		super.createWhere(sList);
	}

}
