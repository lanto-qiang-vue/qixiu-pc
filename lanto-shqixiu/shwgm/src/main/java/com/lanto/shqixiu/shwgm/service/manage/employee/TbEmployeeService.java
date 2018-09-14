package com.lanto.shqixiu.shwgm.service.manage.employee;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.Json;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbEmployeeBaseInfo;
import com.lanto.shqixiu.shwgm.model.po.TbEmployeeCert;
import com.lanto.shqixiu.shwgm.util.CommonUtils;


@Service
public class TbEmployeeService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;

	public List getList(List<SqlUnit> uSql, PageUnit page,String areaCode) throws SQLException{
		page.setOrderByColumn("EMPLOYEE_ID");
		return swdb.getPageList(uSql, page, "(SELECT A.*,B.CORP_NUM,B.CORP_NAME,B.CORP_TYPE,B.CORP_AREA,CORP_ADD FROM "
				+ "TB_EMPLOYEE_BASE_INFO A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID WHERE B.CORP_AREA LIKE '%"+areaCode+"%') T","EMPLOYEE_ID");
	}

	public List doExport(List<SqlUnit> uSql){
		return swdb.getList("select * from TB_EMPLOYEE_BASE_INFO where 1=1 ", uSql);
	}
	
	public Integer save(TbEmployeeBaseInfo pojo,String array) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo,"EMPLOYEE_ID");
		pojo.setEmployeeId(id);
		saveCerts(array,pojo.getIdNum());
		return id;
	}
	
	public List getCertList(String idNum) throws SQLException{
		String sql = "SELECT * FROM TB_EMPLOYEE_CERT WHERE ID_NUM=?";
		return swdb.findAll(sql, idNum);
	}

	public void update(TbEmployeeBaseInfo pojo,String array) throws Exception{
		swdb.updatePojo(pojo,"EMPLOYEE_ID");
		saveCerts(array,pojo.getIdNum());
	}

	public void delete(String ids){
		swdb.delete("delete from TB_EMPLOYEE_BASE_INFO where EMPLOYEE_ID in (" + ids + ")");
	}
	
	public void saveCerts(String array,String idNum) throws Exception{
		TbEmployeeCert cert = new TbEmployeeCert();
		cert.setIdNum(idNum);
		swdb.deleteByPo(cert);
		if(!CommonUtils.checkIsNullStr(array)){
			Json json = new Json();
			List<TbEmployeeCert> details = json.getPojoList(array, TbEmployeeCert.class);
			for(TbEmployeeCert de : details){
				de.setIdNum(idNum);
				swdb.savePojo(de , "CERT_ID");
			}
		}
	}
	

	
	
}
