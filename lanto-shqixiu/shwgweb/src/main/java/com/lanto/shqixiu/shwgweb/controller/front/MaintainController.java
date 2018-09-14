package com.lanto.shqixiu.shwgweb.controller.front;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgweb.model.po.TbOnSiteService;
import com.lanto.shqixiu.shwgweb.model.po.TbOrderService;
import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
import com.lanto.shqixiu.shwgweb.service.MaintainService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="",produces = "text/html;charset=UTF-8")
public class MaintainController extends BaseCon {
	private Logger logger = Logger.getLogger(MaintainController.class);// 日志
	
	@Resource
	private MaintainService service;
	
	@Resource
	private InfoPublicService infoPublicService;
	
	
	@RequestMapping(value = "maintain", method = RequestMethod.GET)
	public String maintain(HttpServletRequest request,HttpServletResponse response) throws Exception {
		List arealist = service.getAreaList();
		List brandlist = service.getBrandList();
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
		
		String flag = request.getParameter("flag");
		String corpType = "维修企业";
		String hovType = "";
		String hovTypeName = "企业类型";
		if("check".equals(flag)){
			corpType = "综合检测站";
		}else if("xny".equals(flag)){
			hovType = "IS_XNY";
			hovTypeName = "新能源汽车维修";
		}else if("qcjy".equals(flag)){
			hovType = "IS_QCJY";
			hovTypeName = "汽车救援";
		}else if("wyc".equals(flag)){
			hovType = "IS_WYCL";
			hovTypeName = "危运车辆维修";
		}
		
		if(CommonUtils.checkIsNullStr(flag)){
			flag = "corp";
		}
		
		List<Map> typeList = new ArrayList();
		typeList.add(type1);
		typeList.add(type2);
		typeList.add(type3);
		typeList.add(type4);
		typeList.add(type5);
		request.setAttribute("corpType", corpType);
		request.setAttribute("hovType", hovType);
		request.setAttribute("hovTypeName", hovTypeName);
		request.setAttribute("flag", flag);
		request.setAttribute("arealist", arealist);
		request.setAttribute("brandlist", brandlist);
		request.setAttribute("typeList", typeList);
		request.setAttribute("nav_menu_index", 6);
		return "maintain/maintain";
	}
	
	@RequestMapping(value = "maintain/detail/{corpId}", method = RequestMethod.GET)
	public String maintainDetail(@PathVariable("corpId") String corpId,HttpServletRequest request,HttpServletResponse response) {
		Map corp = service.getCorpDetail(corpId);
		List infoList = infoPublicService.getInfoList(null, 9);
		List zwList = infoPublicService.getInfoList("10281005", 9);
		request.setAttribute("model", corp);
		request.setAttribute("infoList", infoList);
		request.setAttribute("zwList", zwList);
		request.setAttribute("nav_menu_index", 6);
		return "maintain/maintainDetail";
	}

	@RequestMapping(value = "business/parts", method = RequestMethod.GET)
	public String businessParts(HttpServletRequest request,HttpServletResponse response) {
		return "business/parts";
	}

	@RequestMapping(value = "business/equip", method = RequestMethod.GET)
	public String businessEquip(HttpServletRequest request,HttpServletResponse response) {
		return "business/equip";
	}

	@RequestMapping(value = "business/insure", method = RequestMethod.GET)
	public String businessInsure(HttpServletRequest request,HttpServletResponse response) {
		return "business/insure";
	}

	@RequestMapping(value = "business/branchCenter", method = RequestMethod.GET)
		public String branchCenter(HttpServletRequest request,HttpServletResponse response) {
			return "business/branchCenter";
		}

	@RequestMapping(value = "business/sell", method = RequestMethod.GET)
	public String businessSell(HttpServletRequest request,HttpServletResponse response) {
		return "business/sell";
	}

	@RequestMapping(value = "business/train", method = RequestMethod.GET)
	public String businessTrain(HttpServletRequest request,HttpServletResponse response) {
		return "business/train";
	}

	@RequestMapping(value = "business/train1", method = RequestMethod.GET)
	public String businessTrain1(HttpServletRequest request,HttpServletResponse response) {
		return "business/train1";
	}

	@RequestMapping(value = "business/train2", method = RequestMethod.GET)
	public String businessTrain2(HttpServletRequest request,HttpServletResponse response) {
		return "business/train2";
	}

	@RequestMapping(value = "business/train3", method = RequestMethod.GET)
	public String businessTrain3(HttpServletRequest request,HttpServletResponse response) {
		return "business/train3";
	}

	@RequestMapping(value = "business/consum", method = RequestMethod.GET)
	public String businessConsum(HttpServletRequest request,HttpServletResponse response) {
		return "business/consum";
	}

	@RequestMapping(value = "business/books", method = RequestMethod.GET)
	public String businessBooks(HttpServletRequest request,HttpServletResponse response) {
		return "business/books";
	}

	@RequestMapping(value = "business/wash", method = RequestMethod.GET)
	public String businessWash(HttpServletRequest request,HttpServletResponse response) {
		return "business/wash";
	}

	@RequestMapping(value = "business/check", method = RequestMethod.GET)
	public String businessCheck(HttpServletRequest request,HttpServletResponse response) {
		return "business/check";
	}

