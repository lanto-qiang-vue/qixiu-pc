package com.lanto.shqixiu.shcheck.service.vehicle;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbCorpInfo;
import com.lanto.shqixiu.shcheck.model.po.TbVehicleGasDataDetail;
import com.lanto.shqixiu.shcheck.model.po.TbVehicleGasPartItem;
import com.lanto.shqixiu.shcheck.model.po.TbVehicleGasRecord;


@Service
public class TbVehicleGasRecordService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("GAS_ID");
		return service.getPageList(uSql, page, "TB_VEHICLE_GAS_RECORD","GAS_ID");
	}
	
	
	public List getPartList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ITEM_ID");
		return service.getPageList(uSql, page, "TB_VEHICLE_GAS_PART_ITEM","ITEM_ID");
	}
	
	public List getItemList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ITEM_ID");
		return service.getPageList(uSql, page, "TB_VEHICLE_GAS_LABOUR_ITEM","ITEM_ID");
	}

	public Integer save(TbVehicleGasRecord pojo,TbVehicleGasDataDetail de,List<TbVehicleGasPartItem> list,ClientLoginInfo login){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(login.getCorpId());
		corp = service.getModelByPo(corp);
		pojo.setCorpId(corp.getCorpId());
		pojo.setCorpNum(corp.getCorpNum());
		pojo.setCorpName(corp.getCorpName());
		pojo.setBillType("排气污染");
		Integer id = service.savePojoRtPkId(pojo,"GAS_ID");
		pojo.setGasId(id);
		de.setCorpId(corp.getCorpId());
		de.setCorpNum(corp.getCorpNum());
		de.setBillNo(pojo.getBillNo());
		de.setOperatingUnit(pojo.getOperatingUnit());
		de.setAddDate(new Date());
		service.savePojo(de, "DETAIL_ID");
		updateParts(list,corp,pojo.getBillNo());
		return id;
	}

	public void update(TbVehicleGasRecord pojo,TbVehicleGasDataDetail de,List<TbVehicleGasPartItem> list,ClientLoginInfo login){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(login.getCorpId());
		corp = service.getModelByPo(corp);
		service.updatePojo(pojo,"GAS_ID");
		de.setBillNo(pojo.getBillNo());
		service.updatePojo(de, "BILL_NO");
		updateParts(list,corp,pojo.getBillNo());
	}
	
	public void updateParts(List<TbVehicleGasPartItem> list,TbCorpInfo corp,String billNo){
		String sql = "delete from TB_VEHICLE_GAS_PART_ITEM where BILL_NO=?";
		service.delete(sql, billNo);
		for(TbVehicleGasPartItem part : list){
			part.setBillNo(billNo);
			part.setCorpId(corp.getCorpId());
			part.setCorpNum(corp.getCorpNum());
			service.savePojo(part, "ITEM_ID");
		}
	}
	
	public Map getDetail(String billNo){
		String sql = "select * from TB_VEHICLE_GAS_DATA_DETAIL where  BILL_NO=? order by DETAIL_ID DESC";
		List list = service.findAll(sql, billNo);
		if(list != null && list.size() > 0){
			return (Map)list.get(0);
		}
		return null;
	}
	
	public String getBillNo(){
		String sql = "{call Sp_SYS_GetBillID(?,?)}";
		return  (String)service.findRtObject(sql, String.class, new Object[]{"001",""});	
	}
	
	public TbCorpInfo getCorpInfo(String corpId){
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(corpId);
		return service.getModelByPo(corp);
	}
	
	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from TB_VEHICLE_GAS_RECORD where 1=1 ", uSql);
	}

	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			service.delete("delete from TB_VEHICLE_GAS_DATA_DETAIL where BILL_NO=?",chid);
			service.delete("delete from TB_VEHICLE_GAS_PART_ITEM where BILL_NO=?",chid);
			service.delete("delete from TB_VEHICLE_GAS_LABOUR_ITEM where BILL_NO=?",chid);
			service.delete("delete from TB_VEHICLE_GAS_RECORD where BILL_NO=?",chid);
		}
	}
}
