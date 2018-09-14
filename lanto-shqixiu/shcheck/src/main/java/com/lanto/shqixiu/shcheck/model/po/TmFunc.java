package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;

public class TmFunc implements Serializable {
	private Integer funcId;	//菜单ID
	private Integer parFuncId;	//父菜单ID
	private String funcCode;	//菜单URL
	private String funcName;	//菜单名称
	private Integer funcType;	//菜单类型
	private Integer sortOrder;	//排序
	private String funcImage;	//菜单图标
	private String funcButton;	//菜单模块按钮

	public Integer getFuncId() {
		return funcId;
	}
	public void setFuncId(Integer funcId) {
		this.funcId = funcId;
	}
	public Integer getParFuncId() {
		return parFuncId;
	}
	public void setParFuncId(Integer parFuncId) {
		this.parFuncId = parFuncId;
	}
	public String getFuncCode() {
		return funcCode;
	}
	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}
	public String getFuncName() {
		return funcName;
	}
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}
	public Integer getFuncType() {
		return funcType;
	}
	public void setFuncType(Integer funcType) {
		this.funcType = funcType;
	}
	public Integer getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}
	public String getFuncImage() {
		return funcImage;
	}
	public void setFuncImage(String funcImage) {
		this.funcImage = funcImage;
	}
	public String getFuncButton() {
		return funcButton;
	}
	public void setFuncButton(String funcButton) {
		this.funcButton = funcButton;
	}
}
