package com.lanto.shqixiu.shwgc.model.po;

import java.util.Date;

public class TbOrderService {
	private Integer serviceId;
	private Integer corpId;
	private Date serviceTime;
	private String serviceContent;
	private String contactPerson;
	private String contactPhone;
	private String backInfo;
	private String status;
	public Integer getServiceId() {
		return serviceId;
	}
	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public Date getServiceTime() {
		return serviceTime;
	}
	public void setServiceTime(Date serviceTime) {
		this.serviceTime = serviceTime;
	}
	public String getServiceContent() {
		return serviceContent;
	}
	public void setServiceContent(String serviceContent) {
		this.serviceContent = serviceContent;
	}
	public String getContactPerson() {
		return contactPerson;
	}
	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}
	public String getContactPhone() {
		return contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}
	public String getBackInfo() {
		return backInfo;
	}
	public void setBackInfo(String backInfo) {
		this.backInfo = backInfo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
