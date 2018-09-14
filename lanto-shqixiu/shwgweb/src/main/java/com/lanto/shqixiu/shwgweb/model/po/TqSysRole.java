package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TqSysRole implements Serializable {
	private Integer roleId;	//角色ID
	private String roleCode;	//角色编码
	private String roleName;	//角色名称
	private Integer roleType;	//角色类型
	private Integer roleStatus;	//角色状态
	private String corpId;	//所属企业

	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getRoleCode() {
		return roleCode;
	}
	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public Integer getRoleType() {
		return roleType;
	}
	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}
	public Integer getRoleStatus() {
		return roleStatus;
	}
	public void setRoleStatus(Integer roleStatus) {
		this.roleStatus = roleStatus;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
}
