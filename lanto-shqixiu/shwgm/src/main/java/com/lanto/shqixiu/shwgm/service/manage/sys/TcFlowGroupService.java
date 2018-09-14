package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TcFlowGroup;


@Service
public class TcFlowGroupService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("GROUP_ID");
		return service.getPageList(uSql, page, "TC_FLOW_GROUP","GROUP_ID");
	}

	public Integer save(TcFlowGroup pojo){
		Integer id = service.savePojoRtPkId(pojo,"GROUP_ID");
		pojo.setGroupId(id);
		return id;
	}

	public void update(TcFlowGroup pojo){
		service.updatePojo(pojo,"GROUP_ID");
	}

	public void delete(String ids){
		service.delete("delete from  TC_FLOW_GROUP where GROUP_ID in (" + ids + ")");
	}
}
