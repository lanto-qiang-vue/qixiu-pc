package com.lanto.shqixiu.shwgm.service.notice;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.snaker.engine.helper.StreamHelper;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbAssociationSummary;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.model.po.TvVehicleParam;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class SummaryService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	

	public void save(TbAssociationSummary pojo,ManageLoginInfo info) throws Exception{
		pojo.setId(1);
		swdb.savePojo(pojo);
		String logcontent = "【%s】增加了协会简介 ";
		logcontent = String.format(logcontent, info.getUserName());
		logService.addOperatorLog(info,"协会简介", logcontent);
	}

	public void update(TbAssociationSummary pojo,ManageLoginInfo info) throws SQLException{
		pojo.setId(1);
		swdb.updatePojo(pojo,"ID");
		String logcontent = "【%s】修改了协会简介 ";
		logcontent = String.format(logcontent, info.getUserName());
		logService.addOperatorLog(info,"协会简介", logcontent);
	}
	
	public TbAssociationSummary getInfo(TbAssociationSummary po) {
		return swdb.getModelByPo(po);
	
	}
	
}
