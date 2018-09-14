package com.lanto.shqixiu.shcheck.controller.common;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.softbase.controller.BaseCon;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.po.TbReportTemp;
import com.lanto.shqixiu.shcheck.model.po.TbReportUser;
import com.lanto.shqixiu.shcheck.service.common.ReportService;

@Controller
@RequestMapping(value="print/common/manage",produces = "text/html;charset=UTF-8")
public class ReportController extends BaseCon {
	private Logger logger = Logger.getLogger(ReportController.class);// 日志
	
	@Resource
	private ReportService service;

	@RequestMapping("toReport")
	@ResponseBody
	public Object toReport(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			request.setCharacterEncoding("gbk");
			InputStream inputStream = request.getInputStream();
			SAXReader reader = new SAXReader();
			Document document = null;
			int readCount;
			// 输入流缓冲区
			byte[] readByte = new byte[1024];
			// 初始化一个输出流(到文件)
			ByteArrayOutputStream bOutputStream = new ByteArrayOutputStream();
			// 循环从读取输入流中读取字节
			while ((readCount = inputStream.read(readByte, 0, 1024)) != -1) {
				bOutputStream.write(readByte, 0, readCount);
			}
			String xml_in = new String(bOutputStream.toByteArray());
			String xml = URLDecoder.decode(xml_in, "gbk");
			document = reader.read(new ByteArrayInputStream(xml.getBytes("gbk")));
			Node packNameNode = document.selectSingleNode("/GZJRDP/DataPackage/HeadPackage/PackName");
			String packName = packNameNode.getText();
			if("getReportReq".equals(packName)){
				return getReport(document,packName);
			}else if("saveReportReq".equals(packName)){
				return save(document,packName);
			}
			return false;
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "打印出错");
		}
	}
	
	private Object getReport(Document document,String packName) throws Exception{
			Node reportIdNode = document.selectSingleNode("/GZJRDP/DataPackage/HeadPackage/NodeInfo/ReportID");
			String reportId = reportIdNode.getText();
			reportId = reportId.replaceAll("\\s", "");
			String proCode = reportId.substring(0, 2);
			String licenseType = reportId.substring(6, 9);
			String licenseVersion = reportId.substring(9, 13);
			Out_Xml test = new Out_Xml();
			Node reportUserNoNode = document.selectSingleNode("/GZJRDP/DataPackage/HeadPackage/NodeInfo/ReportUserNo");// 用户
			String reportUserNo = reportUserNoNode.getText();
			TbReportUser report = new TbReportUser();
			report.setCorpid(reportUserNo);
			report.setBustype(licenseType);
			report.setVerno(licenseVersion);
			report = service.getReportUserModel(report);
			try {
				if (report == null) {
					TbReportTemp temp = new TbReportTemp();
					temp.setProvno(proCode);
					temp.setVersion(licenseVersion);
					temp.setYwlx(licenseType);
					temp = service.getReportTempModel(temp);
					if (temp != null) {
						String license = new String(temp.getBbsl());
						test.edit_Out_Xml(new String[] {
								"NodeInfo",
								"ReportData",
								license.replaceAll("\\n", "").replaceAll("\\s",
										"+") });
						test.edit_Out_Xml_ElementValue("ErrorMsg", "查找成功");
						test.edit_Out_Xml_ElementValue("DisposeResult", "1");
					} else {
						test.edit_Out_Xml(new String[] { "NodeInfo",
								"ReportData", "" });
						test.edit_Out_Xml_ElementValue("DisposeResult", "0");
						test.edit_Out_Xml_ElementValue("ErrorMsg", "找不到文件");
					}
				} else {
					String license = new String(report.getRepitem(),"UTF-8");
					//System.out.println(license);
					license = license.replaceAll("\\n", "").replaceAll("\\s",
							"+");
					test.edit_Out_Xml(new String[] { "NodeInfo", "ReportData",
							license });
					test.edit_Out_Xml_ElementValue("ErrorMsg", "查找成功");
					test.edit_Out_Xml_ElementValue("DisposeResult", "1");
				}

			} catch (Exception e) {
				test.edit_Out_Xml_ElementValue("DisposeResult", "0");
				test.edit_Out_Xml_ElementValue("ErrorMsg", e.getMessage());
			}
			byte[] out_ba = test.getXml().getBytes();
			return out_ba;
	}

	private Object save(Document document,String packName) throws Exception{
		// final long serialVersionUID=-7310134097354901677L;
		Node reportIdNode = document.selectSingleNode("/GZJRDP/DataPackage/HeadPackage/NodeInfo/ReportID");
		String reportId = reportIdNode.getText();
		reportId = reportId.replaceAll("\\s", "");
		String proCode = reportId.substring(0, 2);
		String licenseType = reportId.substring(6, 9);
		String licenseVersion = reportId.substring(9, 13);
		String bustype = reportId.substring(6, 9);
		Node reportUserNoNode = document.selectSingleNode("/GZJRDP/DataPackage/HeadPackage/NodeInfo/ReportUserNo");// 用户
		String reportUserNo = reportUserNoNode.getText();
		Out_Xml test = new Out_Xml();
		TbReportUser report = new TbReportUser();
		report.setCorpid(reportUserNo);
		report.setVerno(licenseVersion);
		report.setBustype(licenseType);
		report = service.getReportUserModel(report);
		Node licenseNode = document
				.selectSingleNode("/GZJRDP/DataPackage/HeadPackage/NodeInfo/ReportData");
		byte[] repitem = (licenseNode.getText()).getBytes("UTF-8");
		
		if (report != null) {		

			report.setRepitem(repitem);
			report.setUptime(new Date());

			if (service.update(report)) {
				test.edit_Out_Xml_ElementValue("ErrorMsg", "保存成功");
			} else {
				test.edit_Out_Xml_ElementValue("ErrorMsg", "保存失败");
			}

		} else {
			report = new TbReportUser();
			report.setBustype(bustype);
			report.setRepitem(repitem);
			report.setCorpid(reportUserNo);
			report.setVerno(licenseVersion);
			report.setUptime(new Date());
			if (service.save(report)) {
				test.edit_Out_Xml_ElementValue("ErrorMsg", "保存成功");

			} else {
				test.edit_Out_Xml_ElementValue("ErrorMsg", "保存失败");
			}

		}
		test.edit_Out_Xml_ElementValue("DisposeResult", "1");
		byte[] out_ba = test.getXml().getBytes();
		return out_ba;
	}

	@RequestMapping("downloadFile")
	@ResponseBody
	public void downloadFile(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
	}
	
	class Out_Xml {
		private Document document;

		Out_Xml() {

			Document doc = DocumentHelper.createDocument();
			doc.setXMLEncoding("gb2312");
			Element GZJRDP = doc.addElement("GZJRDP");
			GZJRDP.addAttribute("Version", "1.0");

			Element dataPackage = GZJRDP.addElement("DataPackage");
			dataPackage.addAttribute("ID", "DataPackage");

			Element headPackage = dataPackage.addElement("HeadPackage");
			headPackage.addAttribute("ID", "HeadPackage");

			Element disposeResult = headPackage.addElement("DisposeResult");
			disposeResult.addAttribute("ID", "DisposeResult");

			Element errorMsg = headPackage.addElement("ErrorMsg");
			errorMsg.addAttribute("ID", "ErrorMsg");

			Element nodeInfo = headPackage.addElement("NodeInfo");
			nodeInfo.addAttribute("ID", "NodeInfo");

			Element dataPackXml = dataPackage.addElement("DataPackXml");
			dataPackXml.addAttribute("ID", "DataPackXml");

			Element tableDataPkg = dataPackXml.addElement("TableDataPkg");
			tableDataPkg.addAttribute("ID", "TableDataPkg");
			this.document = doc;
		}

		private void edit_Out_Xml_ElementValue(String e, String value) {
			Element element = this.document.elementByID(e);
			// System.out.println(value);
			element.addText(value);
		}

		private void edit_Out_Xml(String[]... e) {

			begin1: for (String[] element : e) {
				if (element.length < 2)
					continue begin1;// ���ڵ㣬Ҫ�����Ľڵ�not null
				Element pElement = this.document.elementByID(element[0]);
				if (pElement == null || "".equals(element[1].trim()))
					continue begin1;// ���ڵ㣬Ҫ�����Ľڵ�not null
				Element cElement = pElement.addElement(element[1]);
				cElement.addAttribute("ID", element[1]);
				if (element.length < 3)
					continue begin1;
				cElement.addText(element[2]);

				begin2: for (int i = 3; i < element.length; i++) {
					if ("".equals(element[i].trim())) {
						i++;
						continue begin2;
					}
					if (i == element.length) {
						cElement.addAttribute(element[i], "");
					} else {
						cElement.addAttribute(element[i], element[i + 1]);
					}
					i++;
				}
			}
		}

		private String getXml() {
			Element root = this.document.getRootElement();
			getElement(root);
			String xml = this.document.asXML();
			// System.out.println(xml);
			xml = xml.replaceAll(">\\n|\\s<", ">");
			return xml;
		}

		private void getElement(Element e) {
			List<Element> list = e.elements();
			for (Element element : list) {
				Attribute id = element.attribute("ID");
				element.remove(id);
				getElement(element);
			}
		}
	}
}
