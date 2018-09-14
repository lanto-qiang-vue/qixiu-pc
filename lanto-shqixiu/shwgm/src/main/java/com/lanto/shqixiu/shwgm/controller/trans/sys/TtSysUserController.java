package com.lanto.shqixiu.shwgm.controller.trans.sys;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.model.TransLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.model.po.TtSysUser;
import com.lanto.shqixiu.shwgm.service.trans.sys.TtSysUserService;
import com.lanto.shqixiu.shwgm.util.MD5;


@Controller
@RequestMapping(value="trans/sys/sysuser",produces = "text/html;charset=UTF-8")
public class TtSysUserController extends BaseCon{

	private Logger logger = Logger.getLogger(TtSysUserController.class);// 日志

	@Resource
	private TtSysUserService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TtSysUser po = json.getPojo(data, TtSysUser.class);
			TransLoginInfo info = super.getTransLoginInfo();
			if(po.getUserId() != null ){
				service.update(po,info);
			}else{
				MD5 md5 = new MD5();
				String psswod = po.getUserCode() + "123456";
				String base64 =  new BASE64Encoder().encode(psswod.getBytes());
				po.setPassword(md5.getMD5ofStr(base64));
				po.setCorpId(Integer.parseInt(super.getTransLoginInfo().getCorpId()));
				po.setBlongArea(super.getTransLoginInfo().getAreaCode());
				service.save(po,info);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	
	@RequestMapping("resetPass")
	@ResponseBody
	public Object resetPass(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.updateResetPass(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"重置密码出错");
		}
	}
	
	@RequestMapping("updatePassword")
	@ResponseBody
	public Object updatePassword(HttpServletRequest request,HttpServletResponse response) {
		try{
			TransLoginInfo info = super.getTransLoginInfo();
			String userCode = info.getUserCode();
			String oldPassword = CommonUtils.checkNull(request.getParameter("oldPassword"));
			String newPassword = CommonUtils.checkNull(request.getParameter("newPassword"));
			boolean result = service.updatePassword(userCode,oldPassword,newPassword);
			return super.getOutData(result);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"修改密码出错");
		}
	}
	
	@RequestMapping("getRoleInfo")
	@ResponseBody
	public Object getRoleInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			TransLoginInfo info = super.getTransLoginInfo();
			List list = service.getAllRole(info.getCorpId());
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String userCode = CommonUtils.checkNull(request.getParameter("USER_CODE"));
		String userName = CommonUtils.checkNull(request.getParameter("USER_NAME"));
		String userSex = CommonUtils.checkNull(request.getParameter("USER_SEX"));
		String userType = CommonUtils.checkNull(request.getParameter("USER_TYPE"));
		String telphone = CommonUtils.checkNull(request.getParameter("TELPHONE"));
		String isValid = CommonUtils.checkNull(request.getParameter("IS_VALID"));
		
		sList.add(new SqlUnit("CORP_ID", " and CORP_ID = ? ", super.getTransLoginInfo().getCorpId()));
		
		if (!CommonUtils.isNullString(userCode)){
			sList.add(new SqlUnit("userCode", " and USER_CODE like ? ","%" + userCode.trim() + "%"));
		}
		if (!CommonUtils.isNullString(userName)){
			sList.add(new SqlUnit("userName", " and USER_NAME like ? ","%" + userName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(userSex)){
			sList.add(new SqlUnit("userSex", " and USER_SEX like ? ","%" + userSex.trim() + "%"));
		}
		if (!CommonUtils.isNullString(userType)){
			sList.add(new SqlUnit("userType", " and USER_TYPE like ? ","%" + userType.trim() + "%"));
		}
		if (!CommonUtils.isNullString(telphone)){
			sList.add(new SqlUnit("telphone", " and TELPHONE like ? ","%" + telphone.trim() + "%"));
		}
		if (!CommonUtils.isNullString(isValid)){
			sList.add(new SqlUnit("isValid", " and IS_VALID = ? ",isValid.trim()));
		}
		
	}
}

