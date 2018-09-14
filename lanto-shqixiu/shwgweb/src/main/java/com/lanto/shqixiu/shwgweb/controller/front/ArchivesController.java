package com.lanto.shqixiu.shwgweb.controller.front;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lanto.shqixiu.shwgweb.service.UtilService;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.convert.JsonConverter;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairRecords;
import com.lanto.shqixiu.shwgweb.service.ArchivesService;
import com.lanto.shqixiu.shwgweb.service.SendMessageService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="",produces = "text/html;charset=UTF-8")
public class ArchivesController extends BaseCon {
	private Logger logger = Logger.getLogger(ArchivesController.class);// 日志
	
	@Resource
	private ArchivesService service;
	
	@Resource
	private SendMessageService sendMessageService;

	@Resource
	private UtilService utilService;

	@RequestMapping(value = "archives", method = RequestMethod.GET )
	public String archives(HttpServletRequest request,HttpServletResponse response) throws Exception {
		WebLoginInfo login = super.getWebLoginInfo();
		if(login == null || login.getUserId() == null){
			String reUrl = utilService.transform(request.getRequestURI());
			return "redirect:/toLogin?reUrl=" + reUrl;
		}
		List<Map> vehs = service.getMyVehicles(login.getUserId().toString());
		for(Map veh : vehs){
			veh.put("PLATE_COLOR_", WebCache.getDictDescById(CommonUtils.checkNull(veh.get("PLATE_COLOR"))));
		}
		JsonConverter jc = new JsonConverter();
		request.setAttribute("datas", new String(jc.sourceToDest(vehs),"UTF-8"));
		request.setAttribute("nav_menu_index", 3);
		return "vehicle/archives";
	}
	
	@RequestMapping(value = "archives/selectVehList.do")
	@ResponseBody
	public Object selectVehList(HttpServletRequest request,HttpServletResponse response) {
		try{
			WebLoginInfo login = super.getWebLoginInfo();
			List<Map> vehs = service.getMyVehicles(login.getUserId().toString());
			for(Map veh : vehs){
				veh.put("PLATE_COLOR_", WebCache.getDictDescById(CommonUtils.checkNull(veh.get("PLATE_COLOR"))));
			}
			return super.getOutData(vehs);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询车辆档案出错");
		}
	}
	
