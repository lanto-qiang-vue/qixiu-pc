package com.lanto.shqixiu.shwgc.service.sys;

import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.bean.TcFunc;
import com.lanto.shqixiu.shwgc.model.po.TbBdArea;
import com.lanto.shqixiu.shwgc.model.po.TmSysUser;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class CommonService {
	@Resource
	private SwdbFactory service;
	
	public List getDictList(){
		String sql = "SELECT CODE_ID CODE,TYPE,TYPE_NAME,CODE_DESC NAME,NUM NUM FROM TB_BD_CODE WHERE STATUS=?";
		return service.findAll(sql,"10011001");
	}
	
	public List<TcFunc> getMenus(Integer userId){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT F.FUNC_ID,\n" );
		sql.append("       F.PAR_FUNC_ID,\n" );
		sql.append("       F.FUNC_CODE,\n" );
		sql.append("       F.FUNC_NAME,\n" );
		sql.append("       F.FUNC_IMAGE icon,\n" );
		sql.append("       F.FUNC_IMAGE iconFont,\n" );
		sql.append("       F.TOP_LEVEL,\n" );
		sql.append("       F.FUNC_TYPE,\n" );
		sql.append("       F.ICON_CLS,\n" );
		sql.append("       F.SORT_ORDER,\n" );
		sql.append("       F.NO_CTRL,\n" );
		sql.append("       RF.FUNC_POWER\n" );
		sql.append("  FROM TQ_SYS_ROLE_FUNC RF\n" );
		sql.append("  LEFT JOIN TQ_FUNC F ON RF.FUNC_ID = F.FUNC_ID\n" );
		sql.append(" WHERE RF.ROLE_ID IN (SELECT ROLE_ID FROM TQ_SYS_USER WHERE USER_ID = ?) ORDER BY F.SORT_ORDER");
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
	
	public List getTransCorpBySel(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("CORP_ID");
		return service.getPageList(uSql, page, "TB_TRANS_CORP_INFO","CORP_ID");
	}
	
	public List getPlateNumA(){
		String sql = "SELECT PROVINCE_NAME CODE,PROVINCE_NAME NAME FROM TR_PLATE_NUM_PROVINCE ORDER BY ID";
		return service.findAll(sql);
	}
	
	public List getCasecadeCode(){
		String sql = "select CAST(ID AS CHAR) ID_,CAST(ID AS CHAR) CODE,NAME,PAR_ID PID,TYPE from db_repair_standard order by type asc,id asc";
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
	
	public List getBdStation(String corpId){
		String sql = "SELECT STATION_ID,STATION_CODE,STATION_NAME,CHANNEL_CODE1,CHANNEL_CODE2 FROM TB_BD_STATION WHERE CORP_ID=?";
		return service.findAll(sql,corpId);
	}
	
	public List getRepairItems(String corpId){
		String sql = "SELECT ITEM_ID,ITEM_NAME,REPAIR_HOURS FROM TB_REPAIR_ITEMS WHERE CORP_ID=?";
		return service.findAll(sql,corpId);
	}
	
	public List getRepairParts(String corpId){
		String sql = "SELECT PART_ID,PART_NAME,PART_TYPE,PART_PRICE,PART_BRAND,IS_OWNER_PROVIDE FROM TB_REPAIR_PARTS WHERE CORP_ID=?";
		return service.findAll(sql,corpId);
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
