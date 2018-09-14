package com.lanto.shqixiu.shcheck.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;

public class ConvertPdf {
	private static String FILE_PATH;
	private static String XPDF_PATH;

	public static void convertToHtml(String filePath, String xpdf) {
		FILE_PATH = filePath;
		XPDF_PATH = xpdf;
		if (checkContentType() == 0) {
			toHtml();
		}
	}

	private static int checkContentType() {
		String type = FILE_PATH.substring(FILE_PATH.lastIndexOf(".") + 1,FILE_PATH.length()).toLowerCase();
		if (type.equals("pdf"))
			return 0;
		else
			return 9;
	}

	private static void toHtml() {
		if (new File(FILE_PATH).isFile()) {
			try {
				String cmd = "cmd /c start " + XPDF_PATH + "\\pdftohtml.bat \"" + XPDF_PATH + "\" \"" + FILE_PATH + "\"";
				Runtime.getRuntime().exec(cmd);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static String createPdfHtml(String uname,String fname){
		StringBuffer html = new StringBuffer();
		html.append("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Frameset//EN\" \"http://www.w3.org/TR/html4/frameset.dtd\">");
		html.append("<HTML>");
		html.append("<HEAD>");
		html.append("<TITLE>" + fname + "</TITLE>");
		html.append("<META http-equiv=\"Content-Type\" content=\"text/html; charset=GBK\">");
		html.append("<META name=\"generator\" content=\"pdftohtml 0.39\">");
		html.append("<META name=\"author\" content=\"Administrator\">");
		html.append("<META name=\"date\" content=\"" + new Date() + "\">");
		html.append("</HEAD>");
		html.append("<FRAMESET cols=\"100,*\">");
		html.append("<FRAME name=\"links\" src=\"" + uname + "_ind.html\">");
		html.append("<FRAME name=\"contents\" src=\"" + uname + "s.html\">");
		html.append("</FRAMESET>");
		html.append("</HTML>");
		return html.toString();
	}
	
	public static void readPDFHtml(File file , String uname) throws IOException{
		FileInputStream ism = new FileInputStream(file);
		InputStreamReader isr = new InputStreamReader(ism);
		BufferedReader br = new BufferedReader(isr);
		StringBuffer html = new StringBuffer();
		String info = br.readLine();
		boolean isHave = false;
		while (info != null) {
			info = br.readLine();
			if(info != null){
				if(info.indexOf(uname) == -1){
					html.append(info);
				}else{
					isHave = true;
					String in = info.replaceAll(uname , "");
					html.append(in);
				}
			}
		}
		if(isHave){
			FileOutputStream o = new FileOutputStream(file);
			o.write(html.toString().getBytes("GBK"));  
		    o.close();
		}
		br.close();
		isr.close();
		ism.close();
	}
	
	public static void main(String[] args)   
	{   
	    ConvertPdf.convertToHtml("F:\\维管项目\\pdf\\企业管理设计需求.pdf", Constant.XPDF_PATH);
	}  

}