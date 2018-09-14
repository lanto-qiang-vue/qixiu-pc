package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbBdCode;


@Service
public class TbBdCodeService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("TYPE DESC,NUM");
		return service.getPageList(uSql, page, "TB_BD_CODE","CODE_ID");
	}
	
	public Integer newType(){
		String sql = "SELECT MAX(TYPE) AS newType FROM TB_BD_CODE";
		return (Integer)service.findRtObject(sql, Integer.class);
	}
	
	public Integer[] newCode(String type){
		String sql = "SELECT MAX(CODE_ID) AS CODE FROM TB_BD_CODE WHERE TYPE=?";
		Integer code = (Integer)service.findRtObject(sql, Integer.class,type);
		String sql2 = "SELECT MAX(NUM) AS NUM FROM TB_BD_CODE WHERE TYPE=?";
		Integer num = (Integer)service.findRtObject(sql2, Integer.class,type);
		Integer[] obj = {code + 1,num + 1};
		return obj;
	}

	public void save(TbBdCode pojo){
		pojo.setUpdateDate(null);
		service.savePojo(pojo);
	}
	
	public TbBdCode getModel(TbBdCode con){
		return service.getModelByPo(con);
	}

	public void update(TbBdCode pojo){
		service.updatePojo(pojo,"CODE_ID");
	}

	public void delete(String ids){
		service.delete("delete from TB_BD_CODE where CODE_ID in (" + ids + ")");
	}
}
