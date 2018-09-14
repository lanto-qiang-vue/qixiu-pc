package com.lanto.shqixiu.shwgweb.controller.front;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lanto.shqixiu.shwgweb.model.po.TbEmployeeExpert;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.convert.JsonConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.lanto.shqixiu.shwgweb.service.CdfService;
import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
import com.lanto.shqixiu.shwgweb.service.MaintainService;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="",produces = "text/html;charset=UTF-8")
public class IndexController extends BaseCon {
	private Logger logger = Logger.getLogger(IndexController.class);// 日志
	
	@Resource
	private CdfService cdfService;
	
	@Resource
	private InfoPublicService infoPublicService;
	
	@Resource
	private MaintainService maintainService;
	
	
	@RequestMapping(value = "index", method = RequestMethod.GET )
	public String index(HttpServletRequest request,HttpServletResponse response) {
		List experts = cdfService.expertList(20);
		List questList = cdfService.listDigest(5);
		
		Map hotQuest = cdfService.getHotQuest(1);
		
		List instList = infoPublicService.getInfoList("10281014", 6);
		
		List zwList = infoPublicService.getInfoList("10281005", 6);
		
		List inImageList = infoPublicService.getImageInfoList(null, 1);
		List zwImageList = infoPublicService.getImageInfoList("10281005", 1);
		
		List banners = infoPublicService.getBanners(10);
		
		
		List brandlist = maintainService.getBrandList();
		Map type1 = new HashMap(); 
		type1.put("CODE", "IS4S");
		type1.put("NAME", "4S店");
		
		Map type2 = new HashMap(); 
		type2.put("CODE", "IS_SEC_MAINTAIN");
		type2.put("NAME", "二级维护");
		
		Map type3 = new HashMap(); 
		type3.put("CODE", "IS_WYCL");
		type3.put("NAME", "危运车辆维修");
		
		Map type4 = new HashMap(); 
		type4.put("CODE", "IS_XNY");
		type4.put("NAME", "新能源汽车维修");
		
		Map type5 = new HashMap(); 
		type5.put("CODE", "IS_QCJY");
		type5.put("NAME", "汽车救援");
		
		List<Map> typeList = new ArrayList();
		typeList.add(type1);
		typeList.add(type2);
		typeList.add(type3);
		typeList.add(type4);
		typeList.add(type5);
		request.setAttribute("brandlist", brandlist);
		request.setAttribute("typeList", typeList);
		
		request.setAttribute("questList",questList);
		request.setAttribute("instList",instList);
		request.setAttribute("zwList",zwList);
		request.setAttribute("inImageList",inImageList);
		request.setAttribute("zwImageList",zwImageList);
		request.setAttribute("experts",experts);
		request.setAttribute("hotQuest",hotQuest);
		request.setAttribute("banners",banners);
		
		request.setAttribute("nav_menu_index", 1);
		return "index";
	}
	

	@RequestMapping(value = "specialist", method = RequestMethod.GET )
	public String specialist(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setAttribute("typeName", "专家列表");
		request.setAttribute("type", "specialist");
		List<TbEmployeeExpert> detailList = maintainService.getSpecialList();
		request.setAttribute("detailList", detailList);
		List experts = cdfService.expertList(200000);
		JsonConverter jc = new JsonConverter();
		request.setAttribute("experts", new String(jc.sourceToDest(experts),"UTF-8"));
		request.setAttribute("nav_menu_index", 5);
		return "specialist";
	}

	@RequestMapping(value = "adver", method = RequestMethod.GET )
	public String adver(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setAttribute("nav_menu_index", 9);
		return "adver";
	}

	@RequestMapping(value = "aboutUs", method = RequestMethod.GET )
	public String aboutUs(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setAttribute("nav_menu_index", 8);
		return "aboutUs";
	}

	@RequestMapping(value = "partner", method = RequestMethod.GET )
	public String partner(HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setAttribute("nav_menu_index", 8);
		return "partner";
	}

	@RequestMapping(value = "/queryRepairCompany")
	public String searchRepairCompanyList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		List brandlist = maintainService.getBrandList();
		request.setAttribute("brandlist", brandlist);

		request.setAttribute("queryRepairCompany_index", 1);
		return "center/queryRepairCompany";
	}
}
