package com.lanto.shqixiu.shwgm.controller.trans.report;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.SqlUnit;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.VTransRepairReport;
import com.lanto.shqixiu.shwgm.service.trans.report.TransRepairReportService;


@Controller
@RequestMapping(value="trans/report/repairreport/",produces = "text/html;charset=UTF-8")
public class TransRepairReportController extends BaseCon{

	private Logger logger = Logger.getLogger(TransRepairReportController.class);// 日志

	@Resource
	private TransRepairReportService service;

	@RequestMapping("getinfo")
	@ResponseBody
	public Object getInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			VTransRepairReport po=new VTransRepairReport();
			TransLoginInfo info=super.getTransLoginInfo();
			po.setCorpId(Integer.parseInt(info.getCorpId()));
			po=service.getInfo(po);
			return super.getOutData(po);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"受理出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

