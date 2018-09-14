package com.lanto.shqixiu.shwgc.service.vehicle;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TvVehicleIccard;


@Service
public class IcCardService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CARD_ID");
		page.setOrderByType("DESC");
		String table = "(SELECT A.CARD_ID,A.CORP_ID,A.MAC_ID,A.PRINT_NO,A.CREATE_DATE,A.UPDATE_DATE UPDATE_DATE_,A.CARD_STATUS,B.* "
				+ "FROM tv_vehicle_iccard A LEFT JOIN tv_vehicle_base B ON A.VEHICLE_ID=B.VEHICLE_ID) t";
		return service.getPageList(uSql, page, table,"CARD_ID");
	}

	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from TB_CORP_DETECT_INFO where 1=1 ", uSql);
	}


	public void save(TvVehicleIccard pojo){
		service.savePojo(pojo,"CARD_ID");
	}

	public void update(TvVehicleIccard pojo){
		service.updatePojo(pojo,"CARD_ID");
	}
	
	public Map getCardInfo(String vehId){
		String sql = "SELECT A.CARD_ID,A.CORP_ID,A.MAC_ID,A.PRINT_NO,A.CREATE_DATE,A.UPDATE_DATE UPDATE_DATE_,A.CARD_STATUS,B.* "
				+ "FROM tv_vehicle_iccard A LEFT JOIN tv_vehicle_base B ON A.VEHICLE_ID=B.VEHICLE_ID WHERE A.VEHICLE_ID=?";
		List list = service.findAll(sql, vehId);
		if(list != null && list.size()>0){
			return (Map)list.get(0);
		}
		return null;
	}

	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TvVehicleIccard po = new TvVehicleIccard();
			po.setCardId(Integer.valueOf(chid));
			service.deleteByPo(po);
		}
	}
}
