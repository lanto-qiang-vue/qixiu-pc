package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TmSysUser implements Serializable {
	private Integer userId;	//用户ID
	private String userCode;	//用户编号
	private String userName;	//用户姓名
	private String userSex;	//用户性别
	private String userType;	//用户类别
	private String password;	//密码
	private String telphone;	//电话号码
	private String blongArea;	//所属辖区
	private String position;	//所属职务
	private String lawNum;	//执法证号
	private Integer isValid;	//是否有效
	private String roleId;	//角色ID
	private Integer corpId;	//企业ID
	private Integer deptId;	//部门ID
	private String trafficUnit;	//所属交管所
	
	public String getTrafficUnit() {
		return trafficUnit;
	}
	public void setTrafficUnit(String trafficUnit) {
		this.trafficUnit = trafficUnit;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserSex() {
		return userSex;
	}
	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getTelphone() {
		return telphone;
	}
	public void setTelphone(String telphone) {
		this.telphone = telphone;
	}
	public String getBlongArea() {
		return blongArea;
	}
	public void setBlongArea(String blongArea) {
		this.blongArea = blongArea;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getLawNum() {
		return lawNum;
	}
	public void setLawNum(String lawNum) {
		this.lawNum = lawNum;
	}
	public Integer getIsValid() {
		return isValid;
	}
	public void setIsValid(Integer isValid) {
		this.isValid = isValid;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public Integer getDeptId() {
		return deptId;
	}
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
}
