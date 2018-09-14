package com.lanto.shqixiu.shwgweb.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.model.WebLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgweb.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgweb.model.po.TbOnSiteService;
import com.lanto.shqixiu.shwgweb.model.po.TbOrderService;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairAnswer;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestionsImages;
import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.model.po.TpSysUser;
import com.lanto.shqixiu.shwgweb.util.HtmlToText;
import com.lanto.shqixiu.shwgweb.util.MD5;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class UserCenterService {
	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private CreateNumberService createNumberService;
	
	
	public TgSysUser getGeneUser(Integer userId){
		TgSysUser user = new TgSysUser();
		user.setUserId(userId);
		user = swdb.getModelByPo(user);
		return user;
	}
	
	public TpSysUser getExpertUser(String userCode){
		TpSysUser user = new TpSysUser();
		user.setUserCode(userCode);
		user = swdb.getModelByPo(user);
		return user;
	}
	
	public void updateExpertUser(TpSysUser user){
		swdb.updatePojo(user, "USER_CODE");
	}
	
	public void updateGeneUser(TgSysUser user){
		swdb.updatePojo(user, "USER_ID");
	}
	
	public String updateTelPhone(String userPass,String newTelPhone,Integer userId){
		TgSysUser con =new TgSysUser();
		con.setUserId(userId);
		con = swdb.getModelByPo(con);
		if(con == null){
			return "用户信息不存在!";
		}
		TgSysUser user = new TgSysUser();
		user.setTelphone(con.getTelphone());
		user.setPassword(getEncodePass(con.getTelphone() , userPass));
		user =  swdb.getModelByPo(user);
		if(user == null){
			return "密码错误!";
		}
		if(newTelPhone.equals(user.getTelphone())){
			return "新手机号码与旧手机号码不能是同一个号码!";
		}else{
			TgSysUser check =new TgSysUser();
			check.setTelphone(newTelPhone);
			check = swdb.getModelByPo(check);
			if(check != null){
				return "该手机号码已经存在，请重新输入!";
			}
		}
		
		TgSysUser change = new TgSysUser();
		change.setUserId(userId);
		change.setTelphone(newTelPhone);
		change.setPassword(getEncodePass(newTelPhone , userPass));
		swdb.updatePojo(change, "USER_ID");
		return null;
	}
	
	public List getAnswers(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("SORT_ORDER ASC,QUES_ID");
		page.setOrderByType("DESC");
		String table = "(select A.QUES_ID,A.USER_ID,A.TYPE,A.CONTENT,A.VIEW_NUMBER,A.STATUS,A.EXPERT_ID,DATE_FORMAT(A.CREATE_TIME,'%Y-%m-%d') CREATE_TIME,"
				+ "(CASE WHEN IFNULL(A.EXPERT_ID,0)=? THEN 0 ELSE 1 END) SORT_ORDER,C.NAME EXPERT_NAME from tb_repair_questions A "
				+ "LEFT JOIN TB_EMPLOYEE_EXPERT C ON A.EXPERT_ID=C.EXPERT_ID where "
				+ "A.QUES_ID NOT IN (SELECT QUES_ID FROM tb_repair_answer WHERE EXPERT_ID=?) AND A.STATUS in(?,?) ) t";
		List<Map> list = swdb.getPageList(uSql, page, table,"QUES_ID");
		for(Map obj : list){
			String str = HtmlToText.html2Text(CommonUtils.checkNull(obj.get("CONTENT")));
			obj.put("CONTENT", str);
		}
		return list;
	}
	
	
	public List getMyquestions(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("QUES_ID");
		page.setOrderByType("DESC");
		String table = "(select A.QUES_ID,A.USER_ID,A.TYPE,A.CONTENT,A.VIEW_NUMBER,A.STATUS,A.EXPERT_ID,DATE_FORMAT(A.CREATE_TIME,'%Y-%m-%d') CREATE_TIME,"
				+ "C.NAME EXPERT_NAME from tb_repair_questions A "
				+ "LEFT JOIN TB_EMPLOYEE_EXPERT C ON A.EXPERT_ID=C.EXPERT_ID where "
				+ "A.USER_ID=? ) t";
		List<Map> list = swdb.getPageList(uSql, page, table,"QUES_ID");
		for(Map obj : list){
			obj.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("STATUS"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(obj.get("CONTENT")));
			obj.put("CONTENT", str);
		}
		return list;
	}
	
	public List getMyOnsites(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("SERVICE_ID");
		page.setOrderByType("DESC");
		String table = "(SELECT A.*,DATE_FORMAT(A.SERVICE_TIME,'%Y-%m-%d') SERVICE_TIME_ FROM tb_on_site_service A) T";
		List<Map> list = swdb.getPageList(uSql, page, table,"SERVICE_ID");
		for(Map obj : list){
			obj.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("STATUS"))));
		}
		return list;
	}
	
	public List getMyOrders(List<SqlUnit> uSql, PageUnit page){
		page.setOrderByColumn("SERVICE_ID");
		page.setOrderByType("DESC");
		String table = "(SELECT A.*,DATE_FORMAT(A.SERVICE_TIME,'%Y-%m-%d') SERVICE_TIME_ FROM tb_order_service A) T";
		List<Map> list = swdb.getPageList(uSql, page, table,"SERVICE_ID");
		for(Map obj : list){
			obj.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("STATUS"))));
		}
		return list;
	}
	
	
	public List getMyquestionsApp(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("QUES_ID");
		page.setOrderByType("DESC");
		String table = "(select A.QUES_ID,A.USER_ID,A.TYPE,A.CONTENT,A.VIEW_NUMBER,A.STATUS,A.EXPERT_ID,DATE_FORMAT(A.CREATE_TIME,'%Y-%m-%d') CREATE_TIME,"
				+ "C.NAME EXPERT_NAME,D.ANSWER_COUNTS from tb_repair_questions A "
				+ "LEFT JOIN TB_EMPLOYEE_EXPERT C ON A.EXPERT_ID=C.EXPERT_ID "
				+ "LEFT JOIN (SELECT QUES_ID,COUNT(*) ANSWER_COUNTS FROM tb_repair_answer GROUP BY QUES_ID) D ON A.QUES_ID=D.QUES_ID "
				+ " where A.USER_ID=? ) t";
		List<Map> list = swdb.getPageList(uSql, page, table,"QUES_ID");
		for(Map obj : list){
			obj.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("STATUS"))));
			obj.put("TYPE_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("TYPE"))));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(obj.get("CONTENT")));
			obj.put("CONTENT", str);
		}
		return list;
	}
	
	
	
	public String updateUserPass(String oldPass,String newPass, WebLoginInfo login){
		if("1".equals(login.getUserType())){
			TpSysUser user = new TpSysUser();
			user.setUserCode(login.getUserCode());
			user.setPassword(getEncodePass(login.getUserCode() , oldPass));
			user =  swdb.getModelByPo(user);
			if(user == null){
				return "旧密码错误!";
			}
			TpSysUser con = new TpSysUser();
			con.setUserCode(login.getUserCode());
			con.setPassword(getEncodePass(login.getUserCode() , newPass));
			swdb.updatePojo(con, "USER_CODE");
			return null;
		}else{
			TgSysUser user = new TgSysUser();
			user.setUserId(login.getUserId());
			user.setPassword(getEncodePass(login.getUserCode() , oldPass));
			user =  swdb.getModelByPo(user);
			if(user == null){
				return "旧密码错误!";
			}
			TgSysUser con = new TgSysUser();
			con.setUserId(login.getUserId());
			con.setPassword(getEncodePass(login.getUserCode() , newPass));
			swdb.updatePojo(con, "USER_ID");
			return null;
		}
	}
	
	
	public String updateUserPassApp(String oldPass,String newPass,TbAppLoginToken token){
			TgSysUser us = new TgSysUser();
			us.setUserId(token.getUserId());
			us = swdb.getModelByPo(us);
			if(us == null){
				return "用户信息不存在!";
			}
			TgSysUser user = new TgSysUser();
			user.setUserId(token.getUserId());
			user.setPassword(getEncodePass(us.getTelphone() , oldPass));
			user =  swdb.getModelByPo(user);
			if(user == null){
				return "旧密码错误!";
			}
			TgSysUser con = new TgSysUser();
			con.setUserId(token.getUserId());
			con.setPassword(getEncodePass(us.getTelphone() , newPass));
			swdb.updatePojo(con, "USER_ID");
			return null;
	}
	
	public String submitAnswer(String quesId,String content,WebLoginInfo login){
		TbRepairQuestions con = new TbRepairQuestions();
		con.setQuesId(Integer.valueOf(quesId));
		con = swdb.getModelByPo(con);
		if(con == null){
			return "问题不存在或已被提问者删除！";
		}
		if("10391001".equals(con.getStatus())){
			TbRepairQuestions ques = new TbRepairQuestions();
			ques.setQuesId(con.getQuesId());
			ques.setStatus("10391002");
			swdb.updatePojo(ques, "QUES_ID");
		}
		TbRepairAnswer answer = new TbRepairAnswer();
		answer.setQuesId(con.getQuesId());
		answer.setContent(content);
		answer.setExpertId(login.getUserId());
		answer.setExpertName(login.getUserName());
		answer.setCreateTime(new Date());
		swdb.savePojo(answer, "ANSWER_ID");
		return null;
	}
	
	public String updateAdoptAnswer(String quesId,String answerId){
		TbRepairQuestions con = new TbRepairQuestions();
		con.setQuesId(Integer.valueOf(quesId));
		con = swdb.getModelByPo(con);
		if(con == null){
			return "问题不存在或已被提问者删除！";
		}
		TbRepairQuestions ques = new TbRepairQuestions();
		ques.setQuesId(con.getQuesId());
		ques.setAnswerId(Integer.valueOf(answerId));
		ques.setStatus("10391003");
		swdb.updatePojo(ques, "QUES_ID");
		return null;
	}
	
	public String deleteMyQuestion(String quesId){
		TbRepairQuestions con = new TbRepairQuestions();
		con.setQuesId(Integer.valueOf(quesId));
		con = swdb.getModelByPo(con);
		if(con != null && !"10391001".equals(con.getStatus())){
			return "该问题已有人回答，不能再删除！";
		}
		
		TbRepairQuestionsImages image = new TbRepairQuestionsImages();
		image.setQuesId(Integer.valueOf(quesId));
		swdb.deleteByPo(image);
		
		TbRepairQuestions ques = new TbRepairQuestions();
		ques.setQuesId(Integer.valueOf(quesId));
		swdb.deleteByPo(ques);
		
		return null;
	}
	
	
	public void deleteMyOnsite(String serviceId){
		TbOnSiteService con = new TbOnSiteService();
		con.setServiceId(Integer.valueOf(serviceId));
		swdb.deleteByPo(con);
	}
	
	public void deleteMyOrder(String serviceId){
		TbOrderService con = new TbOrderService();
		con.setServiceId(Integer.valueOf(serviceId));
		swdb.deleteByPo(con);
	}
	
	public String deleteApply(String corpId){
		if(CommonUtils.checkIsNullStr(corpId)){
			return "ID不能为空！";
		}
		TbCorpInfo con = new TbCorpInfo();
		con.setCorpId(Integer.valueOf(corpId));
		con = swdb.getModelByPo(con);
		if(con == null ){
			return "开业申请信息不存在！";
		}
		
		TbCorpInfo corp = new TbCorpInfo();
		corp.setCorpId(Integer.valueOf(corpId));
		swdb.deleteByPo(corp);
		
		return null;
	}
	
	public void submitApply(TbCorpInfo corp) throws Exception{
		corp.setCorpNum(createNumberService.createNumber("corpNum"));
		swdb.savePojo(corp, "CORP_ID");
	}
	
	public List applyList(Integer userId){
		String sql = "SELECT CORP_ID,CORP_NUM,CORP_NAME,DATE_FORMAT(APPLY_DATE,'%Y-%m-%d') APPLY_DATE,STATUS FROM TB_CORP_INFO WHERE APPLY_USER=? ORDER BY CORP_ID DESC";
		return swdb.findAll(sql, userId);
	}
	
	public void updatePhoto(String fid , WebLoginInfo login){
		if("1".equals(login.getUserType())){
			TpSysUser user = new TpSysUser();
			user.setUserCode(login.getUserCode());
			user.setPhoto(fid);
			swdb.updatePojo(user, "USER_CODE");
			
			TbEmployeeExpert expert = new TbEmployeeExpert();
			expert.setExpertId(login.getUserId());
			expert.setPhoto(fid);
			swdb.updatePojo(expert, "EXPERT_ID");
		}else{
			TgSysUser user = new TgSysUser();
			user.setUserId(login.getUserId());
			user.setPhoto(fid);
			swdb.updatePojo(user, "USER_ID");
		}
	}
	
	public void updatePhotoApp(String fid , Integer userId){
			TgSysUser user = new TgSysUser();
			user.setUserId(userId);
			user.setPhoto(fid);
			swdb.updatePojo(user, "USER_ID");
	}
	
	private String getEncodePass(String userCode,String pass){
		MD5 md5 = new MD5();
		String psswod = userCode + pass;
		String base64 =  new BASE64Encoder().encode(psswod.getBytes());
		return md5.getMD5ofStr(base64);
	}
}
