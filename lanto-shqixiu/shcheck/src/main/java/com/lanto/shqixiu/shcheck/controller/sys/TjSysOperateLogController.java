package com.lanto.shqixiu.shcheck.controller.sys;

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

import com.lanto.shqixiu.shcheck.model.po.TjSysOperateLog;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;


@Controller
@RequestMapping(value="check/sys/tqsysoperatelog",produces = "text/html;charset=UTF-8")
public class TjSysOperateLogController extends BaseCon{

	private Logger logger = Logger.getLogger(TjSysOperateLogController.class);// 日志

	@Resource
	private TjSysOperateLogService service;

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
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TjSysOperateLog po = json.getPojo(data, TjSysOperateLog.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getLogId())){
				service.update(po);
			}else{
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

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String operatorId = CommonUtils.checkNull(request.getParameter("OPERATOR_ID"));
		String machineId = CommonUtils.checkNull(request.getParameter("MACHINE_ID"));
		String moduleName = CommonUtils.checkNull(request.getParameter("MODULE_NAME"));
		String operateContent = CommonUtils.checkNull(request.getParameter("OPERATE_CONTENT"));
		String type = CommonUtils.checkNull(request.getParameter("type"));
		String time_gte = CommonUtils.checkNull(request.getParameter("OPERATE_TIMERG_gte"));
		String time_lte = CommonUtils.checkNull(request.getParameter("OPERATE_TIMERG_lte"));
		CheckLoginInfo info = super.getCheckLoginInfo();
		
		if(!"1".equals(info.getUserCode())){
			sList.add(new SqlUnit("logId", " and CORP_ID = ? ",info.getCorpId()));
		}
		
		if (!CommonUtils.isNullString(type)){
			sList.add(new SqlUnit("logId", " and OPERATOR_ID = ? ",info.getUserCode()));
		}
		if (!CommonUtils.isNullString(machineId)){
			sList.add(new SqlUnit("machineId", " and MACHINE_ID like ? ","%" + machineId.trim() + "%"));
		}
		if (!CommonUtils.isNullString(moduleName)){
			sList.add(new SqlUnit("moduleName", " and MODULE_NAME like ? ","%" + moduleName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(operateContent)){
			sList.add(new SqlUnit("operateContent", " and OPERATE_CONTENT like ? ","%" + operateContent.trim() + "%"));
		}
		if (!CommonUtils.isEmpty(time_gte)){
			sList.add(new SqlUnit("OPERATE_TIME", " and datediff(OPERATE_TIME,?) >= 0 ", time_gte.trim() ));
		}
		if (!CommonUtils.isEmpty(time_lte)){
			sList.add(new SqlUnit("OPERATE_TIME", " and datediff(OPERATE_TIME,?) <= 0 ", time_lte.trim() ));
		}
	}
}

