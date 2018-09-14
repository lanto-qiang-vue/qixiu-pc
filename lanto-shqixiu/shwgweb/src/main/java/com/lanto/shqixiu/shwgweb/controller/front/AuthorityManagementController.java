package com.lanto.shqixiu.shwgweb.controller.front;

import org.apache.log4j.Logger;
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
 * @user : 陈志康
 * @date : 2018-01-31
 */
@Controller
@RequestMapping(value="center",produces = "text/html;charset=UTF-8")
public class AuthorityManagementController  extends BaseCon {
    private Logger logger = Logger.getLogger(AuthorityManagementController.class);// 日志

//    @RequestMapping(value = "resources")
//    public String resources(HttpServletRequest request,HttpServletResponse response) {
//        return "center/resources";
//    }

    @RequestMapping(value = "myApplication")
    public String myappliction(HttpServletRequest request,HttpServletResponse response) {
        request.setAttribute("menuid", 111);
        return "center/myApplication";
    }

    @RequestMapping(value = "queryPostDetails")
    public String queryPostDetails(HttpServletRequest request,HttpServletResponse response) {
        request.setAttribute("menuid", 111);
        return "center/queryPostDetails";
    }

    @RequestMapping( value = "companyResumeBrowe2", method = RequestMethod.GET )
    public String companyResumeBrowe(HttpServletRequest request,HttpServletResponse response) throws SQLException {
        WebLoginInfo login = isLogin();
        String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
        request.setAttribute("menuid", 111);
        return "resumebrowe/companyResumeBrowe2";
    }

    private WebLoginInfo isLogin(){
        WebLoginInfo login = super.getWebLoginInfo();
        if(login == null || login.getUserId() == null){
            return null;
        }
        return login;
    }

}
