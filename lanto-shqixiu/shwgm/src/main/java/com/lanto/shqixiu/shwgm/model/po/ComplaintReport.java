package com.lanto.shqixiu.shwgm.model.po;

public class ComplaintReport {
	private Integer serviceCompNum;		//服务投诉数量
	private Integer qualityCompNum;		//质量投诉数量
	private Integer reportCompNum;		//举报数量
	private Integer noAcceptNum;		//未受理数量
	private Integer acceptNum;			//已受理数量
	private Integer endNum;				//已办结数量
	
	
	public Integer getServiceCompNum() {
		return serviceCompNum;
	}
	public void setServiceCompNum(Integer serviceCompNum) {
		this.serviceCompNum = serviceCompNum;
	}
	public Integer getQualityCompNum() {
		return qualityCompNum;
	}
	public void setQualityCompNum(Integer qualityCompNum) {
		this.qualityCompNum = qualityCompNum;
	}
	public Integer getReportCompNum() {
		return reportCompNum;
	}
	public void setReportCompNum(Integer reportCompNum) {
		this.reportCompNum = reportCompNum;
	}
	public Integer getNoAcceptNum() {
		return noAcceptNum;
	}
	public void setNoAcceptNum(Integer noAcceptNum) {
		this.noAcceptNum = noAcceptNum;
	}
	public Integer getAcceptNum() {
		return acceptNum;
	}
	public void setAcceptNum(Integer acceptNum) {
		this.acceptNum = acceptNum;
	}
	public Integer getEndNum() {
		return endNum;
	}
	public void setEndNum(Integer endNum) {
		this.endNum = endNum;
	}
	
	
	
}
