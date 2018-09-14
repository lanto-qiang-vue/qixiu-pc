package com.lanto.shqixiu.shwgweb.controller.front;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.convert.JsonConverter;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbComplaint;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestions;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestionsSubjectUser;
import com.lanto.shqixiu.shwgweb.model.po.TbQuestionsUser;
import com.lanto.shqixiu.shwgweb.service.SupervisionService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="supervision",produces = "text/html;charset=UTF-8")
public class SupervisionController extends BaseCon {
	private Logger logger = Logger.getLogger(SupervisionController.class);// 日志
	
	@Resource
	private SupervisionService service;
	
	
	
	@RequestMapping(value = "questions", method = RequestMethod.GET)
	public String supervision(HttpServletRequest request,HttpServletResponse response) throws  Exception {
		List list = service.getQuestionsList(null);
		List typeList = WebCache.getDictDescByType("1033");
		JsonConverter jc = new JsonConverter();
		request.setAttribute("list",new String(jc.sourceToDest(list),"UTF-8"));
		request.setAttribute("typeList",typeList);
		request.setAttribute("nav_menu_index", 4);
		return "supervision/questions";
	}
	
	@RequestMapping(value = "complain", method = RequestMethod.GET)
	public String complain(HttpServletRequest request,HttpServletResponse response) {
		List typeList = WebCache.getDictDescByType("1033");
		request.setAttribute("typeList",typeList);
		request.setAttribute("nav_menu_index", 4);
		return "supervision/complain";
	}
	
	
	@RequestMapping(value = "detail/{quesId}", method = RequestMethod.GET)
	public String detail(@PathVariable("quesId") String quesId,HttpServletRequest request,HttpServletResponse response) throws  Exception {
		TbQuestions model = service.getQuesModel(quesId);
		List list = service.getSubList(quesId);
		request.setAttribute("list",list);
		request.setAttribute("model",model);
		request.setAttribute("nav_menu_index", 4);
		return "supervision/supervisionDetail";
	}
	
	@RequestMapping(value = "phone/detail/{quesId}", method = RequestMethod.GET)
	public String phoneDetail(@PathVariable("quesId") String quesId,HttpServletRequest request,HttpServletResponse response) throws  Exception {
		TbQuestions model = service.getQuesModel(quesId);
		List list = service.getSubList(quesId);
		request.setAttribute("list",list);
		request.setAttribute("model",model);
		return "phone/supervisionDetail";
	}
	
	@RequestMapping("submitComplain.do")
	@ResponseBody
	public Object submitComplain(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbComplaint po = super.getPoByParam(TbComplaint.class);
			po.setStatus("10341001");
			po.setAddTime(new Date());
			service.submitComplain(po);
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"提交失败");
		}
	}
	
	
	@RequestMapping("submitQuest.do")
	@ResponseBody
	public Object submitQuest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String subjects = CommonUtils.checkNull(request.getParameter("subjects"));
			List<TbQuestionsSubjectUser> subs = json.getPojoList(subjects, TbQuestionsSubjectUser.class);
			TbQuestionsUser ques = new TbQuestionsUser();
			ques.setQuesId(Integer.valueOf(quesId));
			WebLoginInfo login = super.getWebLoginInfo();
			if(login != null){
				ques.setUserId(login.getUserId());
				ques.setTelphone(login.getUserCode());
				ques.setUserName(login.getUserName());
			}
			ques.setCreateTime(new Date());
			service.submitQuest(ques,subs);
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"提交失败");
		}
	}
	
}
