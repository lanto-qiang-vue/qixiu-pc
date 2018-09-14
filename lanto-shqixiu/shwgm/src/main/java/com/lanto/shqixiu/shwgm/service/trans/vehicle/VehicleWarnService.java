package com.lanto.shqixiu.shwgm.service.trans.vehicle;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;


@Service
public class VehicleWarnService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("WARN_TYPE");
		page.setOrderByType("ASC");
		return service.getPageList(uSql, page, "v_vehicle_warn","VEHICLE_ID");
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from tv_vehicle_base where 1=1", uSql);
	}

}
