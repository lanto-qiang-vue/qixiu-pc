package com.lanto.shqixiu.shwgc.controller.corp;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.po.TbBdVideoSet;
import com.lanto.shqixiu.shwgc.model.po.TbCorpPosition;
import com.lanto.shqixiu.shwgc.service.corp.TbCorpPositionService;


@Controller
@RequestMapping(value="client/corp/tbcorpposition",produces = "text/html;charset=UTF-8")
public class TbCorpPositionController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpPositionController.class);// 日志

	@Resource
	private TbCorpPositionService service;
 

	@RequestMapping(value = "position", method=RequestMethod.GET)
	public String position(HttpServletRequest request,HttpServletResponse response) {
		ClientLoginInfo info = super.getClientLoginInfo();
		String corpId = info.getCorpId();
		if(!CommonUtils.checkIsNullStr(corpId)){
			TbCorpPosition po = new TbCorpPosition();
			po.setCorpId(corpId);
			po = service.getPositionByPo(po);
			Map map = service.getPosition(corpId);
			request.setAttribute("po", po);
			request.setAttribute("corpId", corpId);
			request.setAttribute("corpName", map.get("CORP_NAME"));
		}
		return "BMap/CorpMap";
	}
	
	@RequestMapping("savePosition")
	@ResponseBody
	public Object savePosition(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbCorpPosition po = json.getPojo(data, TbCorpPosition.class);
			TbCorpPosition con = new TbCorpPosition();
			con.setCorpId(po.getCorpId());
			con = service.getPositionByPo(con);
			if(con == null){
				service.savePosition(po);
			}else{
				service.updatePosition(po);
			}
			
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("getPosition")
	@ResponseBody
	public Object getPosition(HttpServletRequest request,HttpServletResponse response) {
		try{
			String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
			Map map = service.getPosition(corpId);
			return super.getOutData(map);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取企业位置出错");
		}
	}
	
	/**
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "video", method=RequestMethod.GET)
	public String video(HttpServletRequest request,HttpServletResponse response) {
		ClientLoginInfo info = super.getClientLoginInfo();
		TbBdVideoSet video = service.getVideoInfo(info.getCorpId());
		if ( "10151002".equals(video.getUseType())) {
			video.setIp(video.getLocalIp());//如果是内网，把内网LOCAL_IP的值给IP
		}
		request.setAttribute("video",video);
		return "video/CorpVideo";
	}
	@RequestMapping(value = "videobegin", method=RequestMethod.GET)
	public String videobegin(HttpServletRequest request,HttpServletResponse response) {
		ClientLoginInfo info = super.getClientLoginInfo();
		TbBdVideoSet video = service.getVideoInfo(info.getCorpId());
		request.setAttribute("videobegin",video);
		return "video/CorpVideoBegin";
	}
}

