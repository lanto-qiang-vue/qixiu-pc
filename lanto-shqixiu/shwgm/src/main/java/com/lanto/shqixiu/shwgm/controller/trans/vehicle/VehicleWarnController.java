package com.lanto.shqixiu.shwgm.controller.trans.vehicle;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.service.trans.vehicle.VehicleWarnService;


@Controller
@RequestMapping(value="trans/vehicle/vehiclewarn",produces = "text/html;charset=UTF-8")
public class VehicleWarnController extends BaseCon{

	private Logger logger = Logger.getLogger(VehicleWarnController.class);// 日志

	@Resource
	private VehicleWarnService service;

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
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
		sList.add(new SqlUnit("CORP_ID", " and TRANS_CORP_ID = ? ", super.getTransLoginInfo().getCorpId()));
		sList.add(new SqlUnit("status", " and status = ? ", "10081001"));
	//	sList.add(new SqlUnit("MONTH_DIFF", " and MONTH_DIFF <= ? ", 0));
	}
}

