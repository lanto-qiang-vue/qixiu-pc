package com.lanto.shqixiu.shwgm.controller.common;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.SmsInfo;
import com.lanto.shqixiu.shwgm.model.po.TbSmsAccount;
import com.lanto.shqixiu.shwgm.service.common.TbSmsAccountService;
import com.lanto.shqixiu.shwgm.util.SmsUtil;



@Controller
@RequestMapping(value="common/sms",produces = "text/html;charset=UTF-8")
public class SmsController extends BaseCon{

	private Logger logger = Logger.getLogger(SmsController.class);// 日志
	@Resource
	private TbSmsAccountService service;

	@RequestMapping("getAccountInfo")
	@ResponseBody
	public Object getAccountInfo(HttpServletRequest request,HttpServletResponse response) {
		try {
			TbSmsAccount account=new TbSmsAccount();
			account.setId(1);
			account=service.getTbSmsAccountModel(account);
			SmsUtil smsUtil=new SmsUtil(account);
			account.setSurplusNumber(smsUtil.getSurplusNumber());
			if(account!=null){
				return super.getOutData(json.toMap(account));
			}else{
				return super.getOutData(null);
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取短信帐户出错");
		}
	}
	
	@RequestMapping("sendverifysms")
	@ResponseBody
	public Object sendVerifySms(HttpServletRequest request,HttpServletResponse response) {
		try {
			String code=createRandomVcode();
			String vehicleId = CommonUtils.checkNull(request.getParameter("VEHICLE_ID"));
			String ownerPhone = CommonUtils.checkNull(request.getParameter("OWNER_PHONE"));
			request.getSession().setAttribute("sms_verify_code",code );
			request.getSession().setAttribute("verify_vehicle_id",vehicleId );
			TbSmsAccount account=new TbSmsAccount();
			account.setId(1);
			account=service.getTbSmsAccountModel(account);
			SmsUtil smsUtil=new SmsUtil(account);
			SmsInfo sms= new SmsInfo();
			sms.setMobile(ownerPhone);
			sms.setContent("查看车辆维修记录验证码为："+code);
			String ret=smsUtil.sendSms(sms);
			if("1".equals(ret)){
				return super.getOutData(true);
			}else{
				return super.getOutData(ret);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("verifysms")
	@ResponseBody
	public Object verifySms(HttpServletRequest request,HttpServletResponse response) {
		try {
			String sendCode = CommonUtils.checkNull(request.getParameter("VERIFY_CODE"));
			String sendVehicleId = CommonUtils.checkNull(request.getParameter("VEHICLE_ID"));
			String verifyCode=(String)request.getSession().getAttribute("sms_verify_code");
			String vehicleId=(String)request.getSession().getAttribute("verify_vehicle_id");
			if(sendCode.equals(verifyCode) && vehicleId.equals(sendVehicleId)){
				return super.getOutData(true);
			}else{
				return super.getOutData(false);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"验证出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbSmsAccount po = json.getPojo(data, TbSmsAccount.class);
			if(CommonUtils.checkIsNotNullAndZero(po.getId())){
				service.update(po);
			}else{
				service.save(po);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	public static String createRandomVcode(){
        //验证码
        String vcode = "";
        for (int i = 0; i < 6; i++) {
            vcode = vcode + (int)(Math.random() * 9);
        }
        return vcode;
    }
}

