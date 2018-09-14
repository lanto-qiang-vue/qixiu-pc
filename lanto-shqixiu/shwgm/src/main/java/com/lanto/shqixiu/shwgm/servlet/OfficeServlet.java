package com.lanto.shqixiu.shwgm.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.softbase.controller.ParamInit;

import com.lanto.shqixiu.shwgm.util.ConvertPdf;
import com.lanto.shqixiu.shwgm.util.JacobUtils;

public class OfficeServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public OfficeServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request,response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String fileId = request.getParameter("fileId"); 
		String remoteIp = request.getRemoteAddr();
	    try{
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
						        byte[] bs = new byte[10240];  
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
	    }catch(Exception e){
	    	out.print("false");
	    	out.flush();
	    	out.close();
	    	return;
		}
		out.print("true");
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}
}
