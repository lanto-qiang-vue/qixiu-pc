package com.lanto.shqixiu.shwgc.model.bean;

import java.io.Serializable;
import java.util.Date;

public class TrRepairGenePartBeanPrint implements Serializable {
	private Long partId;	//明细ID
	private Integer vehicleId;
	private String billCode;	//工单号
	private String partCode;	//配件编号
	private String partName;	//配件名称
	private Integer partCount;	//数量
	private Date addTime;	//开单日期
	private String corpName;	//维修单位
	private String created;	//登记人
	
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
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
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	
}
