package com.lanto.shqixiu.shwgc.service.repair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbRepairParts;
import com.lanto.shqixiu.shwgc.model.po.TbRepairRecords;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class RepairRecordsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("REPAIR_DATE");
		page.setOrderByType("DESC");
		String table = "(SELECT A.*,B.CORP_NAME,C.OWNER_PHONE,STATION_NAME FROM TB_REPAIR_RECORDS A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID"
				+ " LEFT JOIN TB_PRIVATE_VEHICLE C ON A.VEHICLE_ID=C.VEHICLE_ID  LEFT JOIN TB_BD_STATION E ON A.REPAIR_STATION=E.STATION_ID) T";
		return swdb.getPageList(uSql, page, table,"RECORD_ID");
	}



	public Integer save(TbRepairRecords pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "RECORD_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
		logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
		return id;
	}

	public void update(TbRepairRecords pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"RECORD_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
		logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
	}
	
	public TbRepairRecords getInfo(TbRepairRecords po) throws SQLException{
		return swdb.getModelByPo(po);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairRecords pojo = new TbRepairRecords();
			pojo.setRecordId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
			TbRepairRecords po = new TbRepairRecords();
			po.setRecordId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	public void submit(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairRecords pojo = new TbRepairRecords();
			pojo.setRecordId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】提交了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
			TbRepairRecords po = new TbRepairRecords();
			po.setRecordId(Integer.valueOf(chid));
			po.setStatus("10161004");
			swdb.updatePojo(po,"RECORD_ID");
		}
	}
	
	
	
}
