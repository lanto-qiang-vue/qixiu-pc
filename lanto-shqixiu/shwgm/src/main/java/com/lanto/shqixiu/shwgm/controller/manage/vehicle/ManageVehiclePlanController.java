package com.lanto.shqixiu.shwgm.controller.manage.vehicle;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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

import com.lanto.shqixiu.shwgm.model.po.TbVehicleYearCheck;
import com.lanto.shqixiu.shwgm.model.po.TvVehiclePlan;
import com.lanto.shqixiu.shwgm.service.manage.vehicle.ManageVehiclePlanService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="manage/vehicle/vehicleplan",produces = "text/html;charset=UTF-8")
public class ManageVehiclePlanController extends BaseCon{

	private Logger logger = Logger.getLogger(ManageVehiclePlanController.class);// 日志

	@Resource
	private ManageVehiclePlanService service;

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
	
	@RequestMapping("toPlanList")
	@ResponseBody
	public Object toPlanList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String plateNum = CommonUtils.checkNull(request.getParameter("plateNum"));
			List list = service.toPlanList(plateNum);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("getvehiclestatus")
	@ResponseBody
	public Object getVehicleStatus(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer vehicleId = Integer.parseInt(CommonUtils.checkNull(request.getParameter("VEHICLE_ID")));
			TvVehiclePlan po=new TvVehiclePlan();
			po.setVehicleId(vehicleId);
			po=service.getModel(po);
			//if()
			if(po!=null){
				return super.getOutData(json.toMap(po));
			}else{
				return super.getOutData(null);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取车辆信息出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String year = CommonUtils.checkNull(request.getParameter("year"));
			TvVehiclePlan po = json.getPojo(data, TvVehiclePlan.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getPlanId())){
				po.setCreateDate(new Date());
				service.update(po);
			}else{
				po.setCreateDate(new Date());
				po.setStatus("10011001");
				po.setPlanYear(year);
				po.setDjStatus("10191002");
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
			String[] title = { "车辆ID","厂家","品牌","车型","车牌号","车牌颜色","车辆类型","营运状态","区县","道路运输证号","驾驶员","底盘号","发动机号","燃料类型","车辆吨位","座（卧）位","使用类别","发证日期","审验日期","审验结果" };
			String[] column = { "VEHICLE_ID","VENDER","BRAND","XM","PLATE_NUM","PLATE_COLOR","VEHICLE_TYPE","STATUS","COUNTY","LOAD_CERT_NUM","UNIT_NAME","CHASSIS_NUM","ENGINE_NUM","FUEL_TYPE","TONNAGE","SEAT","USE_TYPE","CERT_DATE","CHECK_DATE","CHECK_RESULT" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = { "PLATE_COLOR", "VEHICLE_TYPE","STATUS","FUEL_TYPE"};
			String fileName = "车辆基本档案";
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
		super.createWhere(sList);
		
	}
}

