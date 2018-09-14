package com.lanto.shqixiu.shwgc.service.notice;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.util.HtmlToText;



@Service
public class RepairQuestionsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		List<Map> list= swdb.getPageList(uSql, page, "TB_REPAIR_QUESTIONS","QUES_ID");
		for(Map info : list){
			String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("CONTENT")));
			info.put("CONTENT", str);
		}
		return list;
	}

}
