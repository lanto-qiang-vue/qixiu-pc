package com.lanto.shqixiu.shwgweb.controller.front;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.map.HashedMap;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.convert.JsonConverter;
import org.softbase.model.WebLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgweb.service.CdfService;
import com.lanto.shqixiu.shwgweb.service.InfoPublicService;
import com.lanto.shqixiu.shwgweb.util.Constant;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="",produces = "text/html;charset=UTF-8")
public class CdfController extends BaseCon {
	private Logger logger = Logger.getLogger(CdfController.class);// 日志
	
	@Resource
	private CdfService service;
	
	@Resource
	private InfoPublicService infoPublicService;
	
	@RequestMapping(value = "cdf", method = RequestMethod.GET )
	public String index(HttpServletRequest request,HttpServletResponse response) throws Exception {
		List experts = service.expertList(20);
		List questTypes = WebCache.getDictDescByType("1040");
		List infoList = infoPublicService.getInfoList(null, 9);
		request.setAttribute("infoList", infoList);
		request.setAttribute("questTypes",questTypes);
		request.setAttribute("experts",experts);
		request.setAttribute("nav_menu_index", 6);
		return "cdf/cdf";
	}
	
	@RequestMapping(value = "questSearch", method = RequestMethod.GET )
	public String questSearch(HttpServletRequest request,HttpServletResponse response) throws Exception {
		List experts = service.expertList(20);
		List questTypes = WebCache.getDictDescByType("1040");
		List infoList = infoPublicService.getInfoList(null, 9);
		request.setAttribute("infoList", infoList);
		request.setAttribute("questTypes",questTypes);
		request.setAttribute("experts",experts);
		request.setAttribute("nav_menu_index", 6);
		return "cdf/questSearch";
	}

	@RequestMapping(value = "cdf/answerQuestion", method = RequestMethod.GET )
	public String answerQuestion(HttpServletRequest request,HttpServletResponse response) throws Exception {
		return "cdf/answerQuestion";
	}
	
	@RequestMapping(value = "cdf/expert/{expertId}", method = RequestMethod.GET )
	public String expert(@PathVariable("expertId") String expertId,HttpServletRequest request,HttpServletResponse response) {
		TbEmployeeExpert model = service.getExpertModel(expertId);
		List experts = service.expertList(20);
		
		List questTypes = WebCache.getDictDescByType("1040");
		List infoList = infoPublicService.getInfoList(null, 9);
		request.setAttribute("infoList", infoList);
		request.setAttribute("experts",experts);
		request.setAttribute("questTypes",questTypes);
		request.setAttribute("model",model);
		request.setAttribute("nav_menu_index", 6);
		return "cdf/expert";
	}
	
	@RequestMapping(value = "cdf/qeustDetail/{questId}", method = RequestMethod.GET )
	public String qeustDetail(@PathVariable("questId") String questId,HttpServletRequest request,HttpServletResponse response) throws Exception {
		List experts = service.expertList(20);
		CallResult result = service.getQuestDetailModel(questId);
		Map detail = (Map)result.get("questMode");
		detail.put("TYPE", WebCache.getDictDescById(CommonUtils.checkNull(detail.get("TYPE"))));
		Object answers = result.get("answerList");
		List infoList = infoPublicService.getInfoList(null, 9);
		
		Map cnAnswer = null;
		List<Map> answerList = null;
		if(answers != null){
			answerList = (List)answers;
			if("10391003".equals(CommonUtils.checkNull(detail.get("STATUS")))){
				for(Map ans : answerList){
					if(ans.get("ANSWER_ID").toString().equals(CommonUtils.checkNull(detail.get("ANSWER_ID")))){
						cnAnswer = ans;
					}
				}
				if(cnAnswer != null){
					answerList.remove(cnAnswer);
				}
			}
		}
		request.setAttribute("cnAnswer",cnAnswer);
		request.setAttribute("answers",answerList);
		request.setAttribute("infoList", infoList);
		request.setAttribute("experts",experts);
		request.setAttribute("detail",detail);
		request.setAttribute("nav_menu_index", 6);
		return "cdf/qeustDetail";
	}
	
	@RequestMapping(value = "cdf/submitQuest.do")
	@ResponseBody
	public Object bind(HttpServletRequest request,HttpServletResponse response) {
		try{
			WebLoginInfo login = super.getWebLoginInfo();
			TbRepairQuestions po = super.getPoByParam(TbRepairQuestions.class);
			service.submitQuest(po, login);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"提交问题出错");
		}
	}

	@RequestMapping(value = "cdf/listDigest")
	@ResponseBody
	public Object listDigest(HttpServletRequest request,HttpServletResponse response) {
		try{
			return service.listDigest(5);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping(value = "cdf/questPageList")
	@ResponseBody
	public Object questPageList(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.questPageList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
//	@RequestMapping("cdf/upload")
//	@ResponseBody
//	public Object  uploadPhoto(HttpServletRequest request,HttpServletResponse response) throws Exception {
//		try {
//			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
//			MultipartFile file = multipartRequest.getFile("imgFile");
//			String fileName = file.getOriginalFilename();
//			String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
//			String year = CommonUtils.printDate("yyyy", new Date());
//			String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
//			String mothYearDay = CommonUtils
//					.printDate("yyyy-MM-dd", new Date());
//			String uName = UUID.randomUUID() + uploadFileId;
//			String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/"
//					+ uName;
//			String fileUrl = ParamInit.photoFileUploadPath + fid;
//			File newFile = new File(fileUrl);
//			if (!newFile.getParentFile().exists()) {
//				newFile.getParentFile().mkdirs();
//			}
//			file.transferTo(newFile);
//			Map out = new HashMap();
//			out.put("error", 0);
//			out.put("url", "/attach/" + fid);
//			JsonConverter jc = new JsonConverter();
//			return jc.sourceToDest(out);
//		} catch (Exception e) {
//			e.printStackTrace();
//			logger.error(e);
//			Map out = new HashMap();
//			out.put("error", 1);
//			out.put("message", "上传失败");
//			JsonConverter jc = new JsonConverter();
//			return jc.sourceToDest(out);
//		}
//	}


	@RequestMapping(value = "cdf/questionExamine", method = RequestMethod.GET )
	public String questionExamine(HttpServletRequest request,HttpServletResponse response) throws SQLException {

		request.setAttribute("menuid", 21);
		return "cdf/questionExamine";
	}

	@RequestMapping(value = "cdf/answerExamine", method = RequestMethod.GET )
	public String answerExamine(HttpServletRequest request,HttpServletResponse response) throws SQLException {

		request.setAttribute("menuid", 22);
		return "cdf/answerExamine";
	}

	@RequestMapping(value = "cdf/question4Expert", method = RequestMethod.GET )
	public String question4Expert(HttpServletRequest request,HttpServletResponse response) throws SQLException {

		request.setAttribute("menuid", 23);
		return "cdf/question4Expert";
	}
	@RequestMapping("cdf/managerExamine")
	public String managerExamine(HttpServletRequest request,HttpServletResponse response) throws SQLException {

		request.setAttribute("menuid", 100);
		return "cdf/managerExamine";
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("status", "", "10391002"));
		sList.add(new SqlUnit("status", "", "10391003"));
		super.createWhere(sList);
	}

}
