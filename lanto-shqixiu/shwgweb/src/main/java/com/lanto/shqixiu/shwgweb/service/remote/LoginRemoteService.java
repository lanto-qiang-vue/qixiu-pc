package com.lanto.shqixiu.shwgweb.service.remote;

import java.util.Date;

import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;
import com.lanto.shqixiu.shwgweb.model.po.TgSysUser;
import com.lanto.shqixiu.shwgweb.service.CreateNumberService;
import com.lanto.shqixiu.shwgweb.util.MD5;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class LoginRemoteService {
	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private CreateNumberService createNumberService;
	@Resource
	private AccessTokenService accessTokenService;
	
	public CallResult updateGeneLogin(String telphone,String userPass,String userType,String deviceId) throws Exception{
		CallResult result = new CallResult();
		if(CommonUtils.checkIsNullStr(deviceId)){
			result.setTip("设备唯一编号不能为空!");
			return result;
		}
		TgSysUser user = new TgSysUser();
		user.setTelphone(telphone);
		user.setPassword(getEncodePass(telphone , userPass));
		user = swdb.getModelByPo(user);
		if(user == null){
			result.setTip("用户名或密码错误!");
			return result;
		}
		
		String tokenStr = accessTokenService.createToken(user.getUserId(), userType, deviceId);
		result.put("tokenStr",tokenStr);
		result.put("user",user);
		return result;
	}

	public CallResult updateCompanyLogin(String telphone,String userPass,String userType,String deviceId) throws Exception{
		CallResult result = new CallResult();
		if(CommonUtils.checkIsNullStr(deviceId)){
			result.setTip("设备唯一编号不能为空!");
			return result;
		}
		TgSysUser user = new TgSysUser();
		user.setTelphone(telphone);
		user.setPassword(getEncodePass(telphone , userPass));
		user = swdb.getModelByPo(user);
		if(user == null){
			result.setTip("用户名或密码错误!");
			return result;
		}

		String tokenStr = accessTokenService.createToken(user.getUserId(), userType, deviceId);
		result.put("tokenStr",tokenStr);
		result.put("user",user);
		return result;
	}

	public CallResult updateGovermentLogin(String telphone,String userPass,String userType,String deviceId) throws Exception{
		CallResult result = new CallResult();
		if(CommonUtils.checkIsNullStr(deviceId)){
			result.setTip("设备唯一编号不能为空!");
			return result;
		}
		TgSysUser user = new TgSysUser();
		user.setTelphone(telphone);
		user.setPassword(getEncodePass(telphone , userPass));
		user = swdb.getModelByPo(user);
		if(user == null){
			result.setTip("用户名或密码错误!");
			return result;
		}

		String tokenStr = accessTokenService.createToken(user.getUserId(), userType, deviceId);
		result.put("tokenStr",tokenStr);
		result.put("user",user);
		return result;
	}

	//普通用户注册
	public CallResult updateGeneRegister(TgSysUser user,String userType) throws Exception{
		CallResult result = new CallResult();
		TgSysUser con = new TgSysUser();
		con.setTelphone(user.getTelphone());
		con = swdb.getModelByPo(con);
		if(con != null){
			result.setTip("该手机用户已经存在,请重新输入！");
			return result;
		}
		user.setPassword(getEncodePass(user.getTelphone() , user.getPassword()));
		user.setCreateTime(new Date());
		user.setUserSex("10031001");
		user.setDeviceType("移动端");
		user.setUserName(createNumberService.createNumber("registerNo"));
		Integer id = swdb.savePojoRtPkId(user, "USER_ID");
		user.setUserId(id);
		
		return result;
	}
	
	public void updateLogout(TbAppLoginToken po){
		TbAppLoginToken con = new TbAppLoginToken();
		con.setLoginToken(po.getLoginToken());
		swdb.deleteByPo(con);
	}
	
	public void submitForget(String telphone,String password){
		TgSysUser con = new TgSysUser();
		con.setTelphone(telphone);
		con.setPassword(getEncodePass(telphone , password));
		swdb.updatePojo(con, "TELPHONE");
	}
	
	public CallResult checkLoginToken(String token){
		CallResult result = new CallResult();
		if(CommonUtils.checkIsNullStr(token)){
			result.setTip("用户未登录！");
			return result;
		}
		String detoken = SecurityEncode.decoderByDES(token, SecurityEncode.DES_KEY);
		if(CommonUtils.checkIsNullStr(detoken)){
			result.setTip("login_token不符合解密要求！");
			return result;
		}
		TbAppLoginToken po = new TbAppLoginToken();
		po.setLoginToken(token);
		swdb.getModelByPo(po);
		if(po == null){
			result.setTip("您的登录已被踢除或已在别处登录！");
			return result;
		}
		result.put("loginToken",po);
		return result;
	}
	
	
	public TgSysUser getUserByTelphone(String telphone){
		TgSysUser con = new TgSysUser();
		con.setTelphone(telphone);
		con = swdb.getModelByPo(con);
		return con;
	}
	
	
	private String getEncodePass(String userCode,String pass){
		MD5 md5 = new MD5();
		String psswod = userCode + pass;
		String base64 =  new BASE64Encoder().encode(psswod.getBytes());
		return md5.getMD5ofStr(base64);
	}
	
	
	
}
