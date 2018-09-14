package com.lanto.shqixiu.shwgc.controller.corp;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbCorpJoin;
import com.lanto.shqixiu.shwgc.model.po.TbCorpJoinPhoto;
import com.lanto.shqixiu.shwgc.service.corp.CorpJoinService;
import com.lanto.shqixiu.shwgc.util.Constant;


@Controller
@RequestMapping(value="client/corp/corpjoin",produces = "text/html;charset=UTF-8")
public class CorpJoinController extends BaseCon{

	private Logger logger = Logger.getLogger(CorpJoinController.class);// 日志

	@Resource
	private CorpJoinService service;

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

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String photos = CommonUtils.checkNull(request.getParameter("photos"));
			TbCorpJoin po = json.getPojo(data, TbCorpJoin.class);
			List<TbCorpJoinPhoto> images = json.getPojoList(photos, TbCorpJoinPhoto.class);
			ClientLoginInfo info = super.getClientLoginInfo();
			po.setApplyPerson(info.getUserName());
			po.setApplyDate(new Date());
			service.save(po,images,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}

	@RequestMapping("getInfo")
	@ResponseBody
	public Object getInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			String joinId = CommonUtils.checkNull(request.getParameter("joinId"));
			List photos = service.getPhotos(joinId);
			return super.getOutData(photos);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"加载出错");
		}
	}
	
	@RequestMapping("getCorpInfo")
	@ResponseBody
	public Object getCorpInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			TbCorpInfo corp = service.getCorpInfo(info.getCorpId());
			return super.getOutData(json.toMap(corp));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"获取企业信息出错");
		}
	}
	
	
	@RequestMapping("position")
	public Object position(HttpServletRequest request,HttpServletResponse response) {
		String joinId = CommonUtils.checkNull(request.getParameter("joinId"));
		String isview = CommonUtils.checkNull(request.getParameter("isview"));
		request.setAttribute("isview", isview);
		if(CommonUtils.checkIsNullStr(joinId)){
			return "BMap/CorpJoinMap";
		}
		TbCorpJoin model = service.getModel(joinId);
		TbCorpInfo corp = service.getCorpInfo(model.getCorpId().toString());
		request.setAttribute("model", model);
		request.setAttribute("corp", corp);
		return "BMap/CorpJoinMap";
	}
	
	@RequestMapping("uploadImages")
	@ResponseBody
	public Object uploadEditor(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRequest.getFile("upload");
			String fileName = file.getOriginalFilename();
			String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
			String year = CommonUtils.printDate("yyyy", new Date());
			String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
			String mothYearDay = CommonUtils
					.printDate("yyyy-MM-dd", new Date());
			String uName = UUID.randomUUID() + uploadFileId;
			String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/"
					+ uName;
			String fileUrl = ParamInit.attachFileUploadPath + fid;
			File newFile = new File(fileUrl);
			if (!newFile.getParentFile().exists()) {
				newFile.getParentFile().mkdirs();
			}
			file.transferTo(newFile);
			
			return super.getOutData(fid);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "上传附件信息失败");
		}
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
		sList.add(new SqlUnit("corpId", " and CORP_ID = ? ",super.getClientLoginInfo().getCorpId()));
	}
}

