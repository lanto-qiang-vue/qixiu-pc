package com.lanto.shqixiu.shcheck.controller.check;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.CheckLoginInfo;
import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.po.TbCheckRecords;
import com.lanto.shqixiu.shcheck.service.check.TbCheckRecordsService;


@Controller
@RequestMapping(value="check/checkrecord",produces = "text/html;charset=UTF-8")
public class TbCheckRecordsController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCheckRecordsController.class);// 日志

	@Resource
	private TbCheckRecordsService service;

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

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer recordId=0;
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbCheckRecords po = json.getPojo(data, TbCheckRecords.class);
			CheckLoginInfo info = super.getCheckLoginInfo();
			if(po.getCheckId() != null ){
				service.update(po,info);
			}else{
				recordId=service.save(po,info);
			}
			return super.getOutData(recordId);
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
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

