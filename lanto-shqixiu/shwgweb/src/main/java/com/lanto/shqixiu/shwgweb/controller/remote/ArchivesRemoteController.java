package com.lanto.shqixiu.shwgweb.controller.remote;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.utils.CommonUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgweb.service.ArchivesService;
/**
 * 
 * @user : liuxin
 * @date : 2017-05-11
 */

@RestController
@RequestMapping(value="remote/archives",produces = "text/html;charset=UTF-8")
public class ArchivesRemoteController extends BaseCon {
	private Logger logger = Logger.getLogger(ArchivesRemoteController.class);// 日志
	
	@Resource
	private ArchivesService service;
	
	@RequestMapping(value = "myVehicleList")
	public Object myVehicles(HttpServletRequest request,HttpServletResponse response) {
		try{
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			List<Map> vehs = service.getMyVehicles(token.getUserId().toString());
			for(Map veh : vehs){
				veh.put("PLATE_COLOR_", WebCache.getDictDescById(CommonUtils.checkNull(veh.get("PLATE_COLOR"))));
			}
			return super.getRestData(vehs);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询车辆档案出错");
		}
	}
	
	
	@RequestMapping(value = "selectVehicle")
	public Object selectVeh(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicleId"));
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			TbPrivateVehicle veh = service.updateSelect(vehId, token);
			Map data = json.toMap(veh);
			data.put("PLATE_COLOR_", WebCache.getDictDescById(CommonUtils.checkNull(data.get("PLATE_COLOR"))));
			Map out = new HashMap();
			out.put("data", data);
			out.put("error_code", "0");
			out.put("error_message", "");
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("选择车辆档案出错");
		}
	}
	
	@RequestMapping(value = "bindVehicle")
	@ResponseBody
	public Object bind(HttpServletRequest request,HttpServletResponse response) {
		try{
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			String platenum = CommonUtils.checkNull(request.getParameter("platenum"));
			String vin = CommonUtils.checkNull(request.getParameter("vin"));
			TbPrivateVehicle veh = new TbPrivateVehicle();
			veh.setPlateNum(platenum);
			veh.setVin(vin);
			String tip = service.updateBind(veh,token);
			if(tip != null){
				return super.getRestException(tip);
			}
			Map data = json.toMap(veh);
			data.put("PLATE_COLOR_", WebCache.getDictDescById(CommonUtils.checkNull(data.get("PLATE_COLOR"))));
			Map out = new HashMap();
			out.put("data", data);
			out.put("error_code", "0");
			out.put("error_message", "");
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("绑定出错");
		}
	}
	
	@RequestMapping(value = "delVehicle")
	@ResponseBody
	public Object delVeh(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehicleId"));
			service.delete(vehId);
			return super.getRestData("解除绑定成功！");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("解除绑定出错");
		}
	}
	
	@RequestMapping(value = "detailPage")
	public Object detailPage(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String vehicleId = CommonUtils.checkNull(request.getParameter("vehicleId"));
			StringBuffer url = request.getRequestURL();  
			String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append(request.getSession().getServletContext().getContextPath()).append("/").toString();
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			Map data = new HashMap();
			data.put("link_url", tempContextUrl + "archives/phone/detail/" + vehicleId);
			out.put("data", data);
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询信息发布详情出错");
		}
	}

}
