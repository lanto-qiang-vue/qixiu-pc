package com.lanto.shqixiu.shwgweb.controller.front;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.lanto.shqixiu.shwgweb.model.po.TmSysUser;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.WebLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.model.po.TpSysUser;
import com.lanto.shqixiu.shwgweb.service.LoginService;
import com.lanto.shqixiu.shwgweb.service.SendMessageService;
import com.lanto.shqixiu.shwgweb.util.Constant;

/**
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value = "", produces = "text/html;charset=UTF-8")
public class LoginController extends BaseCon {
    private Logger logger = Logger.getLogger(LoginController.class);// 日志

    @Resource
    private LoginService service;
    @Resource
    private SendMessageService sendMessageService;

    @RequestMapping(value = "toLogin", method = RequestMethod.GET )
    public String toLogin(HttpServletRequest request, HttpServletResponse response) {
        request.setAttribute("memberUri", request.getAttribute("reUrl"));
        return "login";
    }

    @RequestMapping(value = "toJump", method = RequestMethod.GET )
    public String toJump(HttpServletRequest request, HttpServletResponse response) {
        return "toJump";
    }

    @RequestMapping(value = "toRegister", method = RequestMethod.GET )
    public String toRegister(HttpServletRequest request, HttpServletResponse response) {
        return "register";
    }

    @RequestMapping(value = "forgetPass", method = RequestMethod.GET )
    public String forgetPass(HttpServletRequest request, HttpServletResponse response) {
        return "forgetPass";
    }

    @RequestMapping(value = "login.do")
    @ResponseBody
    public Object login(HttpServletRequest request, HttpServletResponse response) {
        try {
            String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
            String userPass = CommonUtils.checkNull(request.getParameter("userPass"));
            String userType = CommonUtils.checkNull(request.getParameter("userType"));
            String rember = CommonUtils.checkNull(request.getParameter("rember"));
            WebLoginInfo login = new WebLoginInfo();
            if ("1".equals(userType)) {
                TpSysUser user = service.updateCompanyLogin(telphone, userPass);
                if (user == null) {
                    return super.getOutException(null, "用户名或密码错误!");
                }
                login.setUserId(user.getExpertId());
                login.setUserName(user.getUserName());
                login.setUserCode(user.getUserCode());
                login.setUserType(userType);
            } else if ("0".equals(userType)) {
                TgSysUser user = service.updateGeneLogin(telphone, userPass);
                if (user == null) {
                    return super.getOutException(null, "用户名或密码错误!");
                }
                login.setUserId(user.getUserId());
                login.setUserName(user.getUserName());
                login.setUserCode(user.getTelphone());
                login.setUserType(userType);
            } else {
                TmSysUser user = service.updateAdminLogin(telphone, userPass);
                if (user == null) {
                    return super.getOutException(null, "用户名或密码错误!");
                }
                login.setUserId(user.getUserId());
                login.setUserName(user.getUserName());
                login.setUserCode(user.getTelphone());
                login.setUserType(userType);
            }
            super.setWebLoginInfo(login);
            Map r = new HashMap();
            r.put("u", telphone);
            r.put("ut", userType);
            super.setCookie(Constant.WEBSITE_REMBER_LOGIN, gson.toJson(r), response);
            if ("on".equals(rember)) {
                super.setCookie(Constant.WEBSITE_REMBER_LOGIN_7DAY, gson.toJson(r), 7 * 24 * 60 * 60, response);
            } else {
                super.setCookie(Constant.WEBSITE_REMBER_LOGIN_7DAY, gson.toJson(r), 0, response);
            }

            return super.getOutData(true);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return super.getOutException(e, "登录出错");
        }
    }

    @RequestMapping(value = "getRandCode.do")
    @ResponseBody
    public Object getRandCode(HttpServletRequest request, HttpServletResponse response) {
        try {
            String telphone = request.getParameter("telphone");
            if (CommonUtils.checkIsNullStr(telphone)) {
                return super.getOutException(null, "手机号码不能为空");
            }
            if (!telphone.matches("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$")) {
                return super.getOutException(null, "手机号码格式不正确！");
            }
            TgSysUser user = service.getUserByTelphone(telphone);
            if (user != null) {
                return super.getOutException(null, "该手机号已经注册过了!");
            }
            String randNum = getRandNum(6);
            String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内填写";
            request.getSession().setAttribute("rand_code_session", telphone + randNum);
            String ret = sendMessageService.send(message, telphone);
            if (ret != null) {
                logger.info(ret);
                return super.getOutException(null, "短信发送失败!" + ret);
            }
            return super.getOutData("短信验证码发送成功!");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return super.getOutException(null, "获取验证码出错");
        }
    }


    @RequestMapping(value = "register.do")
    @ResponseBody
    public Object register(HttpServletRequest request, HttpServletResponse response) {
        try {
            String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
            String userType = CommonUtils.checkNull(request.getParameter("userType"));
            String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
            String randNum = (String) request.getSession().getAttribute("rand_code_session");
            if (CommonUtils.checkIsNullStr(randNum)) {
                return super.getOutException(null, "手机短信验证码已失效！");
            }
            if (!(telphone + randCode).equals(randNum)) {
                return super.getOutException(null, "手机短信验证码错误！");
            }
            TgSysUser po = super.getPoByParam(TgSysUser.class);
            String result = service.updateRegister(po);
            if (result != null) {
                return super.getOutException(null, result);
            }

            WebLoginInfo login = new WebLoginInfo();
            login.setUserId(po.getUserId());
            //login.setUserCode(po.getUserCode());
            login.setUserName(po.getUserName());
            login.setUserType("0");

            super.setWebLoginInfo(login);
            return super.getOutData(true);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return super.getOutException(e, "注册出错");
        }
    }

    @RequestMapping(value = "getForgetRandCode.do")
    @ResponseBody
    public Object getForgetRandCode(HttpServletRequest request, HttpServletResponse response) {
        try {
            String telphone = request.getParameter("telphone");
            if (CommonUtils.checkIsNullStr(telphone)) {
                return super.getOutException(null, "手机号码不能为空");
            }
            if (!telphone.matches("^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$")) {
                return super.getOutException(null, "手机号码格式不正确！");
            }
            TgSysUser user = service.getUserByTelphone(telphone);
            if (user == null) {
                return super.getOutException(null, "该手机号不存在!");
            }
            String randNum = getRandNum(6);
            String message = "提醒您，您的手机验证码为：" + randNum + "，请您在30分钟内修改密码";
            request.getSession().setAttribute("rand_forget_code_session", telphone + randNum);
            String ret = sendMessageService.send(message, telphone);
            if (ret != null) {
                return super.getOutException(null, "短信发送失败!" + ret);
            }
            logger.info(randNum);
            return super.getOutData("发送成功");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return super.getOutException(e, "获取验证码出错");
        }
    }


    //用户注册
    @RequestMapping(value = "submitForget.do")
    @ResponseBody
    public Object submitForget(HttpServletRequest request, HttpServletResponse response) {
        try {
            String randCode = CommonUtils.checkNull(request.getParameter("randCode"));
            String telphone = CommonUtils.checkNull(request.getParameter("telphone"));
            String password = CommonUtils.checkNull(request.getParameter("password"));
            String randNum = CommonUtils.checkNull(request.getSession().getAttribute("rand_forget_code_session"));
            if (CommonUtils.checkIsNullStr(randNum)) {
                return super.getOutException(null, "手机短信验证码已失效！");
            }
            if (!(telphone + randCode).equals(randNum)) {
                return super.getOutException(null, "手机短信验证码错误！");
            }
            service.submitForget(telphone, password);

            return super.getOutData("修改密码成功");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return super.getOutException(e, "修改密码出错");
        }
    }

    @RequestMapping(value = "loginSuccess", method = RequestMethod.GET )
    public String loginSuccess(HttpServletRequest request, HttpServletResponse response) {
        String tag = CommonUtils.checkNull(request.getParameter("tag"));
        request.setAttribute("tag", tag);
        return "loginSuccess";
    }

    @RequestMapping(value = "logout.do")
    @ResponseBody
    public Object logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            super.removeWebLoginInfo();
            super.removeCookie(Constant.WEBSITE_REMBER_LOGIN_7DAY, response);
            super.removeCookie(Constant.WEBSITE_REMBER_LOGIN, response);
            return super.getOutData(true);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            return super.getOutException(e, "注销出错");
        }
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
