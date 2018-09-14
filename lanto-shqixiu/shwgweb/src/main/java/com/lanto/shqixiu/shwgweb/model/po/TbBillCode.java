package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbBillCode implements Serializable {
	private String billId;	//BILL_ID
	private String billName;	//BILL_NAME
	private String billHead;	//BILL_HEAD
	private Integer numLenght;	//NUM_LENGHT
	private String dateFormat;	//DATE_FORMAT
	private String delimiter;	//DELIMITER
	private String addBy;	//ADD_BY
	private Date addTime;	//ADD_TIME
	private String nonUse;	//NON_USE
	private String ownCoding;	//OWN_CODING
	private String remark;	//REMARK


	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getBillName() {
		return billName;
	}
	public void setBillName(String billName) {
		this.billName = billName;
	}
	public String getBillHead() {
		return billHead;
	}
	public void setBillHead(String billHead) {
		this.billHead = billHead;
	}
	public Integer getNumLenght() {
		return numLenght;
	}
	public void setNumLenght(Integer numLenght) {
		this.numLenght = numLenght;
	}
	public String getDateFormat() {
		return dateFormat;
	}
	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
	public String getDelimiter() {
		return delimiter;
	}
	public void setDelimiter(String delimiter) {
		this.delimiter = delimiter;
	}
	public String getAddBy() {
		return addBy;
	}
	public void setAddBy(String addBy) {
		this.addBy = addBy;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	public String getNonUse() {
		return nonUse;
	}
	public void setNonUse(String nonUse) {
		this.nonUse = nonUse;
	}
	public String getOwnCoding() {
		return ownCoding;
	}
	public void setOwnCoding(String ownCoding) {
		this.ownCoding = ownCoding;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}

}
