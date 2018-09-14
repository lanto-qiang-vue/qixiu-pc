package com.lanto.shqixiu.shwgweb.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbComplaint;
import com.lanto.shqixiu.shwgweb.model.po.TbFeedback;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestions;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestionsSubjectUser;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestionsUser;
import com.lanto.shqixiu.shwgweb.model.po.TbSubQuestionsItem;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class SupervisionService {
	@Resource
	private SwdbFactory swdb;

	public TbQuestions getQuesModel(String quesId){
		TbQuestions model = new TbQuestions();
		model.setQuesId(Integer.valueOf(quesId));
		return swdb.getModelByPo(model);
	}
	
	public List getQuestionsList(Integer num){
		String sql = "SELECT QUES_ID,TITLE,DATE_FORMAT(CREATE_TIME,'%Y-%m-%d %H:%i:%s') CREATE_TIME,STATUS FROM tb_questions WHERE STATUS=? ";
		List<Object> params = new ArrayList<Object>();
		params.add("10311001");
		sql += " ORDER BY CREATE_TIME DESC ";
		if(num != null){
			sql += "limit 0,?";
			params.add(num);
		}
		List<Map> list = swdb.findAll(sql, params.toArray());
		for(Map info : list){
			info.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("STATUS"))));
		}
		return list;
	}
	
	public List getQuestionsPageList(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		List<Map> list = swdb.getPageList(uSql, page, "(SELECT QUES_ID,TITLE,DATE_FORMAT(CREATE_TIME,'%Y-%m-%d %H:%i:%s') CREATE_TIME,STATUS FROM tb_questions) t","QUES_ID");
		for(Map info : list){
			info.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("STATUS"))));
		}
		return list;
	}
	
	public List getSubList(String quesId){
		String sql = "SELECT * FROM tb_sub_questions WHERE QUES_ID=? ORDER BY SUBJECT_ID ASC";
		List<Map> list = swdb.findAll(sql, quesId);
		for(Map sub : list){
			String ssql = "SELECT * FROM tb_sub_questions_item WHERE SUBJECT_ID=? ORDER BY ITEM_ID ASC";
			List items = swdb.findAll(ssql, sub.get("SUBJECT_ID"));
			sub.put("ITEMS", items);
		}
		return list;
	}
	
	public void submitComplain(TbComplaint po) throws Exception{
		swdb.savePojo(po, "COMPLAINT_ID");
	}
	
	public void submitQuest(TbQuestionsUser ques,List<TbQuestionsSubjectUser> subs) throws Exception{
		Integer id = swdb.savePojoRtPkId(ques, "COMMIT_ID");
		for(TbQuestionsSubjectUser sub : subs){
			sub.setCommitId(id);
			sub.setCreateTime(new Date());
			swdb.savePojo(sub, "CHILD_ID");
			
			TbSubQuestionsItem con = new TbSubQuestionsItem();
			con.setItemId(sub.getItemId());
			con = swdb.getModelByPo(con);
			if(con != null){
				TbSubQuestionsItem item = new TbSubQuestionsItem();
				item.setItemId(con.getItemId());
				item.setItemScore(con.getItemScore() + 1);
				swdb.updatePojo(item, "ITEM_ID");
			}
		}
	}
	
	public void submitFeedback(TbFeedback po){
		swdb.savePojo(po, "BACK_ID");
	}
}
