package com.lanto.shqixiu.shwgweb.controller.front;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="government",produces = "text/html;charset=UTF-8")
public class GovernmentController extends BaseCon {
	private Logger logger = Logger.getLogger(GovernmentController.class);// 日志
	
	@Resource
	private InfoPublicService service;
	
	
	@RequestMapping(value = "{type}", method = RequestMethod.GET )
	public String topage(@PathVariable("type") String type,HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("typeName", WebCache.getDictDescById(type));
		request.setAttribute("type", type);
		request.setAttribute("nav_menu_index", 2);
		return "infoPublic/government";
	}



	@RequestMapping(value = "getGoverPageList")
	@ResponseBody
	public Object getGoverPageList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getGoverPageList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"分页查询政务信息出错");
		}
	}
	
	
	@RequestMapping(value = "detail/{id}", method = RequestMethod.GET )
	public String getContent(@PathVariable("id") String id,HttpServletRequest request,HttpServletResponse response)  {
		TbInfoPublic info = service.getInfoDetail(id);
		String type = info.getInfoType();
		request.setAttribute("typeName", WebCache.getDictDescById(type));
		request.setAttribute("type", type);
		if(info.getPublishTime() != null){
			request.setAttribute("time", CommonUtils.printDateTime(info.getPublishTime()));
		}
		request.setAttribute("info", info);
		request.setAttribute("nav_menu_index", 2);
		return "infoPublic/governmentDetail";
	}
	

	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("PUBLISH_STATUS", "", "10311001"));
		super.createWhere(sList);
	}

}
