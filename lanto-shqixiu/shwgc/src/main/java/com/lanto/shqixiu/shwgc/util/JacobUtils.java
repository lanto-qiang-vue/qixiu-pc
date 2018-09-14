package com.lanto.shqixiu.shwgc.util;

import org.apache.log4j.Logger;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

public class JacobUtils {
	private static Logger logger = Logger.getLogger(JacobUtils.class);// 日志
	// 8 代表word保存成html
	public static final int WORD_HTML = 8;
	public static final int WORD_TXT = 7;
	public static final int EXCEL_HTML = 44;
	public static final int PPT_HTML = 12;

	/**
	 * 
	 * WORD转HTML
	 * 
	 * @param docfile
	 *            WORD文件全路径
	 * 
	 * @param htmlfile
	 *            转换后HTML存放路径
	 */

	public static void wordToHtml(String docfile, String htmlfile) {
		// 启动word应用程序(Microsoft Office Word 2003)
		ActiveXComponent app = new ActiveXComponent("Word.Application");
		logger.info("*****开始转换*********WORD TO HTML");
		try {
			// 设置word应用程序不可见
			app.setProperty("Visible", new Variant(false));
			// documents表示word程序的所有文档窗口，（word是多文档应用程序）
			Dispatch docs = app.getProperty("Documents").toDispatch();
			// 打开要转换的word文件
			Dispatch doc = Dispatch.invoke(
					docs,
					"Open",
					Dispatch.Method,
					new Object[] { docfile, new Variant(false),
							new Variant(true) }, new int[1]).toDispatch();
			// 作为html格式保存到临时文件
			Dispatch.invoke(doc, "SaveAs", Dispatch.Method, new Object[] {
					htmlfile, new Variant(WORD_HTML) }, new int[1]);
			// 关闭word文件
			Dispatch.call(doc, "Close", new Variant(false));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 关闭word应用程序
			app.invoke("Quit", new Variant[] {});
		}
		logger.info("*****转换完毕********");
	}

	/**
	 * EXCEL转HTML
	 * 
	 * @param xlsfile
	 *            EXCEL文件全路径
	 * @param htmlfile
	 *            转换后HTML存放路径
	 */
	public static void excelToHtml(String xlsfile, String htmlfile) {
		ActiveXComponent app = new ActiveXComponent("Excel.Application"); // 启动Excel.Application
		logger.info("*****开始转换*********Excel TO HTML");
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.invoke(
					excels,
					"Open",
					Dispatch.Method,
					new Object[] { xlsfile, new Variant(false),
							new Variant(true) }, new int[1]).toDispatch();
			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] {
					htmlfile, new Variant(EXCEL_HTML) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close", f);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			app.invoke("Quit", new Variant[] {});
		}
		logger.info("*****转换完毕********");
	}

	/**
	 * PPT转HTML
	 * 
	 * @param xlsfile
	 *            EXCEL文件全路径
	 * @param htmlfile
	 *            转换后HTML存放路径
	 */
	public static void pptToHtml(String pptPath, String htmlPath) {
		logger.info("*****开始转换*********PPT TO HTML");
		ActiveXComponent offCom = new ActiveXComponent("PowerPoint.Application");
		try {
			offCom.setProperty("Visible", new Variant(true));
			Dispatch excels = offCom.getProperty("Presentations").toDispatch();
			Dispatch excel = Dispatch.invoke(
					excels,
					"Open",
					Dispatch.Method,
					new Object[] { pptPath, new Variant(false),
							new Variant(false) }, new int[1]).toDispatch();
			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] {
					htmlPath, new Variant(PPT_HTML) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			offCom.invoke("Quit", new Variant[] {});
		}
		logger.info("*****转换完毕********");
	}

	public static void main(String[] args) {

		String docfile = "g:\\pic\\ph.doc";

		String htmlfile = "g:\\pic\\xxx.html";

		JacobUtils.wordToHtml(docfile, htmlfile);

	}

}
