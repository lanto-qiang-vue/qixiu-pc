package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TcFlowGroupUser implements Serializable {
	private Integer id;	//ID
	private Integer groupId;	//组ID
	private Integer userId;	//用户ID

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
}
