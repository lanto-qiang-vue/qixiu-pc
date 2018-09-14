package com.lanto.shqixiu.shcheck.controller.transrepair;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.po.TbTransRepairRecords;
import com.lanto.shqixiu.shcheck.service.corp.TbCorpInfoService;
import com.lanto.shqixiu.shcheck.service.transrepair.TransRepairRecordsService;


@Controller
@RequestMapping(value="transrepair/repairrecords",produces = "text/html;charset=UTF-8")
public class TransRepairRecordsController extends BaseCon{

	private Logger logger = Logger.getLogger(TransRepairRecordsController.class);// 日志

	@Resource
	private TransRepairRecordsService service;
	@Resource
	private TbCorpInfoService corpService;

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
			CheckLoginInfo info = super.getCheckLoginInfo();
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
			CheckLoginInfo info = super.getCheckLoginInfo();
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
			TbTransRepairRecords po=new TbTransRepairRecords();
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
	
	

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

