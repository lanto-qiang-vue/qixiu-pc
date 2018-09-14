package com.lanto.shqixiu.shwgm.service.trans.common;

import java.util.List;

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
public class TransCommonService {
	@Autowired
	private SwdbFactory service;
	
	public List getDictList(){
		String sql = "SELECT CODE_ID CODE,TYPE,TYPE_NAME,CODE_DESC NAME,NUM NUM FROM TB_BD_CODE WHERE STATUS=?";
		return service.findAll(sql,10011001);
	}
	
	public List<TcFunc> getMenus(Integer userId){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT F.FUNC_ID,\n" );
		sql.append("       F.PAR_FUNC_ID,\n" );
		sql.append("       F.FUNC_CODE,\n" );
		sql.append("       F.FUNC_NAME,\n" );
		sql.append("       F.FUNC_IMAGE icon,\n" );
		sql.append("       F.FUNC_IMAGE iconFont,\n" );
		sql.append("       F.ICON_CLS,\n" );
		sql.append("       F.TOP_LEVEL,\n" );
		sql.append("       F.FUNC_TYPE,\n" );
		sql.append("       F.SORT_ORDER,\n" );
		sql.append("       RF.FUNC_POWER\n" );
		sql.append("  FROM TT_SYS_ROLE_FUNC RF\n" );
		sql.append("  LEFT JOIN TT_FUNC F ON RF.FUNC_ID = F.FUNC_ID\n" );
		sql.append(" WHERE RF.ROLE_ID IN (SELECT ROLE_ID FROM TT_SYS_USER WHERE USER_ID = ?) ORDER BY F.SORT_ORDER");
		return service.findAll(TcFunc.class, sql.toString(),userId);
	}
	
	
	
	public List  getFuncPower(Integer userId){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT F.FUNC_ID,\n" );
		sql.append("       F.PAR_FUNC_ID,\n" );
		sql.append("       F.FUNC_CODE,\n" );
		sql.append("       F.FUNC_NAME,\n" );
		sql.append("       F.FUNC_BUTTON,\n" );
		sql.append("       RF.FUNC_POWER\n" );
		sql.append("  FROM TQ_SYS_ROLE_FUNC RF\n" );
		sql.append("  LEFT JOIN TQ_FUNC F ON RF.FUNC_ID = F.FUNC_ID\n" );
		sql.append(" WHERE RF.ROLE_ID IN (SELECT ROLE_ID FROM TQ_SYS_USER WHERE USER_ID = ?) ORDER BY F.SORT_ORDER");
		return service.findAll(sql.toString(),userId);
	}
	
	public List getFuncButtons(){
		String sql = "SELECT * FROM TM_FUNC_BUTTONS";
		return service.findAll(sql);
	}
	
	public List getPlateNumA(){
		String sql = "SELECT PROVINCE_NAME CODE,PROVINCE_NAME NAME FROM TR_PLATE_NUM_PROVINCE ORDER BY ID";
		return service.findAll(sql);
	}
	
	public List getPlateNumB(){
		String sql = "SELECT LETTER_NAME CODE,LETTER_NAME NAME FROM TR_PLATE_NUM_LETTER ORDER BY ID";
		return service.findAll(sql);
	}
	
	public List getBelongArea(){
		String sql = "SELECT AREA_CODE CODE,AREA_NAME NAME FROM TB_BD_AREA ORDER BY SORT_ORDER ASC";
		return service.findAll(sql);
	}
	
	public List getRepairWarn1(String corpId){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_REPAIR_DATE,INTERVAL REPAIR_CYCLE month) WARN_DATE,MONTH_DIFF from v_vehicle_plan where MONTH_DIFF <=1 AND TRANS_CORP_ID=? order by MONTH_DIFF asc limit 0,20";
		return service.findAll(sql, corpId);
	}
	
	public List getRepairWarn2(String corpId){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_REPAIR_DATE,INTERVAL REPAIR_CYCLE month) WARN_DATE from v_vehicle_plan where MONTH_DIFF =1 AND TRANS_CORP_ID=? limit 0,20";
		return service.findAll(sql, corpId);
	}
	
	public List getRepairWarn3(String corpId){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME from v_vehicle_plan where REPAIR_CYCLE is null AND TRANS_CORP_ID=? limit 0,20";
		return service.findAll(sql, corpId);
	}
	
	public List getCheckWarn1(String corpId){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_CHECK_DATE,INTERVAL CHECK_ZQ month) WARN_DATE,CHECK_ZQ-CHECK_MONTH from v_vehicle_check_warn where CHECK_ZQ-CHECK_MONTH <= 1 AND TRANS_CORP_ID=?  order by CHECK_ZQ-CHECK_MONTH asc limit 0,20";
		return service.findAll(sql, corpId);
	}
	
	public List getCheckWarn2(String corpId){
		String sql = "select PLATE_NUM,PLATE_COLOR,CORP_NAME,DATE_ADD(LAST_CHECK_DATE,INTERVAL CHECK_ZQ month) WARN_DATE from v_vehicle_check_warn where CHECK_ZQ-CHECK_MONTH = 1 AND TRANS_CORP_ID=? limit 0,20";
		return service.findAll(sql, corpId);
	}
	
	public TbBdArea getAreaModel(String areaCode){
		TbBdArea po = new TbBdArea();
		po.setAreaCode(areaCode);
		po = service.getModelByPo(po);
		return po;
	}
	
	public List<TmSysUser> getAreaTree(String area){
		String sql = "SELECT * FROM TM_SYS_USER where BLONG_AREA=?";
		return service.findAll(TmSysUser.class, sql, new Object[]{area});
	}
}
