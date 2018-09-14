package com.lanto.shqixiu.shwgm.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


import com.lanto.shqixiu.shwgm.model.po.TbSmsAccount;
import com.lanto.shqixiu.shwgm.model.po.SmsInfo;

public class SmsUtil {
	private TbSmsAccount account;
	
	public SmsUtil(TbSmsAccount temp) {
		account=temp;
	}
	//发送短信
	public String sendSms(SmsInfo sms){
		String xh="";
		String content="";
		try {
			content=URLEncoder.encode(sms.getContent()+account.getSign(), "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		String tkey=TimeUtil.getNowTime("yyyyMMddHHmmss");
		String param="url="+account.getUrl()+"&username="+account.getUserName()+
				"&password="+MD5Gen.getMD5(MD5Gen.getMD5(account.getPassword())+tkey)+
				"&tkey="+tkey+"&mobile="+sms.getMobile()+"&content="+content+"&xh="+xh;
		String ret=HttpRequest.sendPost(account.getUrl(),param);		//定时信息只可为post方式提交
		if("1".equals(ret.split(",")[0])){
			return "1";
		}else{
			return ret;
		}
	}
	//获取剩余短信条数
	public Integer getSurplusNumber(){
		String tkey=TimeUtil.getNowTime("yyyyMMddHHmmss");
		String param="url="+account.getSurplusUrl()+"&username="+account.getUserName()+
				"&password="+MD5Gen.getMD5(MD5Gen.getMD5(account.getPassword())+tkey)+"&tkey="+tkey;
		Integer ret=0;
		try {
			ret=Integer.parseInt(HttpRequest.sendPost(account.getSurplusUrl(),param));	
		}catch (Exception e) {
			e.printStackTrace();
			return ret;
		}
		return ret;
	}
}
