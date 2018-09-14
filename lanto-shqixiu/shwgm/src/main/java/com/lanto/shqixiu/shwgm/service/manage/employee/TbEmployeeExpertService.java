package com.lanto.shqixiu.shwgm.service.manage.employee;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbEmployeeExpert;


@Service
public class TbEmployeeExpertService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("EXPERT_ID");
		return swdb.getPageList(uSql, page, "TB_EMPLOYEE_EXPERT","EXPERT_ID");
	}

	public List doExport(List<SqlUnit> uSql){
		return swdb.getList("select * from TB_EMPLOYEE_EXPERT where 1=1 ", uSql);
	}
	
	public Integer save(TbEmployeeExpert pojo) throws Exception{
		pojo.setCreateDate(new Date());
		Integer id = swdb.savePojoRtPkId(pojo,"EXPERT_ID");
		pojo.setExpertId(id);
		return id;
	}
	

	public void update(TbEmployeeExpert pojo) throws Exception{
		swdb.updatePojo(pojo,"EXPERT_ID");
	}

	
	
}
