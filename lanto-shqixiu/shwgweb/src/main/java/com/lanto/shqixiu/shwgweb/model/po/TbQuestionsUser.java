package com.lanto.shqixiu.shwgweb.model.po;

import java.util.Date;

public class TbQuestionsUser {
	private Integer commitId;	
	private Integer quesId;		
	private Integer userId;	
	private String telphone;			
	private String userName;			
	private Date createTime;		//创建时间
	
	public Integer getCommitId() {
		return commitId;
	}
	public void setCommitId(Integer commitId) {
		this.commitId = commitId;
	}
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
	public String getTelphone() {
		return telphone;
	}
	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}
