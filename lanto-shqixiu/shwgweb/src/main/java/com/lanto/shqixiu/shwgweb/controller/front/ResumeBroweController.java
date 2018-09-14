package com.lanto.shqixiu.shwgweb.controller.front;

import org.softbase.controller.BaseCon;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="resumebrowe",produces = "text/html;charset=UTF-8")
public class ResumeBroweController extends BaseCon {

	private WebLoginInfo isLogin(){
		WebLoginInfo login = super.getWebLoginInfo();
		if(login == null || login.getUserId() == null){
			return null;
		}
		return login;
	}

    @RequestMapping("seeMeList")
    public String seeMeList(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = super.getWebLoginInfo();
        request.setAttribute("menuid", 21);
        return "resumebrowe/seeMeList";
    }

	@RequestMapping( value = "companyResumeBrowe", method = RequestMethod.GET )
	public String companyResumeBrowe(HttpServletRequest request,HttpServletResponse response) throws SQLException {
		WebLoginInfo login = isLogin();
		String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
		request.setAttribute("menuid", 21);
		return "resumebrowe/companyResumeBrowe";
	}
}
