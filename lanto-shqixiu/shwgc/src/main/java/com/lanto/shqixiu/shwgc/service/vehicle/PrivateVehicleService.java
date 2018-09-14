package com.lanto.shqixiu.shwgc.service.vehicle;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgc.model.po.TbRepairParts;
import com.lanto.shqixiu.shwgc.model.po.TbRepairRecords;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class PrivateVehicleService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_PRIVATE_VEHICLE","VEHICLE_ID");
	}

	public String save(TbPrivateVehicle pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "VEHICLE_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"普通车辆",pojo.getPlateNum());
		logService.addOperatorLog(info,"普通车辆", logcontent);
		return null;
	}

	public void update(TbPrivateVehicle pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"VEHICLE_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"普通车辆信息",pojo.getPlateNum());
		logService.addOperatorLog(info,"普通车辆", logcontent);
	}
	
	public TbPrivateVehicle getInfo(TbPrivateVehicle po) throws SQLException{
		return swdb.getModelByPo(po);
	}

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbPrivateVehicle pojo = new TbPrivateVehicle();
			pojo.setVehicleId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"普通车辆信息",pojo.getPlateNum());
			logService.addOperatorLog(info,"普通车辆", logcontent);
			TbPrivateVehicle po = new TbPrivateVehicle();
			po.setVehicleId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
