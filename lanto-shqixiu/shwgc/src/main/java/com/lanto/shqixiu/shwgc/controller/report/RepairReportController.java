package com.lanto.shqixiu.shwgc.controller.report;

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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.service.report.RepairReportService;



@Controller
@RequestMapping(value="report/repairreport",produces = "text/html;charset=UTF-8")
public class RepairReportController extends BaseCon{

	private Logger logger = Logger.getLogger(RepairReportController.class);// 日志

	@Resource
	private RepairReportService service;

	
	@RequestMapping("getrepairnum")
	@ResponseBody
	public Object getRepairNum(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			List list = service.getRepairNumList(info.getCorpId());
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	@RequestMapping("gettransrepairnum")
	@ResponseBody
	public Object getTransRepairNum(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			List list = service.getTransRepairNum(info.getCorpId());
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

