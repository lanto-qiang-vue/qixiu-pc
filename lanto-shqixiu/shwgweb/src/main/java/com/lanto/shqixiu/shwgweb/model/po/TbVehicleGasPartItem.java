package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TbVehicleGasPartItem implements Serializable {
	private Integer itemId;	//序号
	private String corpId;	//企业ID
	private String corpNum;	//企业编号
	private String billNo;	//工单编号
	private String partCode;	//配件代码
	private String partName;	//配件名称

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
}
