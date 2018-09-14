package com.lanto.shqixiu.shwgm.controller.corp;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.service.corp.TbCorpPositionService;


@Controller
@RequestMapping(value="manage/corp/tbcorpposition",produces = "text/html;charset=UTF-8")
public class TbCorpPositionController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpPositionController.class);// 日志

	@Resource
	private TbCorpPositionService service;

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


	/**
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "video", method=RequestMethod.GET)
	public String video(HttpServletRequest request,HttpServletResponse response) {
		String corpId = CommonUtils.checkNull(request.getParameter("corpId"));
		
		return "video/CorpVideo";
	}


	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String corpType = CommonUtils.checkNull(request.getParameter("CORP_TYPE"));

		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ","%" + corpName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ", corpArea.trim()));
		}
		if (!CommonUtils.isNullString(corpType)){
			sList.add(new SqlUnit("corpType", " and CORP_TYPE = ? ",corpType.trim()));
		}
	}
}

