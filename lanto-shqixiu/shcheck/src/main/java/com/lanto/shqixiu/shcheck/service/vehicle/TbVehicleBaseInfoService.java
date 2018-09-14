package com.lanto.shqixiu.shcheck.service.vehicle;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbVehicleBaseInfo;


@Service
public class TbVehicleBaseInfoService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("VECHILE_ID");
		return service.getPageList(uSql, page, "TB_VEHICLE_BASE_INFO","VECHILE_ID");
	}

	public Integer save(TbVehicleBaseInfo pojo){
		Integer id = service.savePojoRtPkId(pojo,"VECHILE_ID");
		pojo.setVechileId(id);
		return id;
	}

	public void update(TbVehicleBaseInfo pojo){
		service.updatePojo(pojo,"VECHILE_ID");
	}

	public void delete(String ids){
		service.delete("delete from TB_VEHICLE_BASE_INFO where VECHILE_ID in (" + ids + ")");
	}
}
