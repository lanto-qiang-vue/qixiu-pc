package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TmSysOperateLog;


@Service
public class TmSysOperateLogService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("LOG_ID DESC,OPERATE_TIME");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "TM_SYS_OPERATE_LOG","LOG_ID");
	}

	public void save(TmSysOperateLog pojo){
		service.savePojo(pojo,"LOG_ID");
	}
	
	public void addOperatorLog(ManageLoginInfo login,String modualName,String content){
		String remoteAddr = login.getRequest().getRemoteAddr();
		TmSysOperateLog log = new TmSysOperateLog();
		log.setMachineId(remoteAddr);
		log.setModuleName(modualName);
		log.setOperateTime(new Date());
		log.setOperatorId(login.getUserCode());
		log.setOperateContent(content);
		save(log);
	}

	public void update(TmSysOperateLog pojo){
		service.updatePojo(pojo,"LOG_ID");
	}

	public void delete(String ids){
		service.delete("delete from  TM_SYS_OPERATE_LOG where LOG_ID in (" + ids + ")");
	}
}
