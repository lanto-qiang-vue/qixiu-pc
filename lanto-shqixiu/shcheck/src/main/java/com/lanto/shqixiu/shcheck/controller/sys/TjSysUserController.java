package com.lanto.shqixiu.shcheck.controller.sys;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shcheck.model.po.TjSysUser;
import com.lanto.shqixiu.shcheck.model.po.TqSysUser;
import com.lanto.shqixiu.shcheck.service.sys.TjSysUserService;
import com.lanto.shqixiu.shcheck.util.MD5;


@Controller
@RequestMapping(value="check/sys/tqsysuser",produces = "text/html;charset=UTF-8")
public class TjSysUserController extends BaseCon{

	private Logger logger = Logger.getLogger(TjSysUserController.class);// 日志

	@Resource
	private TjSysUserService service;

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
			TjSysUser po = json.getPojo(data, TjSysUser.class);
			CheckLoginInfo info = super.getCheckLoginInfo();
			if(po.getUserId() != null ){
				service.update(po,info);
			}else{
				MD5 md5 = new MD5();
				String psswod = po.getUserCode() + "123456";
				String base64 =  new BASE64Encoder().encode(psswod.getBytes());
				po.setPassword(md5.getMD5ofStr(base64));
				po.setCorpId(Integer.parseInt(super.getCheckLoginInfo().getCorpId()));
				po.setBlongArea(super.getCheckLoginInfo().getAreaCode());
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
			CheckLoginInfo info = super.getCheckLoginInfo();
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
			CheckLoginInfo info = super.getCheckLoginInfo();
			List list = service.getAllRole(info.getCorpId());
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		sList.add(new SqlUnit("CORP_ID", " and CORP_ID = ? ", super.getCheckLoginInfo().getCorpId()));
		super.createWhere(sList);
	}
}

