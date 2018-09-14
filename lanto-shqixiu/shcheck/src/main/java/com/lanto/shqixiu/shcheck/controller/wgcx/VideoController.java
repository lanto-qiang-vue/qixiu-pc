package com.lanto.shqixiu.shcheck.controller.wgcx;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.po.TbCorpInfo;


@Controller
@RequestMapping(value="wgcx/video",produces = "text/html;charset=UTF-8")
public class VideoController extends BaseCon{
	
	@Resource
	private SwdbFactory service;

	private Logger logger = Logger.getLogger(VideoController.class);// 日志

	@RequestMapping("PostIP")
	@ResponseBody
	public Object send(HttpServletRequest request,HttpServletResponse response) {
		try{
			//30fb61cdfbeedf471f3149f96c0364c1
			String  accept_token = CommonUtils.checkNull(request.getParameter("accept_token"));
			String acceptToken = SecurityEncode.decoderByDES(accept_token, SecurityEncode.DES_KEY);
			if(!"gzjr87733788".equals(acceptToken)){
				return super.getOutException(null, "accept_token错误！");
			}
			String msg = CommonUtils.checkNull(request.getParameter("msg"));
			if (CommonUtils.checkIsNullStr(msg)) {
				return super.getOutException(null, "参数错误！");
			}
			Map<String,Object> jsm = gson.fromJson(msg,Map.class);
			Map data = (Map)jsm.get("data");
			if(data == null){
				return super.getOutException(null, "参数错误！");
			}
			String corpNum = CommonUtils.checkNull(data.get("corpNum"));
			String ip = CommonUtils.checkNull(data.get("IP"));
			if(CommonUtils.checkIsNullStr(ip)){
				return super.getOutException(null, "外网IP不能为空！");
			}
	        TbCorpInfo corp = new TbCorpInfo();
	        corp.setCorpNum(corpNum);
	        corp = service.getModelByPo(corp);
	        if(corp == null){
	        	return super.getOutException(null, "企业信息不存在！");
	        }
	        /*暂时不更新111
	        TbBdVideoSet set = new TbBdVideoSet();
	        set.setCorpId(corp.getCorpId());
	        set.setIp(ip);
	        set.setUpdateTime(new Date());
	        
	        service.updatePojo(set, "corp_id");
	       */ 
//	        Enumeration<String> paraNames = request.getParameterNames();
//			while (paraNames.hasMoreElements()) {
//	        	String element = paraNames.nextElement();
//	            String paraValue = request.getParameter(element);
//	            System.out.println(element + ":=========================================:" + paraValue);
//	        }
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取公网IP出错");
		}
	}
	
	/**
	 * 获取访问用户的客户端IP（适用于公网与局域网）.
	 */
	public static final String getIpAddr(final HttpServletRequest request)
	        throws Exception {
	    if (request == null) {
	        throw (new Exception("getIpAddr method HttpServletRequest Object is null"));
	    }
	    String ipString = request.getHeader("x-forwarded-for");
	    if (StringUtils.isBlank(ipString) || "unknown".equalsIgnoreCase(ipString)) {
	        ipString = request.getHeader("Proxy-Client-IP");
	    }
	    if (StringUtils.isBlank(ipString) || "unknown".equalsIgnoreCase(ipString)) {
	        ipString = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if (StringUtils.isBlank(ipString) || "unknown".equalsIgnoreCase(ipString)) {
	        ipString = request.getRemoteAddr();
	    }
	 
	    // 多个路由时，取第一个非unknown的ip
	    final String[] arr = ipString.split(",");
	    for (final String str : arr) {
	        if (!"unknown".equalsIgnoreCase(str)) {
	            ipString = str;
	            break;
	        }
	    }
	 
	    return ipString;
	}
}

