package com.lanto.shqixiu.shwgm.controller.manage.report;

import java.util.ArrayList;
import java.util.List;

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

import com.lanto.shqixiu.shwgm.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgm.model.po.VRepairQuestions;
import com.lanto.shqixiu.shwgm.service.manage.publicservice.RepairQuestionsService;
import com.lanto.shqixiu.shwgm.service.manage.publicservice.VRepairQuestionsService;
import com.lanto.shqixiu.shwgm.service.manage.report.CorpNumReportService;


@Controller
@RequestMapping(value="manage/report/corpnumreport",produces = "text/html;charset=UTF-8")
public class CorpNumReportController extends BaseCon{

	private Logger logger = Logger.getLogger(CorpNumReportController.class);// 日志

	@Resource
	private CorpNumReportService service;

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


	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

