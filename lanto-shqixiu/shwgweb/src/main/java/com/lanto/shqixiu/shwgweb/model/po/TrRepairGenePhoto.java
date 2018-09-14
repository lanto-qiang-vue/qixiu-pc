package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TrRepairGenePhoto implements Serializable {
	private String billCode;	//工单号
	private String oldPhoto;	//旧件照片
	private String newPhoto;	//新件照片
	private String repairPhoto;	//维修照片
	private Date createTime;
	
	public String getBillCode() {
		return billCode;
	}
	public void setBillCode(String billCode) {
		this.billCode = billCode;
	}
	public String getOldPhoto() {
		return oldPhoto;
	}
	public void setOldPhoto(String oldPhoto) {
		this.oldPhoto = oldPhoto;
	}
	public String getNewPhoto() {
		return newPhoto;
	}
	public void setNewPhoto(String newPhoto) {
		this.newPhoto = newPhoto;
	}
	public String getRepairPhoto() {
		return repairPhoto;
	}
	public void setRepairPhoto(String repairPhoto) {
		this.repairPhoto = repairPhoto;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
