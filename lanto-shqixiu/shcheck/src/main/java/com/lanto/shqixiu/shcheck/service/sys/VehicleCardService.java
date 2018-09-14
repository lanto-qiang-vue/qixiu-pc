package com.lanto.shqixiu.shcheck.service.sys;

import java.lang.reflect.Method;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.bean.TrRepairGeneManageBean;
import com.lanto.shqixiu.shcheck.model.po.TbBdCode;
import com.lanto.shqixiu.shcheck.model.po.TvVehicleBase;
import com.lanto.shqixiu.shcheck.model.report.DataSet;
import com.lanto.shqixiu.shcheck.model.report.NodeInfo;
import com.lanto.shqixiu.shcheck.model.report.ObjectToXML;
import com.lanto.shqixiu.shcheck.service.common.CreateNumberService;
import com.lanto.shqixiu.shcheck.test.JsonTest;
import com.lanto.shqixiu.shcheck.util.Constant;


@Service
public class VehicleCardService {

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
	
	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			//TvVehiclePlan plan = new TvVehiclePlan();
			//plan.setVehicleId(Integer.valueOf(chid));
			//service.deleteByPo(plan);
			
			TvVehicleBase po = new TvVehicleBase();
			po.setVehicleId(Integer.valueOf(chid));
			service.deleteByPo(po);
		}
	}
	public TbBdCode getModel_Code(TbBdCode po) throws Exception{
		return service.getModelByPo(po);
		
	}
	public String createReportXml(TrRepairGeneManageBean repair , String type,ClientLoginInfo login) throws Exception{
		String title = "车辆技术档案打印";
		String reportId = Constant.REPORT_ID_REPAIR_VEHICLE;
		NodeInfo node = new NodeInfo(reportId,title,"sa","0");
		DataSet master = new DataSet("MASTER",repair,TrRepairGeneManageBean.class);
		return ObjectToXML.toReportXML(node, master);
	}	
	
	/**
	 * 
	 * 保存车辆健康档案的子项
	 * @author xukangliu
	 * @date 2017-02-28
	 * @param parray
	 * @param vehicleId
	 * @param clazz
	 * @param idName
	 * @throws Exception
	 */
	public <T> void  saveItem(String parray,Integer vehicleId,Class<T> clazz,String idName) throws Exception{
		if(!CommonUtils.checkIsNullStr(parray)){
			JsonTest json = new JsonTest();
			//List<TvVehicleChange> parts = json.getPojoList(parray, TvVehicleChange.class);
			List<T> parts = json.getPojoList(parray, clazz);
			for(T de : parts){
				if(CommonUtils.checkIsNotNullAndZero(this.getIdValue(de, idName))){
					//regId===>REG_ID
					service.updatePojo(de,idName.replaceFirst("Id", "_Id").toUpperCase());	
				}  else {
				  de  = this.setPoValue(de, vehicleId);
				  //TODO  还不知道
				  //de.setChangeRegistrant(login.getUserName());
				  service.savePojo(de , idName.toUpperCase()); // 表中的id主键是大写
				}
			}
		}
	}
	
	/**
	 * 删除车辆主要部件、车辆变更、车辆使用、车辆交通事故、车辆驾驶员等记录
	 * @author xukangliu
	 * @date 2017-02-28 
	 * @param ids
	 * @param vehicleId  
	 * @param itemID	主键名
	 * @param tableName  数据表的最后一个字符串名
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
	 * 获取健康档案子项数据列表
	 * @param vehId
	 * @param tableName
	 * @return
	 */
	public List getVehicleItemList(String vehId,String tableName){
		String sql = "select a.* from "+tableName+" a  WHERE a.VEHICLE_ID=?";
		return service.findAll(sql, vehId);
	}
	
	/**
	 * @author xukangliu
	 * @date 2017-02-28
	 *获取主键的值
	 */
	public  <T> int getIdValue(T t,String id) throws Exception{
		String upFirtChar = id.replaceFirst(id.substring(0, 1),id.substring(0,1).toUpperCase());
		String getIdName = "get"+upFirtChar;
		//获取方法
		Method method = t.getClass().getMethod(getIdName,null);
		return (Integer) method.invoke(t, null);
		
	}
	
	/**
	 * @author xukangliu
	 * @date 2017-02-28
	 * 设置vehicle子项的vehicleId值和添加时间值
	 */
	public <T> T setPoValue(T t,int vehicleId) throws Exception{
		Method setVehileId = t.getClass().getMethod("setVehicleId",Integer.class);
		Method setAddTime = t.getClass().getMethod("setAddTime",Date.class);
		if(setVehileId!=null){
			setVehileId.invoke(t,vehicleId);
		}
		if(setAddTime!=null){
			setAddTime.invoke(t, new Date());
		}
		return t;
	}
	
	/*public List getVehicleItemList_Print(String vehId,String tableName){
		String sql = "select a.* from "+tableName+" a  WHERE a.VEHICLE_ID=?";
        Integer iLen=30;
        if ("tv_vehicle_reg".equals(tableName)) {
			List RegList=service.findAll(TvVehicleReg.class,sql,vehId);
			TvVehicleReg reg;
			for ( int i=0 ; i <iLen-RegList.size();i++ ) {
				reg = new TvVehicleReg();
				reg.setVehicleId(0);
				RegList.add(reg);	
			}
			return RegList;			
			
		} else if ("tv_vehicle_part_change".equals(tableName)) {
			List partChangeList=service.findAll(TvVehiclePartChange.class,sql,vehId);
			TvVehiclePartChange partChange;
			for ( int i=0 ; i <iLen-partChangeList.size();i++ ) {
				partChange = new TvVehiclePartChange();
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
	*/
	public TvVehicleBase getModel_VehicleBase(TvVehicleBase po) throws Exception{
		return service.getModelByPo(po);
		
	}
	/*public String createReportXml(TvVehicleBase base ,TvVehicleParam param,List regList,List partChangeList,List chekList,List changeList,List usesList,List accidentList,List driverList) throws Exception{
		String title = "车辆技术档案打印";
		String reportId = Constant.REPORT_ID_REPAIR_VEHICLE;
		NodeInfo node = new NodeInfo(reportId,title,"sa","0");
		DataSet master = new DataSet("MASTER",base,TvVehicleBase.class);
		DataSet detail = new DataSet("DETIAL",regList,TvVehicleReg.class);

		DataSet subdetial = new DataSet("SUBDETIAL",param,TvVehicleParam.class);
		DataSet detail1 = new DataSet("EXTRAL1",partChangeList,TvVehiclePartChange.class);
		DataSet detail2 = new DataSet("EXTRAL2",changeList,TvVehicleChange.class);			
		DataSet detail3 = new DataSet("EXTRAL3",usesList,TvVehicleUses.class);	
		DataSet detail4 = new DataSet("EXTRAL4",accidentList,TvVehicleAccident.class);
		DataSet detail5 = new DataSet("EXTRAL5",driverList,TvVehicleDriver.class);		
		DataSet detail6 = new DataSet("EXTRAL6",chekList,TvVehicleCheck.class);		
		
		
		return ObjectToXML.toReportXML(node, master,detail,subdetial,detail1,detail2,detail3,detail4,detail5,detail6);
		 
	}	*/
}
