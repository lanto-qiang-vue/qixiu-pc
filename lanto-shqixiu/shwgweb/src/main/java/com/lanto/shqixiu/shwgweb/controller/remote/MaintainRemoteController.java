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

import com.lanto.shqixiu.shwgweb.service.MaintainService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@RestController
@RequestMapping(value="remote/maintain",produces = "text/html;charset=UTF-8")
public class MaintainRemoteController extends BaseCon {
	private Logger logger = Logger.getLogger(MaintainRemoteController.class);// 日志
	
	@Resource
	private MaintainService service;
	
	@RequestMapping(value = "getCorpPageList")
	public Object getCorpPageList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getCorpPageList(sList, pUnit);
			return super.getRestPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("分页查询企业信息出错");
		}
	}
	
	
	@RequestMapping(value = "corpDetail")
	public Object corpDetail(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
			Map data = service.getCorpDetail(corpId);
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			out.put("data", data);
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询企业详情出错");
		}
	}
	
	@RequestMapping(value = "getRangeCorps")
	public Object getRangeCorps(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String latitude = request.getParameter("latitude");
			String longitude = request.getParameter("longitude");
			String brand = request.getParameter("magor_brands_lk");
			String star = request.getParameter("star_level");
			String xy = request.getParameter("xy_level");
			String area = request.getParameter("corp_area_eq");
			String type = request.getParameter("type");
			String corpName = request.getParameter("corp_name");
			List corplist = service.getRangeCorps(latitude, longitude, brand, star,xy, area, type,corpName,"50000");
			return super.getRestData(corplist);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询范围内企业出错");
		}
	}
	
	@RequestMapping(value = "getRangeDetects")
	public Object getRangeDetects(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String latitude = request.getParameter("latitude");
			String longitude = request.getParameter("longitude");
			String area = request.getParameter("corp_area_eq");
			String station_name = request.getParameter("station_name");
			List corplist = service.getRangeDetects(latitude, longitude,station_name,area,"50000");
			return super.getRestData(corplist);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询范围内检测站出错");
		}
	}
	
	@RequestMapping(value = "areaList")
	public Object areaList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List arealist = service.getAreaList();
			return super.getRestData(arealist);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询辖区出错");
		}
	}
	
	@RequestMapping(value = "typeList")
	public Object typeList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
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
			
			List<Map> list = new ArrayList();
			list.add(type1);
			list.add(type2);
			list.add(type3);
			list.add(type4);
			list.add(type5);
			
			return super.getRestData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询类型出错");
		}
	}
	
	@RequestMapping(value = "brandList")
	public Object brandList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List brandList = new ArrayList();
			return super.getRestData(brandList);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询品牌信息出错");
		}
	}

	@RequestMapping(value = "conditionList")
	public Object conditionList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List arealist = service.getAreaList();
			
			List brandList = new ArrayList();
			
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
			
			List<Map> starList = new ArrayList();
			for(int i=0;i<5;i++){
				Map s = new HashMap();
				s.put("CODE", (i+1) + "");
				s.put("NAME", (i+1) + "星");
				starList.add(s);
			}
			
			Map area = new HashMap();
			area.put("title", "辖区");
			area.put("filter_name", "corp_area_eq");
			area.put("data", arealist);
			
			Map type = new HashMap();
			area.put("title", "类型");
			area.put("filter_name", "type");
			area.put("data", typeList);
			
			Map brand = new HashMap();
			brand.put("title", "品牌");
			brand.put("filter_name", "magor_brands_lk");
			brand.put("data", brandList);
			
			Map star = new HashMap();
			star.put("title", "星级");
			star.put("filter_name", "star_level");
			star.put("data", starList);
			
			List conditionList = new ArrayList();
			conditionList.add(area);
			conditionList.add(type);
			conditionList.add(brand);
			conditionList.add(star);
			
			return super.getRestData(conditionList);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询条件信息出错");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String latitude = request.getParameter("latitude");
		String longitude = request.getParameter("longitude");
		if("".equals(latitude)){
			latitude = null;
		}
		if("".equals(longitude)){
			longitude = null;
		}
		sList.add(new SqlUnit("latitude", "", latitude));
		sList.add(new SqlUnit("longitude", "", longitude));
		super.createWhere(sList);
		sList.add(new SqlUnit("isJOin", "AND IS_JOIN=?", "10041001"));
		
		String type = request.getParameter("type");
		String star = request.getParameter("star_level");
		
		if(!CommonUtils.checkIsNullStr(star)){
			sList.add(new SqlUnit("STAR_LEVEL", " and STAR_LEVEL = ? ", Integer.valueOf(star)*2));
		}
		if(!CommonUtils.checkIsNullStr(type)){
			String para = "true";
			if("IS4S".equals(type)){
				para = "10041001";
			}
			sList.add(new SqlUnit("type", "and " + type +" = ? ", para));
		}
	}

}
