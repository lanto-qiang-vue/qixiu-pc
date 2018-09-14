package com.lanto.shqixiu.shwgm.controller.manage.exahrepair;

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
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgm.model.po.TbExhaustRepairPartsList;
import com.lanto.shqixiu.shwgm.service.manage.exahrepair.ExhaPartsListService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Controller
@RequestMapping(value="manage/exharepair/partslist",produces = "text/html;charset=UTF-8")
public class ExhaPartsListController extends BaseCon{

	private Logger logger = Logger.getLogger(ExhaPartsListController.class);// 日志

	@Resource
	private ExhaPartsListService service;

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


	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			ManageLoginInfo info = super.getManageLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			Integer listId=0;
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbExhaustRepairPartsList po = json.getPojo(data, TbExhaustRepairPartsList.class);
			ManageLoginInfo info = super.getManageLoginInfo();
			if(CommonUtils.checkIsNotNullAndZero(po.getListId())){
				service.update(po,info);
				listId=po.getListId();
			}else{
				listId=service.save(po,info);
				/*if(result != null){
					return super.getOutException(null,result);
				}*/
			}
			return super.getOutData(listId);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	@RequestMapping("uploadImage")
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
	}
}

