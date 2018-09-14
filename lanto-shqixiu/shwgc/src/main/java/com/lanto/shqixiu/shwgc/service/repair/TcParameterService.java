package com.lanto.shqixiu.shwgc.service.repair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TrParameter;
import com.lanto.shqixiu.shwgc.model.po.TrParameterCorp;


@Service
public class TcParameterService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("PARAMS_ID");
		StringBuffer sql = new StringBuffer();
		sql.append("(SELECT P.PARAMS_CODE,\n" );
		sql.append("       P.PARAMS_ID,\n" );
		sql.append("       P.PARAMS_NAME,\n" );
		sql.append("       P.PARAMS_UNIT,\n" );
		sql.append("       P.IS_STOP,\n" );
		sql.append("       U.ID,\n" );
		sql.append("       U.CORP_ID,\n" );
		sql.append("       CASE WHEN U.PARAMS_VALUE IS NULL THEN P.PARAMS_VALUE ELSE U.PARAMS_VALUE END PARAMS_VALUE\n" );
		sql.append("  FROM TR_PARAMETER P\n" );
		sql.append("  LEFT JOIN (SELECT * FROM TR_PARAMETER_CORP WHERE CORP_ID=?) U ON P.PARAMS_ID = U.PARAMS_ID) t");
		return service.getPageList(uSql, page,sql.toString(),"PARAMS_ID");
	}

	public Integer saveParameterByUnit(TrParameterCorp pojo){
		Integer id = service.savePojoRtPkId(pojo,"ID");
		pojo.setId(id);
		return id;
	}
	
	public void saveParams(TrParameter pojo){
		service.savePojo(pojo,"PARAMS_ID");
	}
	
	public void update(TrParameterCorp pojo){
		service.updatePojo(pojo,"ID");
	}

	public void delete(String ids){
		service.delete("delete from TR_PARAMETER where PARAMS_ID in (" + ids + ")");
	}
}
