package com.lanto.shqixiu.shwgm.controller.corp;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.bean.MapNode;
import com.lanto.shqixiu.shwgm.model.bean.VCorpPosition;
import com.lanto.shqixiu.shwgm.model.po.TbBdArea;
import com.lanto.shqixiu.shwgm.model.po.TbCorpPosition;
import com.lanto.shqixiu.shwgm.model.po.TbExamHis;
import com.lanto.shqixiu.shwgm.model.po.TbTransCorpInfo;
import com.lanto.shqixiu.shwgm.service.corp.TransCorpInfoService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/transcorp/tccorpinfo",produces = "text/html;charset=UTF-8")
public class TransCorpInfoController extends BaseCon{

	private Logger logger = Logger.getLogger(TransCorpInfoController.class);// 日志

	@Resource
	private TransCorpInfoService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("history")
	@ResponseBody
	public Object history(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createHistoryWhere(sList,request);
			List list = service.getHistoryList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询历史资料出错");
		}
	}
	
	
	@RequestMapping("videoList")
	@ResponseBody
	public Object videoList(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getVideoList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	
	@RequestMapping("checklist")
	@ResponseBody
	public Object checklist(HttpServletRequest request,HttpServletResponse response) {
		try{
			String corpId = CommonUtils.checkNull(request.getParameter("CORP_ID"));
			List list = service.getCheckList(corpId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取质量信誉考核出错");
		}
	}
	

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			/*String exam = CommonUtils.checkNull(request.getParameter("exams"));
			List<TbExamHis> exams = new ArrayList<TbExamHis>();
			if(!CommonUtils.checkIsNullStr(exam)){
				exams = json.getPojoList(exam, TbExamHis.class);
			}*/
			TbTransCorpInfo po = json.getPojo(data, TbTransCorpInfo.class);
			if(po.getCorpId() != null ){
				//service.update(po,exams,super.getManageLoginInfo());
				service.update(po,super.getManageLoginInfo());
			}else{
				po.setCorpNum(service.getBillID());
				service.save(po);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	/**
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "position", method=RequestMethod.GET)
	public String position(HttpServletRequest request,HttpServletResponse response) {
		String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
		if(!CommonUtils.checkIsNullStr(corpId)){
			TbCorpPosition po = new TbCorpPosition();
			po.setCorpId(corpId);
			po = service.getPositionByPo(po);
			Map map = service.getPosition(corpId);
			request.setAttribute("po", po);
			request.setAttribute("corpId", corpId);
			request.setAttribute("corpName", map.get("CORP_NAME"));
		}
		return "BMap/CorpMap";
	}
	
	@RequestMapping("savePosition")
	@ResponseBody
	public Object savePosition(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbCorpPosition po = json.getPojo(data, TbCorpPosition.class);
			TbCorpPosition con = new TbCorpPosition();
			con.setCorpId(po.getCorpId());
			con = service.getPositionByPo(con);
			if(con == null){
				service.savePosition(po);
			}else{
				service.updatePosition(po);
			}
			
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("getPosition")
	@ResponseBody
	public Object getPosition(HttpServletRequest request,HttpServletResponse response) {
		try{
			String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
			Map map = service.getPosition(corpId);
			return super.getOutData(map);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取企业位置出错");
		}
	}
	
	@RequestMapping("mapTree")
	@ResponseBody
	public Object mapTree(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<TbBdArea> areaList = new ArrayList<TbBdArea>();
			areaList = service.getAllArea();
			MapNode root = new MapNode("广州市","all", "113.30765", "23.120049", "all","images/menus/100202.png");
			List<MapNode> rootchildrens = new ArrayList<MapNode>();
			for(TbBdArea area : areaList){
				MapNode node = new MapNode(area.getAreaName(),area.getAreaCode(),null,null,"area","images/menus/100202.png");
				List<VCorpPosition> corpList = service.getAllPositionToPo(area.getAreaCode());
				List<MapNode> childrens = new ArrayList<MapNode>();
				for(VCorpPosition po : corpList){
					MapNode corp = new MapNode(po.getCorpName(),po.getCorpId(),po.getLongitude(),po.getLatitude(),"corp","images/menus/1002.png");
					childrens.add(corp);
				}
				node.setChildren(childrens);
				rootchildrens.add(node);
			}
			root.setChildren(rootchildrens);
			return super.getOutData(root);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取企业树出错");
		}
	}
	
	@RequestMapping("getAllPosition")
	@ResponseBody
	public Object getAllPosition(HttpServletRequest request,HttpServletResponse response) {
		try{
			String corpArea = CommonUtils.checkNull(request.getParameter("corpArea"));
			List map = service.getAllPosition(corpArea);
			return super.getOutData(map);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取企业位置出错");
		}
	}
	
	@RequestMapping("doPrint")
	@ResponseBody
	public Object doPrint(HttpServletRequest request,HttpServletResponse response) {
		try{	
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String type = CommonUtils.checkNull(request.getParameter("type"));
			TbTransCorpInfo corp = json.getPojo(data, TbTransCorpInfo.class);
			String out = service.createReportXml(corp,type,super.getManageLoginInfo());
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"打印出错");
		}
		
	}
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{	
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			
			String[] title = { "企业编码","企业名称","企业状态","道路经营许可证号","有效开始日期","有效结束日期","所属辖区","企业负责人","负责人电话","企业地址","维修项目种类","经营范围","兼营范围","是否二级维护定点厂","是否LPG定点维修厂",
					"是否危运车辆维修","是否出租车定点维护厂","大中型货车","大中型客车","小型车","尾气资质","教练车维护","是否4S店","是否连锁经营","是否诚信优质"};
			String[] column = { "CORP_NUM","CORP_NAME","STATUS","BUSINESS_NUM","VALID_START_DATE","VALID_END_DATE","CORP_AREA","CHARGE_PERSON","COPR_TEL","CORP_ADD","REPAIR_TYPES","CORP_TYPE",
					"CORP_STYPE","IS_SEC_MAINTAIN","IS_LPG","IS_WYCL","IS_TAX","IS_DZXHC","IS_DZXKC","IS_XXC","IS_WQC","IS_JLC","IS_S4","IS_CHAIN","IS_HONEST"};
			
			String[] recolumn = {"STATUS","CORP_TYPE","CORP_STYPE"};
			String[] chcolumn = {"IS_SEC_MAINTAIN","IS_LPG","IS_WYCL","IS_TAX","IS_DZXHC","IS_DZXKC","IS_XXC","IS_WQC","IS_JLC","IS_S4","IS_CHAIN","IS_HONEST"};
			
			String fileName = "企业基本资料";
			if (data != null) {
				for(Map map : data){
					for(String field : chcolumn){
						String value = CommonUtils.checkNull(map.get(field));
						if("true".equals(value)){
							value = "√";
						}else{
							value = "×";
						}
						map.put(field, value);
					}
					map.put("CORP_AREA", WebCache.getAreaNameByCode(CommonUtils.checkNull(map.get("CORP_AREA"))));
				}
				List<String> titleList = Arrays.asList(title);
				List<String> columnList = Arrays.asList(column);
				List<String> recolumnList = Arrays.asList(recolumn);
				ExcelWriterPoiWriter.writeExcel(titleList, data, fileName, fileName, columnList, null,recolumnList,response);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"导出出错");
		}
		
	}
	
	@RequestMapping("getCorpNum")
	@ResponseBody
	public Object getSet(HttpServletRequest request,HttpServletResponse response) {
		try{
			String new_corp_num = CommonUtils.checkNull(request.getParameter("new_corp_num"));				
			Integer corp_num = service.getCorpNum(new_corp_num);
			return super.getOutData(corp_num);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询企业编号出错");
		}
	}
	
	@RequestMapping("saveCorpNum")
	@ResponseBody
	public Object saveSet(HttpServletRequest request,HttpServletResponse response) {
		try{
			String corp_id = CommonUtils.checkNull(request.getParameter("corp_id"));
			String new_corp_num = CommonUtils.checkNull(request.getParameter("new_corp_num"));			
			service.saveCorpNum(corp_id,new_corp_num);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存新企业编号出错");
		}
	}	

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String corpCode = CommonUtils.checkNull(request.getParameter("CORP_CODE"));
		String corpNum = CommonUtils.checkNull(request.getParameter("CORP_NUM"));
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME"));
		String corpType = CommonUtils.checkNull(request.getParameter("CORP_TYPE"));
		String corpStype = CommonUtils.checkNull(request.getParameter("CORP_STYPE"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String status = CommonUtils.checkNull(request.getParameter("STATUS"));
		String corpQuail = CommonUtils.checkNull(request.getParameter("CORP_QUALI"));
		
		String BUSINESS_NUM = CommonUtils.checkNull(request.getParameter("BUSINESS_NUM"));
		String corpAdd = CommonUtils.checkNull(request.getParameter("CORP_ADD"));
		String trafficUnit = CommonUtils.checkNull(request.getParameter("TRAFFIC_UNIT"));		
		ManageLoginInfo info = super.getManageLoginInfo();
		//每个辖区的操作员进入此功能后，只能查询出本辖区的企业并进行操作。
		if(!"".equals(info.getAreaCode())){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ", info.getAreaCode()));
		}			
		if (!CommonUtils.isNullString(corpNum)){
			sList.add(new SqlUnit("corpNum", " and CORP_NUM like ? ","%" + corpNum.trim() + "%"));
		}
		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ","%" + corpName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(corpAdd)){
			sList.add(new SqlUnit("corpAdd", " and CORP_ADD like ? ","%" + corpAdd + "%"));
		}
		if (!CommonUtils.isNullString(corpType)){
			sList.add(new SqlUnit("corpType", " and CORP_TYPE = ? ", corpType.trim() ));
		}
		if (!CommonUtils.isNullString(corpStype)){
			sList.add(new SqlUnit("corpStype", " and CORP_STYPE = ? ", corpStype.trim() ));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ", corpArea.trim() ));
		}
		if (!CommonUtils.isNullString(status)){
			sList.add(new SqlUnit("STATUS", " and STATUS = ? ", status.trim() ));
		}
		if (!CommonUtils.isNullString(BUSINESS_NUM)){
			sList.add(new SqlUnit("BUSINESS_NUM", " and BUSINESS_NUM = ? ",BUSINESS_NUM));
		}
		if (!CommonUtils.isNullString(trafficUnit)){
			sList.add(new SqlUnit("trafficUnit", " and TRAFFIC_UNIT = ? ", trafficUnit.trim() ));
		}		
		if (!CommonUtils.isNullString(corpQuail)){
			String[] quail = corpQuail.split(",");
			if(quail.length == 1){
				sList.add(new SqlUnit("CORP_QUALI", " and " + quail[0] + " = ? ", "true" ));
			}else{
				for(int i =0;i<quail.length;i++){
					if(i == 0){
						sList.add(new SqlUnit("CORP_QUALI", " and (" + quail[i] + " = ? ", "true" ));
					}else if(i == (quail.length -1)){
						sList.add(new SqlUnit("CORP_QUALI", " and " + quail[i] + " = ? )", "true" ));
					}else{
						sList.add(new SqlUnit("CORP_QUALI", " and " + quail[i] + " = ? ", "true" ));
					}
				}
			}
			
		}
		
	}
	
	private void createHistoryWhere(List<SqlUnit> sList,HttpServletRequest request){
		String corpNum = CommonUtils.checkNull(request.getParameter("CORP_NUM_lk"));
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME_lk"));
		String corpType = CommonUtils.checkNull(request.getParameter("CORP_TYPE_eq"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String status = CommonUtils.checkNull(request.getParameter("STATUS_eq"));
		String applyDate_gte = CommonUtils.checkNull(request.getParameter("APPLY_DATE_gte"));
		String applyDate_lte = CommonUtils.checkNull(request.getParameter("APPLY_DATE_lte"));
		String logType = CommonUtils.checkNull(request.getParameter("LOG_TYPE_eq"));
		ManageLoginInfo info = super.getManageLoginInfo();
		//每个辖区的操作员进入此功能后，只能查询出本辖区的企业并进行操作。
		if(!"".equals(info.getAreaCode())){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ", info.getAreaCode()));
		}		
		if (!CommonUtils.isNullString(corpNum)){
			sList.add(new SqlUnit("corpNum", " and CORP_NUM like ? ","%" + corpNum + "%"));
		}
		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ","%" + corpName + "%"));
		}
		
		if (!CommonUtils.isNullString(corpType)){
			sList.add(new SqlUnit("corpType", " and CORP_TYPE = ? ",corpType));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ",corpArea));
		}
		
		if (!CommonUtils.isNullString(status)){
			sList.add(new SqlUnit("status", " and STATUS = ? ",status));
		}
		if (!CommonUtils.isNullString(applyDate_gte)){
			sList.add(new SqlUnit("applyDate", " and datediff(APPLY_DATE,?) >= 0 ", applyDate_gte ));
		}
		if (!CommonUtils.isNullString(applyDate_lte)){
			sList.add(new SqlUnit("applyDate", " and datediff(APPLY_DATE,?) <= 0 ", applyDate_lte ));
		}
		if (!CommonUtils.isNullString(logType)){
			sList.add(new SqlUnit("logType", " and LOG_TYPE = ? ",logType));
		}
		
	}
}

