package com.lanto.shqixiu.shwgm.controller.trans.vehicle;

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
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.zxing.PlanarYUVLuminanceSource;
import com.lanto.shqixiu.shwgm.model.po.TvVehiclePlan;
import com.lanto.shqixiu.shwgm.service.trans.vehicle.VehiclePlanService;
import com.lanto.shqixiu.shwgm.util.excel.ExcelWriterPoiWriter;


@Controller
@RequestMapping(value="trans/vehicle/vehicleplan",produces = "text/html;charset=UTF-8")
public class VehiclePlanController extends BaseCon{

	private Logger logger = Logger.getLogger(VehiclePlanController.class);// 日志

	@Resource
	private VehiclePlanService service;

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
	
	@RequestMapping("toPlanList")
	@ResponseBody
	public Object toPlanList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String plateNum = CommonUtils.checkNull(request.getParameter("plateNum"));
			TransLoginInfo info = super.getTransLoginInfo();
			List list = service.toPlanList(info.getCorpId(),plateNum);
			return super.getOutData(list);
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
			TvVehiclePlan po = json.getPojo(data, TvVehiclePlan.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getPlanId())){
				po.setCreateDate(new Date());
				service.update(po);
			}else{
				po.setDjStatus("10191001");	//添加于2017-02-10  设置默认状态为非提交
				po.setCreateDate(new Date());
				po.setStatus("10011001");
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
	
	@RequestMapping("commitPlan")
	@ResponseBody
	public Object commitPlan(HttpServletRequest request,HttpServletResponse response) {
		try{
			String id = CommonUtils.checkNull(request.getParameter("id"));
			TvVehiclePlan vehiclePlan = new TvVehiclePlan();
			vehiclePlan.setPlanId(Integer.parseInt(id));
			vehiclePlan.setDjStatus("10191002");  //改变提交状态
			service.update(vehiclePlan);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"更新出错");
		}
	}
	
	@RequestMapping("doExport")
	@ResponseBody
	public Object doExport(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List<Map<String, Object>> data = service.doExport(sList);
			String[] title = { "车牌号","车牌颜色","车辆类型","厂家","品牌","车型","维护周期","维护里程","单据状态" };
			String[] column = { "PLATE_NUM","PLATE_COLOR","VEHICLE_TYPE","VENDER_","BRAND_","XM_","REPAIR_CYCLE","REPAIR_MILEAGE","DJ_STATUS" };
			//数据字典中的字段需转化成中文（如果导出的字段中有字典数据的请自行添加）
			String[] recolumn = { "PLATE_COLOR", "VEHICLE_TYPE","DJ_STATUS","VENDER_"};
			String fileName = "车辆维护计划";
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
//		String PLATE_NUM = CommonUtils.checkNull(request.getParameter("PLATE_NUM"));
//		String PLATE_COLOR = CommonUtils.checkNull(request.getParameter("PLATE_COLOR"));
//		String VEHICLE_TYPE = CommonUtils.checkNull(request.getParameter("VEHICLE_TYPE"));
//		
//		
//		
//		if (!CommonUtils.isNullString(PLATE_NUM)){
//			sList.add(new SqlUnit("PLATE_NUM", " and PLATE_NUM like ? ","%" + PLATE_NUM.trim() + "%"));
//		}
//		if (!CommonUtils.isNullString(PLATE_COLOR)){
//			sList.add(new SqlUnit("PLATE_COLOR", " and PLATE_COLOR = ? ", PLATE_COLOR.trim()));
//		}
//		if (!CommonUtils.isNullString(VEHICLE_TYPE)){
//			sList.add(new SqlUnit("VEHICLE_TYPE", " and VEHICLE_TYPE = ? ",VEHICLE_TYPE.trim()));
//		}
		super.createWhere(sList);
		sList.add(new SqlUnit("CORP_ID", " and TRANS_CORP_ID = ? ", super.getTransLoginInfo().getCorpId()));
	}
}

