package com.lanto.shqixiu.shwgweb.controller.remote;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.service.CdfService;
import com.lanto.shqixiu.shwgweb.service.MaintainService;
import com.lanto.shqixiu.shwgweb.service.SendMessageService;
import com.lanto.shqixiu.shwgweb.service.UserCenterService;
import com.lanto.shqixiu.shwgweb.util.Constant;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@RestController
@RequestMapping(value="remote/center",produces = "text/html;charset=UTF-8")
public class UserCenterRemoteController extends BaseCon {
	private Logger logger = Logger.getLogger(UserCenterRemoteController.class);// 日志
	
	@Resource
	private UserCenterService service;
	
	@Resource
	private MaintainService maintainService;
	
	@Resource
	private CdfService cdfService;
	
	@Resource
	private SendMessageService sendMessageService;
	
	@RequestMapping(value = "userInfo")
	public Object userInfo(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			TgSysUser model = service.getGeneUser(token.getUserId());
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			Map data = new HashMap();
			data.put("userName", model.getUserName());
			data.put("userType", "0");
			data.put("telphone", model.getTelphone());
			data.put("email", model.getEmail());
			data.put("photo", model.getPhoto());
			out.put("data", data);
			return super.getRestData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询用户信息出错");
		}
	}
	
	@RequestMapping("updateUserInfo")
	@ResponseBody
	public Object updateUserInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			TgSysUser user = super.getPoByParam(TgSysUser.class);
			user.setUserId(token.getUserId());
			service.updateGeneUser(user);
			return super.getRestData("修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("修改失败");
		}
	}
	
	
	@RequestMapping("changeTelPhone")
	@ResponseBody
	public Object changeTelPhone(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
			String userPass = CommonUtils.checkNull(request.getParameter("userPass"));
			String newTelphone = CommonUtils.checkNull(request.getParameter("newTelphone"));
			String randNum = CommonUtils.checkNull(request.getSession().getAttribute("rand_code_change_telphone_session"));
			if(CommonUtils.checkIsNullStr(randNum)){
				return super.getRestException("手机短信验证码已失效！");
			}
			if(!(newTelphone + randCode).equals(randNum)){
				return super.getRestException("手机短信验证码错误！");
			}
			String result = service.updateTelPhone(userPass, newTelphone, token.getUserId());
			if(result != null){
				return super.getRestException(result);
			}
			return super.getRestData("更换成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("更换失败");
		}
	}
	
	@RequestMapping(value = "getChangeTelPhoneRandCode")
	public Object getRandCode(HttpServletRequest request,HttpServletResponse response) {
		try{
			String newTelphone = request.getParameter("newTelphone");
			if(CommonUtils.checkIsNullStr(newTelphone)){
				return super.getRestException("手机号码不能为空");
			}
			if(!newTelphone.matches("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$")){
				return super.getRestException("手机号码格式不正确！");
			}
			String randNum = getRandNum(6);
			String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内填写";
			request.getSession().setAttribute("rand_code_change_telphone_session", newTelphone + randNum);
			sendMessageService.send(message, newTelphone);
			return super.getRestData("发送成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("获取验证码出错");
		}
	}
	
	
	@RequestMapping("updatePass")
	public Object submitPass(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			String oldPass = CommonUtils.checkNull(request.getParameter("oldPass"));
			String newPass = CommonUtils.checkNull(request.getParameter("newPass"));
			String result = service.updateUserPassApp(oldPass, newPass, token);
			if(result != null){
				return super.getRestException(result);
			}
			return super.getRestData("修改成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("修改失败");
		}
	}
	
	@RequestMapping("myQuestionPageList")
	public Object myQuestionPageList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createMyQuestionsWhere(sList,request);
			List<Map> list = service.getMyquestionsApp(sList, pUnit);
			for(Map q : list){
				String quesId = q.get("QUES_ID").toString();
				List images = cdfService.getImagesByid(quesId);
				q.put("IMAGES", images);
			}
			return super.getRestPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询出错");
		}
	}
	
	@RequestMapping("deleteMyQuestion")
	public Object deleteMyQuestion(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String result = service.deleteMyQuestion(quesId);
			if(result != null){
				return super.getRestException(result);
			}
			return super.getRestData("删除成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("修改失败");
		}
	}
	
	//采纳
	@RequestMapping("adoptAnswer")
	public Object adoptAnswer(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String answerId = CommonUtils.checkNull(request.getParameter("answerId"));
			String result = service.updateAdoptAnswer(quesId, answerId);
			if(result != null){
				return super.getRestException(result);
			}
			return super.getRestData("采纳成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("修改失败");
		}
	}
	
	@RequestMapping("submitApply")
	public Object submitApply(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
			TbCorpInfo corp = super.getPoByParam(TbCorpInfo.class);
			corp.setApplyUser(token.getUserId());
			corp.setStatus("10211003");
			corp.setIsJoin("10041002");
			corp.setApplyDate(new Date());
			service.submitApply(corp);
			return super.getRestData("提交成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException( "提交失败");
		}
	}
	
	
	@RequestMapping("deleteApply")
	public Object deleteApply(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
			String result = service.deleteApply(corpId);
			if(result != null){
				return super.getRestException(result);
			}
			return super.getRestData("删除成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("删除失败");
		}
	}
	
	@RequestMapping(value = "distList")
	public Object conditionList(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List arealist = maintainService.getAreaList();
			
			List typeList = WebCache.getDictDescByType2("1014");
			
			List businessList = WebCache.getDictDescByType2("1035");
			
			List isList = WebCache.getDictDescByType2("1004");
					

			Map area = new HashMap();
			area.put("title", "辖区");
			area.put("field_name", "corpArea");
			area.put("data", arealist);
			
			Map type = new HashMap();
			area.put("title", "企业规模");
			area.put("field_name", "corpType");
			area.put("data", typeList);
			
			Map business = new HashMap();
			business.put("title", "经济类型");
			business.put("field_name", "businessType");
			business.put("data", businessList);
			
			Map is4s = new HashMap();
			is4s.put("title", "是否为4S店");
			is4s.put("field_name", "is4s");
			is4s.put("data", isList);
			
			List conditionList = new ArrayList();
			conditionList.add(area);
			conditionList.add(type);
			conditionList.add(business);
			conditionList.add(is4s);
			
			return super.getRestData(conditionList);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("查询字典信息出错");
		}
	}
	
	@RequestMapping("changePhoto")
	@ResponseBody
	public Object changePhoto(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
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

			service.updatePhotoApp(fid, token.getUserId());
			
			Map out = new HashMap();
			out.put("error_code", "0");
			out.put("error_message", "");
			Map data = new HashMap();
			data.put("photo", fid);
			out.put("data", data);
			return super.getRestData(out);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getRestException("上传文件失败");
		}
	}
	
	
	
	private void createMyQuestionsWhere(List<SqlUnit> sList,HttpServletRequest request){
		TbAppLoginToken token = (TbAppLoginToken)request.getAttribute("applogintoken");
		sList.add(new SqlUnit("userId", "", token.getUserId()));
		super.createWhere(sList);
	}
	
	private String getRandNum(int charCount) {
        String charValue = "";
        for (int i = 0; i < charCount; i++) {
            char c = (char) (randomInt(0, 10) + '0');
            charValue += String.valueOf(c);
        }
        return charValue;
    }
	private int randomInt(int from, int to) {
        Random r = new Random();
        return from + r.nextInt(to - from);
    }
}
