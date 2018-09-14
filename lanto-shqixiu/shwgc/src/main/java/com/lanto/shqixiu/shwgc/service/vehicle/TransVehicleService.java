package com.lanto.shqixiu.shwgc.service.vehicle;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.Json;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.bean.TrRepairGeneManageBean;
import com.lanto.shqixiu.shwgc.model.bean.TrRepairGenePartBeanPrint;
import com.lanto.shqixiu.shwgc.model.po.DbRepairStandard;
import com.lanto.shqixiu.shwgc.model.po.TbBdCode;
import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbPrivateVehicle;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleAccident;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleBase;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleChange;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleCheck;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleDriver;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleParam;
import com.lanto.shqixiu.shwgc.model.po.TvVehiclePartChange;
import com.lanto.shqixiu.shwgc.model.po.TvVehiclePlan;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleReg;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleUses;
import com.lanto.shqixiu.shwgc.model.report.DataSet;
import com.lanto.shqixiu.shwgc.model.report.NodeInfo;
import com.lanto.shqixiu.shwgc.model.report.ObjectToXML;
import com.lanto.shqixiu.shwgc.service.common.CreateNumberService;
import com.lanto.shqixiu.shwgc.util.Constant;


@Service
public class TransVehicleService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	@Resource
	private CreateNumberService createNumberService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("WARN_TYPE");
		page.setOrderByType("asc");
		StringBuffer sql = new StringBuffer();
		sql.append("(select *,'10171001' WARN_TYPE from v_vehicle_plan where MONTH_DIFF <1\n");
		sql.append("       UNION\n");
		sql.append("select *,'10171002' WARN_TYPE from v_vehicle_plan where MONTH_DIFF =1\n");
		sql.append("       UNION\n");
		sql.append("select *,'10171003' WARN_TYPE from v_vehicle_plan where REPAIR_CYCLE is null\n");
		sql.append("       UNION\n");
		sql.append("select *,'10171004' WARN_TYPE from v_vehicle_plan where REPAIR_CYCLE is not null and LAST_REPAIR_DATE is null\n");
		sql.append("       UNION\n");
		sql.append("select *,'10171005' WARN_TYPE from v_vehicle_plan where MONTH_DIFF >1) t\n");

		return service.getPageList(uSql, page, sql.toString(),"VEHICLE_ID");
	}
	
	public List getAllList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("VEHICLE_ID");
		page.setOrderByType("DESC");
		String table = "(SELECT A.*,B.CONTACTS_TEL OWNER_PHONE FROM TV_VEHICLE_BASE A"
				+ " LEFT JOIN TB_TRANS_CORP_INFO B ON A.TRANS_CORP_ID=B.CORP_ID) T";
		return service.getPageList(uSql, page, table,"VEHICLE_ID");
	}
	
	public List getInfo(String vehicleId) throws SQLException{
		String sql="SELECT * FROM V_VEHICLE_PLAN WHERE VEHICLE_ID=?";
		return service.findAll(sql, vehicleId);
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from tv_vehicle_base where 1=1", uSql);
	}

	public Integer save(TvVehicleBase pojo) throws Exception{
		TvVehicleBase con = new TvVehicleBase();
		con.setPlateNum(pojo.getPlateNum());
		con.setPlateColor(pojo.getPlateColor());
		con = service.getModelByPo(con);
		if(con != null){
			throw new Exception("已经存在车牌号为【" + pojo.getPlateNum() + "】，车牌颜色为【" + pojo.getPlateColor() + "】的车辆信息！");
		}
		pojo.setRecordNo(createNumberService.createNumber("recordNo"));
		Integer id = service.savePojoRtPkId(pojo,"VEHICLE_ID");
		pojo.setVehicleId(id);
		return id;
	}
	
	public List getRepairList(String vehId){
		String sql = "select a.*,b.OLD_PHOTO,b.NEW_PHOTO,b.REPAIR_PHOTO from TR_REPAIR_GENE_MANAGE a left join tr_repair_gene_photo b on a.bill_code=b.bill_code WHERE a.VEHICLE_ID=? order by a.LEAVE_DATE desc,a.GENE_ID desc";
		return service.findAll(sql, vehId);
	}
	public List getRegList(String vehId){
		String sql = " SELECT a.*,b.code_desc as RepairTypeName";
		sql =sql+" FROM TR_REPAIR_GENE_MANAGE a LEFT JOIN tb_bd_code b ON a.REPAIR_TYPE=b.CODE_ID";
		sql =sql+" WHERE a.VEHICLE_ID=? order by a.LEAVE_DATE desc,a.GENE_ID desc";
		
		return service.findAll(TrRepairGeneManageBean.class, sql, vehId);
	}	
	public List getCheckList(String vehId){
		String sql = "SELECT * FROM tv_vehicle_check WHERE VEHICLE_ID=? order by CHECK_DATE desc,CHECK_ID desc";
		return service.findAll(sql, vehId);
	}
	
	public List getPartList(String billCode){
		return service.findAll("select * from tr_repair_gene_part where BILL_CODE = ?", billCode.trim());
	}
	
	public void updateCase(String plateNum,String plateColor,TransLoginInfo info) throws Exception{
		TvVehicleBase con = new TvVehicleBase();
		con.setPlateNum(plateNum.toUpperCase());
		con.setPlateColor(plateColor);
		con = service.getModelByPo(con);
		if(con == null){
			throw new Exception("不存在该车辆信息！");
		}
		if(con.getTransCorpId().equals(info.getCorpId())){
			return;
		}
		TvVehicleBase po = new TvVehicleBase();
		po.setVehicleId(con.getVehicleId());
		po.setTransCorpId(info.getCorpId());
		service.updatePojo(po, "VEHICLE_ID");
	}

	public void update(TvVehicleBase pojo) throws Exception{
		String sql = "select count(*) from tv_vehicle_base where PLATE_NUM=? and PLATE_COLOR=? and VEHICLE_ID <> ?";
		Integer count = (Integer)service.findRtObject(sql, Integer.class, pojo.getPlateNum(),pojo.getPlateColor(),pojo.getVehicleId());
		if(count > 0){
			throw new Exception("已经存在车牌号为【" + pojo.getPlateNum() + "】，车牌颜色为【" + pojo.getPlateColor() + "】的车辆信息！");
		}
		service.updatePojo(pojo,"VEHICLE_ID");
	}
	
	public Integer saveOrUpdateParam(TvVehicleParam pojo,String vehicleId) throws Exception {
		if(CommonUtils.checkIsNotNullAndZero(pojo.getParamId())){
			service.updatePojo(pojo, "PARAM_ID");
			return null;	//更新不需要返回主键
		}else{
			pojo.setVehicleId(Integer.parseInt(vehicleId));
			pojo.setAddTime(new Date());
			return service.savePojoRtPkId(pojo, "PARAM_ID");
		}
	}
	
	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TvVehiclePlan plan = new TvVehiclePlan();
			plan.setVehicleId(Integer.valueOf(chid));
			service.deleteByPo(plan);
			
			TvVehicleBase po = new TvVehicleBase();
			po.setVehicleId(Integer.valueOf(chid));
			service.deleteByPo(po);
		}
	}
	public List getPic(String corpId,String billCode,Integer channel_code){
		TbCorpInfo em = new TbCorpInfo();
		em.setCorpId(corpId);
		em=service.getModelByPo(em);
		
		String sql ="SELECT IMAGE1 FROM tr_repair_image  "+
                     "WHERE CHANNEL_CODE=? and CORP_NUM=? and BILL_CODE=? order by CREATE_DATE ";
		
		return service.findAll(sql,channel_code,em.getCorpNum(),billCode.trim());

	}			
	
	public TbBdCode getModel_Code(TbBdCode po) throws Exception{
		return service.getModelByPo(po);
		
	}
	public DbRepairStandard getModel_DbR(DbRepairStandard po) throws Exception{
		return service.getModelByPo(po);
		
	}	
	public TvVehicleBase getModel_VehicleBase(TvVehicleBase po) throws Exception{
		return service.getModelByPo(po);
		
	}
	public TvVehicleParam getModel_VehicleParam(TvVehicleParam po) throws Exception{
		return service.getModelByPo(po);
		
	}	
	public String createReportXml(TvVehicleBase base ,TvVehicleParam param,List regList,List partChangeList,List chekList,List changeList,List usesList,List accidentList,List driverList) throws Exception{
		String title = "车辆技术档案打印";
		String reportId = Constant.REPORT_ID_REPAIR_VEHICLE;
		NodeInfo node = new NodeInfo(reportId,title,"sa","0");
		DataSet master = new DataSet("MASTER",base,TvVehicleBase.class);
		DataSet detail = new DataSet("DETIAL",regList,TrRepairGeneManageBean.class);

		DataSet subdetial = new DataSet("SUBDETIAL",param,TvVehicleParam.class);
		DataSet detail1 = new DataSet("EXTRAL1",partChangeList,TrRepairGenePartBeanPrint.class);
		DataSet detail2 = new DataSet("EXTRAL2",changeList,TvVehicleChange.class);			
		DataSet detail3 = new DataSet("EXTRAL3",usesList,TvVehicleUses.class);	
		DataSet detail4 = new DataSet("EXTRAL4",accidentList,TvVehicleAccident.class);
		DataSet detail5 = new DataSet("EXTRAL5",driverList,TvVehicleDriver.class);		
		DataSet detail6 = new DataSet("EXTRAL6",chekList,TvVehicleCheck.class);		
		
		
		return ObjectToXML.toReportXML(node, master,detail,subdetial,detail1,detail2,detail3,detail4,detail5,detail6);
		 
	}
	public void saveReg(String parray,Integer vehicleId,ManageLoginInfo login) throws Exception{
		//service.delete("delete from tv_vehicle_reg where vehicle_id = ?", new Object[]{vehicleId});	
		if(!CommonUtils.checkIsNullStr(parray)){
			Json json = new Json();
			List<TvVehicleReg> parts = json.getPojoList(parray, TvVehicleReg.class);
			for(TvVehicleReg de : parts){
				if(CommonUtils.checkIsNotNullAndZero(de.getRegId())){
					service.updatePojo(de,"REG_ID");	
				}  else {
				  de.setVehicleId(vehicleId);
				  de.setAddTime(new Date());
				  de.setWxDjr(login.getUserName());
				  service.savePojo(de , "REG_ID");
				}
			}
		}
	}	
