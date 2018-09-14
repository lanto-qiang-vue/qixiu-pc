package com.lanto.shqixiu.shwgc.service.sys;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TqSysOperateLog;


@Service
public class TqSysOperateLogService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("LOG_ID DESC,OPERATE_TIME");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "(SELECT T1.*,T2.CORP_ID FROM TQ_SYS_OPERATE_LOG T1 LEFT JOIN TQ_SYS_USER T2 ON T1.OPERATOR_ID=T2.USER_CODE) T","LOG_ID");
	}

	public Integer save(TqSysOperateLog pojo){
		Integer id = service.savePojoRtPkId(pojo,"LOG_ID");
		pojo.setLogId(id);
		return id;
	}
	
	public void addOperatorLog(ClientLoginInfo login,String modualName,String content){
		String remoteAddr = login.getRequest().getRemoteAddr();
		TqSysOperateLog log = new TqSysOperateLog();
		log.setMachineId(remoteAddr);
		log.setModuleName(modualName);
		log.setOperateTime(new Date());
		log.setOperatorId(login.getUserCode());
		log.setOperateContent(content);
		save(log);
	}

	public void update(TqSysOperateLog pojo){
		service.updatePojo(pojo,"LOG_ID");
	}

	public void delete(String ids){
		service.delete("delete from TQ_SYS_OPERATE_LOG where LOG_ID in (" + ids + ")");
	}
}
