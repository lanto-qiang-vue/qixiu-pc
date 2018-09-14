package com.lanto.shqixiu.shcheck.controller.corp;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.CheckLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.po.TjBdVideoSet;
import com.lanto.shqixiu.shcheck.service.corp.TbCorpVideoSetService;


@Controller
@RequestMapping(value="client/corp/tjcorpvideoset",produces = "text/html;charset=UTF-8")
public class TbCorpVideoSetController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpVideoSetController.class);// 日志

	@Resource
	private TbCorpVideoSetService service;

	@RequestMapping("getModel")
	@ResponseBody
	public Object getModel(HttpServletRequest request,HttpServletResponse response) {
		try{
			CheckLoginInfo login = super.getCheckLoginInfo();
			TjBdVideoSet po = new TjBdVideoSet();
			po.setCorpId(login.getCorpId());
			po = service.getModel(po);
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"未设置视频参数");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			CheckLoginInfo info = super.getCheckLoginInfo();
			TjBdVideoSet po = json.getPojo(data, TjBdVideoSet.class);
			if(po.getCorpId() == null || "".equals(po.getCorpId())){
				po.setCorpId(info.getCorpId());
				service.save(po);
			}else{
				service.update(po);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	@RequestMapping("getCorpVideoSet")
	@ResponseBody
	public Object getCorpInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			CheckLoginInfo info = super.getCheckLoginInfo();
			TjBdVideoSet corp = new TjBdVideoSet();
			corp = service.getCorpVideSet(info.getCorpId());
			return super.getOutData(json.toMap(corp));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"不能重复填写");
		}
	}	


}

