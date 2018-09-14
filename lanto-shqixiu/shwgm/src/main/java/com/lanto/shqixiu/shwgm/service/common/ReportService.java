package com.lanto.shqixiu.shwgm.service.common;

import org.softbase.service.SwdbFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbReportTemp;
import com.lanto.shqixiu.shwgm.model.po.TbReportUser;
import com.lanto.shqixiu.shwgm.model.po.TcFileUploadInfo;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class ReportService {
	@Autowired
	private SwdbFactory service;
	
	public TbReportUser getReportUserModel(TbReportUser report){
		return service.getModelByPo(report);
	}
	
	public TbReportTemp getReportTempModel(TbReportTemp report){
		return service.getModelByPo(report);
	}
	
	public boolean update(TbReportUser report){
		return service.updatePojo(report, "ID") == 1;
	}
	
	public boolean save(TbReportUser report){
		return service.savePojo(report, "ID") == 1;
	}
	
	public void delete(TcFileUploadInfo info){
		service.deleteByPo(info);
	}
	
	
	
}
