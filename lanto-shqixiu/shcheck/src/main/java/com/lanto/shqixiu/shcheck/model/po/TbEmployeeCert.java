package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbEmployeeCert implements Serializable {
	private Integer certId;	//CERT_ID
	private String idNum;	//ID_NUM
	private String certNum;	//CERT_NUM
	private String certName;	//CERT_NAME
	private Date sendDate;	//SEND_DATE
	private Date endDate;	//END_DATE

	public Integer getCertId() {
		return certId;
	}
	public void setCertId(Integer certId) {
		this.certId = certId;
	}
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
	public String getCertNum() {
		return certNum;
	}
	public void setCertNum(String certNum) {
		this.certNum = certNum;
	}
	public String getCertName() {
		return certName;
	}
	public void setCertName(String certName) {
		this.certName = certName;
	}
	public Date getSendDate() {
		return sendDate;
	}
	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
