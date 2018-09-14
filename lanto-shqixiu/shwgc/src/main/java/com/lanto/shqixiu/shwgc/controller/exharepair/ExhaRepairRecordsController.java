package com.lanto.shqixiu.shwgc.controller.exharepair;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.po.TbExhaustRepairRecords;
import com.lanto.shqixiu.shwgc.model.report.CertRecord;
import com.lanto.shqixiu.shwgc.service.exharepair.ExhaRepairRecordsService;


@Controller
@RequestMapping(value="exharepair/repairrecords",produces = "text/html;charset=UTF-8")
public class ExhaRepairRecordsController extends BaseCon{

	private Logger logger = Logger.getLogger(ExhaRepairRecordsController.class);// 日志

	@Resource
	private ExhaRepairRecordsService service;

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


	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("submit")
	@ResponseBody
	public Object submit(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.submit(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"提交出错");
		}
	}
	
	@RequestMapping("getInfo")
	@ResponseBody
	public Object getInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer vehicleId = Integer.parseInt(CommonUtils.checkNull(request.getParameter("VEHICLE_ID")));
			TbExhaustRepairRecords po=new TbExhaustRepairRecords();
			po.setVehicleId(vehicleId);
			po=service.getInfo(po);
			if(po!=null){
				return super.getOutData(json.toMap(po));
			}else{
				return super.getOutData(null);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"提交出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer recordId=0;
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbExhaustRepairRecords po = json.getPojo(data, TbExhaustRepairRecords.class);
			ClientLoginInfo info = super.getClientLoginInfo();
			if(CommonUtils.checkIsNotNullAndZero(po.getRecordId())){
				service.update(po,info);
			}else{
				recordId=service.save(po,info);
				/*if(result != null){
					return super.getOutException(null,result);
				}*/
			}
			return super.getOutData(recordId);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("print")
	public Object print(HttpServletRequest request,HttpServletResponse response) {
		try{
			String flag = CommonUtils.checkNull(request.getParameter("flag"));
			Integer recordId = Integer.parseInt(CommonUtils.checkNull(request.getParameter("recordId")));
			if("IE".equals(flag)){
				request.setAttribute("printType", "open");
			}
			String desId = SecurityEncode.encoderByDES("P" + recordId, SecurityEncode.DES_KEY);
			CertRecord data = service.updatePrintByPage(super.getClientLoginInfo().getCorpId(),recordId);
			request.setAttribute("data", data);
			request.setAttribute("geneId", recordId);
			request.setAttribute("cpurlDP", "http://121.8.227.203:811/gzwgcx/info<br/>/comment/add/");
			request.setAttribute("cpurl", "http://121.8.227.203:811/gzwgcx/info/comment/add/" + desId);
			return "print/geneRepair";
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"车辆普通维修打印出错");
		}
		
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

