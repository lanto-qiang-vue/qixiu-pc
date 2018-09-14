package com.lanto.shqixiu.shwgm.controller.manage.sys;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.model.po.TmSysUser;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysUserService;
import com.lanto.shqixiu.shwgm.util.MD5;


@Controller
@RequestMapping(value="manage/sys/tmsysuser",produces = "text/html;charset=UTF-8")
public class TmSysUserController extends BaseCon{

	private Logger logger = Logger.getLogger(TmSysUserController.class);// 日志

	@Resource
	private TmSysUserService service;

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
	
	@RequestMapping("selList")
	@ResponseBody
	public Object selList(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createSelWhere(sList,request);
			List list = service.getSelList(sList);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	@RequestMapping("selList_ys")
	@ResponseBody
	public Object selList_ys(HttpServletRequest request,HttpServletResponse response) {
		try{
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createSelWhere(sList,request);
			List list = service.getSelList_ys(sList);
			return super.getOutData(list);
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
			ManageLoginInfo info = super.getManageLoginInfo();
			TmSysUser po = json.getPojo(data, TmSysUser.class);
			if(po.getUserId() != null ){
				service.update(po,info);
			}else{
				MD5 md5 = new MD5();
				String psswod = po.getUserCode() + "123456";
				String base64 =  new BASE64Encoder().encode(psswod.getBytes());
				po.setPassword(md5.getMD5ofStr(base64));
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
			ManageLoginInfo info = super.getManageLoginInfo();
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
			return super.getOutData(service.getAllRole());
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
		String blongArea = CommonUtils.checkNull(request.getParameter("BLONG_AREA"));
		String position = CommonUtils.checkNull(request.getParameter("POSITION"));
		String isValid = CommonUtils.checkNull(request.getParameter("IS_VALID"));
		String trafficUnit = CommonUtils.checkNull(request.getParameter("TRAFFIC_UNIT"));		
		String area = super.getManageLoginInfo().getAreaCode();
		if(!"".equals(area)){
			sList.add(new SqlUnit("userCode", " and BLONG_AREA = ? ", area ));
		}
	
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
		if (!CommonUtils.isNullString(blongArea)){
			sList.add(new SqlUnit("blongArea", " and BLONG_AREA like ? ","%" + blongArea.trim() + "%"));
		}
		if (!CommonUtils.isNullString(position)){
			sList.add(new SqlUnit("position", " and POSITION like ? ","%" + position.trim() + "%"));
		}
		if (!CommonUtils.isNullString(isValid)){
			sList.add(new SqlUnit("isValid", " and IS_VALID = ? ", isValid.trim() ));
		}
		if (!CommonUtils.isNullString(trafficUnit)){
			sList.add(new SqlUnit("trafficUnit", " and TRAFFIC_UNIT = ? ", trafficUnit.trim() ));
		}			
	}
	
	private void createSelWhere(List<SqlUnit> sList,HttpServletRequest request){
		String userCode = CommonUtils.checkNull(request.getParameter("USER_CODE"));
		String userName = CommonUtils.checkNull(request.getParameter("USER_NAME"));
		String userSex = CommonUtils.checkNull(request.getParameter("USER_SEX"));
		String userType = CommonUtils.checkNull(request.getParameter("USER_TYPE"));
		String telphone = CommonUtils.checkNull(request.getParameter("TELPHONE"));
		String blongArea = CommonUtils.checkNull(request.getParameter("BLONG_AREA"));
		String position = CommonUtils.checkNull(request.getParameter("POSITION"));
		String isValid = CommonUtils.checkNull(request.getParameter("IS_VALID"));
		String otherParams = CommonUtils.checkNull(request.getParameter("OTHER_PARAMS"));
	
	
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
		if (!CommonUtils.isNullString(blongArea)){
			sList.add(new SqlUnit("blongArea", " and BLONG_AREA like ? ","%" + blongArea.trim() + "%"));
		}
		if (!CommonUtils.isNullString(position)){
			sList.add(new SqlUnit("position", " and POSITION like ? ","%" + position.trim() + "%"));
		}
		if (!CommonUtils.isNullString(isValid)){
			sList.add(new SqlUnit("isValid", " and IS_VALID = ? ", isValid.trim() ));
		}
		if (!CommonUtils.isNullString(otherParams)){
			String[] otherParamss = otherParams.split(",");
			String sq = "";
			for(int j =0;j<otherParamss.length - 1;j++){
				sq = sq + ",?";
			}
			int i = 0;
			for(String params : otherParamss){
				if(i == 0){
					sList.add(new SqlUnit("isValid", " and BLONG_AREA in (select AREA_CODE FROM tb_daily_check_unit WHERE CHECK_UNIT IN (?" + sq + ")) ", params ));
				}else{
					sList.add(new SqlUnit("isValid", "", params));
				}
				i ++ ;
			}
		}
		
	}
}

