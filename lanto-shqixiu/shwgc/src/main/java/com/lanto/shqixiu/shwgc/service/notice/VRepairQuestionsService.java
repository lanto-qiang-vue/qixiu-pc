package com.lanto.shqixiu.shwgc.service.notice;

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

import com.lanto.shqixiu.shwgc.common.WebCache;
import com.lanto.shqixiu.shwgc.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgc.model.po.TbRepairQuestions;


@Service
public class VRepairQuestionsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "V_REPAIR_QUESTIONS","QUES_ID");
	}

}
