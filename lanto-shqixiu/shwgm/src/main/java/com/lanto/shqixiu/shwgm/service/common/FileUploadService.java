package com.lanto.shqixiu.shwgm.service.common;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.softbase.controller.ParamInit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgm.model.bean.TcFileUploadInfoBean;
import com.lanto.shqixiu.shwgm.model.po.TcFileUploadInfo;
import com.lanto.shqixiu.shwgm.util.Constant;

/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */
@Service
public class FileUploadService {
	@Autowired
	private SwdbFactory service;
	
	public List queryFileList(String fileBillType ,String fileBillId ){
		String sql = "SELECT t.*,t.FILE_SIZE size FROM TC_FILE_UPLOAD_INFO t WHERE t.BILL_TYPE=? AND t.BILL_ID=? AND t.IS_VALID=? ORDER BY T.FILE_UPLOAD_INFO_ID";
		return service.findAll(TcFileUploadInfoBean.class,sql,fileBillType,fileBillId,Constant.STATUS_ENABLE);
	}
	
	public Map save(HttpServletRequest request) throws IllegalStateException, IOException{
		String fileType = request.getParameter("type");
		String fileSize = request.getParameter("size");
		String fileBillId = request.getParameter("fileBillId");
		String fileBillType = request.getParameter("fileBillType");
		String percent = request.getParameter("percent");
		String attrUser = request.getParameter("attrUser");				
		percent = (percent == null?"0":percent);
		fileBillId = CommonUtils.checkIsNullStr(fileBillId) ? "-1" : fileBillId;
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		MultipartFile file = multipartRequest.getFile("Filedata");
		String fileName = file.getOriginalFilename();
		String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
		String year = CommonUtils.printDate("yyyy", new Date());
		String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
		String mothYearDay = CommonUtils.printDate("yyyy-MM-dd", new Date());
		String uuid = UUID.randomUUID().toString();
		String uName = uuid + uploadFileId;
		String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/"
				+ uName;
		String fileUrl = ParamInit.attachFileUploadPath + fid;
		//String fileUrl = "\\\\10.194.102.7\\fileShare\\fileUpload\\attach\\"+ fid;
		File newFile = new File(fileUrl);
		if(!newFile.getParentFile().exists()){
			newFile.getParentFile().mkdirs();
		}
		file.transferTo(newFile);
		TcFileUploadInfo info = new TcFileUploadInfo();
		info.setBillType(Integer.valueOf(fileBillType));
		info.setBillId(fileBillId);
		info.setCreateDate(new Date());
		info.setFileId(fid);
		info.setFileName(fileName);
		info.setName(fileName);
		info.setFileSize(fileSize);
		info.setType(fileType);
		info.setIsValid(Integer.valueOf(Constant.STATUS_ENABLE));
		info.setStatus(-4);
		info.setFilePercent(100);
		info.setAttrUser(attrUser);	
		Integer id = service.savePojoRtPkId(info, "FILE_UPLOAD_INFO_ID");
		info.setFileUploadInfoId(id.longValue());
		Map out = new HashMap();
		out.put("fileId", fid);
		out.put("fileUrl", fileUrl);
		out.put("fileOldName", fileName);
		out.put("fileUploadInfoId", info.getFileUploadInfoId());
		out.put("success", true);
		return out;
	}
	
	public void delete(TcFileUploadInfo info){
		service.deleteByPo(info);
	}
	
	public void updateBillId(String billId,HttpServletRequest request){
		String[] upFileId = request.getParameterValues("fileUploadInfoId");
		if(upFileId != null){
			for(String id : upFileId){
				if(!CommonUtils.checkIsNullStr(id)){
					TcFileUploadInfo file = new TcFileUploadInfo();
					file.setFileUploadInfoId(Long.valueOf(id));
					file.setBillId(billId);
					file.setUpdateDate(new Date());
					service.updatePojo(file, "FILE_UPLOAD_INFO_ID");
				}
			}
		}
	}
	
	public String getOrderNo(){
		String sql = "{call Sp_SYS_GetBillID(?,?)}";
		return  (String)service.findRtObject(sql, String.class, new Object[]{"003",""});	
	}
	
}
