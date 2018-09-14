package com.lanto.shqixiu.shwgweb.model.po;

import java.util.Date;

public class TbRepairQuestions {
	private Integer quesId;
	private Integer userId;
	private Integer vehicleId;
	private String expertId;
	private Integer answerId;
	private String type;
	private String content;
	private Integer viewNumber;
	private String status;
	private Date createTime;
	
	
	
	public Integer getQuesId() {
		return quesId;
	}
	public void setQuesId(Integer quesId) {
		this.quesId = quesId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getExpertId() {
		return expertId;
	}
	public void setExpertId(String expertId) {
		this.expertId = expertId;
	}
	public Integer getAnswerId() {
		return answerId;
	}
	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getViewNumber() {
		return viewNumber;
	}
	public void setViewNumber(Integer viewNumber) {
		this.viewNumber = viewNumber;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	@Override
	public String toString() {
		return "TbRepairQuestions [quesId=" + quesId + ", userId=" + userId
				+ ", vehicleId=" + vehicleId + ", expertId=" + expertId
				+ ", answerId=" + answerId + ", type=" + type + ", content="
				+ content + ", viewNumber=" + viewNumber + ", status=" + status
				+ ", createTime=" + createTime + "]";
	}
	
	
}
