package com.lanto.shqixiu.shwgweb.service.remote;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.lanto.shqixiu.shwgweb.model.bean.AccessToken;
import com.lanto.shqixiu.shwgweb.model.bean.CallResult;
import com.lanto.shqixiu.shwgweb.model.po.TbAppLoginToken;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class AccessTokenService {
	@Autowired
	private SwdbFactory swdb;
	
	public static final Long VALID_TIMES = 6*3600 * 1000L; //有效时间为6小时
	
	/**
	 * 
	 * @param
	 * @return
	 * @throws Exception
	 */
	public String createToken(int userId, String userType,String deviceId) throws Exception{
		
		TbAppLoginToken tk = new TbAppLoginToken();
		tk.setUserId(userId);
		tk.setUserType(userType);
		swdb.deleteByPo(tk);
		
		Long timeMillis = System.currentTimeMillis();
		
		String tokenStr = geneTokenStr(userId,  userType, deviceId, timeMillis);
		TbAppLoginToken loginToken = new TbAppLoginToken();
		loginToken.setUserId(userId);
		loginToken.setLoginToken(tokenStr);
		loginToken.setUserType(userType);
		loginToken.setTimeMillis(timeMillis);
		loginToken.setDeviceId(deviceId);
		loginToken.setCreateDate(new Date());
		swdb.savePojo(loginToken, "TOKEN_ID");
		return tokenStr;
	}
	
	
	public CallResult checkAccessToken(String accessToken){
		CallResult result = new CallResult();
		try{
			if(CommonUtils.checkIsNullStr(accessToken)){
				result.setTip("access_token为空！");
				result.put("error_code", "201");
				return result;
			}
			Gson gson = new Gson();
			String tokenJson = SecurityEncode.decoderByDES(accessToken, SecurityEncode.DES_KEY);
			if(CommonUtils.checkIsNullStr(tokenJson)){
				result.setTip("非法access_token！");
				result.put("error_code", "202");
				return result;
			}
			AccessToken token = gson.fromJson(tokenJson, AccessToken.class);
			Long currentTimeMillis = System.currentTimeMillis();
			//token失效
			if( (currentTimeMillis - token.getT()) > VALID_TIMES){
//				TbAppLoginToken del = new TbAppLoginToken();
//				del.setLoginToken(accessToken);
//				swdb.deleteByPo(del);
				result.setTip("access_token过了有效期！");
				result.put("error_code", "203");
				return result;
			}
			TbAppLoginToken loginToken = new TbAppLoginToken();
			loginToken.setLoginToken(accessToken);
			loginToken.setUserId(token.getU());
			loginToken.setUserType(token.getUt());
			loginToken = swdb.getModelByPo(loginToken);
			if(loginToken == null){
				result.setTip("access_token被挤掉，该帐号已在别处登录！");
				result.put("error_code", "204");
			}
			
			result.put("loginToken", loginToken);
			return result;
		}catch(Exception e){
			result.setTip("非法accessToken！");
			result.put("error_code", "202");
			return result;
		}
	}
	
	private String geneTokenStr(Integer userId, String userType,String deviceId,Long timeMillis){
		AccessToken token = new AccessToken();
		token.setU(userId);
		token.setUt(userType);
		token.setD(deviceId);
		token.setT(timeMillis);
		Gson gson = new Gson();
		String tokenJson = gson.toJson(token);
		return SecurityEncode.encoderByDES(tokenJson, SecurityEncode.DES_KEY);
	}
	
	public static void main(String[] args) throws UnsupportedEncodingException, Exception {
		AccessTokenService ser = new AccessTokenService();
//		System.out.println(ser.createToken(12301, "0", "3225645645585695"));
//		String json = SecurityEncode.decoderByDES(ser.createToken(12301, "0", "3225645645585695"), SecurityEncode.DES_KEY);
//		System.out.println(json);
//		Gson js = new Gson();
//		AccessToken ac = js.fromJson(json, AccessToken.class);
//		System.out.println(ac.toString());
		CallResult r = ser.checkAccessToken("");
		System.out.println(r.getTip());
		System.out.println(r.isSuccess());
		System.out.println((String)r.get("error_code"));
	 }
}
