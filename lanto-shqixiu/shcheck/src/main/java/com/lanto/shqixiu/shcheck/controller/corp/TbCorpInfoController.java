package com.lanto.shqixiu.shcheck.controller.corp;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.po.TbCorpInfo;
import com.lanto.shqixiu.shcheck.model.po.TbExamHis;
import com.lanto.shqixiu.shcheck.service.corp.TbCorpInfoService;


@Controller
@RequestMapping(value="client/corp/tbcorpinfo",produces = "text/html;charset=UTF-8")
public class TbCorpInfoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbCorpInfoController.class);// 日志

	@Resource
	private TbCorpInfoService service;

	@RequestMapping("getModel")
	@ResponseBody
	public Object getModel(HttpServletRequest request,HttpServletResponse response) {
		try{
			CheckLoginInfo login = super.getCheckLoginInfo();
			TbCorpInfo po = new TbCorpInfo();
			po.setCorpId(login.getCorpId());
			po = service.getModel(po);
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查找企业基本信息出错");
		}
	}
	
	@RequestMapping("checklist")
	@ResponseBody
	public Object checklist(HttpServletRequest request,HttpServletResponse response) {
		try{
			CheckLoginInfo login = super.getCheckLoginInfo();
			List list = service.getCheckList(login.getCorpId());
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取质量信誉考核出错");
		}
	}

	@RequestMapping("logList")
	@ResponseBody
	public Object logList(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createLogWhere(sList,request);
			List list = service.getLogList(sList, pUnit);
			return super.getOutPage(list,pUnit);
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
			String exam = CommonUtils.checkNull(request.getParameter("exams"));
			List<TbExamHis> exams = new ArrayList<TbExamHis>();
			if(!CommonUtils.checkIsNullStr(exam)){
				exams = json.getPojoList(exam, TbExamHis.class);
			}
			TbCorpInfo po = json.getPojo(data, TbCorpInfo.class);
			if(po.getCorpId() != null ){
				service.update(po,exams,super.getCheckLoginInfo());
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
	@RequestMapping("getCorpInfo")
	@ResponseBody
	public Object getCorpInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			CheckLoginInfo info = super.getCheckLoginInfo();
			TbCorpInfo corp = new TbCorpInfo();
			corp = service.getCorpInfo(info.getCorpId());
			return super.getOutData(json.toMap(corp));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"不能重复填写");
		}
	}
	private void createLogWhere(List<SqlUnit> sList,HttpServletRequest request){
		String corpCode = CommonUtils.checkNull(request.getParameter("CORP_CODE"));
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String jyfw = CommonUtils.checkNull(request.getParameter("CORP_TYPE"));
		String opeObject = CommonUtils.checkNull(request.getParameter("OPE_OBJECT"));
		String opeType = CommonUtils.checkNull(request.getParameter("OPE_TYPE"));
		
		sList.add(new SqlUnit("corpId", " and CORP_ID = ? ",super.getCheckLoginInfo().getCorpId()));
		
		if (!CommonUtils.isNullString(jyfw)){
			sList.add(new SqlUnit("jyfw", " and CORP_TYPE = ? ",jyfw.trim()));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ",corpArea.trim()));
		}
		if (!CommonUtils.isNullString(corpCode)){
			sList.add(new SqlUnit("corpCode", " and CORP_CODE like ? ","%" + corpCode.trim() + "%"));
		}
		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ","%" + corpName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(opeObject)){
			sList.add(new SqlUnit("opeObject", " and OPE_OBJECT = ? ",opeObject.trim()));
		}
		if (!CommonUtils.isNullString(opeType)){
			sList.add(new SqlUnit("opeType", " and OPE_TYPE = ? ",opeType.trim()));
		}
	}
}

