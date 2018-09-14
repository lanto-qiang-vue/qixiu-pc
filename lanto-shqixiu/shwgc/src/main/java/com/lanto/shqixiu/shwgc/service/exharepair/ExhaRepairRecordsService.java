package com.lanto.shqixiu.shwgc.service.exharepair;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.common.WebCache;
import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbExhaustRepairRecords;
import com.lanto.shqixiu.shwgc.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgc.model.po.TrParameter;
import com.lanto.shqixiu.shwgc.model.report.CertRecord;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;
import com.lanto.shqixiu.shwgc.util.Constant;


@Service
public class ExhaRepairRecordsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("REPAIR_DATE");
		page.setOrderByType("DESC");
		String table = "(SELECT A.*,B.CORP_NAME,C.OWNER_PHONE,STATION_NAME FROM TB_EXHAUST_REPAIR_RECORDS A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID"
				+ " LEFT JOIN TB_PRIVATE_VEHICLE C ON A.VEHICLE_ID=C.VEHICLE_ID  LEFT JOIN TB_BD_STATION E ON A.REPAIR_STATION=E.STATION_ID) T";
		return swdb.getPageList(uSql, page, table,"RECORD_ID");
	}



	public Integer save(TbExhaustRepairRecords pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "RECORD_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
		logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
		return id;
	}

	public void update(TbExhaustRepairRecords pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"RECORD_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
		logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
	}
	
	public TbExhaustRepairRecords getInfo(TbExhaustRepairRecords po) throws SQLException{
		return swdb.getModelByPo(po);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbExhaustRepairRecords pojo = new TbExhaustRepairRecords();
			pojo.setRecordId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
			TbExhaustRepairRecords po = new TbExhaustRepairRecords();
			po.setRecordId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	public void submit(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbExhaustRepairRecords pojo = new TbExhaustRepairRecords();
			pojo.setRecordId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】提交了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"普通车辆维修工单",pojo.getPlateNum());
			logService.addOperatorLog(info,"普通车辆维修工单", logcontent);
			TbExhaustRepairRecords po = new TbExhaustRepairRecords();
			po.setRecordId(Integer.valueOf(chid));
			po.setStatus("10161004");
			swdb.updatePojo(po,"RECORD_ID");
		}
	}
	
	public CertRecord updatePrintByPage(String corpId,Integer recordId) throws Exception{
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		TbExhaustRepairRecords record=new TbExhaustRepairRecords();
		record.setRecordId(recordId);
		record=swdb.getModelByPo(record);
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(corpId);
		corp = swdb.getModelByPo(corp);
		TbPrivateVehicle vehicle = new TbPrivateVehicle();
		vehicle.setVehicleId(record.getVehicleId());
		vehicle = swdb.getModelByPo(vehicle);
		//置为已打印
		//service.update("update TR_REPAIR_GENE_MANAGE set is_print=?,CERT_SN=? where GENE_ID =?",Constant.PRINT_STATUS_02,certNo,geneId);
		CertRecord dr = new CertRecord();
		dr.setCertSn(String.valueOf(recordId));
		dr.setCorpName(corp.getCorpName());
		dr.setCostSum("234243");
		dr.setDelegateName(vehicle.getOwnerName());
		dr.setLeaveDate(sdf.format(record.getEndRepairTime()));
		dr.setLeaveMileage(String.valueOf(record.getRepairMile()));
		dr.setP1("90");
		dr.setP2("100");
		dr.setPlateNumColor(vehicle.getPlateNum());
		dr.setRepiarType("排气污染维修");
		dr.setVehicleType(vehicle.getVehicleType());
		dr.setExaminer(corp.getQualityPerson());
		dr.setHotLine(corp.getServiceHotline());
		return dr;
	}
	
	
	
}
