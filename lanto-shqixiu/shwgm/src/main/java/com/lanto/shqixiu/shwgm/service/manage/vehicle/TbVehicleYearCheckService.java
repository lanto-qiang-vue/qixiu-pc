package com.lanto.shqixiu.shwgm.service.manage.vehicle;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbVehicleYearCheck;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class TbVehicleYearCheckService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page, String areaCode) throws SQLException{
		page.setOrderByColumn("CHECK_TIME");
		page.setOrderByType("DESC");
		String sql="(select a.*,b.PLATE_NUM,c.CORP_NAME from tb_vehicle_year_check a LEFT JOIN tv_vehicle_base b on a.VEHICLE_ID=b.VEHICLE_ID"+
					" LEFT JOIN tb_trans_corp_info c on b.TRANS_CORP_ID=c.CORP_ID where c.corp_area like '%"+areaCode+"%' or c.corp_area is null) t";
		return swdb.getPageList(uSql, page, sql,"CHECK_ID");
	}



	public String save(TbVehicleYearCheck pojo,ManageLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "CHECK_ID");
		String logcontent = "【%s】新增了一条车牌号码为【%s】的年审记录  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getPlateNum());
		logService.addOperatorLog(info,"运输车辆年审", logcontent);
		return null;
	}

	public void update(TbVehicleYearCheck pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"CHECK_ID");
		String logcontent = "【%s】修改了一条车牌号码为【%s】的年审记录  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getPlateNum());
		logService.addOperatorLog(info,"运输车辆年审", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbVehicleYearCheck pojo = new TbVehicleYearCheck();
			pojo.setCheckId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条车牌号码为【%s】的年审记录";
			logcontent = String.format(logcontent, info.getUserName(),pojo.getPlateNum());
			logService.addOperatorLog(info,"运输车辆年审", logcontent);
			TbVehicleYearCheck po = new TbVehicleYearCheck();
			po.setCheckId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
