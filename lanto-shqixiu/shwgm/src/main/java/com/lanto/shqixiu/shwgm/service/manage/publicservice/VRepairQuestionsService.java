package com.lanto.shqixiu.shwgm.service.manage.publicservice;

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
public class VRepairQuestionsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "V_REPAIR_QUESTIONS","QUES_ID");
	}

}
