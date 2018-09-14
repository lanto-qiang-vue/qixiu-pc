package com.lanto.shqixiu.shwgweb.controller.front;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.model.WebLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgweb.common.WebCache;
import com.lanto.shqixiu.shwgweb.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.model.po.TpSysUser;
import com.lanto.shqixiu.shwgweb.service.MaintainService;
import com.lanto.shqixiu.shwgweb.service.SendMessageService;
import com.lanto.shqixiu.shwgweb.service.UserCenterService;
import com.lanto.shqixiu.shwgweb.util.Constant;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="center",produces = "text/html;charset=UTF-8")
public class UserCenterController extends BaseCon {
	private Logger logger = Logger.getLogger(UserCenterController.class);// 日志
	
	@Resource
	private UserCenterService service;
	
	@Resource
	private MaintainService maintainService;
	@Resource
	private SendMessageService sendMessageService;
	
	@RequestMapping( value = "userInfo", method = RequestMethod.GET )
	public String summary(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
//		if("1".equals(login.getUserType())){
//			TpSysUser model = service.getExpertUser(login.getUserCode());
//			request.setAttribute("model", model);
//		}else{
//			TgSysUser model = service.getGeneUser(login.getUserId());
//			request.setAttribute("model", model);
//		}
		request.setAttribute("login", login);
		request.setAttribute("menuid", 1);
		return "center/userInfo";
	}
	
