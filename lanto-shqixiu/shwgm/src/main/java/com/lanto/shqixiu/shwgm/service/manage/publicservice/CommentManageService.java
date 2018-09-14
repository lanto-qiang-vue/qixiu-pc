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
import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class CommentManageService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("AVG_STAR");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "V_COMMENT","CORP_ID");
	}



	public void save(TbComplaint pojo,ManageLoginInfo info) throws Exception{
		pojo.setAddTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "COMPLAINT_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"质量投诉信息",pojo.getTitle());
		logService.addOperatorLog(info,"质量投诉信息", logcontent);
	}

	public void update(TbComplaint pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"COMPLAINT_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"质量投诉信息",pojo.getTitle());
		logService.addOperatorLog(info,"质量投诉信息", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbComplaint pojo = new TbComplaint();
			pojo.setComplaintId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"质量投诉信息",pojo.getTitle());
			logService.addOperatorLog(info,"质量投诉信息", logcontent);
			TbComplaint po = new TbComplaint();
			po.setComplaintId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
