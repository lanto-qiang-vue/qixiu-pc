package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbOnSiteService implements Serializable {
	private Integer serviceId;	//SERVICE_ID
	private Integer corpId;	//企业ID
	private Date serviceTime;	//服务时间
	private String serviceContent;	//服务内容
	private String address;	//服务地址
	private String contactPerson;	//联系人
	private String contactPhone;	//联系电话
	private String backInfo;	//反馈信息
	private String status;	//状态
	private Integer userId;


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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
