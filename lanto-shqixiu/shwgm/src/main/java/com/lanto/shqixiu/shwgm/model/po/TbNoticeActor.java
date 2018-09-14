package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbNoticeActor implements Serializable {
	private Integer id;	//ID
	private Integer noticeId;	//通告ID
	private String actorId;	//参与者
	private String isSee;	//是否查看
	private String actorType;	//ACTOR_TYPE

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
	public String getActorType() {
		return actorType;
	}
	public void setActorType(String actorType) {
		this.actorType = actorType;
	}
}
