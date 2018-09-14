package com.lanto.shqixiu.shcheck.service.employee;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbEmployeeExpertApply;


@Service
public class TbEmployeeExpertApplyService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("APPLY_ID");
		return swdb.getPageList(uSql, page, "TB_EMPLOYEE_EXPERT_APPLY","APPLY_ID");
	}

	public List doExport(List<SqlUnit> uSql){
		return swdb.getList("select * from TB_EMPLOYEE_EXPERT_APPLY where 1=1 ", uSql);
	}
	
	public Integer save(TbEmployeeExpertApply pojo) throws Exception{
		pojo.setCreateDate(new Date());
		Integer id = swdb.savePojoRtPkId(pojo,"APPLY_ID");
		pojo.setApplyId(id);
		return id;
	}
	

	public void update(TbEmployeeExpertApply pojo) throws Exception{
		swdb.updatePojo(pojo,"APPLY_ID");
	}

	
	
}
