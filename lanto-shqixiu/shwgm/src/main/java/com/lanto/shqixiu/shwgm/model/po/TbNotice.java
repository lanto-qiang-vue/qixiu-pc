package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbNotice implements Serializable {
	private Integer noticeId;	//ID
	private String noticeTitle;	//通知标题
	private Date sendDate;	//发送时间
	private String sendBy;	//发送人
	private String dataFrom;	//来源
	private Date createDate;	//创建时间
	private String creator;	//创建人
	private String isResult;	//是否需要回执
	private String status;	//状态（暂存、发送）
	private String clientActor;	//企业端参与者
	private String manageActor;	//管理端参与者
	private String clientActorDisplay;
	private String  sendTo;
	
	public String getSendTo() {
		return sendTo;
	}
	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}
	public Integer getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(Integer noticeId) {
		this.noticeId = noticeId;
	}
	public String getNoticeTitle() {
		return noticeTitle;
	}
	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}
	public Date getSendDate() {
		return sendDate;
	}
	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}
	public String getSendBy() {
		return sendBy;
	}
	public void setSendBy(String sendBy) {
		this.sendBy = sendBy;
	}
	public String getDataFrom() {
		return dataFrom;
	}
	public void setDataFrom(String dataFrom) {
		this.dataFrom = dataFrom;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public String getIsResult() {
		return isResult;
	}
	public void setIsResult(String isResult) {
		this.isResult = isResult;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getClientActor() {
		return clientActor;
	}
	public void setClientActor(String clientActor) {
		this.clientActor = clientActor;
	}
	public String getManageActor() {
		return manageActor;
	}
	public void setManageActor(String manageActor) {
		this.manageActor = manageActor;
	}
	public String getClientActorDisplay() {
		return clientActorDisplay;
	}
	public void setClientActorDisplay(String clientActorDisplay) {
		this.clientActorDisplay = clientActorDisplay;
	}
	
}