	@RequestMapping( value = "updatePass", method = RequestMethod.GET )
	public String updatePass(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 3);
		return "center/updatePass";
	}
	
	@RequestMapping( value = "changePhone", method = RequestMethod.GET )
	public String changePhone(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 2);
		return "center/changePhone";
	}

	@RequestMapping( value = "talentCenter", method = RequestMethod.GET )
	public String talentCenter(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 99);
		return "talentCenter";
	}
	
	@RequestMapping(value = "getChangeTelPhoneRandCode.do")
	@ResponseBody
	public Object getRandCode(HttpServletRequest request,HttpServletResponse response) {
		try{
			String newTelphone = request.getParameter("newTelphone");
			if(CommonUtils.checkIsNullStr(newTelphone)){
				return super.getOutException(null,"手机号码不能为空");
			}
			if(!newTelphone.matches("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$")){
				return super.getOutException(null,"手机号码格式不正确！");
			}
			String randNum = getRandNum(6);	
			String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内填写";
			request.getSession().setAttribute("rand_code_change_telphone_session", newTelphone + randNum);
			sendMessageService.send(message, newTelphone);
			//logger.info(randNum);
			return super.getOutData("发送成功");
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取验证码出错");
		}
	}
	
	
	@RequestMapping("changeTelPhone.do")
	@ResponseBody
	public Object changeTelPhone(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = isLogin();
			String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
			String userPass = CommonUtils.checkNull(request.getParameter("userPass"));
			String newTelphone = CommonUtils.checkNull(request.getParameter("newTelphone"));
			String randNum = CommonUtils.checkNull(request.getSession().getAttribute("rand_code_change_telphone_session"));
			if(CommonUtils.checkIsNullStr(randNum)){
				return super.getOutException(null,"手机短信验证码已失效！");
			}
			if(!(newTelphone + randCode).equals(randNum)){
				return super.getOutException(null,"手机短信验证码错误！");
			}
			String result = service.updateTelPhone(userPass, newTelphone, login.getUserId());
			if(result != null){
				return super.getOutException(null,result);
			}
			login.setUserCode(newTelphone);
			return super.getOutData("更换成功");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(null,"更换失败");
		}
	}
	
	@RequestMapping( value = "apply", method = RequestMethod.GET )
	public String apply(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		List arealist = maintainService.getAreaList();
		List typeList = WebCache.getDictDescByType("1014");
		List isList = WebCache.getDictDescByType("1004");
		List jjList = WebCache.getDictDescByType("1035");
		request.setAttribute("arealist",arealist);
		request.setAttribute("typeList",typeList);
		request.setAttribute("isList",isList);
		request.setAttribute("jjList",jjList);
		request.setAttribute("menuid", 5);
		request.setAttribute("menuCode", "apply");
		request.setAttribute("nav_menu_index", 6);
		return "center/apply";
	}
	
	@RequestMapping( value = "toAnswer", method = RequestMethod.GET )
	public String answer(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 4);
		return "center/toAnswer";
	}
	
	@RequestMapping( value = "myQuestions", method = RequestMethod.GET )
	public String myQuestions(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 4);
		return "center/myQuestions";
	}

	@RequestMapping( value = "myBindCar", method = RequestMethod.GET )
	public String myBindCar(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 5);
		return "center/myBindCar";
	}

	@RequestMapping( value = "bindOtherCar", method = RequestMethod.GET )
	public String bindOtherCar(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 5);
		return "center/bindOtherCar";
	}

	@RequestMapping( value = "myOnsites", method = RequestMethod.GET )
	public String myOnsites(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 8);
		return "center/myOnsites";
	}
	
	@RequestMapping( value = "myOrders", method = RequestMethod.GET )
	public String myOrders(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 9);
		return "center/myOrders";
	}

	@RequestMapping( value = "myComment", method = RequestMethod.GET )
	public String myComment(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 19);
		return "center/myComment";
	}

	@RequestMapping( value = "myComplaint", method = RequestMethod.GET )
	public String myComplaint(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 20);
		return "center/myComplaint";
	}

	@RequestMapping( value = "companyHome", method = RequestMethod.GET )
    public String companyHome(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 10);
        return "center/companyHome";
    }

	@RequestMapping( value = "companyVisit", method = RequestMethod.GET )
	public String companyVisit(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 11);
		return "center/companyVisit";
	}

	@RequestMapping( value = "companyAppoint", method = RequestMethod.GET )
    public String companyAppoint(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 12);
        return "center/companyAppoint";
    }

	@RequestMapping( value = "companyServiceForyou", method = RequestMethod.GET )
	public String companyServiceForyou(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 13);
		return "center/companyServiceForyou";
	}

	@RequestMapping( value = "companyNotify", method = RequestMethod.GET )
    public String companyNotify(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 13);
        return "center/companyNotify";
    }

	@RequestMapping( value = "companyComplain", method = RequestMethod.GET )
    public String companyComplain(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 14);
        return "center/companyComplain";
    }

    @RequestMapping( value = "companyUpload", method = RequestMethod.GET )
    public String companyUpload(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 15);
        return "center/companyUpload";
    }

	@RequestMapping( value = "companyEnter", method = RequestMethod.GET )
    public String companyEnter(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 16);
        return "center/companyEnter";
    }

	@RequestMapping( value = "companyInfo", method = RequestMethod.GET )
	public String companyInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 21);
		return "center/companyInfo";
	}

	@RequestMapping( value = "repairInfoIndex", method = RequestMethod.GET )
	public String repairInfoIndex(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		return "center/repairInfoIndex";
	}

	@RequestMapping( value = "repairInfo", method = RequestMethod.GET )
	public String repairInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		String roleId = CommonUtils.checkNull(request.getParameter("role_id"));
		if(roleId == null || roleId == ""){
			return "center/applyList4Company";
		}

		if("1".equals(roleId) || "4".equals(roleId) || "5".equals(roleId)){
			//车主/运营商/专家的情况
			request.setAttribute("menuid", 51);
			return "center/applyList4Company";
		} else if("2".equals(roleId)){
			//维修企业的情况,管理部门的情况
			request.setAttribute("menuid", 17);
			return "center/companyUpload";
		} else if("7".equals(roleId) || "3".equals(roleId)){
			//管理部门领导的情况
			if(request.getParameter("company_id") == null){
				request.setAttribute("menuid", 18);
			} else {
				request.setAttribute("menuid", 17);
			}
			return "center/repairInfoList4manager";
		} else {
			request.setAttribute("menuid", 17);
			return "center/companyRecord";
		}
	}

	@RequestMapping( value = "ownerRepairInfo", method = RequestMethod.GET )
	public String ownerRepairInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 17);
		return "center/ownerRepairInfo";

	}

	@RequestMapping( value = "companyRecord", method = RequestMethod.GET )
	public String companyRecord(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 17);
		return "center/companyRecord";

	}

	@RequestMapping( value = "companyInfoAcquisition", method = RequestMethod.GET )
	public String companyInfoAcquisition(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 58);
		return "center/companyInfoAcquisition";

	}

	@RequestMapping( value = "companyEmployee", method = RequestMethod.GET )
	public String companyEmployee(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 60);
		return "center/companyEmployee";

	}

	@RequestMapping( value = "companyEmployeeList", method = RequestMethod.GET )
	public String companyEmployeeList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 61);
		return "center/companyEmployeeList";

	}

	@RequestMapping( value = "recordCompEmpInfo", method = RequestMethod.GET )
	public String recordCompEmpInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 62);
		return "center/recordCompEmpInfo";

	}

	@RequestMapping( value = "articlesInfo", method = RequestMethod.GET )
	public String articlesInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 67);
		return "center/articlesInfo";

	}

	@RequestMapping( value = "addArticle", method = RequestMethod.GET )
	public String addArticle(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 67);
		return "center/addArticle";

	}
	@RequestMapping( value = "addExpert", method = RequestMethod.GET )
	public String addExpert(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 100);
		return "center/addExpert";

	}
	//满意度调查
	@RequestMapping( value = "satisfactionSurvey", method = RequestMethod.GET )
	public String satisfactionSurvey(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 69);
		return "center/satisfactionSurvey";

	}

	@RequestMapping( value = "detailSatisfactionSurvey", method = RequestMethod.GET )
	public String detailSatisfactionSurvey(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();

		request.setAttribute("menuid", 70);
		return "center/detailSatisfactionSurvey";

	}

	@RequestMapping( value = "myNotes", method = RequestMethod.GET )
	public String myNotes(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 18);
		return "center/myNotes";
	}


	@RequestMapping( value = "manageHome", method = RequestMethod.GET )
	public String manageHome(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
		request.setAttribute("menuid", 30);
		return "center/manageHome";
	}

	@RequestMapping( value = "manageRecord", method = RequestMethod.GET )
	public String manageRecord(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}

		// todo
		request.setAttribute("menuid", 31);
		return "center/manageRecord";
	}

	@RequestMapping( value = "manageNotify", method = RequestMethod.GET )
    public String manageNotify(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 32);
        return "center/manageNotify";
    }

	@RequestMapping( value = "manageComplain", method = RequestMethod.GET )
    public String manageComplain(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 33);
        return "center/manageComplain";
    }

	@RequestMapping( value = "manageSurvey", method = RequestMethod.GET )
    public String manageSurvey(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
        request.setAttribute("menuid", 34);
        return "center/manageSurvey";
    }

	@RequestMapping( value = "manageDataButt", method = RequestMethod.GET )
    public String manageDataButt(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 35);
        return "center/manageDataButt";
    }

	@RequestMapping( value = "manageCompInfo", method = RequestMethod.GET )
    public String manageCompInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 36);
        return "center/manageCompInfo";
    }

	@RequestMapping( value = "manageQualCheck", method = RequestMethod.GET )
    public String manageQualCheck(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 37);
        return "center/manageQualCheck";
    }

	@RequestMapping( value = "manageCheckSet", method = RequestMethod.GET )
    public String manageCheckSet(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 38);
        return "center/manageCheckSet";
    }

	@RequestMapping( value = "manageNotes", method = RequestMethod.GET )
	public String manageNotes(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 39);
		return "center/manageNotes";
	}

	@RequestMapping( value = "manageReview", method = RequestMethod.GET )
	public String manageReview(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 50);
		return "center/manageReview";
	}

	@RequestMapping( value = "recordDetail", method = RequestMethod.GET )
	public String recordDetail(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 40);
		return "center/recordDetail";
	}

	@RequestMapping( value = "recordList", method = RequestMethod.GET )
	public String recordList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 41);
		return "center/recordList";
	}

	@RequestMapping( value = "notifyDetail", method = RequestMethod.GET )
	public String notifyDetail(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 42);
		return "center/notifyDetail";
	}

	@RequestMapping( value = "auditNotifyDetail", method = RequestMethod.GET )
	public String auditNotifyDetail(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 51);
		return "center/auditNotifyDetail";
	}


	@RequestMapping( value = "companyRecipients", method = RequestMethod.GET )
	public String companyRecipients(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 52);
		return "center/companyRecipients";
	}

	@RequestMapping( value = "qualCheckDetail", method = RequestMethod.GET )
	public String qualCheckDetail(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 53);
		return "center/qualCheckDetail";
	}

	@RequestMapping( value = "addQualCheck", method = RequestMethod.GET )
	public String addQualCheck(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 54);
		return "center/addQualCheck";
	}

	@RequestMapping( value = "companyQualCheck", method = RequestMethod.GET )
	public String companyQualCheck(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 55);
		return "center/companyQualCheck";
	}

	@RequestMapping( value = "downloadCenter", method = RequestMethod.GET )
	public String downloadCenter(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//        if(login == null){
//            String reUrl = request.getRequestURI();
//            return "redirect:/toLogin?reUrl=" + reUrl;
//        }
		request.setAttribute("menuid", 43);
		return "center/downloadCenter";
	}

	@RequestMapping( value = "recordCompInfo", method = RequestMethod.GET )
	public String recordCompInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 44);
		return "center/recordCompInfo";
	}

	@RequestMapping( value = "compInfoList", method = RequestMethod.GET )
	public String compInfoList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 45);
		return "center/compInfoList";
	}

	@RequestMapping( value = "certificateIssuanceList", method = RequestMethod.GET )
	public String certificateIssuanceList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 46);
		return "center/certificateIssuanceList";
	}

	@RequestMapping( value = "applyList", method = RequestMethod.GET )
	public String myApply(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = super.getWebLoginInfo();
		request.setAttribute("menuid", 5);
		return "center/repairInfoIndex";
	}

	@RequestMapping( value = "repairQuality", method = RequestMethod.GET )
	public String repairQuality(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = super.getWebLoginInfo();
		request.setAttribute("menuid", 56);
		return "center/repairQuality";
	}

	@RequestMapping( value = "addRepairQuality", method = RequestMethod.GET )
	public String addRepairQuality(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = super.getWebLoginInfo();
		request.setAttribute("menuid", 57);
		return "center/addRepairQuality";
	}

	@RequestMapping( value = "manageLoginInfo", method = RequestMethod.GET )
	public String manageLoginInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("menuid", 58);
		return "center/manageLoginInfo";
	}
	@RequestMapping( value = "manageLoginInfo2", method = RequestMethod.GET )
	public String manageLoginInfo2(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("menuid", 59);
		return "center/manageLoginInfo2";
	}

	@RequestMapping( value = "applyList4Company", method = RequestMethod.GET )
	public String myApply4Company(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
//		if(login == null){
//			String reUrl = request.getRequestURI();
//			return "redirect:/toLogin?reUrl=" + reUrl;
//		}
//		List<Map> list = service.applyList(login.getUserId());
//		for(Map obj : list){
//			obj.put("STATUS_", WebCache.getDictDescById(CommonUtils.checkNull(obj.get("STATUS"))));
//		}
		request.setAttribute("menuid", 51);
//		request.setAttribute("list", list);
		return "center/applyList4Company";
	}

	@RequestMapping("sysLogInfo")
	public String sysRoleInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 91);
		return "center/sysLogInfo";
	}

	@RequestMapping("companyPost")
	public String companyPost(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 81);
		return "center/companyPost";
	}
	@RequestMapping( value = "addPost", method = RequestMethod.GET )
	public String addPost(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 81);
		return "center/addPost";
	}
	@RequestMapping("postResumes")
	public String postResumes(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 81);
		return "center/postResumes";
	}
	@RequestMapping("resumeInfo")
	public String resumeInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 81);
		return "center/resumeInfo";
	}
    @RequestMapping("corpInfo")
    public String corpInfo(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 63);
        return "center/corpList";
    }
    @RequestMapping("addcorp")
    public String addcorp(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        request.setAttribute("menuid", 63);
        return "center/addCorp";
    }
	@RequestMapping( value = "runHome", method = RequestMethod.GET )
	public String runHome(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 30);
		return "center/runHome";
	}
	@RequestMapping(value = "getMyQuestions.do")
	@ResponseBody
	public Object getMyQuestions(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createMyQuestionsWhere(sList,request);
			List list = service.getMyquestions(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping(value = "getMyOnsites.do")
	@ResponseBody
	public Object getMyOnsites(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			WebLoginInfo login = super.getWebLoginInfo();
			sList.add(new SqlUnit("userId", "AND USER_ID=?", login.getUserId()));
			List list = service.getMyOnsites(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	
	@RequestMapping(value = "getMyOrders.do")
	@ResponseBody
	public Object getMyOrders(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			WebLoginInfo login = super.getWebLoginInfo();
			sList.add(new SqlUnit("userId", "AND USER_ID=?", login.getUserId()));
			List list = service.getMyOrders(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("deleteMyQuestion.do")
	@ResponseBody
	public Object deleteMyQuestion(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String result = service.deleteMyQuestion(quesId);
			if(result != null){
				return super.getOutException( null,result);
			}
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"删除失败");
		}
	}
	
	@RequestMapping("deleteMyOnsite.do")
	@ResponseBody
	public Object deleteMyOnsite(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String serviceId = CommonUtils.checkNull(request.getParameter("serviceId"));
			service.deleteMyOnsite(serviceId);
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"删除失败");
		}
	}
	
	@RequestMapping("deleteMyOrder.do")
	@ResponseBody
	public Object deleteMyOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String serviceId = CommonUtils.checkNull(request.getParameter("serviceId"));
			service.deleteMyOrder(serviceId);
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"删除失败");
		}
	}
	
	@RequestMapping("deleteApply.do")
	@ResponseBody
	public Object deleteApply(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
			String result = service.deleteApply(corpId);
			if(result != null){
				return super.getOutException( null,result);
			}
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"删除失败");
		}
	}
	
	@RequestMapping("submitApply.do")
	@ResponseBody
	public Object submitApply(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			TbCorpInfo corp = super.getPoByParam(TbCorpInfo.class);
			corp.setApplyUser(login.getUserId());
			corp.setStatus("10211003");
			corp.setIsJoin("10041002");
			corp.setApplyDate(new Date());
			service.submitApply(corp);
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"提交失败");
		}
	}
	
	@RequestMapping(value = "getAnswers.do")
	@ResponseBody
	public Object getAnswers(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createAnswerWhere(sList,request);
			List list = service.getAnswers(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("submitPass.do")
	@ResponseBody
	public Object submitPass(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String oldPass = CommonUtils.checkNull(request.getParameter("oldPass"));
			String newPass = CommonUtils.checkNull(request.getParameter("newPass"));
			String result = service.updateUserPass(oldPass, newPass, login);
			if(result != null){
				return super.getOutException( null,result);
			}
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"修改失败");
		}
	}
	
	@RequestMapping("submit.do")
	@ResponseBody
	public Object submit(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String userType = CommonUtils.checkNull(request.getParameter("userType"));
			if("1".equals(userType)){
				TpSysUser user = super.getPoByParam(TpSysUser.class);
				service.updateExpertUser(user);
			}else{
				TgSysUser user = super.getPoByParam(TgSysUser.class);
				user.setUserId(login.getUserId());
				service.updateGeneUser(user);
				login.setUserName(user.getUserName());
			}
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"修改失败");
		}
	}
	
	@RequestMapping("submitAnswer.do")
	@ResponseBody
	public Object submitAnswer(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String content = CommonUtils.checkNull(request.getParameter("content"));
			String result = service.submitAnswer(quesId, content, login);
			if(result != null){
				return super.getOutException( null,result);
			}
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"修改失败");
		}
	}
	
	//采纳
	@RequestMapping("adoptAnswer.do")
	@ResponseBody
	public Object adoptAnswer(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try {
			String quesId = CommonUtils.checkNull(request.getParameter("quesId"));
			String answerId = CommonUtils.checkNull(request.getParameter("answerId"));
			String result = service.updateAdoptAnswer(quesId, answerId);
			if(result != null){
				return super.getOutException( null,result);
			}
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"修改失败");
		}
	}
	
	@RequestMapping("upload.do")
	@ResponseBody
	public Object uploadPhoto(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			WebLoginInfo login = super.getWebLoginInfo();
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

			service.updatePhoto(fid, login);

			return super.getOutData(fid);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException( e,"上传文件失败");
		}
	}
	
	private WebLoginInfo isLogin(){
		WebLoginInfo login = super.getWebLoginInfo();
		if(login == null || login.getUserId() == null){
			return null;
		}
		return login;
	}
	
	private void createAnswerWhere(List<SqlUnit> sList,HttpServletRequest request){
		WebLoginInfo login = super.getWebLoginInfo();
		sList.add(new SqlUnit("expert", "", login.getUserId()));
		sList.add(new SqlUnit("expert", "", login.getUserId()));
		sList.add(new SqlUnit("status", "", "10391001"));
		sList.add(new SqlUnit("status", "", "10391002"));
		super.createWhere(sList);
	}
	
	private void createMyQuestionsWhere(List<SqlUnit> sList,HttpServletRequest request){
		WebLoginInfo login = super.getWebLoginInfo();
		sList.add(new SqlUnit("userId", "", login.getUserId()));
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

	@RequestMapping("suggestList")
	public String suggestList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = super.getWebLoginInfo();
		request.setAttribute("menuid", 66);
		return "center/suggestList";
	}

	@RequestMapping("/companyReviewList")
	public String getMenuList(HttpServletRequest request){
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 67);
		return "center/companyReview";
	}

	@RequestMapping("/searchJobsByCondition")
	public String searchJobsByCondition(HttpServletRequest request){
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 68);
		return "center/searchJobList";
	}

	@RequestMapping("/jobDetail")
	public String jobDetail(HttpServletRequest request){
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 70);
		return "center/jobDetail";
	}
	//编辑简历
	@RequestMapping( value = "editResume", method = RequestMethod.GET )
	public String editresume(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 101);
		return "center/addresume";
	}
	/**
	 *简历新增
	 * @param request
	 * @return
	 */
	@RequestMapping( value = "addResume", method = RequestMethod.GET )
	public String addResume(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 101);
		return "center/addresume";
	}

	/**
	 *简历中心
	 * @param request
	 * @return
	 */
	@RequestMapping( value = "resumeCenter", method = RequestMethod.GET )
	public String resumeCenter(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 1000);
		return "center/resumecenter";
	}

	@RequestMapping("/jobResumeList")
	public String jobResumeList(HttpServletRequest request,String postIds){
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 71);
		//String postIds = (String) request.getAttribute("postIds");
		request.setAttribute("postIds", postIds);
		return "center/jobResumeList";
	}

	@RequestMapping("/addJobResume")
	public String addJobResume(HttpServletRequest request){
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 77);
		return "center/addJobResume";
	}
	/**
	 *简历搜索
	 */
	@RequestMapping("resumeSearch")
	public String resumeSearch(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 82);
		return "center/resumeSearch";
	}
	/**
	 *绑车审核
	 */
	@RequestMapping("bindCarAudit")
	public String bindCarAudit(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		request.setAttribute("menuid", 72);
		return "center/bindCarAudit";
	}

	/**
	 *运输企业信息管理
	 */
	@RequestMapping("transCompany")
	public String transCompany(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("menuid", 102);
		return "center/transCompany";
	}
	/**
	 *运输车辆技术档案
	 */
	@RequestMapping("techRecord")
	public String techRecord(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		request.setAttribute("menuid", 103);
		return "center/techRecord";
	}
}
