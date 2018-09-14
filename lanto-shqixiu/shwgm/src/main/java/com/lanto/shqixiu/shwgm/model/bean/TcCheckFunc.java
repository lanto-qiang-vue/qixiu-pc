/*
* Copyright (c) 2005 Infoservice, Inc. All  Rights Reserved.
* This software is published under the terms of the Infoservice Software
* License version 1.0, a copy of which has been included with this
* distribution in the LICENSE.txt file.
*
* CreateDate : 2013-12-17 20:28:41
* CreateBy   : jerry
* Comment    : generate by com.sgm.po.POGen
*/

package com.lanto.shqixiu.shwgm.model.bean;

import org.softbase.utils.CommonUtils;


@SuppressWarnings("serial")
public class TcCheckFunc{

	private Integer funcType;
	private Long parFuncId;
	private String funcName;
	private Long funcId;
	private String funcCode;
	private Long sortOrder;
	private String funcImage;
	private String isCheck;
	private String funcPower;
	private String funcButton;
	private String icon;
	
	public Integer getFuncType() {
		return funcType;
	}
	public void setFuncType(Integer funcType) {
		this.funcType = funcType;
	}
	public Long getParFuncId() {
		return parFuncId;
	}
	public void setParFuncId(Long parFuncId) {
		this.parFuncId = parFuncId;
	}
	public String getFuncName() {
		return funcName;
	}
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}
	public Long getFuncId() {
		return funcId;
	}
	public void setFuncId(Long funcId) {
		this.funcId = funcId;
	}
	public String getFuncCode() {
		return funcCode;
	}
	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}
	public Long getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(Long sortOrder) {
		this.sortOrder = sortOrder;
	}
	public String getFuncImage() {
		return funcImage;
	}
	public void setFuncImage(String funcImage) {
		this.funcImage = funcImage;
	}
	public String getIsCheck() {
		return isCheck;
	}
	public void setIsCheck(String isCheck) {
		this.isCheck = isCheck;
	}
	public String getFuncPower() {
		return funcPower;
	}
	public void setFuncPower(String funcPower) {
		this.funcPower = funcPower;
	}
	public String getFuncButton() {
		return funcButton;
	}
	public void setFuncButton(String funcButton) {
		this.funcButton = funcButton;
	}
	public String getIcon() {
		if(CommonUtils.checkIsNullStr(icon)){
			icon = "images/menus/comm.gif";
		}
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	@Override
	public String toString() {
		return "TcCheckFunc [funcButton=" + funcButton + ", funcCode="
				+ funcCode + ", funcId=" + funcId + ", funcImage=" + funcImage
				+ ", funcName=" + funcName + ", funcPower=" + funcPower
				+ ", funcType=" + funcType + ", isCheck=" + isCheck
				+ ", parFuncId=" + parFuncId + ", sortOrder=" + sortOrder + "]";
	}
	

}