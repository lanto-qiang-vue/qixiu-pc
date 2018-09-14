package com.lanto.shqixiu.shwgm.controller.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringReader;
import java.net.URLEncoder;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.batik.transcoder.image.JPEGTranscoder;
import org.apache.batik.transcoder.image.PNGTranscoder;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.convert.JsonConverter;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.lanto.shqixiu.shwgm.model.bean.TcFileUploadInfoBean;
import com.lanto.shqixiu.shwgm.model.po.TcFileUploadInfo;
import com.lanto.shqixiu.shwgm.service.common.FileUploadService;
import com.lanto.shqixiu.shwgm.util.Constant;
import com.lanto.shqixiu.shwgm.util.ConvertPdf;
import com.lanto.shqixiu.shwgm.util.JacobUtils;

@Controller
@RequestMapping(value="manage/common/fileUpload",produces = "text/html;charset=UTF-8")
public class FileUploadController extends BaseCon {
	private Logger logger = Logger.getLogger(FileUploadController.class);// 日志
	
	@Resource
	private FileUploadService service;

	@RequestMapping("queryFile")
	@ResponseBody
	public Object queryFile(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String fileBillId = CommonUtils.checkNull(request.getParameter("fileBillId"));
			String fileBillType = CommonUtils.checkNull(request.getParameter("fileBillType"));
			List<TcFileUploadInfoBean> data = service.queryFileList(fileBillType,fileBillId);
			for(TcFileUploadInfoBean bean : data){
				bean.setPercent(bean.getFilePercent());
			}
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "获取附件信息失败");
		}
	}

	@RequestMapping("upload")
	@ResponseBody
	public Object upload(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{	
			Map out = service.save(request);
			JsonConverter jc = new JsonConverter();
			return jc.sourceToDest(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "上传附件信息失败");
		}
	}

	@RequestMapping("downloadFile")
	@ResponseBody
	public void downloadFile(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String fileId = request.getParameter("fileId");
			String fileName = request.getParameter("fileName");
			File newFile = new File(ParamInit.attachFileUploadPath + fileId);
			fileName = new String(fileName.getBytes("UTF-8"), "UTF-8"); // 导出的文字编码
			String filename = URLEncoder.encode(fileName, "UTF-8"); // 导出的文字编码
			response.addHeader("Content-disposition", "attachment;filename=" + filename);
			InputStream is = new FileInputStream(newFile);
			OutputStream os = null;
			try {
				os = response.getOutputStream();
				// 10K的数据缓冲  
		        byte[] bs = new byte[10240];  
		        // 读取到的数据长度  
		        int len;  
		        // 开始读取  
		        while ((len = is.read(bs)) != -1) {  
		          os.write(bs, 0, len);  
		        }  
//				os.write(content);
			} catch (Exception e) {
				throw e;
			} finally {
				if (os != null) {
					os.flush();
					os.close();
				}
				if(is != null) {
					is.close();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
	}
	
	@RequestMapping("downloadImage")
	@ResponseBody
	public Object downloadImage(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String fileId = request.getParameter("fileId");
			String exp = fileId.substring(fileId.lastIndexOf(".") + 1);
			String[] img = {"jpg","jpeg","png","gif","bmp"};
			String[] office = {"doc","docx","xls","xlsx","pdf"};
			boolean isImg = true;
			String type = "";
			for(int i =0;i<office.length;i++){
				if(office[i].equalsIgnoreCase(exp)){
					isImg = false;
					type = office[i];
				}
			}
//			String fileName = request.getParameter("fileName");
			File newFile = new File(ParamInit.attachFileUploadPath + fileId);
			response.setHeader("Pragma", "No-cache"); 
			response.setHeader("Cache-Control", "no-cache"); 
			response.setDateHeader("Expires", 0);
			if(isImg){
				response.setContentType("image/jpeg");
			}else{
				response.setContentType("application/" + type);
			}
			 
			InputStream is = new FileInputStream(newFile);
			OutputStream os = null;
			try {
				os = response.getOutputStream();
				// 10K的数据缓冲  
		        byte[] bs = new byte[10240];  
		        // 读取到的数据长度  
		        int len;  
		        // 开始读取  
		        while ((len = is.read(bs)) != -1) {  
		          os.write(bs, 0, len);  
		        }  
//				os.write(content);
			} catch (Exception e) {
				throw e;
			} finally {
				if (os != null) {
					os.flush();
					os.close();
				}
				if(is != null) {
					is.close();
				}
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "文件路径不存在！");
		}
	}
	
	@RequestMapping("viewOffice")
	@ResponseBody
	public Object viewOffice(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String fileId = request.getParameter("fileId");
			String exp = fileId.substring(fileId.lastIndexOf("."));
			String uidfileName =  fileId.substring(0,fileId.lastIndexOf("."));
			String uidHtmlName = uidfileName + ".html";
			String pdfHtmlName_ind = uidfileName + "_ind.html";
			String pdfHtmlName_s = uidfileName + "s.html";
			File oldFile = new File(ParamInit.attachFileUploadPath + fileId);
			File newFile = new File(ParamInit.attachFileUploadPath + uidHtmlName);
			if(oldFile.exists() && oldFile.isFile()){
				if(".pdf".equalsIgnoreCase(exp)){
					File indFile = new File(ParamInit.attachFileUploadPath + pdfHtmlName_ind);
					File sFile = new File(ParamInit.attachFileUploadPath + pdfHtmlName_s);
					ConvertPdf.readPDFHtml(indFile, ParamInit.attachFileUploadPath + uidfileName.substring(0,uidfileName.lastIndexOf("/") + 1));
					ConvertPdf.readPDFHtml(sFile, ParamInit.attachFileUploadPath + uidfileName.substring(0,uidfileName.lastIndexOf("/") + 1));
				}else{
					if(!newFile.exists() || !newFile.isFile()){
						if(".doc".equalsIgnoreCase(exp) || ".docx".equalsIgnoreCase(exp)){
							JacobUtils.wordToHtml(ParamInit.attachFileUploadPath + fileId, ParamInit.attachFileUploadPath + uidHtmlName);
						}
						if(".xls".equalsIgnoreCase(exp) || ".xlsx".equalsIgnoreCase(exp)){
							JacobUtils.excelToHtml(ParamInit.attachFileUploadPath + fileId, ParamInit.attachFileUploadPath + uidHtmlName);
						}
						if(".ppt".equalsIgnoreCase(exp) || ".pptx".equalsIgnoreCase(exp)){
							JacobUtils.pptToHtml(ParamInit.attachFileUploadPath + fileId, ParamInit.attachFileUploadPath + uidHtmlName);
						}
						if(".txt".equalsIgnoreCase(exp)){
							InputStream is = new FileInputStream(oldFile);
							FileOutputStream o = new FileOutputStream(newFile);
							try{
								// 10K的数据缓冲  
						        byte[] bs = new byte[1024];  
						        // 读取到的数据长度  
						        // 开始读取  
						        while ((is.read(bs)) != -1) {
						          String text = new String(bs);
						          o.write(text.getBytes("UTF-8"));
						        }  
							}catch(Exception e){
								
							}finally {
								if (o != null) {
									o.flush();
									o.close();
								}
								if(is != null) {
									is.close();
								}
							}
						}
					}
				}
			}
			return super.getOutData(uidHtmlName);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "文件路径不存在！");
		}
	}
	
	@RequestMapping("uploadPhoto")
	@ResponseBody
	public Object uploadPhoto(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			MultipartFile file = multipartRequest.getFile("employeePhoto");
			String fileName = file.getOriginalFilename();
			String uploadFileId = fileName.substring(fileName.lastIndexOf("."));
			String year = CommonUtils.printDate("yyyy", new Date());
			String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
			String mothYearDay = CommonUtils.printDate("yyyy-MM-dd", new Date());
			String uName = UUID.randomUUID() + uploadFileId;
			String fid = Constant.ATTACH_FILE_UPLOAD_PROJECT + year + "/" + mothYear + "/" + mothYearDay + "/" + uName;
			String fileUrl = ParamInit.photoFileUploadPath + fid;
			File newFile = new File(fileUrl);
			if(!newFile.getParentFile().exists()){
				newFile.getParentFile().mkdirs();
			}
			file.transferTo(newFile);
			
			return super.getOutData(fid);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "上传附件信息失败");
		}
	}
	
	@RequestMapping("uploadEditor")
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
	
	@RequestMapping("downloadPhoto")
	@ResponseBody
	public Object downloadPhoto(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String fileId = request.getParameter("fileId");
//			String fileName = request.getParameter("fileName");
			File newFile = new File(ParamInit.photoFileUploadPath + fileId);
			response.setHeader("Pragma", "No-cache"); 
			response.setHeader("Cache-Control", "no-cache"); 
			response.setDateHeader("Expires", 0);
			response.setContentType("image/jpeg");
			
			InputStream is = new FileInputStream(newFile);
			OutputStream os = null;
			try {
				os = response.getOutputStream();
				// 10K的数据缓冲  
		        byte[] bs = new byte[1024];  
		        // 读取到的数据长度  
		        int len;  
		        // 开始读取  
		        while ((len = is.read(bs)) != -1) {  
		          os.write(bs, 0, len);  
		        }  
//				os.write(content);
			} catch (Exception e) {
				throw e;
			} finally {
				if (os != null) {
					os.flush();
					os.close();
				}
				if(is != null) {
					is.close();
				}
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "文件路径不存在！");
		}
	}
	
	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TcFileUploadInfoBean info = json.getPojo(data, TcFileUploadInfoBean.class);
			if(info != null){
				TcFileUploadInfo po = new TcFileUploadInfo();
				po.setFileUploadInfoId(info.getFileUploadInfoId());
				service.delete(po);
				File oldFile = new File(ParamInit.attachFileUploadPath + info.getFileId());
				if(".pdf".equals(info.getType())){
					if(oldFile.exists() && oldFile.isFile()){
						File parentFile = oldFile.getParentFile();
						File[] files = parentFile.listFiles();
						for(File file : files){
							file.delete();
						}
						parentFile.delete();
					}
				}else{
					String uidfileName =  info.getFileId().substring(0,info.getFileId().lastIndexOf("."));
					String uidHtmlName = uidfileName + ".html";
					String uidImgHtmlName = uidfileName + ".files";
					File newFile = new File(ParamInit.attachFileUploadPath + uidHtmlName);
					File imgFile = new File(ParamInit.attachFileUploadPath + uidImgHtmlName);
					if(oldFile.exists() && oldFile.isFile()){
						oldFile.delete();
					}
					if(newFile.exists() && newFile.isFile()){
						newFile.delete();
					}
					if(imgFile.exists() && imgFile.isDirectory()){
						File files[] = imgFile.listFiles();  
						for(File file : files){
							file.delete();
						}
						imgFile.delete();
					}
				}
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "删除附件信息失败");
		}
	}
	
	@RequestMapping("remove")
	@ResponseBody
	public Object remove(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			List<TcFileUploadInfoBean> list = json.getPojoList(data, TcFileUploadInfoBean.class);
			if(list != null){
				for(TcFileUploadInfoBean info : list){
					TcFileUploadInfo po = new TcFileUploadInfo();
					po.setFileUploadInfoId(info.getFileUploadInfoId());
					service.delete(po);
					File oldFile = new File(ParamInit.attachFileUploadPath + info.getFileId());
					if(".pdf".equals(info.getType())){
						if(oldFile.exists() && oldFile.isFile()){
							File parentFile = oldFile.getParentFile();
							File[] files = parentFile.listFiles();
							for(File file : files){
								file.delete();
							}
							parentFile.delete();
						}
					}else{
						String uidfileName =  info.getFileId().substring(0,info.getFileId().lastIndexOf("."));
						String uidHtmlName = uidfileName + ".html";
						String uidImgHtmlName = uidfileName + ".files";
						File newFile = new File(ParamInit.attachFileUploadPath + uidHtmlName);
						File imgFile = new File(ParamInit.attachFileUploadPath + uidImgHtmlName);
						if(oldFile.exists() && oldFile.isFile()){
							oldFile.delete();
						}
						if(newFile.exists() && newFile.isFile()){
							newFile.delete();
						}
						if(imgFile.exists() && imgFile.isDirectory()){
							File files[] = imgFile.listFiles();  
							for(File file : files){
								file.delete();
							}
							imgFile.delete();
						}
					}
				}
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "删除附件信息失败");
		}
	}
	
	@RequestMapping("svg")
	@ResponseBody
	public Object svg(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		try {
			String type = request.getParameter("type");       
	        String svg = request.getParameter("svg");  
	        String filename = "chart";  
	        if( request.getParameter("filename")!=null&&request.getParameter("filename").length()>0)  
	        {  
	            filename = request.getParameter("filename");  
	        }  
	        String postfix;  
	        if ("image/jpeg".equals(type)) {  
	            response.setContentType("image/jpeg");  
	            postfix = "jpg";  
	        } else {  
	            response.setContentType("image/png");  
	            postfix = "png";  
	        }  
	        response.setHeader("Content-Disposition", "attachment; filename=" + filename + "." + postfix);  
	        StringReader stringReader = new StringReader(svg);  
	        OutputStream out = response.getOutputStream();  
            TranscoderInput input = new TranscoderInput(stringReader);  
            TranscoderOutput output = new TranscoderOutput(out);  
            if ("image/jpeg".equals(type)) {  
                new JPEGTranscoder().transcode(input, output);  
            } else {  
                new PNGTranscoder().transcode(input, output); 
            }  
			return super.getOutData(true);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "失败");
		}
	}
}
