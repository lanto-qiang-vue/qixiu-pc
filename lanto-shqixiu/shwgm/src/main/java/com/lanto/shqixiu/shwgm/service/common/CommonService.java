package com.lanto.shqixiu.shwgm.service.common;

import java.util.List;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.bean.TcFunc;
import com.lanto.shqixiu.shwgm.model.po.TbBdArea;
import com.lanto.shqixiu.shwgm.model.po.TmSysUser;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class CommonService {
	@Autowired
	private SwdbFactory swdb;
	
	public List getDictList(){
		String sql = "SELECT CODE_ID CODE,TYPE,TYPE_NAME,CODE_DESC NAME,NUM NUM FROM TB_BD_CODE WHERE STATUS=?";
		return swdb.findAll(sql,10011001);
	}
	
	public List getCasecadeCode(){
		String sql = "select CAST(ID AS CHAR) ID_,CAST(ID AS CHAR) CODE,NAME,PAR_ID PID,TYPE from db_repair_standard order by type asc,id asc";
		return swdb.findAll(sql);
	}
	
	public List getDictType(){
		String sql = "select distinct type CODE,concat('[',type,']',TYPE_NAME) NAME,TYPE_NAME from TB_BD_CODE ORDER BY TYPE DESC";
		return swdb.findAll(sql);
	}
	
	public List<TcFunc> getMenus(String userCode){
		StringBuffer sql = new StringBuffer();
		TmSysUser user = new TmSysUser();
		user.setUserCode(userCode);
		user = swdb.getModelByPo(user);
		sql.append("SELECT F.FUNC_ID,\n" );
		sql.append("       F.PAR_FUNC_ID,\n" );
		sql.append("       F.FUNC_CODE,\n" );
		sql.append("       F.FUNC_NAME,\n" );
		sql.append("       F.FUNC_IMAGE AS ICON,\n" );
		sql.append("       F.FUNC_IMAGE AS ICON_FONT,\n" );
		sql.append("       F.TOP_LEVEL,\n" );
		sql.append("       F.FUNC_TYPE,\n" );
		sql.append("       F.ICON_CLS,\n" );
		sql.append("       F.SORT_ORDER\n" );
		sql.append("  FROM TM_SYS_ROLE_FUNC RF\n" );
		sql.append("  LEFT JOIN TM_FUNC F ON RF.FUNC_ID = F.FUNC_ID\n" );
		sql.append(" WHERE RF.ROLE_ID IN (" + user.getRoleId() + ") GROUP BY F.FUNC_ID,F.PAR_FUNC_ID,F.FUNC_CODE,F.FUNC_NAME,F.FUNC_IMAGE,F.FUNC_TYPE,F.SORT_ORDER ORDER BY F.SORT_ORDER");
		return swdb.findAll(TcFunc.class, sql.toString());
	}
	
	public List  getFuncPower(String userCode){
		StringBuffer sql = new StringBuffer();
		TmSysUser user = new TmSysUser();
		user.setUserCode(userCode);
		user = swdb.getModelByPo(user);
		sql.append("SELECT F.FUNC_ID,\n" );
		sql.append("       F.PAR_FUNC_ID,\n" );
		sql.append("       F.FUNC_CODE,\n" );
		sql.append("       F.FUNC_NAME,\n" );
		sql.append("       F.FUNC_BUTTON,\n" );
		sql.append("       group_concat(RF.FUNC_POWER) FUNC_POWER\n" );
		sql.append("  FROM TM_SYS_ROLE_FUNC RF\n" );
		sql.append("  LEFT JOIN TM_FUNC F ON RF.FUNC_ID = F.FUNC_ID\n" );
		sql.append(" WHERE RF.ROLE_ID IN (" + user.getRoleId() + ") GROUP BY F.FUNC_ID,F.PAR_FUNC_ID,F.FUNC_CODE,F.FUNC_NAME,F.FUNC_BUTTON ORDER BY F.SORT_ORDER");
		return swdb.findAll(sql.toString());
	}
	
	public List getAllRole(){
		String sql = "select * from TM_SYS_ROLE";
		return swdb.findAll(sql);
	}
	
	public List getFuncButtons(){
		String sql = "SELECT * FROM TM_FUNC_BUTTONS";
		return swdb.findAll(sql);
	}
	
	public List getBelongArea(){
		String sql = "SELECT ID, AREA_CODE CODE,AREA_NAME NAME FROM TB_BD_AREA ORDER BY SORT_ORDER ASC";
		return swdb.findAll(sql);
	}
	
	public List getBelongAreaByPage(List<SqlUnit> uSql, PageUnit page){
		String table = "(SELECT ID, AREA_CODE CODE,AREA_NAME NAME FROM TB_BD_AREA) t";
		return swdb.getPageList(uSql, page, table, "ID");
	}
	
	
	public TbBdArea getAreaModel(String areaCode){
		TbBdArea po = new TbBdArea();
		po.setAreaCode(areaCode);
		po = swdb.getModelByPo(po);
		return po;
	}
	
	public List<TmSysUser> getAreaTree(String area){
		String sql = "SELECT * FROM TM_SYS_USER where BLONG_AREA=?";
		return swdb.findAll(TmSysUser.class, sql, new Object[]{area});
	}
	
	public List getCorpBySel(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("CORP_ID");
		return swdb.getPageList(uSql, page, "TB_CORP_INFO","CORP_ID");
	}
	
	public List getDetectCorpBySel(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("STATION_ID");
		return swdb.getPageList(uSql, page, "TB_CORP_DETECT_INFO","STATION_ID");
	}
	
	public List getExpertBySel(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("EXPERT_ID");
		return swdb.getPageList(uSql, page, "TB_EMPLOYEE_EXPERT","EXPERT_ID");
	}
	public List getCorpBySel_Ys(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("CORP_ID");
		return swdb.getPageList(uSql, page, "TB_TRANS_CORP_INFO","CORP_ID");
	}	
	public List getTransCorpBySel(List<SqlUnit> uSql, PageUnit page,String areaCode){
		page.setOrderByColumn("CORP_ID");
		return swdb.getPageList(uSql, page, "(SELECT * FROM TB_TRANS_CORP_INFO WHERE CORP_AREA LIKE '%"+areaCode+"%') T","CORP_ID");
	}
	
	public List getStationBySel(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("STATION_ID");
		return swdb.getPageList(uSql, page, "TB_CORP_DETECT_INFO","STATION_ID");
	}
	
	public List getPlateNumA(){
		String sql = "SELECT PROVINCE_NAME CODE,PROVINCE_NAME NAME FROM TR_PLATE_NUM_PROVINCE ORDER BY ID";
		return swdb.findAll(sql);
	}
	
	public List getPlateNumB(){
		String sql = "SELECT LETTER_NAME CODE,LETTER_NAME NAME FROM TR_PLATE_NUM_LETTER ORDER BY ID";
		return swdb.findAll(sql);
	}
	public List getRepairWarn1(String areaCode){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_REPAIR_DATE,INTERVAL REPAIR_CYCLE month) WARN_DATE,MONTH_DIFF from v_vehicle_plan "
				+ "where MONTH_DIFF <=1 and (corp_area like '%"+areaCode+"%' or corp_area is null) order by MONTH_DIFF asc limit 0,20";
		return swdb.findAll(sql);
	}
	
	public List getRepairWarn2(){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_REPAIR_DATE,INTERVAL REPAIR_CYCLE month) WARN_DATE from v_vehicle_plan where MONTH_DIFF =1  limit 0,20";
		return swdb.findAll(sql);
	}
	
	public List getRepairWarn3(String areaCode){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME from v_vehicle_plan where REPAIR_CYCLE is null and (corp_area like '%"+areaCode+"%' or corp_area is null) limit 0,20";
		return swdb.findAll(sql);
	}
	
	public List getCheckWarn1(String areaCode){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_CHECK_DATE,INTERVAL CHECK_ZQ month) WARN_DATE,CHECK_ZQ-CHECK_MONTH from v_vehicle_check_warn"
				+ " where CHECK_ZQ-CHECK_MONTH <= 1 and (corp_area like '%"+areaCode+"%' or corp_area is null) order by CHECK_ZQ-CHECK_MONTH asc limit 0,20";
		return swdb.findAll(sql);
	}
	
	public List getCheckWarn2(){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_CHECK_DATE,INTERVAL CHECK_ZQ month) WARN_DATE from v_vehicle_check_warn where CHECK_ZQ-CHECK_MONTH = 1 limit 0,20";
		return swdb.findAll(sql);
	}
}
