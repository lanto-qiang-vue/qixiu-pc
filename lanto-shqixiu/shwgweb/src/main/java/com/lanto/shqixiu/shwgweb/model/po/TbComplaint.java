package com.lanto.shqixiu.shwgweb.model.po;

import java.util.Date;

public class TbComplaint {
	private Integer complaintId;
	private String title;		//标题
	private String name;		//姓名
	private String idNum;		//身份证
	private String unitName;	//投诉单位
	private String linkTel;		//联系电话
	private String linkAddr;	//联系地址
	private String email;		//电子邮箱
	private String type;		//投诉类型
	private String questType;	//问题类别
	private String content;		//投诉内容
	private String status;		//状态
	private Date addTime;		//投诉时间
	private String involveCar;	//涉及车辆
	private String acceptPerson;	//受理人
	private Date acceptTime;		//受理时间
	private String endPerson;		//办结人
	private Date endTime;			//办结时间
	private String endContent;		//办结内容
	
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Integer getComplaintId() {
		return complaintId;
	}
	public void setComplaintId(Integer complaintId) {
		this.complaintId = complaintId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getLinkTel() {
		return linkTel;
	}
	public void setLinkTel(String linkTel) {
		this.linkTel = linkTel;
	}
	public String getLinkAddr() {
		return linkAddr;
	}
	public void setLinkAddr(String linkAddr) {
		this.linkAddr = linkAddr;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getQuestType() {
		return questType;
	}
	public void setQuestType(String questType) {
		this.questType = questType;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	public String getInvolveCar() {
		return involveCar;
	}
	public void setInvolveCar(String involveCar) {
		this.involveCar = involveCar;
	}
	public String getAcceptPerson() {
		return acceptPerson;
	}
	public void setAcceptPerson(String acceptPerson) {
		this.acceptPerson = acceptPerson;
	}
	public Date getAcceptTime() {
		return acceptTime;
	}
	public void setAcceptTime(Date acceptTime) {
		this.acceptTime = acceptTime;
	}
	public String getEndPerson() {
		return endPerson;
	}
	public void setEndPerson(String endPerson) {
		this.endPerson = endPerson;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getEndContent() {
		return endContent;
	}
	public void setEndContent(String endContent) {
		this.endContent = endContent;
	}
	
	
	
}
