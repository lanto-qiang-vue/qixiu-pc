package com.lanto.shqixiu.shwgm.service.transrepair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbTransRepairRecords;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class TransRepairRecordsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("REPAIR_DATE");
		page.setOrderByType("DESC");
		String table = "(SELECT A.*,B.CORP_NAME TRANS_CORP_NAME,STATION_NAME,B.CONTACTS_TEL OWNER_PHONE,D.CORP_NAME REPAIR_CORP_NAME FROM TB_TRANS_REPAIR_RECORDS A"
				+ " LEFT JOIN TB_TRANS_CORP_INFO B ON A.TRANS_CORP_ID=B.CORP_ID"
				+ " LEFT JOIN TV_VEHICLE_BASE C ON A.VEHICLE_ID=C.VEHICLE_ID LEFT JOIN TB_CORP_INFO D ON A.REPAIR_CORP_ID=D.CORP_ID"
				+ " LEFT JOIN TB_BD_STATION E ON A.REPAIR_STATION=E.STATION_ID) T";
		return swdb.getPageList(uSql, page, table,"RECORD_ID");
	}



	public Integer save(TbTransRepairRecords pojo,ManageLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "RECORD_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"运输车辆维修工单",pojo.getPlateNum());
		logService.addOperatorLog(info,"运输车辆维修工单", logcontent);
		return id;
	}

	public void update(TbTransRepairRecords pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"RECORD_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"运输车辆维修工单",pojo.getPlateNum());
		logService.addOperatorLog(info,"运输车辆维修工单", logcontent);
	}
	
	public TbTransRepairRecords getInfo(TbTransRepairRecords po) throws SQLException{
		return swdb.getModelByPo(po);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbTransRepairRecords pojo = new TbTransRepairRecords();
			pojo.setRecordId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"运输车辆维修工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"运输车辆维修工单", logcontent);
			TbTransRepairRecords po = new TbTransRepairRecords();
			po.setRecordId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	public void submit(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbTransRepairRecords pojo = new TbTransRepairRecords();
			pojo.setRecordId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】提交了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
			TbTransRepairRecords po = new TbTransRepairRecords();
			po.setRecordId(Integer.valueOf(chid));
			po.setStatus("10161004");
			swdb.updatePojo(po,"RECORD_ID");
		}
	}
	
	
	
}
