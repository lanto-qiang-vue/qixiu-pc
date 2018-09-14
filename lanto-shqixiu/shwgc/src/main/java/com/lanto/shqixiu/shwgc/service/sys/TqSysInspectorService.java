package com.lanto.shqixiu.shwgc.service.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TqSysInspector;


@Service
public class TqSysInspectorService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	@Resource
	private TqSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ID");
		return service.getPageList(uSql, page, "(SELECT * FROM TQ_SYS_INSPECTOR) T",null);
	}
	public List getList_station(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("STATION_CODE");
		return service.getPageList(uSql, page, "(SELECT * FROM tb_bd_station) T",null);
	}
	public Integer save(TqSysInspector pojo,ClientLoginInfo info) throws Exception{
		Integer id = service.savePojoRtPkId(pojo,"ID");
		String logcontent = "用户【%s】新增了一位质检员 【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getName());
		logService.addOperatorLog(info, "质检员管理", logcontent);
		return id;
	}

	public void update(TqSysInspector pojo,ClientLoginInfo info) throws Exception{
		String sql = "SELECT COUNT(*) FROM TQ_SYS_INSPECTOR WHERE CERT_NUM=? AND ID <>?";
		Integer count = (Integer)service.findRtObject(sql, Integer.class, pojo.getCertNum(),pojo.getId());
		if(count>0){
			throw new Exception("该证件号码【"+ pojo.getCertNum() + "】已经存在");
		}
		service.updatePojo(pojo,"ID");
		String logcontent = "用户【%s】修改了一位质检员 【%s】的信息 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getName());
		logService.addOperatorLog(info,"质检员管理", logcontent);
	}
	
	
	public void delete(String ids){
		service.delete("delete from TQ_SYS_INSPECTOR where ID in (" + ids + ")");
	}
	
	public boolean certNumUsable(String certNum){
		TqSysInspector inspector = new TqSysInspector();
		inspector.setCertNum(certNum);
		inspector = service.getModelByPo(inspector);
		return inspector==null?true:false;
	}

}
