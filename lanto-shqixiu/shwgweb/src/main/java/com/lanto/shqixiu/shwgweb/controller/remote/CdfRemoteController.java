package com.lanto.shqixiu.shwgweb.controller.remote;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgweb.model.po.TbRepairQuestionsImages;
import com.lanto.shqixiu.shwgweb.service.CdfService;
import com.lanto.shqixiu.shwgweb.util.Constant;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@RestController
@RequestMapping(value="remote/cdf",produces = "text/html;charset=UTF-8")
public class CdfRemoteController extends BaseCon {
	private Logger logger = Logger.getLogger(CdfRemoteController.class);// 日志
	
	@Resource
	private CdfService service;
	
	@RequestMapping(value = "questTypes")
	public Object questTypes(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List questTypes = WebCache.getDictDescByType("1040");
			return super.getRestData(questTypes);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询问题类型出错");
		}
	}
	
	@RequestMapping(value = "expertPageList")
	public Object expertPageList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.expertPageList(sList, pUnit);
			return super.getRestPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("分页查询专家信息出错");
		}
	}
	
	@RequestMapping(value = "expert")
	public Object expert(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String expertId = CommonUtils.checkNull(request.getParameter("expertId"));
			TbEmployeeExpert model = service.getExpertModel(expertId);
			Map data = json.toMapByPo(model);
			Map out = new HashMap();
			out.put("data", data);
			out.put("error_code", "0");
			out.put("error_message", "");
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询专家详情出错");
		}
	}
	
	@RequestMapping(value = "qeustDetail")
	public Object qeustDetail(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			CallResult result = service.getQuestDetailModel(quesId);
			TbRepairQuestions ques = (TbRepairQuestions)result.get("questMode");
			Map detail = json.toMap(ques);
			detail.put("TYPE", WebCache.getDictDescById(CommonUtils.checkNull(detail.get("TYPE"))));
			Object answers = result.get("answerList");
			if(answers == null){
				detail.put("ANSWERS",new ArrayList());
			}else{
				detail.put("ANSWERS",answers);
			}
			detail.put("IMAGES", result.get("images"));
			Map out = new HashMap();
			out.put("data", detail);
			out.put("error_code", "0");
			out.put("error_message", "");
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询问题详情出错");
		}
	}
	
	//提交问题，需要login_token
	@RequestMapping(value = "submitQuest")
	public Object bind(HttpServletRequest request,HttpServletResponse response) {
		try{
			String imagesStr = CommonUtils.checkNull(request.getParameter("images"));
			List<TbRepairQuestionsImages> images = json.getPojoList(imagesStr, TbRepairQuestionsImages.class);
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			TbRepairQuestions po = super.getPoByParam(TbRepairQuestions.class);
			service.submitQuest(po,images, token);
			return super.getRestData("提问成功!");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("提交问题出错");
		}
	}
	
	
	
	@RequestMapping(value = "questPageList")
	public Object questPageList(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere2(sList,request);
			List<Map> list = service.questPageList(sList, pUnit);
			for(Map q : list){
				String quesId = q.get("QUES_ID").toString();
				List images = service.getImagesByid(quesId);
				q.put("IMAGES", images);
			}
			return super.getRestPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询出错");
		}
	}
	
	@RequestMapping("upload")
	public Object uploadPhoto(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRequest.getFile("file");
			String fileName = file.getOriginalFilename();
			String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
			String year = CommonUtils.printDate("yyyy", new Date());
			String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
			String mothYearDay = CommonUtils
					.printDate("yyyy-MM-dd", new Date());
			String uName = UUID.randomUUID() + uploadFileId;
			String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/"
					+ uName;
			String fileUrl = ParamInit.photoFileUploadPath + fid;
			File newFile = new File(fileUrl);
			if (!newFile.getParentFile().exists()) {
				newFile.getParentFile().mkdirs();
			}
			file.transferTo(newFile);
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			Map data = new HashMap();
			data.put("image_path", fid);
			out.put("data", data);
			return super.getRestData(out);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException( "上传文件失败");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
	
	private void createWhere2(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("status", "", "10391002"));
		sList.add(new SqlUnit("status", "", "10391003"));
		super.createWhere(sList);
	}

}
