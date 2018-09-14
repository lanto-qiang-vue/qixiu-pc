package com.lanto.shqixiu.shwgm.service.trans.report;


import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.VTransRepairReport;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class TransRepairReportService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public VTransRepairReport getInfo(VTransRepairReport pojo){
		VTransRepairReport po=(VTransRepairReport)swdb.getModelByPo(pojo);
		return po;
	}
}
