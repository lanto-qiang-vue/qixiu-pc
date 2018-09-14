package com.lanto.shqixiu.shwgc.service.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbBdStation;


@Service
public class TbBdService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	@Resource
	private TqSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("STATION_ID");
		return service.getPageList(uSql, page, "(SELECT * FROM TB_BD_STATION) T","STATION_ID");
	}

	public void save(TbBdStation pojo,ClientLoginInfo info) throws Exception{
		if(pojo.getStationId()!=null){
			service.updatePojo(pojo, "STATION_ID");
			String logcontent = "用户【%s】修改了编号为【%s】工位信息";
			logcontent = String.format(logcontent, info.getUserName(),pojo.getStationId());
			logService.addOperatorLog(info, "工位管理", logcontent);
		}else{
			String corpId = info.getCorpId();	//企业id
			pojo.setCorpId(Integer.parseInt(corpId));
			service.savePojo(pojo,"STATION_ID");
			String logcontent = "用户【%s】新增了工位 【%s】 ";
			logcontent = String.format(logcontent, info.getUserName(),pojo.getStationName());
			logService.addOperatorLog(info, "工位管理", logcontent);
		}
	}

	public void delete(String ids){
		service.delete("delete from TB_BD_STATION where STATION_ID in (" + ids + ")");
	}
}
