package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbAppLoginToken implements Serializable {
	private Integer tokenId;
	private Integer userId;
	private String userType;
	private String loginToken;
	private String deviceId;
	private Long timeMillis;
	private Date createDate;
	
	public Integer getTokenId() {
		return tokenId;
	}
	public void setTokenId(Integer tokenId) {
		this.tokenId = tokenId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getLoginToken() {
		return loginToken;
	}
	public void setLoginToken(String loginToken) {
		this.loginToken = loginToken;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	
	public Long getTimeMillis() {
		return timeMillis;
	}
	public void setTimeMillis(Long timeMillis) {
		this.timeMillis = timeMillis;
	}
	@Override
	public String toString() {
		return "TbAppLoginToken [tokenId=" + tokenId + ", userId=" + userId
				+ ", userType=" + userType + ", loginToken=" + loginToken
				+ ", deviceId=" + deviceId + ", createDate=" + createDate + "]";
	}
	
}
