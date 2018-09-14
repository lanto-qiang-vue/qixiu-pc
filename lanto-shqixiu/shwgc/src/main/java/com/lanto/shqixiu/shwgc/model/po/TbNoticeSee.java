package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbNoticeSee implements Serializable {
	private Integer id;	//ID
	private Integer noticeId;	//通告ID
	private String actorId;	//参与者
	private String isSee;	//是否查看
	private Date seeDate;	//查看时间
	private String corpType;

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(Integer noticeId) {
		this.noticeId = noticeId;
	}
	public String getActorId() {
		return actorId;
	}
	public void setActorId(String actorId) {
		this.actorId = actorId;
	}
	public String getIsSee() {
		return isSee;
	}
	public void setIsSee(String isSee) {
		this.isSee = isSee;
	}
	public Date getSeeDate() {
		return seeDate;
	}
	public void setSeeDate(Date seeDate) {
		this.seeDate = seeDate;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	
}
