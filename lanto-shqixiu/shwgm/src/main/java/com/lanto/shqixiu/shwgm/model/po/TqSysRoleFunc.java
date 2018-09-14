package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TqSysRoleFunc implements Serializable {
	private Integer id;	//ID
	private Integer roleId;	//角色ID
	private Integer funcId;	//菜单ID
	private String funcPower;	//菜单权限

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Integer getFuncId() {
		return funcId;
	}
	public void setFuncId(Integer funcId) {
		this.funcId = funcId;
	}
	public String getFuncPower() {
		return funcPower;
	}
	public void setFuncPower(String funcPower) {
		this.funcPower = funcPower;
	}
}
