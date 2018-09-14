package com.lanto.shqixiu.shwgweb.controller.remote;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbComplaint;
import com.lanto.shqixiu.shwgweb.model.po.TbFeedback;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestions;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestionsSubjectUser;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestionsUser;
import com.lanto.shqixiu.shwgweb.service.SupervisionService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@RestController
@RequestMapping(value="remote/supervision",produces = "text/html;charset=UTF-8")
public class SupervisionRemoteController extends BaseCon {
	private Logger logger = Logger.getLogger(SupervisionRemoteController.class);// 日志
	
	@Resource
	private SupervisionService service;
	
	
	@RequestMapping(value = "typeList")
	public Object supervision(HttpServletRequest request,HttpServletResponse response) {
		try {
			List typeList = WebCache.getDictDescByType2("1033");
			return super.getRestData(typeList);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("获取投诉类型失败");
		}
	}
	
	@RequestMapping("submitComplain")
	public Object submitComplain(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbComplaint po = super.getPoByParam(TbComplaint.class);
			po.setStatus("10341001");
			po.setAddTime(new Date());
			service.submitComplain(po);
			return super.getRestData("提交成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("提交失败");
		}
	}
	
	@RequestMapping(value = "questionnaires")
	public Object questionnaires(HttpServletRequest request,HttpServletResponse response) {
		try {
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getQuestionsPageList(sList, pUnit);
			return super.getRestPage(list,pUnit);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询失败");
		}
	}
	
	@RequestMapping(value = "questionnaires/detailPage")
	public Object detailPage(HttpServletRequest request,HttpServletResponse response) throws  Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			StringBuffer url = request.getRequestURL();  
			String tempContextUrl = url.delete(url.length() - request.getRequestURI().length(), url.length()).append(request.getSession().getServletContext().getContextPath()).append("/").toString();
			
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			Map data = new HashMap();
			data.put("link_url", tempContextUrl + "supervision/phone/detail/" + quesId);
			out.put("data", data);
			return super.getRestData(out);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询失败");
		}
	}

	
	@RequestMapping(value = "questionnaires/detail")
	public Object detail(HttpServletRequest request,HttpServletResponse response) throws  Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			TbQuestions model = service.getQuesModel(quesId);
			if(model == null){
				return super.getRestException("该问卷调查信息不存在或已删除");
			}
			Map data = json.toMap(model);
			List list = service.getSubList(quesId);
			data.put("SUBJECT", list);
			
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			out.put("data", data);
			return super.getRestData(out);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询失败");
		}
	}
	
	
	@RequestMapping("submitQuest")
	public Object submitQuest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String subjects = CommonUtils.checkNull(request.getParameter("subjects"));
			List<TbQuestionsSubjectUser> subs = json.getPojoList(subjects, TbQuestionsSubjectUser.class);
			TbQuestionsUser ques = new TbQuestionsUser();
			ques.setQuesId(Integer.valueOf(quesId));
			ques.setCreateTime(new Date());
			service.submitQuest(ques,subs);
			return super.getRestData("提交成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("提交失败");
		}
	}
	
	@RequestMapping("submitFeedback")
	public Object submitFeedback(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try {
			String advise = CommonUtils.checkNull(request.getParameter("advise"));
			String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
			TbFeedback po = new TbFeedback();
			po.setAdvise(advise);
			po.setTelphone(telphone);
			po.setCreateDate(new Date());
			service.submitFeedback(po);
			return super.getRestData("提交成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("提交失败");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("status", "AND STATUS=?", "10311001"));
		super.createWhere(sList);
	}
	
}
