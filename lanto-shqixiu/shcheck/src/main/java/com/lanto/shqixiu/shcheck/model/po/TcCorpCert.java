package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TcCorpCert implements Serializable {
	private Integer certId;	//证件ID
	private Integer employeeId;	//员工ID
	private String certCode;	//从业资格证号码
	private String certType;	//从业资格证类型
	private Date receiveDate;	//领证日期
	private Date avlidDate;	//有效期致
	private String isInvalid;	//是否已作废

	public Integer getCertId() {
		return certId;
	}
	public void setCertId(Integer certId) {
		this.certId = certId;
	}
	public Integer getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public String getCertCode() {
		return certCode;
	}
	public void setCertCode(String certCode) {
		this.certCode = certCode;
	}
	public String getCertType() {
		return certType;
	}
	public void setCertType(String certType) {
		this.certType = certType;
	}
	public Date getReceiveDate() {
		return receiveDate;
	}
	public void setReceiveDate(Date receiveDate) {
		this.receiveDate = receiveDate;
	}
	public Date getAvlidDate() {
		return avlidDate;
	}
	public void setAvlidDate(Date avlidDate) {
		this.avlidDate = avlidDate;
	}
	public String getIsInvalid() {
		return isInvalid;
	}
	public void setIsInvalid(String isInvalid) {
		this.isInvalid = isInvalid;
	}
}