	@RequestMapping(value = "archives/selectVeh.do")
	@ResponseBody
	public Object selectVeh(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			WebLoginInfo login = super.getWebLoginInfo();
			service.updateSelect(vehId, login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"选择车辆档案出错");
		}
	}
	
	@RequestMapping(value = "archives/bind.do")
	@ResponseBody
	public Object bind(HttpServletRequest request,HttpServletResponse response) {
		try{
			WebLoginInfo login = super.getWebLoginInfo();
			String platenum = CommonUtils.checkNull(request.getParameter("platenum"));
			String vin = CommonUtils.checkNull(request.getParameter("vin"));
			TbPrivateVehicle veh = new TbPrivateVehicle();
			veh.setPlateNum(platenum);
			veh.setVin(vin);
			CallResult result = service.updateBind(veh,login);
			if(!result.isSuccess()){
				Map out = new HashMap();
				out.put("tip", result.getTip());
				out.put("error_code", result.get("error_code"));
				return super.getOutData(out);
			}
			Map out = json.toMap(veh);
			out.put("PLATE_COLOR_", WebCache.getDictDescById(CommonUtils.checkNull(out.get("PLATE_COLOR"))));
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"绑定出错");
		}
	}
	
	@RequestMapping(value = "archives/add.do")
	@ResponseBody
	public Object add(HttpServletRequest request,HttpServletResponse response) {
		try{
			WebLoginInfo login = super.getWebLoginInfo();
			TbPrivateVehicle veh = super.getPoByParam(TbPrivateVehicle.class);
			veh.setUserId(login.getUserId());
			veh.setBindDate(new Date());
			veh.setCreateTime(new Date());
			CallResult result = service.saveVeh(veh);
			if(!result.isSuccess()){
				return super.getOutException(null,result.getTip());
			}
			Map out = json.toMap(veh);
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"添加出错");
		}
	}
	
	@RequestMapping(value = "archives/delVeh.do")
	@ResponseBody
	public Object delVeh(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			service.delete(vehId);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"解除绑定出错");
		}
	}
	
	@RequestMapping(value = "archives/applyUnbindVeh.do")
	@ResponseBody
	public Object applyUnbindVeh(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
			String randNum = (String)request.getSession().getAttribute("vehicle_rand_code_session");
			if(CommonUtils.checkIsNullStr(randNum)){
				return super.getOutException(null,"手机短信验证码已失效！");
			}
			if(!randCode.equals(randNum)){
				return super.getOutException(null,"手机短信验证码错误！");
			}
			service.delete(vehId);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"解除绑定出错");
		}
	}
	
	@RequestMapping(value = "archives/getRandCode.do")
	@ResponseBody
	public Object getRandCode(HttpServletRequest request,HttpServletResponse response) {
		try{
			String platenum = CommonUtils.checkNull(request.getParameter("platenum"));
			String vin = CommonUtils.checkNull(request.getParameter("vin"));
			CallResult result = service.searchVehUser(platenum,vin);
			if(!result.isSuccess()){
				return super.getOutException(null,result.getTip());
			}
			TbPrivateVehicle veh = (TbPrivateVehicle)result.get("veh");
//			TgSysUser user = (TgSysUser)result.get("user");
			String randNum = getRandNum(6);
			String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内填写";
			request.getSession().setAttribute("vehicle_rand_code_session", randNum);
			String ret = sendMessageService.send(message, veh.getOwnerPhone());
//			logger.info(randNum);
			if(ret != null){
				logger.info(ret);
				return super.getOutException(null, "短信发送失败!" + ret);
			}
			Map out = new HashMap();
			out.put("vehId", veh.getVehicleId());
			out.put("phone", formatPhone(veh.getOwnerPhone(),3,4));
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取验证码出错");
		}
	}
	
	
	@RequestMapping(value = "archives/vehDetail.do")
	@ResponseBody
	public Object vehDetail(HttpServletRequest request,HttpServletResponse response) {
		try{
			String vehId = CommonUtils.checkNull(request.getParameter("vehId"));
			CallResult result = service.getVehDetail(vehId);
			if(!result.isSuccess()){
				return super.getOutException(null,result.getTip());
			}
			TbPrivateVehicle veh = (TbPrivateVehicle)result.get("veh");
			List list = (List)result.get("list");
			Map out = new HashMap();
			out.put("veh", veh);
			out.put("list", list);
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"加载档案数据出错");
		}
	}
	
	@RequestMapping(value = "archives/submitComment.do")
	@ResponseBody
	public Object submitComment(HttpServletRequest request,HttpServletResponse response) {
		try{
			String recordId = CommonUtils.checkNull(request.getParameter("recordId"));
			String score = CommonUtils.checkNull(request.getParameter("score"));
			String content = CommonUtils.checkNull(request.getParameter("content"));
			WebLoginInfo login = super.getWebLoginInfo();
			if(login == null){
				login = new WebLoginInfo();
			}
			CallResult result = service.submitComment(recordId,score,content,login);
			if(!result.isSuccess()){
				return super.getOutException(null,result.getTip());
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"评价出错");
		}
	}
	
	
	
	@RequestMapping(value = "archives/phone/detail/{vehId}", method = RequestMethod.GET )
	public String phoneDetail(@PathVariable("vehId") String vehId,HttpServletRequest request,HttpServletResponse response)  {
		CallResult result = service.getVehDetail(vehId);
		if(result.isSuccess()){
			TbPrivateVehicle veh = (TbPrivateVehicle)result.get("veh");
			List list = (List)result.get("list");
			request.setAttribute("veh", veh);
			request.setAttribute("list", list);
			if(veh != null && veh.getBuyTime() != null){
				request.setAttribute("buytime", CommonUtils.printDate(veh.getBuyTime()));
			}
		}
		return "phone/vehDetail";
	}
	
	@RequestMapping(value = "archives/getRepairRecord.do")
	@ResponseBody
	public Object getRepairRecord(HttpServletRequest request,HttpServletResponse response) {
		try{
			String recordId = CommonUtils.checkNull(request.getParameter("recordId"));
			CallResult result = service.getRecordInfo(recordId);
			if(!result.isSuccess()){
				return super.getOutException(null,result.getTip());
			}
			TbRepairRecords record = (TbRepairRecords)result.get("record");
			Map info = json.toMapByPo(record);
			info.put("status", WebCache.getDictDescById(CommonUtils.checkNull(record.getStatus())));
			Map out = new HashMap();
			out.put("record", info);
			out.put("itemList", result.get("itemList"));
			out.put("partList", result.get("partList"));
			out.put("imageList", result.get("imageList"));
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"加载维修数据出错");
		}
	}
	
	public static String formatPhone(String cert,int start,int len){
		cert = CommonUtils.checkNull(cert);
		if(cert.length() < (start + len)){
			return cert;
		}
		StringBuffer stb = new StringBuffer(cert);
		for(int i=0;i<len;i++){
			stb.deleteCharAt(start);
		}
		for(int i=0;i<len;i++){
			stb.insert(start, "*");
		}
		return stb.toString();
	}
	
	private String getRandNum(int charCount) {
        String charValue = "";
        for (int i = 0; i < charCount; i++) {
            char c = (char) (randomInt(0, 10) + '0');
            charValue += String.valueOf(c);
        }
        return charValue;
    }
	private int randomInt(int from, int to) {
        Random r = new Random();
        return from + r.nextInt(to - from);
    }

}
