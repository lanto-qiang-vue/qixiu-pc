package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TbVehicleGasLabourItem implements Serializable {
	private Integer itemId;	//序号
	private String corpId;	//企业ID
	private String corpNum;	//企业编号
	private String billNo;	//工单编号
	private String labourItemCode;	//维修项目代码
	private String labourItemName;	//维修项目名称
	private String labourHour;	//维修工时
	private String assignHour;	//派工工时
	private String transNum;	//上传次数

	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCorpNum() {
		return corpNum;
	}
	public void setCorpNum(String corpNum) {
		this.corpNum = corpNum;
	}
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public String getLabourItemCode() {
		return labourItemCode;
	}
	public void setLabourItemCode(String labourItemCode) {
		this.labourItemCode = labourItemCode;
	}
	public String getLabourItemName() {
		return labourItemName;
	}
	public void setLabourItemName(String labourItemName) {
		this.labourItemName = labourItemName;
	}
	public String getLabourHour() {
		return labourHour;
	}
	public void setLabourHour(String labourHour) {
		this.labourHour = labourHour;
	}
	public String getAssignHour() {
		return assignHour;
	}
	public void setAssignHour(String assignHour) {
		this.assignHour = assignHour;
	}
	public String getTransNum() {
		return transNum;
	}
	public void setTransNum(String transNum) {
		this.transNum = transNum;
	}
}
