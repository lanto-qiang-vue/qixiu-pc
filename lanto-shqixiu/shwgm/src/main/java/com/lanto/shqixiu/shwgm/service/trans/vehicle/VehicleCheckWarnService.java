package com.lanto.shqixiu.shwgm.service.trans.vehicle;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;


@Service
public class VehicleCheckWarnService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("WARN_TYPE ASC,VEHICLE_ID");
		page.setOrderByType("DESC");
		StringBuffer sql = new StringBuffer();
		sql.append("(select *,'10201001' WARN_TYPE from v_vehicle_check_warn where CHECK_ZQ-CHECK_MONTH < 1\n");
		sql.append(" UNION\n");
		sql.append(" select *,'10201002' WARN_TYPE from v_vehicle_check_warn where CHECK_ZQ-CHECK_MONTH = 1\n");
		sql.append(" UNION\n");
		sql.append(" select *,'10201003' WARN_TYPE from v_vehicle_check_warn where LAST_CHECK_DATE IS NULL) t\n");
		return service.getPageList(uSql, page, sql.toString(),"VEHICLE_ID");
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from v_vehicle_check_warn where 1=1", uSql);
	}

}
