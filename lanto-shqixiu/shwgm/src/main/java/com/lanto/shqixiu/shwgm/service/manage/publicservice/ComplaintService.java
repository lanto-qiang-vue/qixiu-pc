package com.lanto.shqixiu.shwgm.service.manage.publicservice;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.ComplaintReport;
import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class ComplaintService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ADD_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_COMPLAINT","COMPLAINT_ID");
	}

	public ComplaintReport getComlaintReportData(String startDate,String endDate){
		String sql="select (select count(COMPLAINT_ID) from tb_complaint where STATUS='10341001' and ADD_TIME > ? and ADD_TIME <= ?) as NO_ACCEPT_NUM,"+
							"(select count(COMPLAINT_ID) from tb_complaint where `STATUS`='10341002' and ADD_TIME > ? and ADD_TIME <= ?) as ACCEPT_NUM,"+
							"(select count(COMPLAINT_ID) from tb_complaint where `STATUS`='10341003' and ADD_TIME > ? and ADD_TIME <= ?) as END_NUM,"+
							"(select count(COMPLAINT_ID) from tb_complaint where `TYPE`='10331001' and ADD_TIME > ? and ADD_TIME <= ?) as SERVICE_COMP_NUM,"+
							"(select count(COMPLAINT_ID) from tb_complaint where `TYPE`='10331002' and ADD_TIME > ? and ADD_TIME <= ?) as QUALITY_COMP_NUM,"+
							"(select count(COMPLAINT_ID) from tb_complaint where `TYPE`='10331003' and ADD_TIME > ? and ADD_TIME <= ?) as REPORT_COMP_NUM";
		Object[] args={startDate,endDate,startDate,endDate,startDate,endDate,startDate,endDate,startDate,endDate,startDate,endDate};
		ComplaintReport po=(ComplaintReport)swdb.findObject(ComplaintReport.class,sql, args);
		return po;
	}

	public void save(TbComplaint pojo,ManageLoginInfo info) throws Exception{
		pojo.setAddTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "COMPLAINT_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getType()),pojo.getTitle());
		logService.addOperatorLog(info,"质量投诉信息", logcontent);
	}

	public void update(TbComplaint pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"COMPLAINT_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getType()),pojo.getTitle());
		logService.addOperatorLog(info,"质量投诉信息", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbComplaint pojo = new TbComplaint();
			pojo.setComplaintId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getType()),pojo.getTitle());
			logService.addOperatorLog(info,"质量投诉信息", logcontent);
			TbComplaint po = new TbComplaint();
			po.setComplaintId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
