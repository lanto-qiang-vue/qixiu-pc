package com.lanto.shqixiu.shwgm.service.manage.report;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.model.po.TbQuestions;
import com.lanto.shqixiu.shwgm.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgm.model.po.VRepairQuestions;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class CorpNumReportService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page,String areaCode) throws SQLException{
		page.setOrderByColumn("AREA_CODE");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "(SELECT * FROM V_CORP_NUM_REPORT WHERE AREA_CODE LIKE '%"+areaCode+"%') T","ID");
	}

}
