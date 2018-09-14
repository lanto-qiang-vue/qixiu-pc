package com.lanto.shqixiu.shwgm.controller.manage.corp;

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
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.service.manage.corp.TbCorpInfoService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/corp/corpinfo",produces = "text/html;charset=UTF-8")
public class TbCorpInfoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpInfoController.class);// 日志

	@Resource
	private TbCorpInfoService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit,info.getAreaCode());
			//解密企业配额
			for(int i=0;i<list.size();i++){
				Map map=(Map)list.get(i);
				String val1=(String)map.get("CREATE_QUATO_COUNT");
				if(val1==null || "".equals(val1)){
					map.put("CREATE_QUATO_COUNT", 0);
				}else{
					String count1 = SecurityEncode.decoderByDES(val1, SecurityEncode.DES_KEY);
					if("".equals(count1)){
						map.put("CREATE_QUATO_COUNT", 0);
					}else{
						if(Integer.parseInt(count1.split(",")[1])==(Integer)map.get("CORP_ID")){
							map.put("CREATE_QUATO_COUNT", count1.split(",")[0]);
						}else{
							map.put("CREATE_QUATO_COUNT", 0);
						}
					} 
				}
				String val2=(String)map.get("UPLOAD_QUATO_COUNT");
				if(val2==null || "".equals(val2)){
					map.put("UPLOAD_QUATO_COUNT", 0);
				}else{
					String count2 = SecurityEncode.decoderByDES(val2, SecurityEncode.DES_KEY);
					if("".equals(count2)){
						map.put("UPLOAD_QUATO_COUNT", 0);
					}else{
						if(Integer.parseInt(count2.split(",")[1])==(Integer)map.get("CORP_ID")){
							map.put("UPLOAD_QUATO_COUNT", count2.split(",")[0]);
						}else{
							map.put("UPLOAD_QUATO_COUNT", 0);
						}
					} 
				}
				String val3=(String)map.get("SEARCH_QUATO_COUNT");
				if(val3==null || "".equals(val3)){
					map.put("SEARCH_QUATO_COUNT", 0);
				}else{
					String count3 = SecurityEncode.decoderByDES(val3, SecurityEncode.DES_KEY);
					if("".equals(count3)){
						map.put("SEARCH_QUATO_COUNT", 0);
					}else{
						if(Integer.parseInt(count3.split(",")[1])==(Integer)map.get("CORP_ID")){
							map.put("SEARCH_QUATO_COUNT", count3.split(",")[0]);
						}else{
							map.put("SEARCH_QUATO_COUNT", 0);
						}
					} 
				}
			}
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
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
			TbCorpInfo po = json.getPojo(data, TbCorpInfo.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getCorpId())){
				service.update(po,super.getManageLoginInfo());
			}else{
				service.save(po,super.getManageLoginInfo());
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
		String isview = CommonUtils.checkNull(request.getParameter("isview"));
		if(!CommonUtils.checkIsNullStr(corpId)){
			TbCorpInfo po = service.getModel(corpId);
			request.setAttribute("model", po);
		}
		request.setAttribute("isview", isview);
		return "BMap/CorpInfoMap";
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
	

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
	

}

