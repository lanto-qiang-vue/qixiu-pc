package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;

public class TrRepairGenePart implements Serializable {
	private Long partId;	//明细ID
	private String billCode;	//工单号
	private String partCode;	//配件编号
	private String partName;	//配件名称
	private Integer partCount;	//数量
	public Long getPartId() {
		return partId;
	}
	public void setPartId(Long partId) {
		this.partId = partId;
	}
	public String getBillCode() {
		return billCode;
	}
	public void setBillCode(String billCode) {
		this.billCode = billCode;
	}
	public String getPartCode() {
		return partCode;
	}
	public void setPartCode(String partCode) {
		this.partCode = partCode;
	}
	public String getPartName() {
		return partName;
	}
	public void setPartName(String partName) {
		this.partName = partName;
	}
	public Integer getPartCount() {
		return partCount;
	}
	public void setPartCount(Integer partCount) {
		this.partCount = partCount;
	}

}
