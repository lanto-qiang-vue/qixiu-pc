package com.lanto.shqixiu.shwgweb.controller.remote;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.bean.CodeBean;
import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@RestController
@RequestMapping(value="remote/infopublic",produces = "text/html;charset=UTF-8")
public class InfoPublicRemoteController extends BaseCon {
	private Logger logger = Logger.getLogger(InfoPublicRemoteController.class);// 日志
	
	@Resource
	private InfoPublicService service;
	
	@RequestMapping(value = "getIndustryPageList")
	public Object getIndustryPageList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getIndustryPageList(sList, pUnit);
			return super.getRestPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("分页查询行业信息出错");
		}
	}
	
	@RequestMapping(value = "getGoverPageList")
	public Object getGoverPageList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getGoverPageList(sList, pUnit);
			return super.getRestPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("分页查询政务信息出错");
		}
	}
	
	@RequestMapping(value = "getInfoListByType")
	public Object getInfoListByType(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String type = CommonUtils.checkNull(request.getParameter("type"));
			String limit = CommonUtils.checkNull(request.getParameter("limit"));
			List list = service.getInfoList(type, Integer.valueOf(limit));
			return super.getRestData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询信息发布出错");
		}
	}
	
	@RequestMapping(value = "infoDetail")
	public Object infoDetail(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String infoId = CommonUtils.checkNull(request.getParameter("infoId"));
//			TbInfoPublic info = service.getInfoDetail(infoId);
//			if(info == null){
//				return super.getRestException("信息发布记录不存在！");
//			}
//			Map out = json.toMap(info);
//			out.put("INFO_TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(out.get("INFO_TYPE"))));
//			out.put("PUBLISH_STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(out.get("PUBLISH_STATUS"))));
			StringBuffer url = request.getRequestURL();  
			String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append(request.getSession().getServletContext().getContextPath()).append("/").toString();
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			Map data = new HashMap();
			data.put("link_url", tempContextUrl + "industry/phone/detail/" + infoId);
			out.put("data", data);
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询信息发布详情出错");
		}
	}
	
	@RequestMapping(value = "getTypes")
	public Object questTypes(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List<CodeBean> types = WebCache.getDictDescByType("1028");
			List commTypes = new ArrayList();
			List gldts = new ArrayList();
			List zxcys = new ArrayList();
			List intTypes = new ArrayList();
			
			StringBuffer url = request.getRequestURL();  
			String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append(request.getSession().getServletContext().getContextPath()).append("/").toString();
			Map xhjj = new HashMap();
			xhjj.put("code", "");
			xhjj.put("name", "协会简介");
			xhjj.put("link_url", tempContextUrl + "assoinfo/phone/summary");
			
			Map xhzn = new HashMap();
			xhzn.put("code", "");
			xhzn.put("name", "协会职能");
			xhzn.put("link_url", tempContextUrl + "assoinfo/phone/function");
			
			intTypes.add(xhjj);
			intTypes.add(xhzn);
			
			for(CodeBean c : types){
				Map in = new HashMap();
				in.put("code", c.getCodeId());
				in.put("name", c.getCodeDesc());
				if("10281018".equals(c.getCodeId()) || "10281005".equals(c.getCodeId()) || "10281006".equals(c.getCodeId()) || "10281007".equals(c.getCodeId())){
					commTypes.add(in);
				}else if("10281016".equals(c.getCodeId()) || "10281017".equals(c.getCodeId()) ){
					gldts.add(in);
				}else if("10281009".equals(c.getCodeId()) || "10281008".equals(c.getCodeId()) ){
					zxcys.add(in);
				}else if("10281013".equals(c.getCodeId()) || "10281014".equals(c.getCodeId()) || "10281015".equals(c.getCodeId())){
					intTypes.add(in);
				}
			}
			Map comm = new HashMap();
			comm.put("name", "公共管理");
			comm.put("code", "1");
			comm.put("children", commTypes);
			
			Map gldt = new HashMap();
			gldt.put("name", "管理动态");
			gldt.put("code", "2");
			gldt.put("children", gldts);
			
			Map cxzy = new HashMap();
			cxzy.put("name", "创先争优");
			cxzy.put("code", "3");
			cxzy.put("children", zxcys);
			
			Map wmjs = new HashMap();
			wmjs.put("name", "行业文明创建");
			wmjs.put("code", "10281010");
			
			Map intr = new HashMap();
			intr.put("name", "协会治理");
			intr.put("code", "5");
			intr.put("children", intTypes);
			
			List out = new ArrayList();
			out.add(comm);
			out.add(gldt);
			out.add(cxzy);
			out.add(wmjs);
			out.add(intr);
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询信息发布类型出错");
		}
	}
	
	@RequestMapping(value = "getImportant")
	public Object getImportant(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String type = CommonUtils.checkNull(request.getParameter("type"));
			String limit = CommonUtils.checkNull(request.getParameter("limit"));
			List list = service.getImportant(type, Integer.valueOf(limit));
			return super.getRestData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询重要信息出错");
		}
	}

	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("PUBLISH_STATUS", "", "10311001"));
//		super.createWhere(sList);
		String type = CommonUtils.checkNull(request.getParameter("info_type_eq"));
		if(!CommonUtils.checkIsNullStr(type)){
			if("10281018".equals(type)){
				sList.add(new SqlUnit("type", "AND INFO_TYPE IN (?,?,?,?)", "10281001"));
				sList.add(new SqlUnit("type", "", "10281002"));
				sList.add(new SqlUnit("type", "", "10281003"));
				sList.add(new SqlUnit("type", "", "10281004"));
			}else{
				sList.add(new SqlUnit("type", "AND INFO_TYPE=?", type));
			}
		}
	}

}
