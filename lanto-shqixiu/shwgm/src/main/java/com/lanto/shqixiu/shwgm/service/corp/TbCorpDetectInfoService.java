package com.lanto.shqixiu.shwgm.service.corp;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbCorpDetectInfo;


@Service
public class TbCorpDetectInfoService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page,String areaCode) throws SQLException{
		page.setOrderByColumn("STATION_ID");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "(SELECT * FROM TB_CORP_DETECT_INFO WHERE STATION_AREA LIKE '%"+areaCode+"%') T","STATION_ID");
	}

	public List doExport(List<SqlUnit> uSql){
		return service.getList("select * from TB_CORP_DETECT_INFO where 1=1 ", uSql);
	}


	public void save(TbCorpDetectInfo pojo){
		service.savePojo(pojo,"STATION_ID");
	}

	public void update(TbCorpDetectInfo pojo){
		service.updatePojo(pojo,"STATION_ID");
	}

	public void delete(String ids){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbCorpDetectInfo po = new TbCorpDetectInfo();
			po.setStationId(Integer.valueOf(chid));
			service.deleteByPo(po);
		}
	}
}
