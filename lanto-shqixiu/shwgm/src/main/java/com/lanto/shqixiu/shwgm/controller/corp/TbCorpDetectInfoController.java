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
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbCorpDetectInfo;
import com.lanto.shqixiu.shwgm.service.corp.TbCorpDetectInfoService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/corp/tbcorpdetectinfo",produces = "text/html;charset=UTF-8")
public class TbCorpDetectInfoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpDetectInfoController.class);// 日志

	@Resource
	private TbCorpDetectInfoService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info=super.getManageLoginInfo();
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit,info.getAreaCode());
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbCorpDetectInfo po = json.getPojo(data, TbCorpDetectInfo.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getStationId())){
				service.update(po);
			}else{
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
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			String[] title = { "检测站名称","检测站简称","联系方式","传真","检测站地址","所属辖区" };
			String[] column = { "STATION_NAME","STATION_NAME_JC","STATION_TEL","STATION_FAL","STATION_ADDRESS","STATION_AREA" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = {  };
			String fileName = "综合性能检测站";
			if (data != null) {
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
		String stationName = CommonUtils.checkNull(request.getParameter("STATION_NAME_lk"));
		String stationNameJc = CommonUtils.checkNull(request.getParameter("STATION_NAME_JC_lk"));
		String longitude = CommonUtils.checkNull(request.getParameter("LONGITUDE_lk"));
		String latitude = CommonUtils.checkNull(request.getParameter("LATITUDE_lk"));
		String stationAddress = CommonUtils.checkNull(request.getParameter("STATION_ADDRESS_lk"));
		String stationArea = CommonUtils.checkNull(request.getParameter("STATION_AREA_eq"));


		if (!CommonUtils.isNullString(stationName)){
			sList.add(new SqlUnit("stationName", " and STATION_NAME like ? ","%" + stationName + "%"));
		}
		if (!CommonUtils.isNullString(stationNameJc)){
			sList.add(new SqlUnit("stationNameJc", " and STATION_NAME_JC like ? ","%" + stationNameJc + "%"));
		}
		if (!CommonUtils.isNullString(longitude)){
			sList.add(new SqlUnit("longitude", " and LONGITUDE like ? ","%" + longitude + "%"));
		}
		if (!CommonUtils.isNullString(latitude)){
			sList.add(new SqlUnit("latitude", " and LATITUDE like ? ","%" + latitude + "%"));
		}
		if (!CommonUtils.isNullString(stationAddress)){
			sList.add(new SqlUnit("stationAddress", " and STATION_ADDRESS like ? ","%" + stationAddress + "%"));
		}
		if (!CommonUtils.isNullString(stationArea)){
			sList.add(new SqlUnit("stationArea", " and STATION_AREA = ? ",stationArea));
		}

	}
}

