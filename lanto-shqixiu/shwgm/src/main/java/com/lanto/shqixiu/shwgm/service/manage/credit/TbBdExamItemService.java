package com.lanto.shqixiu.shwgm.service.manage.credit;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbBdExamItem;
import com.lanto.shqixiu.shwgm.model.po.TbBdExamType;


@Service
public class TbBdExamItemService {

	@Resource
	private SwdbFactory swdb;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("TYPE_ORDER ASC,ORDER_ID");
		return swdb.getPageList(uSql, page, "V_EXAM_ITEM","ITEM_ID");
	}
	
	public List<TbBdExamType> getTypeList(String year,String type){
		String sql = "select * from TB_BD_EXAM_TYPE where VERSION_NO=? and EXAM_TYPE=? order by ORDER_ID";
		return swdb.findAll(TbBdExamType.class,sql, year,type);
	}

	public Integer save(TbBdExamItem pojo){
		Integer id = swdb.savePojoRtPkId(pojo,"ITEM_ID");
		pojo.setItemId(id);
		return id;
	}

	public void update(TbBdExamItem pojo){
		swdb.updatePojo(pojo,"ITEM_ID");
	}
	
	public Integer saveType(TbBdExamType pojo){
		Integer id = swdb.savePojoRtPkId(pojo,"TYPE_ID");
		return id;
	}

	public void updateType(TbBdExamType pojo){
		swdb.updatePojo(pojo,"TYPE_ID");
	}

	public void delete(String ids){
		swdb.delete("delete from TB_BD_EXAM_ITEM where ITEM_ID in (" + ids + ")");
	}
	
	public void deleteType(String typeId){
		TbBdExamItem item = new TbBdExamItem();
		item.setTypeId(Integer.valueOf(typeId));
		swdb.deleteByPo(item);
		TbBdExamType type = new TbBdExamType();
		type.setTypeId(Integer.valueOf(typeId));
		swdb.deleteByPo(type);
	}
}