	@RequestMapping(value = "business/study", method = RequestMethod.GET)
	public String businessStudy(HttpServletRequest request,HttpServletResponse response) {
		return "business/study";
	}

	@RequestMapping(value = "business/serve", method = RequestMethod.GET)
	public String businessServe(HttpServletRequest request,HttpServletResponse response) {
		return "business/serve";
	}

	@RequestMapping(value = "business/help", method = RequestMethod.GET)
	public String businessHelp(HttpServletRequest request,HttpServletResponse response) {
		return "business/help";
	}

	@RequestMapping(value = "business/sell1", method = RequestMethod.GET)
	public String businessSell1(HttpServletRequest request,HttpServletResponse response) {
		return "business/sell1";
	}

	@RequestMapping(value = "business/sell2", method = RequestMethod.GET)
	public String businessSell2(HttpServletRequest request,HttpServletResponse response) {
		return "business/sell2";
	}

	@RequestMapping(value = "business/sell3", method = RequestMethod.GET)
	public String businessSell3(HttpServletRequest request,HttpServletResponse response) {
		return "business/sell3";
	}

	@RequestMapping(value = "maintain/online", method = RequestMethod.GET)
	public String businessonline(HttpServletRequest request,HttpServletResponse response) {
		return "maintain/online";
	}

	@RequestMapping(value = "maintain/visit", method = RequestMethod.GET)
	public String businessVisit(HttpServletRequest request,HttpServletResponse response) {
		return "maintain/visit";
	}

	@RequestMapping(value = "maintain/serviceForyou")
	public String businessnewVisit(HttpServletRequest request,HttpServletResponse response) {
		return "maintain/serviceForyou";
	}

	@RequestMapping(value = "supervision/article1", method = RequestMethod.GET)
	public String businessArticle1(HttpServletRequest request,HttpServletResponse response) {
		return "supervision/article1";
	}

	@RequestMapping(value = "supervision/article2017", method = RequestMethod.GET)
	public String businessArticle2017(HttpServletRequest request,HttpServletResponse response) {
		return "supervision/article2017";
	}

	@RequestMapping(value = "business/study1", method = RequestMethod.GET)
	public String businessstudy1(HttpServletRequest request,HttpServletResponse response) {
		return "business/study1";
	}

	@RequestMapping(value = "business/study2", method = RequestMethod.GET)
	public String businessstudy2(HttpServletRequest request,HttpServletResponse response) {
		return "business/study2";
	}

	@RequestMapping(value = "business/study3", method = RequestMethod.GET)
	public String businessstudy3(HttpServletRequest request,HttpServletResponse response) {
		return "business/study3";
	}

	@RequestMapping(value = "business/study4", method = RequestMethod.GET)
	public String businessstudy4(HttpServletRequest request,HttpServletResponse response) {
		return "business/study4";
	}

	@RequestMapping(value = "business/hugonbei", method = RequestMethod.GET)
	public String hugonbei(HttpServletRequest request,HttpServletResponse response) {
		return "business/hugonbei";
	}

	@RequestMapping(value = "czzn", method = RequestMethod.GET)
	public String czzn(HttpServletRequest request,HttpServletResponse response) {
		return "business/czzn";
	}

	@RequestMapping(value = "maintain/getRangeCorps", method = RequestMethod.GET)
	@ResponseBody
	public Object getRangeCorps(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String latitude = request.getParameter("latitude");
			String longitude = request.getParameter("longitude");
			String brand = request.getParameter("magor_brands_lk");
			String star = request.getParameter("star_level");
			String xy = request.getParameter("xy_level");
			String area = request.getParameter("corp_area_eq");
			String type = request.getParameter("type");
			String corpType = request.getParameter("corpType");
			String corpName = request.getParameter("corp_name");
			List list = new ArrayList();
			if("综合检测站".equals(corpType)){
				list = service.getRangeDetects(latitude, longitude, corpName,area, null);
			}else{
				list = service.getRangeCorps(latitude, longitude, brand, star,xy, area, type,corpName,null);
			}
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询范围内企业出错");
		}
	}
	
	
	@RequestMapping(value = "maintain/submitSmfw.do")
	@ResponseBody
	public Object add(HttpServletRequest request,HttpServletResponse response) {
		try{
			WebLoginInfo login = super.getWebLoginInfo();
			if(!"0".equals(login.getUserType())){
				return super.getOutException(null,"个人用户才能提交上门服务信息！");
			}
			TbOnSiteService po = super.getPoByParam(TbOnSiteService.class);
			po.setStatus("10501001");
			po.setUserId(login.getUserId());
			service.saveSmfw(po);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"添加出错");
		}
	}
	
	
	@RequestMapping(value = "maintain/submitYyfw.do")
	@ResponseBody
	public Object addYy(HttpServletRequest request,HttpServletResponse response) {
		try{
			WebLoginInfo login = super.getWebLoginInfo();
			if(!"0".equals(login.getUserType())){
				return super.getOutException(null,"个人用户才能提交上门服务信息！");
			}
			TbOrderService po = super.getPoByParam(TbOrderService.class);
			po.setStatus("10501001");
			po.setUserId(login.getUserId());
			service.saveYyfw(po);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"添加出错");
		}
	}
	
	

}
