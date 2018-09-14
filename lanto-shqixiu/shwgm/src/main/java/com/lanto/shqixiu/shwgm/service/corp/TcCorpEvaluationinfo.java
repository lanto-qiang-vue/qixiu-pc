package com.lanto.shqixiu.shwgm.service.corp;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.app.TbCorpComment;

@Service
public class TcCorpEvaluationinfo {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException {
		page.setOrderByColumn("COMMENT_ID");
		return service.getPageList(uSql, page, "v_CorpEvaluation_info",
				"COMMENT_ID");
	}

	public void save(TbCorpComment pojo) {
		service.savePojo(pojo);
	}

}
