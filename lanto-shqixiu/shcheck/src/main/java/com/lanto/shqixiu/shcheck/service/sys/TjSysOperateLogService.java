package com.lanto.shqixiu.shcheck.service.sys;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TjSysOperateLog;


@Service
public class TjSysOperateLogService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("LOG_ID DESC,OPERATE_TIME");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "(SELECT T1.*,T2.CORP_ID FROM TJ_SYS_OPERATE_LOG T1 LEFT JOIN TJ_SYS_USER T2 ON T1.OPERATOR_ID=T2.USER_CODE) T","LOG_ID");
	}

	public Integer save(TjSysOperateLog pojo){
		Integer id = service.savePojoRtPkId(pojo,"LOG_ID");
		pojo.setLogId(id);
		return id;
	}
	
	public void addOperatorLog(CheckLoginInfo login,String modualName,String content){
		String remoteAddr = login.getRequest().getRemoteAddr();
		TjSysOperateLog log = new TjSysOperateLog();
		log.setMachineId(remoteAddr);
		log.setModuleName(modualName);
		log.setOperateTime(new Date());
		log.setOperatorId(login.getUserCode());
		log.setOperateContent(content);
		save(log);
	}

	public void update(TjSysOperateLog pojo){
		service.updatePojo(pojo,"LOG_ID");
	}

	public void delete(String ids){
		service.delete("delete from TJ_SYS_OPERATE_LOG where LOG_ID in (" + ids + ")");
	}
}
