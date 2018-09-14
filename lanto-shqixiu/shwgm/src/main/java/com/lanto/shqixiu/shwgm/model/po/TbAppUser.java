package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbAppUser implements Serializable{
	private String UserId;
	private String UserCode;
	private String UserName;
	private String UserPassword;
	private String UserTal;
	private Date UserInsertime;
	public String getUserId() {
		return UserId;
	}
	public void setUserId(String userId) {
		UserId = userId;
	}
	public String getUserCode() {
		return UserCode;
	}
	public void setUserCode(String userCode) {
		UserCode = userCode;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public String getUserPassword() {
		return UserPassword;
	}
	public void setUserPassword(String userPassword) {
		UserPassword = userPassword;
	}
	public String getUserTal() {
		return UserTal;
	}
	public void setUserTal(String userTal) {
		UserTal = userTal;
	}
	public Date getUserInsertime() {
		return UserInsertime;
	}
	public void setUserInsertime(Date userInsertime) {
		UserInsertime = userInsertime;
	}
	
}
