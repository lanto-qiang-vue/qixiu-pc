package com.lanto.shqixiu.shwgweb.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.softbase.service.SwdbFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgweb.model.po.TbSmsAccount;
import com.lanto.shqixiu.shwgweb.util.message.HttpRequest;
import com.lanto.shqixiu.shwgweb.util.message.MD5Gen;
import com.lanto.shqixiu.shwgweb.util.message.TimeUtil;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class SendMessageService {
	@Autowired
	private SwdbFactory service;
	
	/**
	 * 
	 * @param serviceName业务名称
	 * @return
	 * @throws Exception
	 */
	public String send(String content,String mobile) throws Exception{
		TbSmsAccount sms = new TbSmsAccount();
		sms.setId(1);
		sms = service.getModelByPo(sms);
		if(sms == null){
			return "短信发送帐号信息不存在!";
		}
		//String time="2016-09-06 17:48:22";//定时信息所需参数时间格式为yyyy-MM-dd HH:mm:ss
		String xh="";
		try {
			content=URLEncoder.encode(sms.getSign() + content, "utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return "短信发送失败!";
		}
		String tkey=TimeUtil.getNowTime("yyyyMMddHHmmss");
		String param="url="+sms.getUrl()+"&username="+sms.getUserName()+"&password="+MD5Gen.getMD5(MD5Gen.getMD5(sms.getPassword())+tkey)+"&tkey="+tkey+"&mobile="+mobile+"&content="+content+"&xh="+xh;
		//String param="url="+sms.getUrl()+"&username="+sms.getUserName()+"&password="+MD5Gen.getMD5(MD5Gen.getMD5(sms.getPassword())+tkey)+"&tkey="+tkey+"&mobile="+mobile+"&content="+content+"&xh="+xh;
		//String param="url="+sms.getUrl()+"&username="+sms.getUserName()+"&password="+MD5Gen.getMD5(MD5Gen.getMD5(sms.getPassword())+tkey)+"&tkey="+tkey+"&time="+time+"&mobile="+mobile+"&content="+content+"&xh="+xh;//定时信息url输出
		String ret=HttpRequest.sendPost(sms.getUrl(),param);//定时信息只可为post方式提交
//		System.out.println("ret:"+ret);
//		System.out.println(param);
		if(ret.startsWith("1,")){
			return null;
		}else {
			return ret;
		}
	}
	
}
