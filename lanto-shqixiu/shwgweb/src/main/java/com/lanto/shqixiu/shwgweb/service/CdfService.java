package com.lanto.shqixiu.shwgweb.service;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestionsImages;
import com.lanto.shqixiu.shwgweb.util.HtmlToText;
import org.softbase.model.WebLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class CdfService {
	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private CreateNumberService createNumberService;
	
	public List expertList(Integer num){
		String sql = "select EXPERT_ID,EMP_UNIT,NAME,PROFESSOR,PHOTO,GOOD_AT,STATUS from tb_employee_expert limit 0,?";
		return swdb.findAll(sql, num);
	}
	
	public List expertPageList(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("EXPERT_ID");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "(select EXPERT_ID,EMP_UNIT,NAME,PROFESSOR,PHOTO,TELPHONE,STATUS from tb_employee_expert) t","EXPERT_ID");
	}
	
	public List questList(Integer num){
		String sql = "select QUES_ID,USER_ID,TYPE,CONTENT,VIEW_NUMBER,STATUS,EXPERT_ID,DATE_FORMAT(CREATE_TIME,'%Y-%m-%d') CREATE_TIME from tb_repair_questions where STATUS in(?,?) order by QUES_ID desc";
		if(num != null){
			sql += " limit 0," + num;
		}
		List<Map> list = swdb.findAll(sql,"10391002","10391003");
		for(Map info : list){
			info.put("TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("TYPE"))));
			info.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("STATUS"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("CONTENT")));
			info.put("CONTENT", str);
		}
		return list;
	}

	public List listDigest(Integer num){
//		String sql = "SELECT ques.id, ques.category, ques.content, ques.viewnumber, DATE_FORMAT(ques.createtime, '%Y-%m-%d') AS createtime, ques.status FROM qxw_cdf_question ques WHERE ques.status = 1 ORDER BY id DESC";
		String sql = "select id, category, content, DATE_FORMAT(createtime, '%Y-%m-%d') as createtime from qxw_cdf_question where `status` = 2 order by id desc";
		if(num != null){
			sql += " limit 0," + num;
		}
		List<Map> list = swdb.findAll(sql);
		for(Map info : list){
			info.put("CATEGORY_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("CATEGORY"))));
			info.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(info.get("STATUS"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("CONTENT")));
			info.put("CONTENT", str);
		}
		return list;
	}

	public List questPageList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("QUES_ID");
		page.setOrderByType("DESC");
		String table = "(select A.QUES_ID,A.USER_ID,A.TYPE,A.CONTENT,A.VIEW_NUMBER,A.STATUS,A.EXPERT_ID,DATE_FORMAT(A.CREATE_TIME,'%Y-%m-%d') CREATE_TIME,"
				+ "B.USER_NAME,B.PHOTO,C.ANSWER_COUNTS,V.VEHICLE_BRAND from tb_repair_questions A "
				+ "LEFT JOIN TG_SYS_USER B ON A.USER_ID=B.USER_ID "
				+ "LEFT JOIN tb_private_vehicle V ON A.VEHICLE_ID=V.VEHICLE_ID "
				+ "LEFT JOIN (SELECT QUES_ID,COUNT(*) ANSWER_COUNTS FROM tb_repair_answer GROUP BY QUES_ID) C ON A.QUES_ID=C.QUES_ID where A.STATUS in(?,?) ) t";
		List<Map> list = swdb.getPageList(uSql, page, table,"QUES_ID");
		for(Map obj : list){
			obj.put("TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("TYPE"))));
			obj.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("STATUS"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(obj.get("CONTENT")));
			obj.put("CONTENT", str);
		}
		return list;
	}
	
	public List getImagesByid(String quesId){
		String sql = "select IMAGE_PATH from tb_repair_questions_images where ques_id=?";
		return swdb.findAll(sql, quesId);
	}
	
	public TbEmployeeExpert getExpertModel(String expertId){
		TbEmployeeExpert exp = new TbEmployeeExpert();
		exp.setExpertId(Integer .valueOf(expertId));
		return swdb.getModelByPo(exp);
	}
	
	/**
	 * 网站端提交问题
	 * @param quest
	 * @param login
	 */
	public void submitQuest(TbRepairQuestions quest,WebLoginInfo login){
		quest.setCreateTime(new Date());
		quest.setStatus("10391001");
		quest.setUserId(login.getUserId());
		quest.setViewNumber(0);
		swdb.savePojo(quest, "QUES_ID");
	}
	
	/**
	 * app端提交问题
	 * @param quest
	 * @param token
	 */
	public void submitQuest(TbRepairQuestions quest,List<TbRepairQuestionsImages> images,TbAppLoginToken token){
		quest.setCreateTime(new Date());
		quest.setStatus("10391001");
		quest.setUserId(token.getUserId());
		quest.setViewNumber(0);
		Integer quesId = swdb.savePojoRtPkId(quest, "QUES_ID");
		if(images!=null) {
			for (TbRepairQuestionsImages image : images) {
				image.setQuesId(quesId);
				image.setCreateDate(new Date());
				swdb.savePojo(image, "IMAGE_ID");
			}
		}
	}
	
	public CallResult getQuestDetailModel(String questId){
		CallResult result = new CallResult();
		TbRepairQuestions con = new TbRepairQuestions();
		con.setQuesId(Integer.valueOf(questId));
		con = swdb.getModelByPo(con);
		if(con != null){
			TbRepairQuestions detail = new TbRepairQuestions();
			detail.setQuesId(con.getQuesId());
			detail.setViewNumber(con.getViewNumber() + 1);
			swdb.updatePojo(detail, "QUES_ID");
		}
		
		String qsql = "select a.*,b.VEHICLE_BRAND,b.PRODUCTION_YEAR,c.USER_NAME,C.PHOTO USER_PHOTO from tb_repair_questions a left join tb_private_vehicle b on a.vehicle_id=b.vehicle_id "
				+ "left join tg_sys_user c on a.user_id=c.user_id  where ques_id=?";
		List<Map> ques = swdb.findAll(qsql, questId);
		result.put("questMode", ques.get(0));
		
		String sql = "select a.*,b.NAME ANSWER_EXPERT_NAME,B.PHOTO EXPERT_PHOTO,DATE_FORMAT(A.CREATE_TIME,'%Y-%m-%d %H:%i:%s') ANSWER_TIME from tb_repair_answer a left join tb_employee_expert b on a.expert_id=b.expert_id where ques_id=? order by ANSWER_ID DESC";
		List<Map> list = swdb.findAll(sql, con.getQuesId());
		if(list != null && list.size()>0){
			result.put("answerList", list);
		}else{
			result.put("answerList", null);
		}
		String imageSql = "select IMAGE_PATH from tb_repair_questions_images where ques_id=?";
		List images = swdb.findAll(imageSql, questId);
		result.put("images", images);
		return result;
	}
	
	public Map getHotQuest(Integer num){
//		String sql = "select *,DATE_FORMAT(CREATE_TIME,'%Y年%m月%d日') QUES_TIME from tb_repair_questions where STATUS=? ORDER BY VIEW_NUMBER DESC LIMIT 0," + num;
//		List<Map> list = swdb.findAll(sql, "10391003");
//		if(list == null || list.size() <= 0){
//			return null;
//		}
//		Map out = list.get(0);
//		String str = HtmlToText.html2Text(CommonUtils.checkNull(out.get("CONTENT")));
//		out.put("CONTENT", str);
//		String countSql = "select count(*) from tb_repair_answer where ques_id=?";
//		Integer count = (Integer)swdb.findRtObject(countSql, Integer.class, out.get("QUES_ID"));
//		out.put("answerCount", count);
//		String answerSql = "select *,DATE_FORMAT(CREATE_TIME,'%Y年%m月%d日') ANSWER_TIME from tb_repair_answer where answer_id=?";
//		List<Map> cnAnswers = swdb.findAll(answerSql, out.get("ANSWER_ID"));
//		if(cnAnswers != null && cnAnswers.size() >=0){
//			Map cnAnswer = cnAnswers.get(0);
//			String cstr = HtmlToText.html2Text(CommonUtils.checkNull(cnAnswer.get("CONTENT")));
//			cnAnswer.put("CONTENT", cstr);
//			out.put("cnAnswer", cnAnswer);
//		}
//		return out;
		String sql = "select id, category, content, viewnumber, DATE_FORMAT(createtime, '%Y-%m-%d') as createtime from qxw_cdf_question where `status` = 2 order by viewnumber desc limit 0," + num;
		List<Map> list = swdb.findAll(sql);
		if(list == null || list.size() <= 0){
			return null;
		}
		Map out = list.get(0);
		String str = HtmlToText.html2Text(CommonUtils.checkNull(out.get("CONTENT")));
		out.put("CONTENT", str);
		String countSql = "select count(*) from qxw_cdf_answer where question_id = ? and status = 2";
		Integer count = (Integer)swdb.findRtObject(countSql, Integer.class, out.get("ID"));
		out.put("answerCount", count);
//		String answerSql = "select *,DATE_FORMAT(CREATE_TIME,'%Y年%m月%d日') ANSWER_TIME from tb_repair_answer where answer_id=?";
		String answerSql = "select *, DATE_FORMAT(createtime,'%Y年%m月%d日') as ANSWER_TIME from qxw_cdf_answer where question_id = ? and `status` = 2 order by createtime desc limit 0, 1";
		List<Map> cnAnswers = swdb.findAll(answerSql, out.get("ID"));
		if(cnAnswers != null && cnAnswers.size() > 0){
			Map cnAnswer = cnAnswers.get(0);
			String cstr = HtmlToText.html2Text(CommonUtils.checkNull(cnAnswer.get("CONTENT")));
			cnAnswer.put("CONTENT", cstr);
			out.put("cnAnswer", cnAnswer);
		}
		return out;
	}
	
	
	
}