/*	public List getRegList(String vehId){
		String sql = "select a.* from tv_vehicle_reg a  WHERE a.VEHICLE_ID=?";
		return service.findAll(sql, vehId);
	}	*/
	
	public void saveChange(String parray,Integer vehicleId,ManageLoginInfo login) throws Exception{
		if(!CommonUtils.checkIsNullStr(parray)){
			Json json = new Json();
			List<TvVehicleChange> parts = json.getPojoList(parray, TvVehicleChange.class);
			for(TvVehicleChange de : parts){
				if(CommonUtils.checkIsNotNullAndZero(de.getChangeId())){
					service.updatePojo(de,"CHANGE_ID");	
				}  else {
				  de.setVehicleId(vehicleId);
				  de.setAddTime(new Date());
				  de.setChangeRegistrant(login.getUserName());
				  service.savePojo(de , "CHANGE_ID");
				}
			}
		}
	}
	public void saveUses(String parray,Integer vehicleId,ManageLoginInfo login) throws Exception{
		if(!CommonUtils.checkIsNullStr(parray)){
			Json json = new Json();
			List<TvVehicleUses> parts = json.getPojoList(parray, TvVehicleUses.class);
			for(TvVehicleUses de : parts){
				if(CommonUtils.checkIsNotNullAndZero(de.getUsesId())){
					service.updatePojo(de,"USES_ID");	
				}  else {
				  de.setVehicleId(vehicleId);
				  de.setAddTime(new Date());
				  //de.setChangeRegistrant(login.getUserName());
				  service.savePojo(de , "USES_ID");
				}
			}
		}
	}	
	
	public void saveDriver(String parray, int vehicleId, ManageLoginInfo login) throws Exception {
		if(!CommonUtils.checkIsNullStr(parray)){
			Json json = new Json();
			List<TvVehicleDriver> drivers = json.getPojoList(parray, TvVehicleDriver.class);
			for(TvVehicleDriver de : drivers){
				if(CommonUtils.checkIsNotNullAndZero(de.getDriverId())){
					service.updatePojo(de,"DRIVER_ID");	
				}  else {
				  de.setVehicleId(vehicleId);
				  de.setAddTime(new Date());
				  //de.setChangeRegistrant(login.getUserName());
				  service.savePojo(de , "DRIVER_ID");
				}
			}
		}
		
	}		
	public void saveAccident(String parray, int vehicleId, ManageLoginInfo login) throws Exception {
		if(!CommonUtils.checkIsNullStr(parray)){
			Json json = new Json();
			List<TvVehicleAccident> accidents = json.getPojoList(parray, TvVehicleAccident.class);
			for(TvVehicleAccident de : accidents){
				if(CommonUtils.checkIsNotNullAndZero(de.getAccidentId())){
					service.updatePojo(de,"ACCIDENT_ID");	
				}  else {
					de.setVehicleId(vehicleId);
					de.setAddTime(new Date());
					//de.setChangeRegistrant(login.getUserName());
					service.savePojo(de , "ACCIDENT_ID");
				}
			}
		}
		
	}
	
	public void savePartChange(String parray, int vehicleId) throws Exception {
		if(!CommonUtils.checkIsNullStr(parray)){
			Json json = new Json();
			List<TvVehiclePartChange> partChanges = json.getPojoList(parray, TvVehiclePartChange.class);
			for(TvVehiclePartChange de : partChanges){
				if(CommonUtils.checkIsNotNullAndZero(de.getPartId())){
					service.updatePojo(de,"PART_ID");	
				}  else {
					de.setVehicleId(vehicleId);
					de.setAddTime(new Date());
					//de.setChangeRegistrant(login.getUserName());
					service.savePojo(de , "PART_ID");
				}
			}
		}
		
	}
	public List getVehicleItemList_Print(String vehId,String tableName){
		String sql = "select a.* from "+tableName+" a  WHERE a.VEHICLE_ID=?";
        Integer iLen=30;
        if ("tr_repair_gene_manage".equals(tableName)) {
			 sql = " SELECT b.code_desc AS REPAIR_TYPE ,add_Time,remark,corp_name,created"+
		        " FROM tr_repair_gene_manage a LEFT JOIN tb_bd_code b ON a.REPAIR_TYPE=b.code_id"+
		        " WHERE a.VEHICLE_ID=?";        	
			List RegList=service.findAll(TrRepairGeneManageBean.class,sql,vehId);
			TrRepairGeneManageBean reg;
			for ( int i=0 ; i <iLen-RegList.size();i++ ) {
				reg = new TrRepairGeneManageBean();
				reg.setVehicleId(0);
				RegList.add(reg);	
			}
			return RegList;			
			
		} else if ("tr_repair_gene_part".equals(tableName)) {
			 sql = " SELECT add_time,corp_name,created,b.*"+
		        " FROM  tr_repair_gene_manage a LEFT JOIN tr_repair_gene_part b ON a.bill_code=b.bill_code"+
		        " WHERE a.VEHICLE_ID=? order by part_id";
			List partChangeList=service.findAll(TrRepairGenePartBeanPrint.class,sql,vehId);
			TrRepairGenePartBeanPrint partChange;
			for ( int i=0 ; i <iLen-partChangeList.size();i++ ) {
				partChange = new TrRepairGenePartBeanPrint();
				partChange.setVehicleId(0);
				partChangeList.add(partChange);	
			}			
			return partChangeList;
		} else if ("tv_vehicle_check".equals(tableName)) {
			List chekList=service.findAll(TvVehicleCheck.class,sql,vehId);
			TvVehicleCheck check;
			for ( int i=0 ; i <iLen-chekList.size();i++ ) {
				check = new TvVehicleCheck();
				check.setVehicleId(0);
				chekList.add(check);	
			}							
			return chekList;			
		} else if ("tv_vehicle_change".equals(tableName)) {
			List ChangeList=service.findAll(TvVehicleChange.class,sql,vehId);
			TvVehicleChange change;
			for ( int i=0 ; i <iLen-ChangeList.size();i++ ) {
				change = new TvVehicleChange();
				change.setVehicleId(0);
				ChangeList.add(change);	
			}							
			return ChangeList;
		} else if ("tv_vehicle_uses".equals(tableName)) {
			List usesList=service.findAll(TvVehicleUses.class,sql,vehId);
			TvVehicleUses uses;
			for ( int i=0 ; i <iLen-usesList.size();i++ ) {
				uses = new TvVehicleUses();
				uses.setVehicleId(0);
				usesList.add(uses);	
			}							
			return usesList;			
			
		} else if ("tv_vehicle_accident".equals(tableName)) {
			List accidentList=service.findAll(TvVehicleAccident.class,sql,vehId);
			TvVehicleAccident accident;
			for ( int i=0 ; i <iLen-accidentList.size();i++ ) {
				accident = new TvVehicleAccident();
				accident.setVehicleId(0);
				accidentList.add(accident);	
			}							
			return accidentList;	
		} else if ("tv_vehicle_driver".equals(tableName)) {
			List driverList=service.findAll(TvVehicleDriver.class,sql,vehId);
			TvVehicleDriver driver;
			for ( int i=0 ; i <iLen-driverList.size();i++ ) {
				driver = new TvVehicleDriver();
				driver.setVehicleId(0);
				driverList.add(driver);	
			}							
			return driverList;				
		} else		
			return service.findAll(sql, vehId);
		
		
	
	}	
	/**
	 * 获取健康档案子项数据列表
	 * @param vehId
	 * @param tableName
	 * @return
	 */
	public List getVehicleItemList(String vehId,String tableName){
		String sql = "";
		if (tableName.equals("tr_repair_gene_part")) {
		  sql = " SELECT add_time,corp_name,created,b.*"+
		        " FROM  tr_repair_gene_manage a LEFT JOIN tr_repair_gene_part b ON a.bill_code=b.bill_code"+
		        " WHERE a.VEHICLE_ID=? order by part_id";

		}
		else 
		  sql = "select a.* from "+tableName+" a  WHERE a.VEHICLE_ID=?";
		
		return service.findAll(sql, vehId);
	}
	
	
	/**
	 * 删除车辆主要部件、车辆变更、车辆使用、车辆交通事故、车辆驾驶员等记录
	 * @param ids
	 * @param vehicleId  
	 * @param itemID	主键名
	 * @param tableName  数据表的最好一个字符串名
	 */
	public void deleteVehicleItems(String ids, String vehicleId, String pid, String tableName) {
		StringBuilder sb = new StringBuilder();
		List<Object> largs = new ArrayList<Object>();
		
		tableName = "tv_vehicle_"+tableName; 
		sb.append("delete from ");
		sb.append(tableName);
		sb.append(" where VEHICLE_ID=? and ");
		largs.add(vehicleId);
		sb.append(pid);
		sb.append(" in(");
		String[] chids = ids.split(",");
		if(chids.length<1){
			throw new RuntimeException("没有选中id");
		}
		for(int i=0;i<chids.length;i++){
			if(i!=chids.length-1){
				sb.append("?,");
			}else{
				sb.append("?)");
			}
			largs.add(chids[i]);
		}
		
		Object[] args = largs.toArray();
		String sql = sb.toString();
		service.delete(sql, args);
	}

	/**
	 * @param po
	 * @return
	 */
	public TvVehicleParam getTvVehicleParam(TvVehicleParam po) {
		return service.getModelByPo(po);
	
	}			
}
