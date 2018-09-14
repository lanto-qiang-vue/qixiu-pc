package com.lanto.shqixiu.shwgm.controller.manage.credit;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.po.TbExamFileInfo;
import com.lanto.shqixiu.shwgm.model.po.TbExamFileScore;
import com.lanto.shqixiu.shwgm.service.manage.credit.TbExamFileInfoService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Controller
@RequestMapping(value="manage/credit/tbexamfileinfo",produces = "text/html;charset=UTF-8")
public class TbExamFileInfoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbExamFileInfoController.class);// 日志

	@Resource
	private TbExamFileInfoService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit,info.getAreaCode());
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}
	
	@RequestMapping("fgsList")
	@ResponseBody
	public Object fgsList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("fileId"));
			String fileIds = CommonUtils.checkNull(request.getParameter("fileIds"));
			List list = service.getFgsList(fileId,fileIds);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询分公司出错");
		}
	}
	
	@RequestMapping("zPList")
	@ResponseBody
	public Object zPList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
			String typeId = CommonUtils.checkNull(request.getParameter("TYPE_ID"));
			List list = service.getZpList(fileId,typeId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询分公司出错");
		}
	}

	@RequestMapping("getAllType")
	@ResponseBody
	public Object getAllType(HttpServletRequest request,HttpServletResponse response) {
		try{
			String type = CommonUtils.checkNull(request.getParameter("EXAM_TYPE"));
			String year = CommonUtils.checkNull(request.getParameter("EXAM_YEAR"));
			List list = service.getAllType(type,year);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询考核大项出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String list = CommonUtils.checkNull(request.getParameter("list"));
			List<TbExamFileInfo> files = new ArrayList<TbExamFileInfo>();
			files = json.getPojoList(list, TbExamFileInfo.class);
			for(TbExamFileInfo file : files){
				service.update(file);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("savePF")
	@ResponseBody
	public Object savePF(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
			String list = CommonUtils.checkNull(request.getParameter("list"));
			String type = CommonUtils.checkNull(request.getParameter("type"));
			Integer corpId = Integer.parseInt(CommonUtils.checkNull(request.getParameter("corpId")));
			Integer examYear = Integer.parseInt(CommonUtils.checkNull(request.getParameter("examYear")));
			ManageLoginInfo info = super.getManageLoginInfo();
			List<TbExamFileScore> zp = new ArrayList<TbExamFileScore>();
			zp = json.getPojoList(list, TbExamFileScore.class);
			service.savePF(fileId,zp,type,info.getUserName(),corpId,examYear);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
		String examYear = CommonUtils.checkNull(request.getParameter("EXAM_YEAR"));
		String examType = CommonUtils.checkNull(request.getParameter("EXAM_TYPE"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String corpQuail = CommonUtils.checkNull(request.getParameter("CORP_QUALI"));
		
		sList.add(new SqlUnit("isUpload", " and IS_UPLOAD = ? ",Constant.IF_TYPE_YES));
		if (!CommonUtils.isNullString(fileId)){
			sList.add(new SqlUnit("fileId", " and FILE_ID like ? ","%" + fileId.trim() + "%"));
		}
		if (!CommonUtils.isNullString(examYear)){
			sList.add(new SqlUnit("examYear", " and EXAM_YEAR = ? ",examYear.trim()));
		}
		if (!CommonUtils.isNullString(examType)){
			sList.add(new SqlUnit("examType", " and EXAM_TYPE = ? ",examType.trim()));
		}
		
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ", corpArea.trim() ));
		}
		
		if (!CommonUtils.isNullString(corpQuail)){
			String[] quail = corpQuail.split(",");
			if(quail.length == 1){
				sList.add(new SqlUnit("CORP_QUALI", " and " + quail[0] + " = ? ", "true" ));
			}else{
				for(int i =0;i<quail.length;i++){
					if(i == 0){
						sList.add(new SqlUnit("CORP_QUALI", " and (" + quail[i] + " = ? ", "true" ));
					}else if(i == (quail.length -1)){
						sList.add(new SqlUnit("CORP_QUALI", " or " + quail[i] + " = ? )", "true" ));
					}else{
						sList.add(new SqlUnit("CORP_QUALI", " or " + quail[i] + " = ? ", "true" ));
					}
				}
			}
			
		}
	}
}

