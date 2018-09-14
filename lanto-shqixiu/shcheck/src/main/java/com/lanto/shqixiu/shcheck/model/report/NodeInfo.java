package com.lanto.shqixiu.shcheck.model.report;


public class NodeInfo {
	
	
	private String ReportID;
	private String ReportName;
	private String ReportUserNo;
	private String printType;
	private String SrvUrl = ObjectToXML.SrvUrl;
	
	public NodeInfo(String reportID, String reportName, String reportUserNo,
			String printType, String srvUrl) {
		super();
		ReportID = reportID;
		ReportName = reportName;
		ReportUserNo = reportUserNo;
		this.printType = printType;
		SrvUrl = srvUrl;
	}
	
	public NodeInfo(String reportID, String reportName, String reportUserNo,
			String printType) {
		super();
		ReportID = reportID;
		ReportName = reportName;
		ReportUserNo = reportUserNo;
		this.printType = printType;
	}

	public String getReportID() {
		return ReportID;
	}

	public void setReportID(String reportID) {
		ReportID = reportID;
	}

	public String getReportName() {
		return ReportName;
	}

	public void setReportName(String reportName) {
		ReportName = reportName;
	}

	public String getReportUserNo() {
		return ReportUserNo;
	}

	public void setReportUserNo(String reportUserNo) {
		ReportUserNo = reportUserNo;
	}

	public String getPrintType() {
		return printType;
	}

	public void setPrintType(String printType) {
		this.printType = printType;
	}

	public String getSrvUrl() {
		return SrvUrl;
	}

	public void setSrvUrl(String srvUrl) {
		SrvUrl = srvUrl;
	}
	
	
	
}
