package com.lanto.shqixiu.shwgm.service.trans.vehicle;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TvVehiclePlan;


@Service
public class VehiclePlanService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("PLAN_ID");
		page.setOrderByType("desc");
		String table = "(select a.*,b.TRANS_CORP_ID,b.PLATE_NUM,b.PLATE_COLOR,b.VEHICLE_TYPE," +
				"c.NAME VENDER_,d.NAME BRAND_,e.NAME XM_ from tv_vehicle_plan a left join tv_vehicle_base b on a.VEHICLE_ID=b.VEHICLE_ID " +
				"left join db_repair_standard c on b.VENDER=c.ID \n" +
				"left join db_repair_standard d on b.BRAND=d.ID \n" +
				"left join db_repair_standard e on b.XM=e.ID \n) t";
		return service.getPageList(uSql, page, table,"PLAN_ID");
	}
	
	public List toPlanList(String corpId,String plateNum) throws SQLException{
		String sql ="select a.VEHICLE_ID,a.PLATE_NUM,a.PLATE_COLOR,a.VEHICLE_TYPE,c.NAME VENDER_,\n" +
				"d.NAME BRAND_,e.NAME XM_,e.REPAIR_CYCLE,e.REPAIR_MILEAGE   from tv_vehicle_base a \n" +
				"left join tv_vehicle_plan b on a.VEHICLE_ID=b.VEHICLE_ID \n" +
				"left join db_repair_standard c on a.VENDER=c.ID \n" +
				"left join db_repair_standard d on a.BRAND=d.ID \n" +
				"left join db_repair_standard e on a.XM=e.ID \n" +
				"where a.VEHICLE_ID <> IFNULL(b.VEHICLE_ID,'') \n" +
				"and a.TRANS_CORP_ID=? ";
		List<Object> params = new ArrayList<Object>();
		params.add(corpId);
		if(!CommonUtils.checkIsNullStr(plateNum)){
			sql = sql + "and a.PLATE_NUM like ? ";
			params.add("%" + plateNum + "%");
		}
		sql = sql + "order by a.vehicle_id desc";
		return service.findAll(sql, params.toArray());
	}
	
	public List doExport(List<SqlUnit> uSql){
		String table = "select a.*,b.TRANS_CORP_ID,b.PLATE_NUM,b.PLATE_COLOR,b.VEHICLE_TYPE," +
		" c.NAME VENDER_,d.NAME BRAND_,e.NAME XM_ from tv_vehicle_plan a left join tv_vehicle_base b on a.VEHICLE_ID=b.VEHICLE_ID " +
		" left join db_repair_standard c on b.VENDER=c.ID \n" +
		" left join db_repair_standard d on b.BRAND=d.ID \n" +
		" left join db_repair_standard e on b.XM=e.ID \n "+
		" where 1=1";
		
		return service.getList(table, uSql);
	}

	public Integer save(TvVehiclePlan pojo) throws Exception{
		TvVehiclePlan con = new TvVehiclePlan();
		con.setVehicleId(pojo.getVehicleId());
		con = service.getModelByPo(con);
		if(con != null){
			throw new Exception("已经存在该车辆的维护计划！");
		}
		Integer id = service.savePojoRtPkId(pojo,"PLAN_ID");
		pojo.setPlanId(id);
		return id;
	}
	
	public Integer update(TvVehiclePlan pojo) throws Exception{
		return service.updatePojo(pojo, "PLAN_ID");
	}
	

	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TvVehiclePlan po = new TvVehiclePlan();
			po.setPlanId(Integer.valueOf(chid));
			service.deleteByPo(po);
		}
	}


}
